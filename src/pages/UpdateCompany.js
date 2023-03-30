import React, { useState,useEffect,useContext } from "react";
import axios from 'axios';
import TutorialDataService from "../services/TutorialService";
import { NavLink,useHistory } from 'react-router-dom';
import {JSON_API} from '../services/Constants';
import {PlusOutlined,SettingOutlined,CaretDownOutlined } from '@ant-design/icons';
import { CompanyContext } from '../contexts/CompanyContext';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useTranslation } from 'react-i18next';
import {
  DatePicker,
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Collapse,
  Radio,
  Col,
  Form,
  Input,
  Tooltip,
  InputNumber,
  Row,
  Select,
  Result,
  Typography, 
  Divider,
  Space,
  Modal ,
  Table,
  Popconfirm,
  Tag,
  Tabs,
  message,
} from 'antd';
import TutorialService from "../services/TutorialService";
dayjs.extend(customParseFormat);

const { Panel } = Collapse;
const { TextArea } = Input;
const { Text, Title } = Typography;
const { Option } = Select;

  // needed of update
const formItemLayout = {

  labelCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 8 },
      lg: { span: 8 } 
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 12 },
      lg: { span: 12 }
    }

};

const tailFormItemLayout = {

  wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12, offset: 12 },
      md: { span: 12, offset: 8 },
      lg: { span: 12, offset: 8 } 
    }

};


 

       
const UpdateCompany = () => {
  const {submitted, setSubmitted,Companies,setCompanies,Company,setCompany,Actionstate,setActionstate}=useContext(CompanyContext);
  let {t} =useTranslation();



  const [country, setcountry] = useState([]);
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();

  const [province, setprovince] = useState([]);
  const [city, setcity] = useState([]);

  const [shareHolderData, setShareHolderData] = useState([]);
  const [ManagerbyId, setManagerbyId] = useState({});

  const [ManagerData, setManagerData] = useState([]);
  const [Cdate, setDate] = useState();

  const [count, setCount] = useState(1);
  const [countsh, setCountsh] = useState(1);

  const getCountry = async () => {

    await axios
      .get(`${JSON_API}/countries`)
      .then((res) => {
        console.log(res);

        setcountry(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

      await axios
      .get(`${JSON_API}/Provinces/country/${company.city.province.country.id}`)

      .then((res) => {
        console.log(res);

        setprovince(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

      
  };

  const handlecountry = async (e) => {
    // console.log(e);
    await axios
      .get(`${JSON_API}/Provinces/country/${e}`)

      .then((res) => {
        console.log(res);

        setprovince(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

      await axios
      .get(`${JSON_API}/cities/country/${e}`)

      .then((res) => {
        console.log(res);

        setcity(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleprovince = async (e) => {
    // console.log(e);
    await axios
      .get(`${JSON_API}/cities/province/${e}`)

      .then((res) => {
        console.log(res);

        setcity(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
 
  
  const handleshareholderDelete = (id) => {
    const newData = shareHolderData.filter((item) => item.id !== id);
    setShareHolderData(newData);
    console.log('after delete',shareHolderData);
  };
  const handlemanagerDelete = (id) => {
    const newData = ManagerData.filter((item) => item.id !== id);
    setManagerData(newData);
    console.log('after delete',ManagerData);
  };
  const defaultshareholderColumns = [
    {
      title: 'Id',
      dataIndex: 'id',
      align:"center",

      render: (text, record) =>(
        <div style={{textAlign: "right"}}>{text}</div>
      )
    },
    {
      title: `${t("Leadersname")}`,
      dataIndex: 'name',
      width: '30%',
      align:"center",
      render: (text, record) =>{
        if (editingRowbook2 === record.id) {
          return (
            <Form.Item
          name="name"          
          rules={[
            {
              required: true,
              message: `${t("addnewholder")}`,
            },
          ]}
        >
          <Input onChange={e=>setShareholdername(e.target.value)} />
        </Form.Item>
          );
        } else {
           return  <div style={{ textAlign: "left" }}>{text}</div>
        }
      } 
     
    },
    {
      title:  `${t("Shares")}`,
      dataIndex: 'shares',
      align:"center",
      render: (text, record) =>{
        if (editingRowbook2 === record.id) {
          return (
            <Form.Item
          name="shares"
          rules={[
            {
              required: true,
              message: `${t("Selectsharepourcent")}`,
            },
          ]}
        >
          <InputNumber
            // disabled={SHselected}
            min={0}
            max={100}
            size={'large'}
            formatter={(value) => `${value}%`}
            parser={(value) => value.replace('%', '')}
            // onChange={e=>setShareHolderShares(e)}
            onChange={e=>setShareholdershares(e)}

          />

        </Form.Item>
          );
        } else {
           return  <div style={{textAlign: "right"}}>{record.shares}%</div>
        }
      } 

     
    },
    {
      title:  `${t("Startdate")}`,
      dataIndex: 'startedAt',
      align:"center",
      render: (text, record) =>{
        if (editingRowbook2 === record.id) {
          return (
            <Form.Item
            name="startedAt"
            rules={[
              {
                required: true,
                message: `${t("selectdate")}`,
              },
            ]}
            >
              <DatePicker
                style={{ width: "200" }}
                format={"YYYY-MM-DD"}
                size={"large"}
                placeholder={t("selectdate")}
                onChange={e=>setShareholderstart(e)}

              />
            </Form.Item>
          );
        } else {
           return  <div style={{textAlign: "center"}}>{dayjs(record.startedAt).format('YYYY/MM/DD')}</div>
        }
      } 

    },
    {
      title: "Actions",
      align: "center",
      render: (_, record) =>
      shareHolderData.length >= 1 ? (
        <Space size="middle">
          {
          editingRowbook2 === record.id?
          <>
          <Button type="link" onClick={()=>setEditingRowbook2(null)}>
            {t("cancel")}
          </Button>
          <Button type="link" onClick={()=>updateShareholderdata(record.id)}>
            {t("save")}
          </Button>
          </>
          
          :
          <>
             <Popconfirm
              type="link"
              onClick={() => {
                setEditingRowbook2(record.id);
                form2.setFieldsValue({
                  name: record.name,
                  shares:record.shares,
                  startedAt: dayjs(record.startedAt)
                });
              }}
            >
                <a> {t("edit")}</a>
          </Popconfirm>
          
          <Popconfirm
              title={t("Suretodelete")}
              cancelText={t("no")}
              okText={t("yes")}
              onConfirm={() => handleshareholderDelete(record.id)}
            >
              <a style={{ marginLeft: ".5rem" }}> {t("Delete")}</a>
            </Popconfirm>

        
          </>
          }
          
        </Space>
        
      ) : null,

       
    },
   
  ];
  const defaultmanagerColumns = [
    {
      title: "Id",
      dataIndex: "id",
      align: "center",
      render: (text, record) => (
        <div style={{ textAlign: "right" }}>{text}</div>
      ),
    },
    {
      title: `${t("Lastname")}`,
      dataIndex: "name",
      width: "30%",
      align: "center",
      render: (text, record) =>{
        if (editingRowbook === record.id) {
          return (
            <Form.Item
            name="name"
            

            rules={[
              {
                required: true,
                message: `${t("Pleaseinputthemanagerfirstname")}`,
              },
            ]}
          >
            <Input onChange={e=>setManagerlastname(e.target.value)} placeholder={`${t("Pleaseinputthemanagerfirstname")}`} />
          </Form.Item>
          );
        } else {
           return  <div style={{ textAlign: "left" }}>{text}</div>
        }
      } 
    },
    {
      title: `${t("Firstname")}`,
      dataIndex: "firstName",
      align: "center",
      render: (text, record) => {
        if (editingRowbook === record.id) {
          return (
            <Form.Item
            name="firstName"
            
            rules={[
              {
                required: true,
                message: `${t("Pleaseinputthemanagerlastname")}`,
              },
            ]}
          >
            <Input onChange={f=>setManagername(f.target.value)} placeholder={`${t("Pleaseinputthemanagerlastname")}`} />
          </Form.Item>
          );
        } else {
           return  <div style={{ textAlign: "left" }}>{text}</div>
        }
      }
     
    },
    {
      title: `${t("Titles")}`,
      dataIndex: "titles",
      align: "center",

      render: (_, record) => {
        if (editingRowbook === record.id) {
          return (
            <Form.Item
            name="titles"
           
            rules={[
              {
                required: true,
                message: `${t("Pleaseinputthemanagertitle")}`,
              },
            ]}
          >
            <Select
              mode="multiple"
              allowClear
              placeholder={t("selectmanagerstitles")}
              size={"large"}
              // onChange={titlesState}
              onChange={(e)=>titlesState(e)}
            >
              {Titles.map(
                (e) => e && <Option value={e.id}>{e.label}</Option>
              )}
            </Select>
          </Form.Item>
          );
        } else {
           return record.titles.map((o) => (
          <div style={{ textAlign: "left" }}>
            <Tag>{o.title.label}</Tag>
          </div>
        ));
      }
      }

       
    },
    {
      title: `${t("Yearsofexperience")}`,
      dataIndex: "yearsOfExperience",
      align: "center",
      render: (text, record) => {
        if (editingRowbook === record.id) {
          return (
            <Form.Item name="yearsOfExperience">
              <InputNumber
                // disabled={SHselected}
                min={0}
                max={100}
                size={"large"}
                onChange={f=>setManagerexp(f)}

              />
            </Form.Item>
          );
        } else {
          return <div style={{ textAlign: "right" }}>{text}</div>
          
        }
        },
    },
    {
      title: "Actions",
      align: "center",
      render: (_, record) =>
      ManagerData.length >= 1 ? (
        <Space size="middle">
          {
          editingRowbook === record.id?
          <>
          <Button type="link" onClick={()=>setEditingRowbook(null)}>
            {t("cancel")}
          </Button>
          <Button type="link" onClick={()=>updateManagerdata(record.id)}>
            {t("save")}
          </Button>
          </>
          
          :
          <>
             <Popconfirm
              type="link"
              onClick={() => {
                setEditingRowbook(record.id);
                form1.setFieldsValue({
                  name: record.name,
                  firstName:record.firstName,
                  titles:record.titles.map(o=>o.title.id),
                  yearsOfExperience: record.yearsOfExperience
                });
              }}
            >
                <a> {t("edit")}</a>
          </Popconfirm>
          
          <Popconfirm
              title={t("Suretodelete")}
              cancelText={t("no")}
              okText={t("yes")}
              onConfirm={() => handlemanagerDelete(record.id)}
            >
              <a style={{ marginLeft: ".5rem" }}> {t("Delete")}</a>
            </Popconfirm>
          </>
          }
          
        </Space>
        
      ) : null,

       
    },
    // {
    //   title: "Actions",
    //   dataIndex: "operation",
    //   align: "center",
    //   render: (_, record) =>
    //     ManagerData.length >= 1 ? (
    //       <Popconfirm
    //         title={t("Suretodelete")}
    //         okText={t("yes")}
    //         cancelText={t("no")}
    //         onConfirm={() => handlemanagerDelete(record.id)}
    //       >
    //         <a>{t("Delete")}</a>
    //       </Popconfirm>
    //     ) : null,
    // },
  ];
  const shareholdercolumns = defaultshareholderColumns.map((col) => {
      return col;

  });
  const managercolumns = defaultmanagerColumns.map((col) => {
      return col;
  });

const [TypeIndustries,setTypeIndustries]=useState([]);
const [Market,setMarket]=useState([]);
const [RevenueModel,setRevenueModel]=useState([]);
const [Customer,setCustomer]=useState([]);
const [Customerselected,setCustomerselected]=useState([]);

const [managerid,setManagerid]=useState(null);
const [managername,setManagername]=useState(null);
const [managerlastname,setManagerlastname]=useState(null);
const [managertitles,setManagertitles]=useState([]);
const [managerexp,setManagerexp]=useState(null);

const [shareholdername,setShareholdername]=useState(null);
const [shareholdershares,setShareholdershares]=useState(null);
const [shareholderstart,setShareholderstart]=useState(null);



const [BusinessPartner,setBusinessPartner]=useState([]);
const [StrategicTarget,setStrategicTarget]=useState([]);
const [ActivityType,setActivityType]=useState([]);
const [Product,setProduct]=useState([]);
const [Productselected,setProductselected]=useState([]);
const [StrategicTargetselected,setStrategicTargetselected]=useState([]);
const [editingRowbook, setEditingRowbook] = useState(null);
const [editingRowbook2, setEditingRowbook2] = useState(null);


const [ShareHolders,setShareHolders]=useState([]);
const [Managers,setManagers]=useState([]);
const [Titles,setTitles]=useState([]);
const [TitlesData,setTitlesData]=useState([]);
const [Datestart,setDatestart]=useState();
const [Datefound,setDatefound]=useState();
const [DateEndString,setDateEndString]=useState(null);
const [cityID,setcityId]=useState(null);
const [Dateend,setDateend]=useState();

const[Tabkey,setTabkey]=useState("1");
const onTabChange = (key) => {
  setTabkey(key);
  console.log(Tabkey);
};
const CollectionCreateForm = ({ open, onCreate, onCancel, data }) => {

  const [form] = Form.useForm();
  console.log("open state"+open);
  console.log('data est ', data);
  let ll;

  switch (data.url) {
    case "ShareHolders":
      ll = t("addnewholder");

      break;
    case "Managers":
      ll = t("addnewmanager");

      break;
   
    case "ActivityTypes":
      ll = t("TypeofactivitiesButton");

      break;
    case "Titles":
      ll = t("addtitles");

      break;
   //  case "IndustryTypes":
   //    ll = t("Typeofindustry");

   //    break;
    case "Products":
      ll = t("ProductsServicesButton");

      break;
    case "IndustryTypes":
      ll = t("AddnewtypeIndustry");

      break;
    case "RevenueModelItems":
      ll = t("RevenueModelButton");

      break;
    case "StrategicTargets":
      ll = t("StrategictargetsButton");

      break;

    case "Customers": // toto vaut 0 donc ce cas correspond
      ll = t("AddnewcustomerButton");
      break;
    case "Markets": // toto vaut 0 donc ce cas correspond
      ll = t("AddnewmarketButton");
      break;

    // NOTE : le break aurait du être placé ici
    case "BusinessPartners": // pas de break pour 'case 0:' les instructions de ce cas sont
      // exécutées aussi
      ll = t("Addnewbusinesspartner");

      break; // on a un break a ce niveau donc les instructions
    // des cas suivants ne seront pas exécutées
    // case 2:
    // ;
    //     console.log(2);
    //     break;
    default:
      console.log("default");
  }
  {
    return ["Customers","BusinessPartners"].includes(data.url)?
      <Modal
        open={open}
        title={ll}
        okText={t("create")}
        cancelText={t("cancel")}
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate({values:values,url:data.url,data:data.data});
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
      <Form
        form={form}
        // layout="vertical"
        name="form_in_modal"
        // initialValues={{
        //   modifier: 'public',
        // }}
      >
        <Form.Item
          name="name"
          label={t("Name")}
          
          rules={[
            {
              required: true,
              message: `${t(" Pleaseinputthe") + "" + ll}`,
            },
          ]}
        >
            <Input  />
        </Form.Item>
      </Form>
      </Modal> 
      :data.url==="ShareHolders"?
       <Modal
       open={open}
       title={ll}
        okText={t("create")}
        cancelText={t("cancel")}
       onCancel={onCancel}
       onOk={() => {
         form
           .validateFields()
           .then((values) => {
             form.resetFields();
             onCreate({values:values,url:data.url,data:data.data});
           })
           .catch((info) => {
             console.log('Validate Failed:', info);
           });
       }}
     >

     <Form
       form={form}
       // layout="vertical"
       name="form_in_modal"
       // initialValues={{
       //   modifier: 'public',
       // }}
     >

        <Form.Item
          name="name"
          label={t("Name")}
          
          rules={[
            {
              required: true,
              message: `${ll}`,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="shares"
          label={t("Shares")}
          rules={[
            {
              required: true,
              message: `${t("Selectsharepourcent")}`,
            },
          ]}
        >
          <InputNumber
            // disabled={SHselected}
            min={0}
            max={100}
            size={'large'}
            formatter={(value) => `${value}%`}
            parser={(value) => value.replace('%', '')}
            // onChange={e=>setShareHolderShares(e)}

          />

        </Form.Item>
      
      


        <Form.Item
        name="startedAt"
        label={t("Startdate")}
        rules={[
          {
            required: true,
            message: `${t("selectdate")}`,
          },
        ]}
        >
          <DatePicker
                style={{ width: "200" }}
                format={"YYYY-MM-DD"}
                size={"large"}
                placeholder={t("selectdate")}
              />
        </Form.Item>
      </Form>
      </Modal>
      :data.url==="Managers"?
      <Modal
        open={open}
        title={ll}
        okText={t("Create")}
        cancelText={t("Cancel")}
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate({values:values,url:data.url,data:data.data});
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
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
            label={t("Lastname")}
            rules={[
              {
                required: true,
                message: `${t("Pleaseinputthemanagerfirstname")}`,
              },
            ]}
          >
            <Input  />
        </Form.Item>
        <Form.Item
          name="firstName"
          label={t("Firstname")}
          rules={[
            {
              required: true,
              message: `${t("Pleaseinputthemanagerlastname")}`,
            },
          ]}
        >
            <Input  />
        </Form.Item>

      <Form.Item
        name="titles"
        label={t("Titles")}
        rules={[
          {
            required: true,
            message: `${t("Pleaseinputthemanagertitle")}`,
          },
        ]}
      >
        <Select mode="multiple" allowClear placeholder={t("selectmanagerstitles")} size={'large'}>
          {Titles.map((e)=>(

            e&&<Option value={e.id}>{e.label}</Option>

          ))}
        </Select>

      </Form.Item>
     
      <Form.Item name="yearsOfExperience" label={t("Yearsofexperience")}>

        <InputNumber
          // disabled={SHselected}
          min={0}
          max={100}
          size={'large'}
        />
      </Form.Item>
      </Form>
      </Modal>
       :data.url==="Titles"?
      <Modal
      open={open}
      title={ll}
      okText={t("Create")}
      cancelText={t("Cancel")}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate({values:values,url:data.url,data:data.data});
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
      >

      <Form
                        {...formItemLayout}
      form={form}
      // layout="vertical"
      name="form_in_modal"
      // initialValues={{
      //   modifier: 'public',
      // }}
      >
        
        <Form.Item
            name="label"
            label={t("Label")}
            rules={[
              {
                required: true,
                message: `${t("Pleaseinputthemanagertitle")}`,
              },
            ]}
            >
            <Input  />
            </Form.Item>
      </Form>
      </Modal> 
       :data.url==="StrategicTargets"?

      <Modal
      open={open}
      title={ll}
      okText={t("Create")}
      cancelText={t("Cancel")}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate({values:values,url:data.url,data:data.data});
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
      >

      <Form
        {...formItemLayout}
        form={form}
        name="form_in_modal"

      >
        
      <Form.Item
        name="type"
        label="Type"
        
        rules={[
          {
            required: true,
            message: `${t("Pleaseinputthetypeofstrategictarget")}`,
          },
        ]}
      >

<Input placeholder={ll}/>
      </Form.Item>

      <Form.Item
        name="details"
        label={t("details")}
            rules={[
              {
                required: true,
                message: `${t("Pleaseinputthedetailseofstrategictarget")}`,
              },
            ]}
      >

<TextArea placeholder={ll}/>
      </Form.Item>
      </Form>
      </Modal> 
      :

      <Modal
      open={open}
      title={ll}
      okText={t("create")}
      cancelText={t("cancel")}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate({values:values,url:data.url,data:data.data});
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
      >

      <Form
                        {...formItemLayout}
      form={form}
      // layout="vertical"
      name="form_in_modal"
      // initialValues={{
      //   modifier: 'public',
      // }}
      >
        
      <Form.Item
      name="label"
      label={t("Label")}
      rules={[
        {
          required: true,
          message: `${ll}`,
        },
      ]}
      >
              <Input style={{ width: "250" }} placeholder={ll} />
      </Form.Item>
      </Form>
      </Modal> 
  }
};
const [company, setcompany] = useState(Company);

const getIndustryTypes = async()=>{
  await axios.get(`${JSON_API}/IndustryTypes`)
  .then((response) => {
    setTypeIndustries(response.data);
    console.log(TypeIndustries,'TypeIndustries');
  }).catch(function (error) {
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
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
}

// const getManagers = async()=>{
//   await axios.get(`${JSON_API}/Managers`)
//   .then((response) => {
//     setManagers(response.data);
//   }).catch(function (error) {
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       console.log(error.response.data);
//       console.log(error.response.status);
//       console.log(error.response.headers);
//     } else if (error.request) {
//       // The request was made but no response was received
//       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//       // http.ClientRequest in node.js
//       console.log(error.request);
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.log('Error', error.message);
//     }
//     console.log(error.config);
//   });
// }

const getShareholders = async()=>{
  await axios.get(`${JSON_API}/ShareHolders`)
  .then((response) => {
    setShareHolders(response.data);
    console.log('ShareHolders',ShareHolders);
    const companyshareholders = ShareHolders.filter(o => {
      let Found = false;
      company.shareHolders.forEach(d=>{
        if(d.id == o.id) Found = true;
      });
      return Found;
      });

 console.log("shareholders of company test",companyshareholders.filter(o=>{
  let Found = false;
  o.shares.forEach(d=>{
    if(d.enterpriseId == company.id) Found = true;
  });
  return Found;
}))

  }).catch(function (error) {
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
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
}

const getTitles = async()=>{
  await axios.get(`${JSON_API}/Titles`)
  .then((response) => {
    setManagers(response.data);
  }).catch(function (error) {
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
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
}

    // needed of update
useEffect(()=>{ setSubmitted(false);getData();getCountry()},[]);
  const getData = async () =>{
    setStrategicTargetselected(company.strategicTargets)
    setStrategicTarget(company.strategicTargets)
    setCustomerselected(company.customers)
    setProductselected(company.products)
    setcityId(company.city.id);
    setManagers(company.managers);
    setShareHolders(company.shareHolders)
    setManagerData(company.managers);
    setCustomer(company.customers);
    setProduct(company.products);
    const d= ShareHolders.filter(e=>e.id===shareHolderId);
    setShareHolderData(company.shareHolders);

    await axios.get(`${JSON_API}/IndustryTypes`)
    .then((response) => {
      setTypeIndustries(response.data);
      console.log(TypeIndustries,'TypeIndustries');
    }).catch(function (error) {
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
        console.log('Error', error.message);
      }
      console.log(error.config);
    });

    await axios.get(`${JSON_API}/Markets`)
    .then((response) => {
      setMarket(response?.data);
    }).catch(function (error) {
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
        console.log('Error', error.message);
      }
      console.log(error.config);
    });

    await axios.get(`${JSON_API}/RevenueModelItems`)
    .then((response) => {
      setRevenueModel(response.data);
    }).catch(function (error) {
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
        console.log('Error', error.message);
      }
      console.log(error.config);
    });

    // await axios.get(`${JSON_API}/Customers`)
    // .then((response) => {
    //   setMainCustomer(response.data);
    // }).catch(function (error) {
    //   if (error.response) {
    //     // The request was made and the server responded with a status code
    //     // that falls out of the range of 2xx
    //     console.log(error.response.data);
    //     console.log(error.response.status);
    //     console.log(error.response.headers);
    //   } else if (error.request) {
    //     // The request was made but no response was received
    //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //     // http.ClientRequest in node.js
    //     console.log(error.request);
    //   } else {
    //     // Something happened in setting up the request that triggered an Error
    //     console.log('Error', error.message);
    //   }
    //   console.log(error.config);
    // });

    await axios.get(`${JSON_API}/BusinessPartners`)
    .then((response) => {
      setBusinessPartner(response.data);
    }).catch(function (error) {
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
        console.log('Error', error.message);
      }
      console.log(error.config);
    });

    // await axios.get(`${JSON_API}/StrategicTargets`)
    // .then((response) => {
    //   setStrategicTarget(response.data);
    // }).catch(function (error) {
    //   if (error.response) {
    //     // The request was made and the server responded with a status code
    //     // that falls out of the range of 2xx
    //     console.log(error.response.data);
    //     console.log(error.response.status);
    //     console.log(error.response.headers);
    //   } else if (error.request) {
    //     // The request was made but no response was received
    //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //     // http.ClientRequest in node.js
    //     console.log(error.request);
    //   } else {
    //     // Something happened in setting up the request that triggered an Error
    //     console.log('Error', error.message);
    //   }
    //   console.log(error.config);
    // });

    await axios.get(`${JSON_API}/ActivityTypes`)
    .then((response) => {
      setActivityType(response.data);
    }).catch(function (error) {
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
        console.log('Error', error.message);
      }
      console.log(error.config);
    });

    // await axios.get(`${JSON_API}/Products`)
    // .then((response) => {
    //   setProduct(response.data);
    // }).catch(function (error) {
    //   if (error.response) {
    //     // The request was made and the server responded with a status code
    //     // that falls out of the range of 2xx
    //     console.log(error.response.data);
    //     console.log(error.response.status);
    //     console.log(error.response.headers);
    //   } else if (error.request) {
    //     // The request was made but no response was received
    //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //     // http.ClientRequest in node.js
    //     console.log(error.request);
    //   } else {
    //     // Something happened in setting up the request that triggered an Error
    //     console.log('Error', error.message);
    //   }
    //   console.log(error.config);
    // });

  //   await axios.get(`${JSON_API}/ShareHolders`)
  //   .then((response) => {
  //     setShareHolders(response.data);
  //     console.log('ShareHolders',ShareHolders);
  //     const companyshareholders = ShareHolders.filter(o => {
  //       let Found = false;
  //       company.shareHolders.forEach(d=>{
  //         if(d.id == o.id) Found = true;
  //       });
  //       return Found;
  //       });

  //  console.log("shareholders of company test",companyshareholders.filter(o=>{
  //   let Found = false;
  //   o.shares.forEach(d=>{
  //     if(d.enterpriseId == company.id) Found = true;
  //   });
  //   return Found;
  // }))

  //   }).catch(function (error) {
  //     if (error.response) {
  //       // The request was made and the server responded with a status code
  //       // that falls out of the range of 2xx
  //       console.log(error.response.data);
  //       console.log(error.response.status);
  //       console.log(error.response.headers);
  //     } else if (error.request) {
  //       // The request was made but no response was received
  //       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
  //       // http.ClientRequest in node.js
  //       console.log(error.request);
  //     } else {
  //       // Something happened in setting up the request that triggered an Error
  //       console.log('Error', error.message);
  //     }
  //     console.log(error.config);
  //   });

    // await axios.get(`${JSON_API}/Managers`)
    // .then((response) => {
    //   setManagers(response.data);
    // }).catch(function (error) {
    //   if (error.response) {
    //     // The request was made and the server responded with a status code
    //     // that falls out of the range of 2xx
    //     console.log(error.response.data);
    //     console.log(error.response.status);
    //     console.log(error.response.headers);
    //   } else if (error.request) {
    //     // The request was made but no response was received
    //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //     // http.ClientRequest in node.js
    //     console.log(error.request);
    //   } else {
    //     // Something happened in setting up the request that triggered an Error
    //     console.log('Error', error.message);
    //   }
    //   console.log(error.config);
    // });

    await axios.get(`${JSON_API}/Titles`)
    .then((response) => {
      setTitles(response.data);
    }).catch(function (error) {
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
        console.log('Error', error.message);
      }
      console.log(error.config);
    });

  };

   // needed of update
   const [form] = Form.useForm();
    // needed of update
const history = useHistory();
const [shareHolderId,setShareHolderId]=useState();
const [ManagerId,setManagerId]=useState();

const filteredshareholderOptions = ShareHolders.filter(o => {
  let notFound = true;
  shareHolderData.forEach(d=>{
    if(d.id == o.id) notFound = false;
  });
  return notFound;

});

const filteredmanagerOptions = Managers.filter(o => {
  let notFound = true;
  ManagerData.forEach(d=>{
    if(d.id == o.id) notFound = false;
  });
  return notFound;
});
const [shareHolderShares,setShareHolderShares]=useState();
const [messageApi, contextHolder] = message.useMessage();

const handleChange = (event) => {
  // 👇 Get input value from "event"
  console.log("test "+event.target.value)
  // setShareHolderName(event.target.value);
};
    // needed of update
const [Open, setOpen] = useState({
    open:false,
    url:null,
    data:null
  });
  // needed of update
  const onCreate = async ({values,url,data}) => {

    console.log('Received data of form: ', data);
    console.log('Received values of form: ', values);
    console.log('Received url of form: ', url);

    if(url=="Customers"){
      setCustomer([...Customer,{
        name:values.name
      }]);
      messageApi.open({
        type: "success",
        content: `${t("valuesaddedSuccessfully")}`,
        
      });

    }else if(url=="Products"){
      setProduct([...Product,{
        label:values.label
      }])
      messageApi.open({
        type: "success",
        content: `${t("valuesaddedSuccessfully")}`,
        
      });
    }
    else if(url=="Managers"){

      const titles = Titles.filter(o => {
        let notFound = false;
        values.titles.forEach(d=>{
          if(d == o.id) notFound = true;
        });
        return notFound;
      });
      console.log("titles",titles);
      console.log("titles 1",titles.map(t=>{return{title:t}}));

      setManagers([...Managers,{
      id: count,
      key: count,
      name: values.name,
      firstName: values.firstName,
      titles:titles.map(t=>{return{title:t}}),
      yearsOfExperience: values.yearsOfExperience?values.yearsOfExperience:0

      }])
      messageApi.open({
        type: "success",
        content: `${t("valuesaddedSuccessfully")}`,
        
      });
      setCount(count+1);

    }
    else if(url=="StrategicTargets"){
      setStrategicTarget([...StrategicTarget,{
        type:values.type,
        details:values.details
      }]);
      messageApi.open({
        type: "success",
        content: `${t("valuesaddedSuccessfully")}`,
        
      });
    }
    else if(url=="ShareHolders"){
      setShareHolders([...ShareHolders,{
        id:countsh,
        name:values.name,
        shares:values.shares,
        date:values.startedAt,
        startedAt:new Date(values.startedAt).toLocaleDateString('en-US')
      }]);
      messageApi.open({
        type: "success",
        content: `${t("valuesaddedSuccessfully")}`,
        
      });
      setCountsh(countsh+1)
    }
    else{
    await axios.post(`${JSON_API}/${url}`,values)
      .then((response) => {
        getData();
        console.log('values were added to ' + data + " Successfully!");

        messageApi.open({
          type: 'success',
          content: `${t("valuesaddedSuccessfully")}`,
        });
      })
      }

   
    setOpen(false);

  };


  const initialCompanyState = {
    id: null,
    nom_de_la_société:"",
    adresse:"",
    ville:"",
    province:"",// dropdrown list
    code_postal:"",
    pays:"",
    date_start:"", //ex  date selector 01/01/2022
    date_fin_exercice:"", //ex date selector 12/31/2022
    numéro_entreprise:null, //ex 1700
    nombre_employés:null, //5
    type_industrie:"", // ex dropdown list
    budget:"", //ex ex dropdown list 100-1000  , +5000
    taux_imposition_annuel_estimé:null, //ex 0
    Target_customers:{},

  };
   // needed of update
    // needed of update
  const handleStartDateChange = (date) => {
    // setDateend(date.clone().add(11, 'months'));
    setDateend( date.clone().add(11, 'months') );
    
    console.log("Dateend",Dateend);

    setDateEndString(new Date(Dateend).toLocaleDateString('en-US'));
    console.log(DateEndString);

  };

  const handleStartPeriodChange = (e) => {
    var e= [1,2,3,4,5,6,7,8,9].includes(e)?"0"+e:e;
    var year = Datestart? Datestart.$y : new Date().getFullYear();
    var dates = year+"-"+e+"-01";
    console.log(dayjs(dates,"YYYY-MM-DD").clone().add(12, 'months'));
    setDateend( dayjs(dates,"YYYY-MM-DD").clone().add(12, 'months'));

  };
  const Edited = (e) => {
    e.preventDefault();
        // onClick={()=>updateManagerdata(record.id)}
    console.log("values are :", e);
  };

  const addShareholderdata = () => {

    const d= ShareHolders.filter(e=>e.id===shareHolderId);
    if(d){
      setShareHolderData([...shareHolderData, {
      id:d[0].id,
      name:d[0].name,
      shares:d[0].shares,
      date:d[0].date,
      startedAt:d[0].startedAt
    }]);
    }
    
        console.log("after add:",shareHolderData);
  }

  const updateShareholderdata=(e)=>{

    const newshareholderdata = shareHolderData.map((sh)=>{
      if(sh.id==e){
        return {...sh,  
          name:shareholdername?shareholdername:sh.name,
          shares:shareholdershares?shareholdershares:sh.shares,
          startedAt:shareholderstart?shareholderstart:sh.startedAt,
        };

      }else return sh;
    })
    setShareHolderData(newshareholderdata);
    setShareholdername(null);
    setShareholdershares(null);
    setShareholderstart(null);
    setEditingRowbook2(null);

  }

  const updateManagerdata = (e) => {

    const m= Managers.filter(e=>e.id===ManagerId);

    console.log("managerlastname",managerlastname);

    const newmanagerdata = ManagerData.map((manager) => {
      var titles = null ;
      if(managertitles)
      {
        titles = Titles.filter(o => {
          let notFound = false;
          managertitles.forEach(d=>{
            if(d == o.id) notFound = true;
          });
          return notFound;
        });
      }
       

      console.log("titles",titles);
      // console.log("titles 1",titles.map(t=>{return{title:t}}));

      if (manager.id === e) {
        return {...manager,  
          name:managerlastname?managerlastname:manager.name,
          firstName:managername?managername:manager.firstName,
          titles:managertitles?titles.map(t=>{return{title:t}}):manager.titles,
          yearsOfExperience:managerexp?managerexp:manager.yearsOfExperience,
        };
      }

      return manager;
    });
  
    setManagerData(newmanagerdata);
    setManagerlastname(null);
    setManagername(null);
    setManagerexp(null);
    setManagertitles(null);
    // ManagerData.map(manager=>manager.id==e ? {...manager,
    //   name:managername?
    //   managername
    //   :
    //   m[0].name,
    //   firstName:managerlastname?managerlastname:m[0].firstName,
    //   titles:managertitles?managertitles:m[0].titles,
    //   yearsOfExperience:managerexp?managerexp:m[0].yearsOfExperience
    // } : manager)
    
    setEditingRowbook(null);
  }

  const addManagerdata = () => {

   
      const m= Managers.filter(e=>e.id===ManagerId);
      console.log("m",m);

      if(m){
        setManagerData([...ManagerData, {
          id:m[0].id,
          name:m[0].name,
          firstName:m[0].firstName,
          titles:m[0].titles,
          yearsOfExperience:m[0].yearsOfExperience,
        }]);
      }
      

       


    console.log("manager id info:",m[0].id);
    console.log("manager name info:",m[0].name);
    console.log("manager firstname info:",m[0].firstName);
    console.log("manager title info:",m[0].titles);
    console.log("manager yearsofExperience info:",m[0].yearsOfExperience);

    console.log("ManagerData state:",ManagerData);

    

    

  }

  const displaydata=()=>{
    console.log("shareHolderData:",shareHolderData);
    console.log("datestart :",Datestart);


  }

  const titlesState = event => {
    console.log(event);
     setManagertitles(event);
  }
  const handleInputChange = event => {
    const { name, value } = event.target;
    setCompany({ ...company, [name]: value });
  };
  
  const saveCompany = async(values) => {

    console.log('Received values of form: ', values);
    console.log('Received manager data of form: ', ManagerData);
    console.log('Received shareholder of form: ', shareHolderData);

    // var e= [1,2,3,4,5,6,7,8,9].includes(values.startPeriod)?"0"+values.startPeriod:values.startPeriod;
    // // var year = Datestart? Datestart.$y : new Date().getFullYear();
    // var dates = values.date_start.$y+"-"+e+"-01";
    // console.log(dayjs(dates,"YYYY-MM-DD").clone().add(11, 'months'));

    var companyinfo = {
      id:company.id,
      name: values.nom_de_la_société,
      businessNumber: values.numéro_entreprise,
      budgetRange: values.budget,
      // startingDate: values.date_start,
      foundingDate: values.date_de_fondation,
      startYear: values.startYear,
      // startPeriod: values.startPeriod,
      // yearsInterval: values.yearsInterval,
      // endDate: values.date_fin_exercice,
      employeesCount: values.nombre_employés,
      address: values.adresse,
      postalCode: values.code_postal,
      cityId: cityID,
      taxes: values.taux_imposition_annuel_estimé,
      activityTypes: values.activity_type,
      products: Productselected,
      customers: Customerselected,
      markets: values.market,
      revenueModelItems: values.revenue_model,
      businessPartners: values.business_partners,
      industryTypes: values.type_industrie,
      strategicTargets: StrategicTargetselected,
      managers: ManagerData.map(i=>{return{
        // id:i.id,
        name:i.name,
        firstName:i.firstName,
        titles:i.titles.map(o=>o.title.id),
        yearsOfExperience:i.yearsOfExperience
      }}),
      shareHolders:shareHolderData.map(i=>{return{
        // id: i.id,
        name:i.name,
        shares: i.shares&&i.shares,
        startedAt:i.date?i.date:i.startedAt
      }})



        
      
    };
    console.log('Received companyinfo values of form: ', companyinfo);

    axios.put(`${JSON_API}/Enterprises`,companyinfo)
    .then(response => {
      setSubmitted(true);
      console.log("Company information after update ",response.data);
      setCompany(response.data);

    })
    .catch(function (error) {
      if (error.response) {
        
        console.log(error.toJSON());
      } else if (error.request) {
        
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    });

  };
    
      const newCompany = () => {
        setCompany(initialCompanyState);
        setSubmitted(false);
      };
      const gotoGI = () => {
        setSubmitted(false);
        let path = `/generalinformations`; 
        history.push(path);    
      };
      
  return (
<>
      {contextHolder}

      <CollectionCreateForm
        open={Open.open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen({open:false,
          url:null,
          data:null});
        }}
        data={Open}
      />
    {submitted ? (
     
       <Result
       status="success"
       title={t("TheCompanyhasbeenupdatedsuccessfully")}
       extra={[
         <Button type="link" onClick={gotoGI}>
              <span className="label">{t("ReturntoGeneralInformations")}</span>
       </Button>
       ]}
     />
    ) : (
      
    <Form
      form={form}
      name="register"
      onFinish={saveCompany}
      initialValues={{
        // residence: ['zhejiang', 'hangzhou', 'xihu'],
        // prefix: '86',
        nom_de_la_société:company.name,
        numéro_entreprise:company.businessNumber,
        budget:company.budgetRange,
        pays:company.city.province.country.id,
        province:company.city.province.id,
        date_de_fondation: dayjs(company.foundingDate),
        startYear: dayjs(company.startYear),
        startPeriod: company.startPeriod,
        yearsInterval: company.yearsInterval,
        // yearsInterval: company.yearsInterval,
        date_start: dayjs(company.startingDate),
        date_fin_exercice:dayjs(company.endDate),
        nombre_employés:company.employeesCount,
        adresse:company.address,
        code_postal:company.postalCode,
        city:company.city.name,
        taux_imposition_annuel_estimé:company.taxes,
        activity_type:company.activityTypes.map(e=>e.id),
        product:company.products.map(e=>e.id),
        main_customers:company.customers.map(e=>e.id),
        market:company.markets.map(e=>e.id),
        revenue_model:company.revenueModelItems.map(e=>e.id),
        business_partners:company.businessPartners.map(e=>e.id),
        type_industrie:company.industryTypes.map(e=>e.id),
        strategic_target:company.strategicTargets.map(e=>e.type)

      }}
      scrollToFirstError
    >
    

    <Title>{company.name}</Title>
    <Text type="secondary">{t("textupdate")}</Text>
    <Divider orientation="left">{t("generalinf")}</Divider>

    <Form.Item
          {...formItemLayout}

      name="numéro_entreprise"
      label={t("Businessnumber")}
      rules={[
        {
          required: true,
          message: `${t("PleaseInputTheBusinessNumber")}`,
          // whitespace: true,
        },
      ]}
    >
      <Input />
    </Form.Item>
            <Form.Item
                  {...formItemLayout}
      name="nom_de_la_société"
      label={t("companyname")}
       
      // tooltip="What do you want others to call you?"
      rules={[
        {
          required: true,
          message: `${t("Pleaseinputthecompanyname")}`,
          // whitespace: true,
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
          {...formItemLayout}

      name="date_de_fondation"
      label={t("foundingdate")}
      rules={[
        {
          required: true,
          message: `${t("pleaseinputthefoundingdate")}`,
          // whitespace: true,
        },
      ]}
      // tooltip="What do you want others to call you?"
      // validateStatus="error"
      // help="Please select right date"
    >
        <DatePicker  placeholder={t("Selectdate")}
              style={{
                width: "50%",
                textAlign: "center",
              }} format={"YYYY-MM-DD"} size={'large'} onChange={(date) => {
      const d = new Date(date).toLocaleDateString('en-US');
      console.log(d);
      setDatefound(d);
    }}/>

    </Form.Item>

    
<Form.Item
        {...formItemLayout}
      name="startPeriod"
      label={t("StartPeriod")}
       
      // tooltip="What do you want others to call you?"
      rules={[
        {
          required: true,
          message: `${t("PleaseInputTheStartPeriod")}`,
          // whitespace: true,
        },
      ]}
      
    >
      {/* <DatePicker picker="month" size={'large'}   onChange={handleStartDateChange}/> */}
      <Select disabled placeholder={t("SelectStartPeriod")}
        onChange={handleStartPeriodChange} size={'large'}>

          <Option value={1}>{t("January")}</Option>
          <Option value={2}>{t("February")}</Option>
          <Option value={3}>{t("March")}</Option>
          <Option value={4}>{t("April")}</Option>
          <Option value={5}>{t("May")}</Option>
          <Option value={6}>{t("June")}</Option>
          <Option value={7}>{t("July")}</Option>
          <Option value={8}>{t("August")}</Option>
          <Option value={9}>{t("September")}</Option>
          <Option value={10}>{t("October")}</Option>
          <Option value={11}>{t("November")}</Option>
          <Option value={12}>{t("December")}</Option>
      </Select>
    </Form.Item>

      <Form.Item
        {...formItemLayout}
      name="startYear"
      label={t("Startyear")}
      // tooltip="What do you want others to call you?"
      rules={[
        {
          required: true,
          message: `${t("PleaseInputTheStartYear")}`,
          // whitespace: true,
        },
      ]}
    >
 <DatePicker  placeholder={t("Selectyear")} picker="year"  style={{
                width: "50%",
                textAlign: "center",
              }} size={'large'}/>   
               </Form.Item>

  



    <Form.Item
            {...formItemLayout}
            name="pays"
            label={t("country")}

            // tooltip="What do you want others to call you?"
          >
            <Select
              style={{
                width: 605,
              }}
              onChange={handlecountry}
              size={'large'}
            >
              {country.map((o) => {
                return <Option value={o.id}>{o.name}</Option>;
              })}
            </Select>
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            name="province"
            label={t("province")}
          >
            <Select
              style={{
                width: 605,
              }}
              onChange={handleprovince}
              placeholder={t("ProvinceSelect")}
              size={'large'}
            >
              {province.map((t) => {
                return <Option value={t.id}>{t.name}</Option>;
              })}
            </Select>
          </Form.Item>


          <Form.Item
                {...formItemLayout}

            name="city"
            label={t("city")}
            rules={[
              {
                required: true,
                message: `${t("pleaseinputthecity")}`,
                // whitespace: true,
              },
            ]}
            // tooltip="What do you want others to call you?"
          >
            <Select
              style={{
                width: 605,
              }}
              // onChange={handlecity}
              placeholder={t("CitySelect")}
              size={'large'}
              onChange={(value)=>setcityId(value)}
            >
              {city.map((t) => {
                return <Option value={t.id}>{t.name}</Option>;
              })}
            </Select>    
            
            </Form.Item>

    <Form.Item
          {...formItemLayout}

      name="adresse"
      label={t("address")}
      rules={[
        {
          required: true,
          message: `${t("pleaseinputtheaddress")}`,
          // whitespace: true,
        },
      ]}
           >
      <Input />
    </Form.Item>

    
    <Form.Item
          {...formItemLayout}

      name="code_postal"
      label={t("postalcode")}
      rules={[
        {
          required: true,
          message: `${t("pleaseinputthepostalcode")}`,
          // whitespace: true,
        },
      ]}
       
    >
      <Input />
    </Form.Item>

   

    <Form.Item
          {...formItemLayout}

      name="date_start"
      label={t("Startdate")}
      rules={[
        {
          required: true,
          message: `${t("pleaseinputthestartdate")}`,
          // whitespace: true,
        },
      ]}
      // tooltip="What do you want others to call you?"
      // validateStatus="error"
      // help="Please select right date"
    >
        <DatePicker               placeholder={t("Selectdate")}
 disabled format={"YYYY-MM-DD"} size={'large'} onChange={(date) => {
      // const d = new Date(date).toLocaleDateString('en-US');
      // console.log(d);
      setDatestart(date);
    }}/>

    </Form.Item>

    {/* <Form.Item
      {...formItemLayout}

      name="date_fin_exercice"
      label={t("Yearenddate")}
       
    >
      <DatePicker format={"YYYY-MM-DD"} size={'large'} onChange={(date) => {
      const d = new Date(date).toLocaleDateString('en-US');
      console.log(d);
      setDateend(d);
    }}/>
    </Form.Item> */}
 
   

    <Form.Item
          {...formItemLayout}

      name="nombre_employés"
      label={t("Numberofemployees")}
      rules={[
        {
          required: true,
          type: 'number',
          min: 0,
          message: `${t("valuecannotbelessthan0")}`,

        },
      ]}

    >
      <InputNumber />
    </Form.Item>



    <Form.Item label={t("Typeofindustry")}      {...formItemLayout}>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="type_industrie"
              label={t("Typeofindustry")}
              rules={[
                {
                  required: true,
                  message: `${t("pleaseselectthetypeofindustry")}`,
                  // whitespace: true,
                },
              ]}
              noStyle
            >
              <Select mode="multiple" allowClear placeholder={t("selectthetypeofindustry")} size={'large'} style={{ width: '100%', }}>
                  {TypeIndustries.map((e)=>(

                    e&&<Option value={e.id}>{e.label}</Option>

                  ))}
              </Select>
              </Form.Item>
          </Col>
          <Col span={12}>
          <Button
                type="link"
                onClick={() => {
                setOpen({open:true,
                url:"IndustryTypes",
                data:`${t("Typeofindustry")}`});
              }}
            >
            <PlusOutlined/> {t("AddnewtypeIndustry")}
          </Button>
         
          </Col>
        </Row>
      </Form.Item>
   
    <Form.Item
          {...formItemLayout}

      name="budget"
      label="Budget"
      rules={[
        {
          required: true,
          message: `${t("pleaseselectthebudget")}`,
          // whitespace: true,
        },
      ]}
      value={company.budget}

    >
      <Select placeholder={t("selectthebudget")}>
        <Option value={0}>50 - 100</Option>
        <Option value={1}>100 - 1000</Option>
        <Option value={2}>+1000</Option>
      </Select>
    </Form.Item>

    <Form.Item
          {...formItemLayout}

      name="taux_imposition_annuel_estimé"
      label={t("Estimatedannualtaxrate")}
       
      value={company.taux_imposition_annuel_estimé}
      rules={[
        {
          type: 'number',
          min: 0,
          max:100,
          message: `${t("pleaseenteranumberbetween0and100")}`,

        },
      ]}
    >
      <InputNumber />
    </Form.Item>
    <Divider orientation="left">{t("Targetcustomers")}</Divider>


    <Form.Item label={t("Market")}        {...formItemLayout}>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="market"
              label={t("Market")}  
              rules={[
                {
                  required: true,
                  message: `${t("pleaseselectthemarket")}`,
                  // whitespace: true,
                },
              ]}
              noStyle
            >
              <Select mode="multiple" allowClear placeholder={t("selectthemarket")} size={'large'} style={{ width: '100%', }}>
                  {Market.map((e)=>(

                    e&&<Option value={e.id}>{e.label}</Option>

                  ))}
              </Select>
              </Form.Item>
          </Col>
          <Col span={12}>
          <Button
                type="link"
                onClick={() => {
                  setOpen({open:true,
                  url:"Markets",
                  data:`${t("Market")}`});
                }}
            >
            <PlusOutlined/>  {t("AddnewmarketButton")}  
          </Button>
     
          </Col>
        </Row>
      </Form.Item>

      <Form.Item label={t("MainCustomers")}        {...formItemLayout}>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="main_customers"
              label={t("MainCustomers")} 
              // rules={[
              //   {
              //     required: true,
              //     message: `${t("pleaseselectthecustomer")}`,
              //     // whitespace: true,
              //   },
              // ]}
              noStyle
              // rules={[{ required: true, message: 'Please input the main customers!'}]}
            >
              <Select mode="multiple" allowClear placeholder={t("selectthemaincustomers")} onChange={e=>setCustomerselected(Customer.filter(p=> e.includes(p.id)))}  size={'large'} style={{ width: '100%', }}>
                  {Customer.map((e)=>(

                    e&&<Option value={e.id}>{e.name}</Option>

                  ))}
              </Select>
              </Form.Item>
          </Col>
          <Col span={12}>
          <Button
                type="link"
                onClick={() => {
                  setOpen({open:true,
                  url:"Customers",
                  data:`${t("MainCustomers")}`});
                }}
            >
            <PlusOutlined/> {t("AddnewcustomerButton")}
          </Button>
          </Col>
        </Row>
      </Form.Item>

    
      <Form.Item label={t("RevenueModel")}       {...formItemLayout} >
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="revenue_model"
              label={t("RevenueModel")} 
              rules={[
                {
                  required: true,
                  message: `${t("pleaseselecttherevenuemodel")}`,
                  // whitespace: true,
                },
              ]}
              noStyle
            >
              <Select mode="multiple" allowClear placeholder={t("selecttherevenuemodel")} size={'large'} style={{ width: '100%', }}>
                  {RevenueModel.map((e)=>(

                    e&&<Option value={e.id}>{e.label}</Option>

                  ))}
              </Select>
              </Form.Item>
          </Col>
          <Col span={12}>
          <Button
                type="link"
                onClick={() => {
                  setOpen({open:true,
                  url:"RevenueModelItems",
                  data:`${t("RevenueModel")}` });
                }}
            >
            <PlusOutlined/>  {t("RevenueModelButton")} 
          </Button>
     
          </Col>
        </Row>
      </Form.Item>
    
      <Form.Item label={t("BusinesspartnersButton")}        {...formItemLayout}>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="business_partners"
              label={t("BusinesspartnersButton")}   
               rules={[
                {
                  required: true,
                  message: `${t("pleaseselectthebusinesspartner")}`,
                  // whitespace: true,
                },
              ]}
              noStyle
              // rules={[{ required: true, message: 'Please input the business partner!'}]}
            >
              <Select mode="multiple" allowClear placeholder={t("selectthebusinesspartners")} size={'large'} style={{ width: '100%', }}>
                  {BusinessPartner.map((e)=>(

                    e&&<Option value={e.id}>{e.name}</Option>

                  ))}
              </Select>
              </Form.Item>
          </Col>
          
          <Col span={12}>
          <Button
            type="link"
            onClick={() => {
              setOpen({open:true,
              url:"BusinessPartners",
              data:`${t("BusinesspartnersButton")}` });
            }}
          >
            <PlusOutlined/>  {t("Addnewbusinesspartner")}
          </Button>
     
          </Col>
        </Row>
      </Form.Item>
      <Divider orientation="left">{t("Descriptionofservicesandproducts")}</Divider>


      <Form.Item label={t("Strategictargets")}      {...formItemLayout} >
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="strategic_target"
              label={t("Strategictargets")} 
              rules={[
                {
                  required: true,
                  message: `${t("pleaseselectthestrategictarget")}`,
                  // whitespace: true,
                },
              ]}
              noStyle
            >
              <Select mode="multiple" allowClear placeholder={t("selectthestrategictarget")} onChange={e=>setStrategicTargetselected(StrategicTarget.filter(st=>e.includes(st.type)))}  size={'large'} style={{ width: '100%', }}>
                  
                  {StrategicTarget.map((e)=>(

                    e&&<Option value={e.type}>{e.type}</Option>

                  ))}

              </Select>

            </Form.Item>
          </Col>

          <Col span={12}>
          <Button
                type="link"
                onClick={() => {
                  setOpen({open:true,
                  url:"StrategicTargets",
                  data:`${t("Strategictargets")}`});
                }}
            >
            <PlusOutlined/>{t("StrategictargetsButton")}
          </Button>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item label={t("Typeofactivities")}       {...formItemLayout}>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="activity_type"
              label={t("Typeofactivities")}  
              rules={[
                {
                  required: true,
                  message: `${t("pleaseselecttheactivitytype")}`,
                  // whitespace: true,
                },
              ]}
              noStyle
            >
              <Select mode="multiple" allowClear placeholder={t("selectthetypeofactivities")} size={'large'} style={{ width: '100%', }}>
                  {ActivityType.map((e)=>(

                    e&&<Option value={e.id}>{e.label}</Option>

                  ))}
              </Select>
              </Form.Item>
          </Col>

          <Col span={12}>
          <Button
                type="link"
                onClick={() => {
                  setOpen({open:true,
                  url:"ActivityTypes",
                  data:`${t("Typeofactivities")}`});
                }}
            >
            <PlusOutlined/> {t("TypeofactivitiesButton")} 
          </Button>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item label={t("ProductsServices")}       {...formItemLayout}>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="product"
              label={t("ProductsServices")} 
              //   rules={[
              //   {
              //     required: true,
              //     message: `${t("pleaseselecttheproductservice")}`,
              //     // whitespace: true,
              //   },
              // ]}
              noStyle
            >
              <Select mode="multiple" allowClear placeholder={t("selecttheproductsservices")} onChange={e=>setProductselected(Product.filter(p=> e.includes(p.id)))}  size={'large'} style={{ width: '100%', }}>
                  {Product.map((e)=>(

                    e&&<Option value={e.id}>{e.label}</Option>

                  ))}
              </Select>
              </Form.Item>
          </Col>

          <Col span={12}>
          <Button
                type="link"
                onClick={() => {
                  setOpen({open:true,
                  url:"Products",
                  data:`${t("ProductsServices")}`});
                }}
            >
            <PlusOutlined/>{t("ProductsServicesButton")} 
          </Button>
          </Col>
        </Row>
      </Form.Item>
      <Divider orientation="left">{t("Managementteam")}</Divider>

      <Space
        style={{
          display: 'flex',
          marginBottom: 8,

        }}
        align="baseline"
      >

      <Form.Item
        name="managers"
        label={t("Leadersname")}
      >
        <Select  
          style={{
            width: 200,
          }}
          size={'large'}
          placeholder={t("selectleader")}
          // optionFilterProp="children"
          onChange={e=>setManagerId(e)}
                // filterOption={(input, option) => (option?.label ?? '').includes(input)}
          // filterSort={(optionA, optionB) =>
          //   (optionA ?? '').toLowerCase().localeCompare((optionB ?? '').toLowerCase())
          // }
          options= {filteredmanagerOptions.map((item) => ({
            value: item.id,
            label: item.name+' '+item.firstName,
          }))}
        />
          
      </Form.Item>

      <Tooltip title={t("addnewmanager")}>
      <Button
          type="link"
          onClick={() => {
            setOpen({open:true,
            url:"Managers",
            data:"Managers"});
          }}
      >
      <PlusOutlined/>
      </Button>
      </Tooltip>
      
      <Button
          type="link"
          onClick={() => {
            setOpen({open:true,
            url:"Titles",
            data:"Title"});
          }}
      >
      <SettingOutlined /> {t("Managetitles")}
      </Button>

    <Form.Item name="add">
      <Button  onClick={()=>addManagerdata()}>
      <CaretDownOutlined />{t("addtolist")}
      </Button>
    </Form.Item>

   
      </Space>

      <Form form={form1} onFinish={Edited}>
            <Table
              bordered
              dataSource={ManagerData}
              columns={managercolumns}
            />
          </Form>
    {/* <Table
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={ManagerData}
        columns={managercolumns}

      /> */}
      

      <Divider orientation="left">{t("Legalstructure")}</Divider>



      <Space
        style={{
          display: 'flex',
          marginBottom: 8,

        }}
        align="baseline"
      >

      <Form.Item
        name="shareholdersname"
        label={t("ShareHolders")}
      >
        <Select  
          style={{
            width: 200,
          }}
          size={'large'}
          placeholder={t("selectShareHolders")}
          // optionFilterProp="children"
          onChange={e=>setShareHolderId(e)}
                // filterOption={(input, option) => (option?.label ?? '').includes(input)}
          // filterSort={(optionA, optionB) =>
          //   (optionA ?? '').toLowerCase().localeCompare((optionB ?? '').toLowerCase())
          // }
          id="selectedshareholder"
          options= {filteredshareholderOptions.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
        />
          
      </Form.Item>

      <Tooltip title={t("addnewholder")}>

<Button
  type="link"
  onClick={() => {
    setOpen({open:true,
    url:"ShareHolders",
    data:`${t("ShareHolders")}` });
  }}
>
  <PlusOutlined/>
</Button>
</Tooltip>



    <Form.Item name="add">
      <Button  onClick={()=>addShareholderdata()}>
      <CaretDownOutlined />{t("addtolist")}      
      </Button>
    </Form.Item>

   
      </Space>
      <Form form={form2} onFinish={Edited}>
        <Table
            bordered
            dataSource={shareHolderData}
            columns={shareholdercolumns}
        />
      </Form>
    <Form.Item {...tailFormItemLayout}>
      
      <Space style={{marginTop:10}}>
          <Button type="primary" htmlType="submit" style={{width:"auto"}} >
          {t("submit")}
          </Button>
          <Button htmlType="button" onClick={gotoGI}>
          {t("cancel")}
          </Button>
        </Space>
    </Form.Item>
    
  </Form>

    )}</>
  )
}

export default UpdateCompany