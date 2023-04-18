import React, { useState, useEffect, useRef, useContext } from "react";
import { JSON_API } from "../services/Constants";
import { CompanyContext } from "../contexts/CompanyContext";
import axios from "axios";
import {
  Card,
  Button,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Result,
  Typography,
  Divider,
  Tooltip,
  Space,
  Modal,
  Table,
  Popconfirm,
  Tag,
} from "antd";
import {
  ContactsOutlined,
  PlusCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import moment from "moment";

const ManageTeam = () => {
  const [Managers, setManagers] = useState([]);
  const [Titles, setTitles] = useState([]);
  const { Company } = useContext(CompanyContext);
  const [form] = Form.useForm();
  let { t } = useTranslation();

  //   useEffect(() => {
  //     const fetchManagersAndTitles = async () => {
  //       try {
  //         const managersResponse = await axios.get(
  //           `${JSON_API}/Managers/enterprise/${Company.id}`
  //         );
  //         const titlesResponse = await axios.get(`${JSON_API}/titles`);
  //         setManagers(managersResponse.data);
  //         setTitles(titlesResponse.data);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };
  //     fetchManagersAndTitles();
  //   }, [Company.id]);

  const renderManagersTable = () => {
    const columns = [
      {
        title: t("Name"),
        dataIndex: "Name",
        key: "Name",
      },
      {
        title: t("FirstName"),
        dataIndex: "FirstName",
        key: "FirstName",
      },
      {
        title: t("Titles"),
        dataIndex: "EmployeeTitles",
        key: "EmployeeTitles",
        render: (EmployeeTitles) =>
          EmployeeTitles
            ? EmployeeTitles.map((title) => (
                <Tag key={title.TitleId}>{title.Title.Label}</Tag>
              ))
            : null,
      },
    ];

    return (
      <Table
        dataSource={Managers}
        columns={columns}
        rowKey={(record) => record.Id}
        pagination={false}
      />
    );
  };

  return (
    <>
      <Card
        title={
          <span style={{ fontSize: "16px" }}>
            <ContactsOutlined /> {t("ManageTeam")}
          </span>
        }
        extra={
          <>
            <Button
              type="primary"
              size="medium"
              className="uppercase"
              style={{
                borderRadius: "50px",
                textTransform: "uppercase",
                fontSize: "10px",
              }}
            >
              <PlusCircleOutlined /> {t("AddNewMnager")}
            </Button>
            <Button
              type="link"
              style={{
                borderRadius: "50px",
                textTransform: "uppercase",
                fontSize: "10px",
                border: "1px solid #d9d9d9",
                marginLeft: "10px",
              }}
            >
              <SettingOutlined /> {t("ManageTitles")}
            </Button>
          </>
        }
      >
        {renderManagersTable()}
      </Card>
    </>
  );
};

export default ManageTeam;
