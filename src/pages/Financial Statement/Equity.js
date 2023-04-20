import React, { useMemo, useContext, useEffect, useState } from "react";
import { JSON_API } from "../../services/Constants";
import { CompanyContext } from "../../contexts/CompanyContext";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Table,
  Select,
  Button,
  DatePicker,
  Collapse,
  Popconfirm,
  Modal,
  message,
  Form,
  Checkbox,
  InputNumber,
  Input,
  Typography,
  Space,
  Card,
  Col,
  Row,
  Descriptions,
} from "antd";

const onChangee = (date, dateString) => {
  console.log(date, dateString);
};

function Equity() {
  const {
    Lang,
    setLang,
    Shares,
    setShares,
    ShareHolders,
    setShareHolders,
    Product,
    setProduct,
    ActivityType,
    setActivityType,
    StrategicTarget,
    setStrategicTarget,
    BusinessPartner,
    setBusinessPartner,
    MainCustomer,
    setMainCustomer,
    RevenueModel,
    setRevenueModel,
    Companies,
    setCompanies,
    Company,
    setCompany,
    Actionstate,
    setActionstate,
    Edited,
    setEdited,
    TypeIndustries,
    setTypeIndustries,
    Market,
    setMarket,
  } = useContext(CompanyContext);
  const [year, setYear] = useState(null);
  const [equity, setequity] = useState(null);
  const [form2] = Form.useForm();
  const [editingRowbook, setEditingRowbook] = useState(null);
  const [statementcategory, setStatementCategory] = useState([{}]);
  const [open, setOpen] = useState(false);
  var date;
  useEffect(() => {
    
    console.log("year" + date);
    getEquities();
  }, [Company.id, year]);
  const onChangeyear = (date, dateString) => {
    setequity(null);
    console.log(date, dateString);
    setYear(dateString);
  };

  const columns = [
    {
      title: "GIFI",
      // dataIndex: "financialStatementTypeId",
      align: "center",
      // render: (text) => <a>{text}</a>,
      render: (_, record) => (
        <div style={{ textAlign: "left" }}>
          {record.financialStatementType.gifi}
        </div>
      ),
    },
    {
      title: "Class",
      align: "center",
      render: (_, record) => <div style={{ textAlign: "left" }}>Equity</div>,
    },
    {
      title: "Category",
      // dataIndex: "category",
      align: "center",
      render: (_, record) => (
        <div style={{ textAlign: "left" }}>
          {record.financialStatementType.financialStatementCategory.label}
        </div>
      ),
    },
    {
      title: "GL Number",
      // dataIndex: "glAccountId",
      align: "center",
      render: (_, record) => (
        <div style={{ textAlign: "right" }}>
          {record.chartAccount.glAccount.glNumber}
        </div>
      ),
    },
    {
      title: "Description",
      // dataIndex: "note",
      align: "center",
      render: (_, record) => (
        <div style={{ textAlign: "left" }}>{record.note}</div>
      ),
    },
    {
      title: "Actions",
      align: "center",

      render: (_, record) => {
        return (
          <Link
            to={{
              pathname: `/equityDetail/${record.id}`,
              state: { stateParam: record.id },
            }}
          >
            details
          </Link>
        );
      },
    },
  ];
  const getEquities = async () => {
    if (year == null) {
      await axios
        .get(`${JSON_API}/Equity/filter/${Company.id}`)
        .then((res) => {
          console.log(res);
          setequity(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await axios
        .get(`${JSON_API}/Equity/filter/${Company.id}?year=${year}`)
        .then((res) => {
          console.log(res);
          setequity(res.data);
          console.log(equity);
          console.log("flflfmfmmfmfmmf");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    

    <Card
      bordered={false}
      className="header-solid mb-24"
      title={
        <h3 className="font-semibold">
          Financial Statement (Equity) for: {Company.name}
        </h3>
      }
    >
      <Row>
        <Col span={8}>
          <DatePicker
            name="year"
            picker="year"
            placeholder="Selected Year"
            style={{ width: 200, height: 35 }}
            onChange={onChangeyear}
          />
        </Col>
        <Col span={6} offset={10}>
          <Space
            style={{
              // display: 'flex',
              marginBottom: 8,
            }}
          >
            <Link
              to={{
                pathname: `/summaryequity`,
              }}
            >
              <Button
                className="Create-button"
                type="primary"
                style={{
                  textAlign: "right",
                  marginLeft: "2rem",
                }}
                // onClick={() => setOpen(true)}
              >
                Summary
              </Button>

              <Button
                className="Create-button"
                type="primary"
                style={{
                  textAlign: "right",
                  marginLeft: "2rem",
                }}
              >
                Upload the Reals
              </Button>
            </Link>
          </Space>
        </Col>
      </Row>
      <div>
        <Table columns={columns} dataSource={equity} bordered />
      </div>
    </Card>
  );
}

export default Equity;




