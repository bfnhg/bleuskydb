import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Space,
  Table,
  Tag,
  Progress,
  Form,
  Button,
  Typography,
  icon,
  InputNumber,
  Input,
  Popconfirm,
  Badge,
  DatePicker,
  Radio,
  List,
  Modal,
  message,
} from "antd";
import { JSON_API } from "../services/Constants";
import dayjs from "dayjs";
import { useForm } from "rc-field-form";
import { PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import { CompanyContext } from "../contexts/CompanyContext";
import { useTranslation } from "react-i18next";

import axios from "axios";
// import "./Tableau.css";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const { Title } = Typography;

const items = [
  {
    key: "1",
    label: "Action 1",
  },
  {
    key: "2",
    label: "Action 2",
  },
];

function Strategic_Planning() {
  let { t } = useTranslation();

  const [messageApi, contextHolder] = message.useMessage();

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
  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();
  const [departments, setDepartments] = useState(null);
  const [targets, setTargets] = useState([]);

  const [id, setid] = useState("");
  const [detail, setdetail] = useState("");
  const [type, settype] = useState("");
  const [count, setCount] = useState(2);
  const [Object, setObject] = useState([]);
  const [year, setYear] = useState(null);
  const [achievement, setAchievement] = useState(null);

  let date;

  useEffect(() => {
    date = new Date().getFullYear();
    setYear(year == null ? date : year);
    console.log("year" + date);
    displayTargets();
    getDepartments();
  }, [Company.id, year]);

  const onChangee = (date, dateString) => {
    console.log(date.$y);
    setYear(date.$y);
    console.log("." + year);
  };
  const getDepartments = async () => {
    await axios
      .get(`${JSON_API}/EnterpriseDepartments/${Company.id}/${year}`)
      .then((res) => {

        console.log("departments", res.data);
        setDepartments(res.data)
        setTargets(departments.targets)


      })
      .catch((err) => {
        console.log(err);
      });
  };
  const displayTargets = async () => {
    console.log(".." + year);
    await axios
      .get(`${JSON_API}/StrategicTargets/enterprise/${Company.id}/${year}`)

      .then((res) => {
        console.log("data:", res.data);
        setObject(res.data);
      })
      .catch((err) => {
        setObject(null);
        console.log(err);
      });

      await axios
      .get(`${JSON_API}/StrategicTargets/achievement/${Company.id}/${year}`)

      .then((res) => {
        console.log("Achievement:", res.data);
        setAchievement(res.data);
      })
      .catch((err) => {
        setAchievement(null);
        console.log(err);
      });
  };

  const [open, setOpen] = useState(false);
  const { TextArea } = Input;

  const onFinishEdit = async (values) => {
    const target = {
      id: editingRow,
      type: values.type,
      details: values.details,
    };

    console.log("edited values: ", target);

    await axios.put(`${JSON_API}/StrategicTargets`, target).then((response) => {
      displayTargets();
      messageApi.open({
        type: "success",
        content: "Target edited successfully!",
      });
    });
    setEditingRow(null);
  };
  const handleDelete = async (e) => {
    console.log(e);
    await axios.delete(`${JSON_API}/StrategicTargets/${e}`).then((response) => {
      console.log(response);
      displayTargets();
    });
  };
  const submite = async (e) => {
    //construction dobjet json
    const formData = {
      year: year + "",
      type: e.type,
      num: e.num,
      details: e.detail,
      enterpriseId: Company.id,
    };

    console.log(formData);
    await axios
      .post(`${JSON_API}/StrategicTargets`, formData)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        displayTargets();
        messageApi.open({
          type: "success",
          content: `Target added successfully!`,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    setOpen(false);
  };

  const columns = [
    {
      title: <h3>Type</h3>,
      dataIndex: "type",
      align: "center",
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="type"
              rules={[
                {
                  required: true,
                  message: `please enter type`,
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <div style={{ textAlign: "left" }}>{text}</div>;
        }
      },
    },
    {
      title: <h3>Detail</h3>,
      dataIndex: "details",
      align: "center",

      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="details"
              rules={[
                {
                  required: true,
                  message: `please enter details`,
                },
              ]}
            >
              <TextArea rows={2}></TextArea>
            </Form.Item>
          );
        } else {
          return <div style={{ textAlign: "left" }}>{text}</div>;
        }
      },
    },
    {
      title: <h3>Status</h3>,
      dataIndex: "status",
      align: "center",

      render: (_, { status }) => {
        switch (status) {
          case 25:
            return <Tag color={"geekblue"}> Low Progress </Tag>;
          case 50:
            return <Tag color={"geekblue"}>Medium Progress </Tag>;
          case 75:
            return <Tag color={"green"}> High Progress </Tag>;
          case 100:
            return <Tag color={"green"}> Done </Tag>;
          default:
            return <Tag color={"red"}> In Progress </Tag>;
        }
      },
    },
    {
      title: <h3>Progression</h3>,
      dataIndex: "progress",
      align: "center",

      render: (_, { progress }) => {
        return (
         
                <Progress type="circle" percent={progress} width={50} />
             
        );
      },
    },

    {
      title: <h3>Actions</h3>,
      key: "operation",
      align: "center",

      render: (_, record) => (
        <Space size="middle">
          {editingRow === record.id ? (
            <>
              <Button type="link" onClick={() => setEditingRow(null)}>
                {t("cancel")}
              </Button>
              <Button type="link" htmlType="submit">
                {t("save")}
              </Button>
            </>
          ) : (
            <>
              <Button
                type="link"
                onClick={() => {
                  setEditingRow(record.id);
                  form.setFieldsValue({
                    details: record.details,
                    type: record.type,
                  });
                }}
              >
                {t("edit")}
              </Button>
              <Popconfirm
                title={t("deleterow")}
                onConfirm={() => handleDelete(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <a>{t("Delete")}</a>
              </Popconfirm>

              {/* <Link to={{
          pathname:`/orderbook/${record.id}`,
          state:{stateParam:record.id}
        }}>{t('details')}</Link> */}
            </>
          )}
        </Space>
      ),
    },
  ];

  const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        onClick={submite}
        open={open}
        title="Create a new Stratigic Target"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
        >
          {/* <Form.Item
            name="num"
            label=<b>N°</b>
            rules={[
              {
                type: "number",
                min: 0,
              },
            ]}
          >
            <InputNumber></InputNumber>
          </Form.Item> */}
          <Form.Item
            name="type"
            label="Type"
            rules={[
              {
                required: true,
                message: "Please input the type!",
              },
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item 
              name="detail" 
              label="Detail"  
              rules={[
                  {
                    required: true,
                    message: "Please input the details!",
                  },
                ]}
            >
            <TextArea rows={4}></TextArea>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  return (
    <>
      {contextHolder}

      <Card
    bordered={false}
    className="header-solid mb-24"
    title={
        <h3 className="font-semibold">Strategic Planning {year?"("+year+") ":""} {achievement? achievement.toFixed(2) +"% Achieved":"" } </h3>
    }
  >

          <Row>
          <Col span={8}>
          <DatePicker
              defaultValue={dayjs(date)}
              onChange={onChangee}
              picker="year"
              size="large"
            />

        <Button
          className="Create-button"
          type="primary"
          // loading={loadings} 
          icon={<PlusOutlined  />}
          style={{
            // width: 80,
            // height: 35,
            marginLeft: "2rem",
          }}
          onClick={() => {
            setOpen(true);
          }}
        >
          New Target
        </Button>
        <CollectionCreateForm
          open={open}
          onCreate={submite}
          onCancel={() => {
            setOpen(false);
          }}
        />

          </Col>
        </Row>
       
      <Title level={4}>        Strategic Targets</Title>

      {year != null && (
        <>
          <Form form={form} onFinish={onFinishEdit}>
            <Table
            bordered
              columns={columns}
              dataSource={Object}
              scroll={{ x: 1200, y: 500 }}
            />
          </Form>
            
            <Title level={4}>Departements</Title>

          <Space size={16} wrap>
            {departments &&
              departments.map((d) => (
                <>
                 
                    <Card
                      title={<><b>{d.label}</b>   
                      <Progress
                      style={{ marginLeft: ".5rem" }}
                      type="circle"
                      percent={d.strategicProgress.toFixed(0)}
                      width={50}
                    /></>}
                      style={{
                        width: 300,
                        backgroundColor: "#DDEDF9",
                      }}
                    >
                      {targets.length == 0 ? (
                        <>
                          <br />
                          <hr />
                          <span>No Plan</span>
                        </>
                      ) : (
                        <>
            
                            

                            <List
                              header={<div>Targets:</div>}
                              dataSource={targets.slice(0,2)}
                              renderItem={(item) => (
                                <List.Item>
                                   {item}
                                </List.Item>
                              )}
                            />
                 
                            {/* {d.targets
                              .map((e) => 
                                  e+"\n"
                              )
                              .slice(0, 2)} */}
                            ...
                        </>
                      )}{" "}
                       <Link
                      to={{
                        pathname: `/strategicplans/${d.id}/${year}`,
                        state: { year: year, departmentId: d.id },
                      }}
                    >
                      Details
                    </Link>
                    </Card>

                    {/*    {t('details')} */}
                </>
              ))}
          </Space>
        </>
      )}
</Card>
    </>
  );
}

export default Strategic_Planning;