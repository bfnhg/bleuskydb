import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import {
  Divider,
  Table,
  Popconfirm,
  Modal,
  message,
  Form,
  Button,
  InputNumber,
  Input,
  Select,
  DatePicker,
  Typography,
  Space,
  Row,
  Descriptions,
} from "antd";
import { JSON_API } from "../services/Constants";
import { CompanyContext } from '../contexts/CompanyContext';
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { PlusOutlined } from "@ant-design/icons";
dayjs.extend(customParseFormat);

const { Option } = Select;
const { Text, Link, Title } = Typography;
const { TextArea } = Input;

const OrderBookDetails = () => {
  let { t } = useTranslation();
  const {Companies,setCompanies,Company,Actionstate,setActionstate}=useContext(CompanyContext);

  const [messageApi, contextHolder] = message.useMessage();

  const { id } = useParams();
  const stateParamVal = useLocation().state.stateParam;

  console.log("props parametre value", id);
  console.log("props state value", stateParamVal);

  const [OrderDetails, setOrderDetails] = useState();
  const [Customer, setCustomer] = useState();
  const [Product, setProduct] = useState();
  const [SummaryDetails, setSummaryDetails] = useState(null);

  const [editingRow, setEditingRow] = useState(null);
  const [editingRowbook, setEditingRowbook] = useState(null);

  const [form1] = Form.useForm();
  const [form2] = Form.useForm();

  const [costDataSource, setRevenueDataSource] = useState();
  const [RowRevenueData, setRowRevenueData] = useState();

  const CollectionCreateForm = ({ open, onCreate, onCancel, data }) => {
    const [form] = Form.useForm();
    {
      return data.data === "OrderDetail" ? (
        <Modal
          open={open}
          title={t("Createaneworder")}
          okText={t("Create")}
          cancelText={t("Cancel")}
          onCancel={onCancel}
          onOk={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();
                onCreate({ values: values, url: data.url, data: data.data });
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
            <Form.Item
              name="customer"
              label={t("Customer")}
              rules={[
                {
                  required: true,
                  message: "Please select a customer!",
                },
              ]}
            >
              <Select placeholder={t("selectcustomer")} style={{}}>
                {Customer?.map(
                  (e) => e && <Option value={e.id}>{e.name}</Option>
                )}
              </Select>
              {/* <Input type="textarea" /> */}
            </Form.Item>

            <Form.Item
              name="product"
              label={t("Product")}
              rules={[
                {
                  required: true,
                  message: "Please select a product!",
                },
              ]}
            >
              <Select
                placeholder={t("selectproduct")}
                style={
                  {
                    // width: 120,
                  }
                }
              >
                {Product?.map(
                  (e) => e && <Option value={e.id}>{e.label}</Option>
                )}
              </Select>
              {/* <Input type="textarea" /> */}
            </Form.Item>
            <Form.Item name="startDate" label={t("Startdate")}>
              <DatePicker placeholder={t("selectdate")} />
            </Form.Item>

            <Form.Item name="endDate" label={t("Enddate")}>
              <DatePicker placeholder={t("selectdate")} />
            </Form.Item>

            <Form.Item name="pricePerDay" label={t("Priceperday")}>
              <InputNumber
                min={0}
                size={"large"}
                // style={{width:}}
                formatter={(value) => `$${value}`}
                parser={(value) => value.replace("$", "")}
              />
            </Form.Item>

            <Form.Item name="description" label={t("Description")}>
              <Input type="textarea" />
            </Form.Item>
          </Form>
        </Modal>
      ) : data.data === "Customer" ? (
        <Modal
          open={open}
          title={t("CreateanewCustomer")}
          okText={t("Create")}
          cancelText={t("Cancel")}
          onCancel={onCancel}
          onOk={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();
                onCreate({ values: values, url: data.url, data: data.data });
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
            // initialValues={{
            //   modifier: 'public',
            // }}
          >
            <Form.Item
              name="name"
              label={t("Customersname")}
              rules={[
                {
                  required: true,
                  message: `Please input the name!`,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      ) : (
        <Modal
          open={open}
          title={t("CreateanewProduct")}
          okText={t("Create")}
          cancelText={t("Cancel")}
          onCancel={onCancel}
          onOk={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();
                onCreate({ values: values, url: data.url, data: data.data });
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
            // initialValues={{
            //   modifier: 'public',
            // }}
          >
            <Form.Item
              name="label"
              label=""
              rules={[
                {
                  required: true,
                  message: `Please input the label!`,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  };

  useEffect(() => getData(), []);

  const getData = async () => {
    await axios
      .get(`${JSON_API}/Customers/enterprise/${Company.id}`)
      .then((response) => {
        setCustomer(response.data);
        // setCustomerClone(Object.assign([],Customer))
        console.log("all customers ", Customer);
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });

    await axios
      .get(`${JSON_API}/Products/enterprise/${Company.id}`)
      .then((response) => {
        setProduct(response.data);
        // setCustomerClone(Object.assign([],Customer))
        console.log("all products ", Product);
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });

    await axios
      .get(`${JSON_API}/Orders/orderBook/${stateParamVal}`)
      .then((response) => {
        const newState = response.data.map((obj) => {
          // 👇️ if id equals 2, update country property

          return { ...obj, key: obj.id };
        });

        setOrderDetails(newState);
        console.log("all orderdetails ", newState);
      })
      .catch(function (error) {
        if (error.response.status==404) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setOrderDetails(null);
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);

        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });

    await axios
      .get(`${JSON_API}/OrderBooks/orderBookMonthlySummary/${stateParamVal}`)
      .then((response) => {
        setSummaryDetails(response.data);
        console.log("summary details ", response.data);
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  const handleshareholderDelete = async (id) => {
    await axios
      .delete(`${JSON_API}/Orders/${id}`)
      .then(() => {
        console.log("order detail" + id + " deleted successfully");
        getData();
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);

        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  const costdetailsColumns = [
    //   {
    //   title: 'Revenue Per Day',
    //   dataIndex: 'costPerDay',
    //   width: 130,
    //   render: (text, record) => {
    //       if (editingRow) {
    //         return (
    //           <Form.Item
    //             name="costPerDay"

    //           >
    //             <InputNumber/>
    //           </Form.Item>
    //         );
    //       } else {
    //         return <>{text}</>;
    //       }

    //     }
    // },
    {
      title: <h3 style={{ textAlign: "center" }}>{t("January")}</h3>,
      dataIndex: "januaryRevenue",
      width: 120,

      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="januaryRevenue">
              <InputNumber />
            </Form.Item>
          );
        } else {
          return <div style={{ textAlign: "right" }}>{text}</div>;
        }
      },
    },
   
    
    {
      title: <h3 style={{ textAlign: "center" }}>{t("February")}</h3>,

      dataIndex: "februaryRevenue",
      width: 120,
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="februaryRevenue">
              <InputNumber />
            </Form.Item>
          );
        } else {
          return <div style={{ textAlign: "right" }}>{text}</div>;
        }
      },
    },
    {
      title: <h3 style={{ textAlign: "center" }}>{t("March")}</h3>,
      dataIndex: "marchRevenue",
      width: 130,
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="marchRevenue">
              <InputNumber />
            </Form.Item>
          );
        } else {
          return <div style={{ textAlign: "right" }}>{text}</div>;
        }
      },
    },
    {
      title: <h3 style={{ textAlign: "center" }}>{t("April")}</h3>,
      dataIndex: "aprilRevenue",
      width: 130,
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="aprilRevenue">
              <InputNumber />
            </Form.Item>
          );
        } else {
          return <div style={{ textAlign: "right" }}>{text}</div>;
        }
      },
    },
    {
      title: <h3 style={{ textAlign: "center" }}>{t("May")}</h3>,
      dataIndex: "mayRevenue",
      width: 130,
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="mayRevenue">
              <InputNumber />
            </Form.Item>
          );
        } else {
          return <div style={{ textAlign: "right" }}>{text}</div>;
        }
      },
    },
    {
      title: <h3 style={{ textAlign: "center" }}>{t("June")}</h3>,
      dataIndex: "juneRevenue",
      width: 130,
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="juneRevenue">
              <InputNumber />
            </Form.Item>
          );
        } else {
          return <div style={{ textAlign: "right" }}>{text}</div>;
        }
      },
    },
    {
      title: <h3 style={{ textAlign: "center" }}>{t("July")}</h3>,
      dataIndex: "julyRevenue",
      width: 130,
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="julyRevenue">
              <InputNumber />
            </Form.Item>
          );
        } else {
          return <div style={{ textAlign: "right" }}>{text}</div>;
        }
      },
    },
    {
      title: <h3 style={{ textAlign: "center" }}>{t("August")}</h3>,
      dataIndex: "augustRevenue",
      width: 130,
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="augustRevenue">
              <InputNumber />
            </Form.Item>
          );
        } else {
          return <div style={{ textAlign: "right" }}>{text}</div>;
        }
      },
    },
    {
      title: <h3 style={{ textAlign: "center" }}>{t("September")}</h3>,
      dataIndex: "septemberRevenue",
      width: 130,
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="septemberRevenue">
              <InputNumber />
            </Form.Item>
          );
        } else {
          return <div style={{ textAlign: "right" }}>{text}</div>;
        }
      },
    },
    {
      title: <h3 style={{ textAlign: "center" }}>{t("October")}</h3>,
      dataIndex: "octoberRevenue",
      width: 130,
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="octoberRevenue">
              <InputNumber />
            </Form.Item>
          );
        } else {
          return <div style={{ textAlign: "right" }}>{text}</div>;
        }
      },
    },
    {
      title: <h3 style={{ textAlign: "center" }}>{t("November")}</h3>,
      dataIndex: "novemberRevenue",
      width: 130,
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="novemberRevenue">
              <InputNumber />
            </Form.Item>
          );
        } else {
          return <div style={{ textAlign: "right" }}>{text}</div>;
        }
      },
    },
    {
      title: <h3 style={{ textAlign: "center" }}>{t("December")}</h3>,
      dataIndex: "decemberRevenue",
      width: 130,
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="decemberRevenue">
              <InputNumber />
            </Form.Item>
          );
        } else {
          return <div style={{ textAlign: "right" }}>{text}</div>;
        }
      },
    },

    {
      title: <h3 style={{ textAlign: "center" }}>Total</h3>,
      dataIndex: "total",
      key: "total",
      fixed: "right",
      width: 130,
      render: (_, record) => {
        return <div style={{ textAlign: "right" }}>{record.total}</div>;
      },
    },
    {
      title: <h3 style={{ textAlign: "center" }}>Actions</h3>,

      dataIndex: "action",
      fixed: "right",
      width: 180,

      render: (_, record) =>
        costDataSource.length >= 1 ? (
          <Space size="middle">
            {editingRow === record.key ? (
              <>
                <Button type="link" onClick={() => setEditingRow(null)}>
                  {t("Cancel")}
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
                    setEditingRow(record.key);
                    form1.setFieldsValue({
                      costPerDay: record.costPerDay,
                      januaryRevenue: record.januaryRevenue,
                      februaryRevenue: record.februaryRevenue,
                      marchRevenue: record.marchRevenue,
                      aprilRevenue: record.aprilRevenue,
                      mayRevenue: record.mayRevenue,
                      juneRevenue: record.juneRevenue,
                      julyRevenue: record.julyRevenue,
                      augustRevenue: record.augustRevenue,
                      septemberRevenue: record.septemberRevenue,
                      octoberRevenue: record.octoberRevenue,
                      novemberRevenue: record.novemberRevenue,
                      decemberRevenue: record.decemberRevenue,
                    });
                  }}
                >
                  {t("edit")}
                </Button>
              </>
            )}
          </Space>
        ) : null,
    },
  ];

  const columns = [
    {
      title: <h3 style={{ textAlign: "center" }}>{t("Customer")}</h3>,
      dataIndex: "name",
      align: "left",
      render: (text, record) => {
        // console.log('t',customerClone);
        // const name= customerClone.length>0?customerClone.filter(o=>o.id==record.customerId)[0].name:"unkown";
        // const name= Customer?Customer.filter(o=>o.id==record.customerId)[0].name:"unkown";
        if (editingRowbook === record.id) {
          return (
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter customer name",
                },
              ]}
            >
              <Select
                placeholder="Select a customer"
                style={{
                  width: 120,
                }}
              >
                {Customer?.map(
                  (e) => e && <Option value={e.id}>{e.name}</Option>
                )}
              </Select>
            </Form.Item>
          );
        } else {
          return <>{record.customer === null ? "__" : record.customer.name}</>;
        }
      },
    },
    {
      title: <h3 style={{ textAlign: "center" }}>{t("Product")}</h3>,
      dataIndex: "productId",
      align: "left",
      render: (_, record) => {
        // console.log('t',customerClone);
        // const name= customerClone.length>0?customerClone.filter(o=>o.id==record.customerId)[0].name:"unkown";
        // const name= Product?Product.filter(o=>o.id==record.productId)[0].label:"unkown";
        if (editingRowbook === record.id) {
          return (
            <Form.Item
              name="product"
              rules={[
                {
                  required: true,
                  message: "Please enter product label",
                },
              ]}
            >
              <Select
                placeholder="Select a product"
                style={{
                  width: 120,
                }}
              >
                {Product?.map(
                  (e) => e && <Option value={e.id}>{e.label}</Option>
                )}
              </Select>
            </Form.Item>
          );
        } else {
          return <>{record.product === null ? "__" : record.product.label}</>;
        }
      },
    },
    {
      title: <h3 style={{ textAlign: "center" }}>{t("Startdate")}</h3>,
      dataIndex: "startDate",
      align: "center",
      render: (_, record) => {
        if (editingRowbook === record.id) {
          return (
            <Form.Item
              name="startDate"
              rules={[
                {
                  required: true,
                  message: "Please enter a date",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
          );
        } else {
          return (
            <div style={{ textAlign: "center" }}>
              {dayjs(record.startDate).format("YYYY/MM/DD")}
            </div>
          );
        }
      },
    },
    {
      title: <h3 style={{ textAlign: "center" }}>{t("Enddate")}</h3>,

      dataIndex: "endDate",
      align: "center",
      render: (_, record) => {
        if (editingRowbook === record.id) {
          return (
            <Form.Item
              name="endDate"
              rules={[
                {
                  required: true,
                  message: "Please enter a date",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
          );
        } else {
          return (
            <div style={{ textAlign: "center" }}>
              {dayjs(record.endDate).format("YYYY/MM/DD")}
            </div>
          );
        }
      },
    },
    {
      title: <h3 style={{ textAlign: "center" }}>{t("Priceperday")}</h3>,
      dataIndex: "pricePerDay",
      align: "left",
      render: (text, record) => {
        if (editingRowbook === record.id) {
          return (
            <Form.Item name="priceperday">
              <InputNumber
                min={0}
                // size={'large'}
                formatter={(value) => `$${value}`}
                parser={(value) => value.replace("$", "")}
              />
            </Form.Item>
          );
        } else {
          return <div style={{ textAlign: "right" }}>${text}</div>;
        }
      },
    },
    {
      title: <h3 style={{ textAlign: "center" }}>{t("Description")}</h3>,
      dataIndex: "description",
      align: "left",
      render: (text, record) => {
        // console.log('t',customerClone);
        // const name= customerClone.length>0?customerClone.filter(o=>o.id==record.customerId)[0].name:"unkown";
        if (editingRowbook === record.id) {
          return (
            <Form.Item
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please enter a description",
                },
              ]}
            >
              <TextArea />
            </Form.Item>
          );
        } else {
          return <>{text}</>;
        }
      },
    },
    {
      title: <h3 style={{ textAlign: "center" }}>{t("Actions")}</h3>,

      dataIndex: "actions",
      align: "center",
      render: (_, record) =>
        editingRowbook === record.key ? (
          <>
            <Button type="link" onClick={() => setEditingRowbook(null)}>
              {t("Cancel")}
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
                setEditingRowbook(record.key);
                form2.setFieldsValue({
                  name: record.customer.id,
                  product: record.product.id,
                  startDate: dayjs(record.startDate),
                  endDate: dayjs(record.endDate),
                  description: record.description,
                  priceperday: record.pricePerDay,
                });
              }}
            >
              {t("Edit")}
            </Button>

            <Popconfirm
              title={t("Suretodelete")}
              cancelText={t("cancel")}
              onConfirm={() => handleshareholderDelete(record.id)}
            >
              <a> {t("Delete")}</a>
            </Popconfirm>
          </>
        ),
    },
  ];

  const [Open, setOpen] = useState({
    open: false,
    url: null,
    data: null,
  });
  const onCreate = async ({ values, url, data }) => {
    if (data == "OrderDetail") {
      const obj = {
        orderBookId: stateParamVal,
        customerId: values.customer,
        startDate: values.startDate,
        endDate: values.endDate,
        pricePerDay: values.pricePerDay,
        description: values.description,
        productId: values.product,

      };

      console.log("obj", obj);

      await axios
        .post(`${JSON_API}/Orders`, obj)
        .then(() => {
          getData();
        })
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    } else {
      await axios
        .post(`${JSON_API}/${url}`, values)
        .then(() => {
          getData();
        })
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    }

    setOpen(false);
  };
  const Edited = async (values) => {
    console.log("values are :", values);

    const orderobj = {
      id: editingRowbook,
      startDate: values.startDate,
      endDate: values.endDate,
      pricePerDay: values.priceperday,
      description: values.description,
      customerId: values.name,
      productId: values.product,
    };
    console.log("orderobj is :", orderobj);

    await axios
      .put(`${JSON_API}/Orders`, orderobj)
      .then((response) => {
        console.log("Order updated Successfully!", response);
        getData();
        // setRevenueDataSource([response.data.revenueDetail]);

        messageApi.open({
          type: "success",
          content: "Order updated Successfully!",
        });
        setEditingRowbook(null);
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
        setEditingRowbook(null);
      });
  };

  const onFinishEdit = async (values) => {
    console.log("RowRevenueData:", RowRevenueData);

    const orderbookobj = {
      id: RowRevenueData.revenueDetail.id,
      januaryRevenue: values.januaryRevenue,
      februaryRevenue: values.februaryRevenue,
      marchRevenue: values.marchRevenue,
      aprilRevenue: values.aprilRevenue,
      mayRevenue: values.mayRevenue,
      juneRevenue: values.juneRevenue,
      julyRevenue: values.julyRevenue,
      augustRevenue: values.augustRevenue,
      septemberRevenue: values.septemberRevenue,
      octoberRevenue: values.octoberRevenue,
      novemberRevenue: values.novemberRevenue,
      decemberRevenue: values.decemberRevenue,
    };

    console.log("orderbookcostedited: ", orderbookobj);

    await axios
      .put(`${JSON_API}/Orders/UpdateRevenueDetail`, orderbookobj)
      .then((response) => {
        console.log("Orderbook updated Successfully!", response);
        getData();
        setRevenueDataSource([response.data.revenueDetail]);

        messageApi.open({
          type: "success",
          content: "Order cost details updated Successfully!",
        });
      });
    setEditingRow(null);
  };

  const refreshRevenuedetails = () => {};

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows[0]
      );

      const obj = selectedRows[0].revenueDetail;

      setRowRevenueData(selectedRows[0]);

      obj.key = selectedRowKeys[0];

      setRevenueDataSource([obj]);
    },
  };


  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      id: "1",
      name: "John Doe",
      dateOfBirth: "01/01/2000",
      age: "21",
    },
    {
      key: "2",
      id: "2",
      name: "Jane Smith",
      dateOfBirth: "02/02/2001",
      age: "20",
    },
    {
      key: "3",
      id: "3",
      name: "Bob Johnson",
      dateOfBirth: "03/03/2002",
      age: "19",
    },
    {
      key: "4",
      id: "4",
      name: "Alice Williams",
      dateOfBirth: "04/04/2003",
      age: "18",
    },
  ]);

  function handleNameChange(e, key) {
    const newDataSource = [...dataSource];
    const target = newDataSource.find((item) => item.key === key);
    if (target) {
      target.name = e.target.value;
      setDataSource(newDataSource);
    }
  }

  function handleDOBChange(dateString, key) {
    const newDataSource = [...dataSource];
    const target = newDataSource.find((item) => item.key === key);
    if (target) {
      target.dateOfBirth = dateString;
      setDataSource(newDataSource);
    }
  }



  return (
    <>
      {contextHolder}

      {/* <div>OrderBook {stateParamVal}</div> */}

      {/* <Table columns={coulumns} dataSource={dataSource} />
    <Button onClick={handleSubmit}>Save Changes</Button> */}
      <Title level={4}>{t("RevenueSummary")}</Title>

      <Descriptions
        style={{ textAlign: "right" }}
        bordered
        column={6}
        size={"small"}
      >
        <Descriptions.Item style={{ textAlign: "center" }} label={t("January")}>
          {SummaryDetails && SummaryDetails.januaryRevenue}
        </Descriptions.Item>
        <Descriptions.Item
          style={{ textAlign: "center" }}
          label={t("February")}
        >
          {SummaryDetails && SummaryDetails.februaryRevenue}
        </Descriptions.Item>
        <Descriptions.Item style={{ textAlign: "center" }} label={t("March")}>
          { SummaryDetails && SummaryDetails.marchRevenue}
        </Descriptions.Item>
        <Descriptions.Item style={{ textAlign: "center" }} label={t("April")}>
          {SummaryDetails && SummaryDetails.aprilRevenue}
        </Descriptions.Item>
        <Descriptions.Item style={{ textAlign: "center" }} label={t("May")}>
          {SummaryDetails && SummaryDetails.mayRevenue}
        </Descriptions.Item>
        <Descriptions.Item style={{ textAlign: "center" }} label={t("June")}>
          {SummaryDetails && SummaryDetails.juneRevenue}
        </Descriptions.Item>
        <Descriptions.Item style={{ textAlign: "center" }} label={t("July")}>
          {SummaryDetails && SummaryDetails.julyRevenue}
        </Descriptions.Item>
        <Descriptions.Item style={{ textAlign: "center" }} label={t("August")}>
          {SummaryDetails && SummaryDetails.augustRevenue}
        </Descriptions.Item>
        <Descriptions.Item
          style={{ textAlign: "center" }}
          label={t("September")}
        >
          {SummaryDetails && SummaryDetails.septemberRevenue}
        </Descriptions.Item>
        <Descriptions.Item style={{ textAlign: "center" }} label={t("October")}>
          {SummaryDetails && SummaryDetails.octoberRevenue}
        </Descriptions.Item>
        <Descriptions.Item
          style={{ textAlign: "center" }}
          label={t("November")}
        >
          {SummaryDetails && SummaryDetails.novemberRevenue}
        </Descriptions.Item>
        <Descriptions.Item
          style={{ textAlign: "center" }}
          label={t("December")}
        >
          {SummaryDetails && SummaryDetails.decemberRevenue}
        </Descriptions.Item>
      </Descriptions>

      <Title level={4}>{t("Commands")}</Title>
      <Row justify="end" gutter={[16, 16]}>
        <Space align="center">
          <Button
            onClick={() => {
              setOpen({ open: true, url: "Customers", data: "Customer" });
            }}
          >
            <PlusOutlined /> {t("CreateCustomer")}
          </Button>
          <Button
            onClick={() => {
              setOpen({ open: true, url: "Products", data: "Product" });
            }}
          >
            <PlusOutlined /> {t("CreateProduct")}
          </Button>

          <Button
            type="primary"
            onClick={() => {
              setOpen({ open: true, url: "orderdetail", data: "OrderDetail" });
            }}
          >
            <PlusOutlined /> {t("Createbook")}
          </Button>
        </Space>
      </Row>

      <CollectionCreateForm
        open={Open.open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen({ open: false, url: null, data: null });
        }}
        data={Open}
      />

      <Form form={form2} onFinish={Edited}>
        <Table
          bordered
          rowSelection={{
            type: "radio",
            ...rowSelection,
          }}
          columns={columns}
          dataSource={OrderDetails}
        />
      </Form>

      {/* <Divider>
      <Text type="secondary">Select an order to display its revenue details in the table bellow</Text>
    </Divider> */}
      <Title level={4}>{t("RevenueDetails")}</Title>
      <Form form={form1} onFinish={onFinishEdit}>
        <Table
          bordered
          dataSource={costDataSource && costDataSource}
          columns={costdetailsColumns}
          scroll={{
            x: 1300,
          }}
        />
      </Form>
    </>
  );
};

export default OrderBookDetails;