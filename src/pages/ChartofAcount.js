import React, { useMemo, useContext, useEffect, useState } from "react";
import {
  Table,
  Select,
  Button,
  DatePicker,
  Collapse,
  Popconfirm,
  Modal,
  Card,
  message,
  Form,
  Checkbox,
  InputNumber,
  Input,
  Typography,
  Divider,
  Space,
  Col,
  Row,
  Descriptions,
} from "antd";
import { DownloadOutlined } from '@ant-design/icons';

import { JSON_API } from "../services/Constants";
import { CompanyContext } from '../contexts/CompanyContext';
import axios from "axios";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const { Option } = Select;
const { Text, Link, Title } = Typography;
const { TextArea } = Input;



// ON CHANGE SELECT
const handleChange = (value) => {
  console.log(`selected ${value}`);
};
function ChartofAcount() {
  const {Lang,setLang,Shares,setShares,ShareHolders,setShareHolders,Product,setProduct,ActivityType,setActivityType,StrategicTarget,setStrategicTarget,BusinessPartner,setBusinessPartner,MainCustomer,setMainCustomer,RevenueModel,setRevenueModel,Companies,setCompanies,Company,setCompany,Actionstate,setActionstate,Edited,setEdited,TypeIndustries,setTypeIndustries,Market,setMarket}=useContext(CompanyContext);

  const [size, setSize] = useState("large");

  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  const [statementclass, setStatementClass]=useState([{}]);
  const [statementcategory, setStatementCategory]=useState([{}]);
  const [statementtype, setStatementType]=useState([{}]);
  const [glaccount, setGLaccount]=useState([{}]);
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [editingRowbook, setEditingRowbook] = useState(null);


  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenupdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const [ChartofAccounts,setChartofAccounts] = useState(null);
  const [loadings, setLoadings] = useState(false);

  const { Panel } = Collapse;
  const [year,setYear]=useState(null);

  const getStatementClass = async () => {
    await axios
      .get(`${JSON_API}/FinancialStatementClass`)
      .then((res) => {
        console.log(res);
        setStatementClass(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleclass = async (e) => {
    // console.log(e);
    await axios
      .get(`${JSON_API}/FinancialStatementCategory/class/${e}`)

      .then((res) => {
        console.log(res);
        setStatementCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .get(`${JSON_API}/FinancialStatementType/classe/${e}`)

      .then((res) => {
        console.log(res);
        setStatementType(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlecategory = async (e) => {
    // console.log(e);
    await axios
      .get(`${JSON_API}/FinancialStatementType/category/${e}`)

      .then((res) => {
        console.log(res);
        setStatementType(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handletype = async (e) => {
    // console.log(e);
    await axios
      .get(`${JSON_API}/GLAccount/FinancialStatementType/${Company.id}/${e}`)

      .then((res) => {
        console.log(res);
        setGLaccount(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleupdateOk = async (e) => {
    setLoading(true);
    console.log("values are : ",e);
    const obj={
      id:editingRowbook,
      note: e.note,
      financialStatementCategoryId: e.category
      
    }
    await axios
      .put(`${JSON_API}/ChartAccounts`,obj)
      .then((response) => {
        getData();
      setLoading(false);
      setEditingRowbook(null);
      form2.resetFields();


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
  const onChangee = (date, dateString) => {
    setChartofAccounts(null);
    console.log(date, dateString);
    setYear(dateString);
  };
  // Checkbox
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  var date;

  useEffect(() => {
    date =  new Date().getFullYear();
    if( year == null){
      setYear(date);
    }
    console.log("year"+date);
    getStatementClass();
    getData();
    }, [Company.id,year]);
    
    const getData = async () => {

    await axios
      .get(`${JSON_API}/ChartAccounts?enterpriseId=${Company.id}&year=${year}`)
      .then((response) => {
        setChartofAccounts(response.data);
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
        setChartofAccounts(null);
      });

  };

  const handleDelete = async (e)=> {

    await axios
    .delete(`${JSON_API}/ChartAccounts/${e}`)
    .then((res) => {
      getData();
      console.log(res.data);
      setEditingRowbook(null);
    })
    .catch(function (error) {
      console.log(error);
    });

  }
  const downloadFile = async () => {
    setLoadings(true);
    const response = await axios.get(`${JSON_API}/ChartAccounts/Print?year=${year}&enterpriseId=${Company.id}`, {
      responseType: 'blob',
    });
  
    const blob = new Blob([response.data], { type: response.headers['content-type'] });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = `Chart_of_accounts_${Company.name}_${year}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setLoadings(false);

  };
  const Submit = async (e) => {

    const formData = {
      enterpriseId: Company.id,
      // year: new Date().getFullYear()+"",
      note: e.note,
      annualBudget: e.annualBudget,
      budgetBreakdown: componentDisabled,
      glAccountId: e.glAccountId,
      financialStatementTypeGIFI: e.type,
      // financialStatementCategoryId:e.category
    };

    console.log(formData);
    await axios
      .post(`${JSON_API}/ChartAccounts`, formData)
      .then((res) => {
        getData();
        console.log(res.data);
        setOpen(!open);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const StatefulModalContent = (props) => {

    return(
  <Form
          form={props.form}
          layout="horizontal"
          name="form_in_modal"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 14,
          }}
          initialValues={{
            modifier: "public",
          }}
        >
          <Divider orientation='left' >Account</Divider>
          <Form.Item
            // value={nom}
            name="class"
            label="Class"
            rules={[
              {
                required: true,
                message: "Please input the class",
              },
            ]}
          >
             {/* const [statementclass, setStatementClass]=useState([{}]);
                  const [statementcategory, setStatementCategory]=useState([{}]);
                  const [statementtype, setStatementType]=useState([{}]); */}
            <Select
              // style={{
              //   width: 470,
              // }}
              disabled={props.form==form2?true:false}
              onChange={(value) => {
                handleclass(value);
              }}
            >
              {statementclass.map(
                (e) => e && <Option value={e.id}>{e.label}</Option>
              )}
            </Select>

          </Form.Item>
          <Form.Item
            // value={nom}
            name="category"
            label="Category"
           
          >
            <Select
              onChange={handlecategory}
              >
              {statementcategory.map(
                (e) => e && <Option value={e.id}>{e.label}</Option>
              )}
            </Select>
          </Form.Item>
          <Form.Item
            // value={nom}
            name="type"
            label="Type"
            rules={[
              {
                required: true,
                message: "Please input the type",
              },
            ]}
          >
            <Select
              style={{
                width: 550,
              }}
              disabled={props.form==form2?true:false}

              onChange={handletype}

            >
              {statementtype.map((o) => {
              return <Option value={o.gifi}>{"(GIFI: "+ o.gifi +") "+ o.description}</Option>;
            })}
            </Select>
          </Form.Item>

          <Form.Item
            // value={nom}
            name="glAccountId"
            label="GL Account"
            rules={[
              {
                required: true,
                message: "Please input the GL Account",
              },
            ]}
          >
            <Select
              disabled={props.form==form2?true:false}
              onChange={handleChange}
              >
              {glaccount.map((o) => {
                return <Option value={o.id}>{o.glNumber}</Option>;
              })}
            </Select>
          </Form.Item>
          <Divider
           orientation='left'>Additional information</Divider>

          <Form.Item
              // value={nom}
              name="annualBudget"
              label="Annual Budget"
              rules={[
                {
                  required: true,
                  message: "Please input the Annual budget",
                },
              ]}
            >
              <InputNumber
                // disabled={SHselected}
                min={0}
                size={"large"}
                disabled={props.form==form2?true:false}

                // onChange={e=>setShareHolderShares(e)}
              />            
            </Form.Item>

            <Form.Item name="budgetBreakdown">
            <Checkbox  disabled={props.form==form2?true:false}  checked={componentDisabled}  onChange={(e) => setComponentDisabled(e.target.checked)}>Budget Breakdown</Checkbox>
            </Form.Item>
            

            <Form.Item
             
              // value={conditions}
              name="note"
              label="Note"
            >
              <TextArea
                // style={{
                //   width: 440,
                // }}
                rows={2}
              ></TextArea>
            </Form.Item>
        </Form>
        )}
  

  const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
    const content = useMemo(() => <StatefulModalContent form={form}  />, [statementcategory,statementtype,glaccount]);

    return (
      <Modal
        forceRender
        open={open}
        width={800}

        style={{ textAlign: 'center' }}
        title={<h3 >Create a new Account for {Company.name}</h3>}
        okText="Créer"
        cancelText="Annuler"
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
      
      {content}
            
          
      </Modal>
    );
  };

   const OnopenUpdate = (values) => {
     console.log("Received values of form: ", values);
     setEditingRowbook(null);
   };
    const handleCancel = () => {
      setEditingRowbook(null);
    };
  const CollectionUpdateForm = ({ open, onCreate, onCancel }) => {
    return (

      <Modal
        open={open}
        title="Update account"
        okText="Update"
        width={800}
        cancelText="Cancel"
        footer={[
          <Button key="back" cancelText="Cancel" onClick={onCancel}>
            Return
          </Button>,
          <Button  type="primary" loading={loading} onClick={() => {
            form2
              .validateFields()
              .then((values) => {
                handleupdateOk(values);
              })
              .catch((info) => {
                console.log("Validate Failed:", info);
              });
          }}
           okText="Update">
            Update
          </Button>,
          <Button type="primary" danger>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => handleDelete(editingRowbook)}


            >
              Delete
            </Popconfirm>
          </Button>,
        ]}
        onCancel={onCancel}
        // onOk={() => {
        //   form2
        //     .validateFields()
        //     .then((values) => {
        //       form2.resetFields();
        //       onCreate(values);
        //     })
        //     .catch((info) => {
        //       console.log("Validate Failed:", info);
        //     });
        // }}
      >
            <StatefulModalContent form={form2}/>

      
      </Modal>
    );
  };
  const columns = [
    {
      title: "GIFI",
      // dataIndex: "financialStatementTypeId",
      align: "center",
      // render: (text) => <a>{text}</a>,
      render: (_,record) => <div style={{ textAlign: "right" }}>{record.financialStatementType.gifi}</div> ,

    },
    {
      title:"Class",
      align: "center",
      render: (_,record) => <div style={{ textAlign: "left" }}>{record.financialStatementClass.label}</div>,


    },
    {
      title: "Category",
      // dataIndex: "category",
      align: "center",
      render: (_,record) => <div style={{ textAlign: "left" }}>{record.financialStatementCategory.label}</div> ,
    },
    {
      title: "GL Number",
      // dataIndex: "glAccountId",
      align: "center",
      render: (_,record) => <div style={{ textAlign: "right" }}>{record.glAccount.glNumber}</div> ,

    },
    {
      title: "Description",
      // dataIndex: "note",
      align: "center",
      render: (_,record) => <div style={{ textAlign: "left" }}>{record.glAccount.description}</div>,
    },
    {
      title: "Actions",
      align: "center",

      render: (_, record) => {
        return (
            
            <Button
              type="link"
              onClick={() => {
                setEditingRowbook(record.id);
                handleclass(record.financialStatementClass.id);
                setComponentDisabled(record.budgetBreakdown);
                form2.setFieldsValue({
                  class: record.financialStatementClass.id,
                  category: record.financialStatementCategory.id,
              
                  type: record.glAccount.financialStatementTypeGIFI,
                  glAccountId:record.glAccount.id,
                  annualBudget: record.annualBudget,
                  // budgetBreakdown:record.budgetBreakdown,
                  note:record.note
                });
              }}
            >
              <a>Details</a>
            </Button>
            
        );
      },
    },
  ];

  return (
    <Card
    bordered={false}
    className="header-solid mb-24"
    title={
        <h3 className="font-semibold"> Chart of Accounts for: {Company.name}</h3>
    }
  >
    
          
        <Row>
          <Col span={8}>
            <DatePicker
            defaultValue={dayjs(date)}
            name="year"
            picker="year"
            placeholder="Selected Year"
            style={{ width: 200, height: 35 }}
            onChange={onChangee}
          />

        <Button
          className="Create-button"
          type="primary"
          loading={loadings} 
          icon={<DownloadOutlined />}
          style={{
            // width: 80,
            // height: 35,
            marginLeft: "2rem",
          }}
          onClick={() => {
            downloadFile();
          }}
          
        >
          Print
        </Button>

          </Col>
          <Col span={6} offset={10}>
            <Space style={{
          // display: 'flex',
          marginBottom: 8,
        }} >

        
          <Button
            className="Create-button"
            type="primary"
            onClick={() => {
              setOpen(true);
            }}
            style={{
              textAlign: "right",
            }}
          >
            Create a new account
          </Button>
          <CollectionCreateForm
            open={open}
            onCreate={Submit}
            onCancel={() => {
              form.resetFields();

              setOpen(false);
              // onAddChamp();
            }}
          />
          <Button
            className="Create-button"
            type="primary"
            disabled
            style={{
              textAlign: "right",
              marginLeft:5,
            }}
            onClick={() => {
              // setOpenupdate(true);
            }}
          >
            Upload
          </Button>
          <CollectionUpdateForm
            open={editingRowbook && true}
            onCreate={OnopenUpdate}
            onCancel={() => {
              form2.resetFields();
              setEditingRowbook(null);
              setOpenupdate(false);
            }}
          />
        </Space>
          </Col>
        </Row>

        
      
        <Table columns={columns} dataSource={ChartofAccounts} bordered />
    </Card>
  );
}
 export default ChartofAcount;















