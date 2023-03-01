
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Space,
  Table,
  Tag,
  Progress,
  Form,
  Button,
  icon,
  Input,
  Popconfirm,
  Badge,
  DatePicker,
  Radio,
  Modal,
  message
} from "antd";
import {JSON_API} from '../services/Constants';
import dayjs from 'dayjs';
import { useForm } from "rc-field-form";
import { PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import { CompanyContext } from '../contexts/CompanyContext';
import { useTranslation } from 'react-i18next';

import axios from "axios";
// import "./Tableau.css";
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

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


function StrategicPlanning() {
  let {t} =useTranslation();

  const [messageApi, contextHolder] = message.useMessage();

  const {Lang,setLang,Shares,setShares,ShareHolders,setShareHolders,Product,setProduct,ActivityType,setActivityType,StrategicTarget,setStrategicTarget,BusinessPartner,setBusinessPartner,MainCustomer,setMainCustomer,RevenueModel,setRevenueModel,Companies,setCompanies,Company,setCompany,Actionstate,setActionstate,Edited,setEdited,TypeIndustries,setTypeIndustries,Market,setMarket}=useContext(CompanyContext);
  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();
  const [departments,setDepartments]=useState(null);

  const [id, setid] = useState("");
  const [detail, setdetail] = useState("");
  const [type, settype] = useState("");
  const [count, setCount] = useState(2);
   const [Object, setObject] = useState([]);
   const [year,setYear]=useState(null);
  let date;

  useEffect(() => {
    date =  new Date().getFullYear();
    setYear(year==null?date:year);
    console.log("year"+date);
    displayTargets();
    getDepartments();
    }, [Company.id,year]);

   const onChangee = (date, dateString) => {
    console.log(date.$y);
    setYear(date.$y);
    console.log("."+year);
   };
   const getDepartments = async ()=>{
    await axios.get(`${JSON_API}/Departments`)
    .then((res)=>{
      console.log("departments",res);
      setDepartments(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
   }
  const displayTargets = async () => {
  console.log(".."+year);
  await axios.get(`${JSON_API}/StrategicTargets/AllStrategicTagetsWithAllDEpartments/${Company.id}/${year}`)

  .then((res) => {
    console.log("data:",res.data);

    setObject(res.data);

  })
  .catch((err) => {
    setObject(null);
    console.log(err);
  });
  }

  const [open, setOpen] = useState(false);
  const { TextArea } = Input;
  
  const onFinishEdit = async (values) => {

    const obj={
      id: editingRow,
      type: values.type,
      details: values.details
    }

    console.log("edited values: ",obj);

    await axios.put(`${JSON_API}/StrategicTargets`,obj)
    .then((response) => {
     displayTargets();

      messageApi.open({
        type: 'success',
        content: `Target edited successfully!`
      });
    })

    setEditingRow(null);
  };
  const handleDelete = async (e) => {
    console.log(e);
    await axios
      .delete(`${JSON_API}/StrategicTargets/${e}`)
      .then((response) => {
        console.log(response);
        displayTargets();
      });
  };
  const submite = async (e) => {
    //construction dobjet json
    const formData = {
        year: year,
        type: e.type,
        details: e.detail,
        enterpriseId: Company.id
      
    };

    console.log(formData);
    axios.post(`${JSON_API}/StrategicTargets`, formData)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        displayTargets();

        messageApi.open({
          type: 'success',
          content: `Target added successfully!`
        });
      })
      .catch(function (error) {
        console.log(error);
      });
      setOpen(false);
  };

  
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },

    {
      title: "Type de champ",
      dataIndex: "type",
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
          return <div style={{textAlign: "left"}}>{text}</div>;
        }

      }
    },
    {
      title: "Detail",
      dataIndex: "details",
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
          return <div style={{textAlign: "left"}}>{text}</div>;
        }

      }
    },
    {
      title: "statut",
      dataIndex: "status",

      render: (_,record ) => 
        
          {
              let color ="";
              if (record.status === "valider") {
                color = "green";
              } else if (record.status === "en attend") {
                color = "orange";
              } else if (record.status === "echouer") {
                color = "red";
              }
              return (
                <div className="">
                  <Tag color={color} key={record.status}>
                    {record.status}
                  </Tag>
                </div>
              );
            }
            
        
      
    },
    {
      title: "Progression",
      dataIndex:"progress",
      render: (_, record) => {
        return (
          <tr>
            <Space wrap>
              <td>
                <Progress type="circle" percent={30} width={50} />
              </td>
            </Space>
          </tr>
        );
      },
    },
    

    {
      title: "Actions",
      key: "operation",
      render: (_, record) =>(
        <Space size="middle">
        {
        editingRow === record.id?
        <>
        <Button type="link" onClick={()=>setEditingRow(null)}>
          {t("cancel")}
        </Button>
        <Button type="link" htmlType="submit">
          {t("save")}
        </Button>
        </>
        
        :
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
        <Popconfirm title={t("deleterow")} onConfirm={() => handleDelete(record.id)} okText="Yes" cancelText="No">
        <a>{t('Delete')}</a>
        </Popconfirm>

        {/* <Link to={{
          pathname:`/orderbook/${record.id}`,
          state:{stateParam:record.id}
        }}>{t('details')}</Link> */}

        </>
        }
        
      </Space>
      
      )
          
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

          <Form.Item
            name="type"
            label="type"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item name="detail" label="detail">
            <TextArea rows={4}></TextArea>
          </Form.Item>
         
        </Form>
      </Modal>
    );
  };


  return (
    <>
        {contextHolder}

      <div>
        <span>
          
          <a style={{ marginLeft: ".5rem" }}>
            <DatePicker defaultValue={dayjs(date)} onChange={onChangee} picker="year" />
          </a>
        </span>
      </div>
     
      <h3>Strategic targets </h3>{" "}
      <div>
        <Button
          className="Create-button"
          type="primary"
          onClick={() => {
            setOpen(true);
          }}
        >
          Create
        </Button>
        <CollectionCreateForm
          open={open}
          onCreate={submite}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </div>
      {year!=null&&  <>
      <Form form={form} onFinish={onFinishEdit}>
      <Table columns={columns} dataSource={Object} />
      </Form>
      <h2> Departements</h2>
      <Space size={16} wrap>
      {departments && departments.map((d)=>
        <Card
        title={<a href="#">{d.label}</a>}
        // extra={<a href="#">More</a>}
        style={{
          width: 300,
        }}
      >
        <p>Progress: _ %</p>
      </Card>
      )}
      </Space>
      </>
    } 
     </>
  );
}

export default StrategicPlanning

