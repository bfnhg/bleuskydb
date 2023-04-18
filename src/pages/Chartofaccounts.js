import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import {
  InboxOutlined,
  PlusSquareOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Card,
  Divider,
  Row,
  Col,
  message,
  Upload,
  Form,
  Input,
  Button,
  Modal,
  Typography,
  Table,
  Space,
} from "antd";
const { Dragger } = Upload;
const { Text, Link } = Typography;

const columns = [
  {
    title: "IGRF",
    dataIndex: "IGRF",
  },
  {
    title: "Classification",
    dataIndex: "Classification",
  },
  {
    title: "GL Account",
    dataIndex: "GLAccount",
  },
  {
    title: "Description",
    dataIndex: "Description",
  },
  {
    title: "Actions",
    dataIndex: "operation",
    render: (_, record) => <a>Details</a>,
  },
];
const data = [
  {
    key: "1",
    IGRF: "John Brown",
    Classification: 32,
    GLAccount: "New York No. 1 Lake Park",
    Description: "Description",
  },
  {
    key: "2",
    IGRF: "Jim Green",
    Classification: 42,
    GLAccount: "London No. 1 Lake Park",
    Description: "Description",
  },
  {
    key: "3",
    IGRF: "Joe Black",
    Classification: 32,
    GLAccount: "Sidney No. 1 Lake Park",
    Description: "Description",
  },
  {
    key: "4",
    IGRF: "Disabled User",
    Classification: 99,
    GLAccount: "Sidney No. 1 Lake Park",
    Description: "Description",
  },
];
const props = {
  name: "file",
  // multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  beforeUpload: (file) => {
    const isPNG =
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.type === "application/vnd.ms-excel";
    if (!isPNG) {
      message.error(`${file.name} is not a xls file`);
    }
    return isPNG || Upload.LIST_IGNORE;
  },
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(status, info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      console.log(status, info.file, info.fileList);
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const Chartofaccounts = () => {
  const history = useHistory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const gotoGI = () => {
    let path = `/new_chart_of_accounts`;
    history.push(path);
  };
  return (
    <>
      <Card bordered={false}>
        <Row justify="end">
          <Button type="primary" onClick={showModal}>
            <PlusOutlined />
            Create a new chart of accounts or import an existing one
          </Button>
        </Row>
        <Modal
          open={isModalOpen}
          okText="Create"
          cancelText="Cancel"
          onOk={handleOk}
          onCancel={handleCancel}
          justify="center"
        >
          <Row justify="center">
            <Button type="primary" onClick={gotoGI}>
              New Chart of Accounts
            </Button>
          </Row>
          <Divider>Or</Divider>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag existing chart of accounts xsv file to this area to
              upload
            </p>
            <p className="ant-upload-hint">Support a single xsv file upload.</p>
          </Dragger>
        </Modal>

        <Divider>
          <Text type="secondary">Chart of Accounts</Text>
        </Divider>
        <Table bordered columns={columns} dataSource={data} />
      </Card>
    </>
  );
};

export default Chartofaccounts;
