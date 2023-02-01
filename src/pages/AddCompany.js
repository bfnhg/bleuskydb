import React, { useState,useEffect,useRef } from "react";
import axios from 'axios';
import TutorialDataService from "../services/TutorialService";
import { NavLink,useHistory } from 'react-router-dom';
import {JSON_API} from '../services/Constants';
import {PlusOutlined,SettingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import {
  DatePicker,
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Collapse,
  Col,
  Form,
  Input,
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

  // needed of update

 

       
const AddCompany = () => {
  const ref = useRef(null);
  let {t} =useTranslation();

  const [shareHolderData, setShareHolderData] = useState([]);
  const [ManagerbyId, setManagerbyId] = useState({});

  const [ManagerData, setManagerData] = useState([]);
  // new Date().toLocaleDateString('en-US')
  const [Cdate, setDate] = useState();

  const [count, setCount] = useState(2);
  
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
    },
    {
      title: `${t("Leadersname")}`,
      dataIndex: 'name',
      width: '30%',
    },
    {
      title: `${t("Shares")}`,
      dataIndex: 'shares',
    },
    {
      title: `${t("Startdate")}`,
      dataIndex: 'datestring',
    },
    {
      title: 'Actions',
      dataIndex: 'operation',
      render: (_, record) =>
        shareHolderData.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleshareholderDelete(record.id)}>
            <a>{t("Delete")}</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const defaultmanagerColumns = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: `${t("Lastname")}`,
      dataIndex: 'name',
      width: '30%',
    },
    {
      title: `${t("Firstname")}`,
      dataIndex: 'firstName',
    },
    {
      title: `${t("Yearsofexperience")}`,
      dataIndex: 'yearsofExperience',
    },

    {
      title: 'Actions',
      dataIndex: 'operation',
      render: (_, record) =>
      ManagerData.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handlemanagerDelete(record.id)}>
            <a>{t("Delete")}</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const shareholdercolumns = defaultshareholderColumns.map((col) => {
    // if (!col.editable) {
      return col;
    // }
    // return {
    //   ...col,
    //   onCell: (record) => ({
    //     record,
    //     editable: col.editable,
    //     dataIndex: col.dataIndex,
    //     title: col.title,
    //     handleSave,
    //   }),
    // };
  });
  const managercolumns = defaultmanagerColumns.map((col) => {
      return col;
  });
  // const handleAdd = () => {
  //   const newData = {
  //     key: count,
  //     name: `Edward King ${count}`,
  //     age: '32',
  //     address: `London, Park Lane no. ${count}`,
  //   };
  //   setShareHolderData([...shareHolderData, newData]);
  //   setCount(count + 1);
  // };
  // const handleSave = (row) => {
  //   const newData = [...shareHolderData];
  //   const index = newData.findIndex((item) => row.key === item.key);
  //   const item = newData[index];
  //   newData.splice(index, 1, {
  //     ...item,
  //     ...row,
  //   });
  //   setShareHolderData(newData);
  // };

    // needed of update
const [TypeIndustries,setTypeIndustries]=useState([{}]);
const [Market,setMarket]=useState([{}]);
const [RevenueModel,setRevenueModel]=useState([{}]);
const [MainCustomer,setMainCustomer]=useState([{}]);
const [BusinessPartner,setBusinessPartner]=useState([{}]);
const [StrategicTarget,setStrategicTarget]=useState([{}]);
const [ActivityType,setActivityType]=useState([{}]);
const [Product,setProduct]=useState([{}]);
const [ShareHolders,setShareHolders]=useState([{}]);
const [Managers,setManagers]=useState([{}]);
const [Titles,setTitles]=useState([{}]);
const [TitlesData,setTitlesData]=useState([{}]);
const [Datestart,setDatestart]=useState();
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
  {
    return ["Shareholder","Main customers","Business partners","Strategic Target"].includes(data.data)?
      <Modal
        open={open}
        title={"Create a new "+data.data}
        okText="Create"
        cancelText="Cancel"
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
          label="Name"
          
          rules={[
            {
              required: true,
              message: `Please input the ${data.data} name!`,
            },
          ]}
        >
          <Input placeholder={data.data+"  name"}/>
        </Form.Item>
      </Form>
      </Modal> 
      :data.data==="Managers"?
      <Modal
        open={open}
        title={"Create a new manager"}
        okText="Create"
        cancelText="Cancel"
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
          label="Lastname"
          
          rules={[
            {
              required: true,
              message: `Please input the manager lastname!`,
            },
          ]}
        >
          <Input placeholder={data.data+"  lastname"}/>
        </Form.Item>
        <Form.Item
          name="firstName"
          label="Firstname"
          
          rules={[
            {
              required: true,
              message: `Please input the manager firstname!`,
            },
          ]}
        >
          <Input placeholder={data.data+"  firstname"}/>
        </Form.Item>

      <Form.Item
          name="titles"
          label="Titles"
          
        >
        <Select mode="multiple" allowClear placeholder="select manager's titles" size={'large'} onChange={titlesState}>
            {Titles.map((e)=>(

              e&&<Option value={e.id}>{e.label}</Option>

            ))}
        </Select>
      
      </Form.Item>
     

      <Form.Item
        name="yearsofexperience"
        label="Years of experience"
      >
        <InputNumber
          // disabled={SHselected}
          min={0}
          max={100}
          size={'large'}
        />

      </Form.Item>
      </Form>
      </Modal>
       :data.data==="Title"?
       <Modal
            open={open}
            title={Tabkey=='1'?"Create a new title":"Edit titles"}
            okText={Tabkey=='1'?"Create":"Save"}
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
              console.log(Tabkey);
              if(Tabkey=="1"){
              form
                .validateFields()
                .then((values) => {
                  
                  form.resetFields();
                  
                    onCreate({values:values,url:data.url,data:data.data});
                  }
                
                )
                .catch((info) => {
                  console.log('Validate Failed:', info);
                });
              }else{
                console.log("title updated");
              }
            }}
            >
      <Tabs
       defaultActiveKey="1"
       onChange={onTabChange}
       items={[
         {
           label: 'Add title',
           key: '1',
           children: 
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
            label="Label"
            
            rules={[
              {
                required: true,
                message: `Please input the ${data.data} label!`,
              },
            ]}
            >
            <Input placeholder={data.data+"  label"}/>
            </Form.Item>
            </Form>
            },
            {
              label: 'Edit Titles',
              key: '2',
              children: 'Tab 2',
              disabled: true,
            },
          ]}
        />
            </Modal> 
        
       
       :

      <Modal
      open={open}
      title={"Create a new "+data.data}
      okText="Create"
      cancelText="Cancel"
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
      label="Label"
      
      rules={[
        {
          required: true,
          message: `Please input the ${data.data} label!`,
        },
      ]}
      >
      <Input placeholder={data.data+"  label"}/>
      </Form.Item>
      </Form>
      </Modal> 
  }
};

    // needed of update
useEffect(()=>{getData();},[]);
  const getData = async () =>{

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

    await axios.get(`${JSON_API}/MainCustomers`)
    .then((response) => {
      setMainCustomer(response.data);
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

    await axios.get(`${JSON_API}/StrategicTargets`)
    .then((response) => {
      setStrategicTarget(response.data);
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

    await axios.get(`${JSON_API}/Products`)
    .then((response) => {
      setProduct(response.data);
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

    await axios.get(`${JSON_API}/ShareHolders`)
    .then((response) => {
      setShareHolders(response.data);
      console.log(ShareHolders,'ShareHolders');

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

    await axios.get(`${JSON_API}/Managers`)
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
const [Managerexp,setManagerexp]=useState();
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

    await axios.post(`${JSON_API}/${url}`,values)
    .then((response) => {
      getData();
      console.log('values were added to ' + data + " Successfully!");

      messageApi.open({
        type: 'success',
        content: 'values were added to ' + data + " Successfully!",
      });
    })
    setOpen(false);
  };

  const onFinish = (values) => {

  console.log('Received values of form: ', values);
  console.log('Received manager data of form: ', ManagerData);
  console.log('Received shareholder of form: ', shareHolderData);

  };

  const initialCompanyState = {
    id: null,
    nom_de_la_société:"",
    adresse:"",
    ville:"",
    province:"",// dropdrown list
    code_postal:"",
    pays:"",
    date_de_fondation:"", //ex  date selector 01/01/2022
    date_fin_exercice:"", //ex date selector 12/31/2022
    numéro_entreprise:null, //ex 1700
    nombre_employés:null, //5
    type_industrie:"", // ex dropdown list
    budget:"", //ex ex dropdown list 100-1000  , +5000
    taux_imposition_annuel_estimé:null, //ex 0
    Target_customers:{},

  };
   // needed of update
   const [company, setCompany] = useState(initialCompanyState);
    // needed of update
  const [submitted, setSubmitted] = useState(false);
  
  const addShareholderdata = () => {
    if(shareHolderId){
      console.log("before add:",shareHolderData)

      const d= ShareHolders.filter(e=>e.id===shareHolderId);
        setShareHolderData([...shareHolderData, {
          id:d.length>0 && d[0].id,
          name: d.length>0 && d[0].name,
          shares:shareHolderShares&&shareHolderShares+"%",
          date:Cdate&&Cdate.date,
          datestring:Cdate&&Cdate.d
        }]);
    }
        console.log("after add:",shareHolderData);
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
          yearsofExperience:m[0].yearsofExperience,
        }]);
      }
      

       


    console.log("manager id info:",m[0].id);
    console.log("manager name info:",m[0].name);
    console.log("manager firstname info:",m[0].firstName);
    console.log("manager title info:",m[0].titles);
    console.log("manager yearsofExperience info:",m[0].yearsofExperience);

    console.log("ManagerData state:",ManagerData);

    

    

  }

  const displaydata=()=>{
    console.log("shareHolderData:",shareHolderData);
    console.log("datestart :",Datestart);


  }

  const titlesState = event => {
    console.log(event);
    // setTitlesData(event)
  }
  const handleInputChange = event => {
    const { name, value } = event.target;
    setCompany({ ...company, [name]: value });
  };
  
  const saveCompany = async(values) => {

    console.log('Received values of form: ', values);
    console.log('Received manager data of form: ', ManagerData);
    console.log('Received shareholder of form: ', shareHolderData);

    var companyinfo = {
      name: values.nom_de_la_société,
      businessNumber: values.numéro_entreprise,
      // budgetRange: values.budget,
      startingDate: values.date_de_fondation,
      endDate: values.date_fin_exercice,
      empoyeesCount: values.nombre_employés,
      address: values.adresse,
      postalCode: values.code_postal,
      // cityId: values.ville,
      taxes: values.taux_imposition_annuel_estimé,
      activityTypes: values.activity_type,
      products: values.product,
      mainCustomers: values.main_customers,
      markets: values.market,
      revenueModelItems: values.revenue_model,
      businessPartners: values.business_partners,
      industryTypes: values.type_industrie,
      strategicTargets: values.strategic_target,
      managers: ManagerData.map(i=>i.id),
      shareHolders:shareHolderData.map(i=>{return{
        shareHolderId:i.id,
        shares: i.shares.replace('%',''),
        startedAt:i.date
      }})

     
        

      
    };
    console.log('Received values of form: ', companyinfo);

    axios.post(`${JSON_API}/Enterprises`,companyinfo)
    .then(response => {
      setSubmitted(true);
      console.log(response.data);

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
       title="Your Company has been added successfully"
       extra={[
         <Button type="primary" onClick={newCompany} key="console">
           Add another company
         </Button>,
         <Button type="link" onClick={gotoGI}>
         <span className="label">Return to General Informations</span>
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
      }}
      scrollToFirstError
    >
    

    <Title>{t("AddCompany")}</Title>
    <Text type="secondary">{t("textButtonAJT")}</Text>
<Divider orientation="left">{t("generalinf")}</Divider>
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

      name="adresse"
      label={t("address")}
           >
      <Input />
    </Form.Item>

    <Form.Item
          {...formItemLayout}

      name="pays"
      label={t("country")}
       
      // tooltip="What do you want others to call you?"
      
    >
      <Input />
    </Form.Item>

    <Form.Item
          {...formItemLayout}

      name="province"
      label={t("province")}
       
      // tooltip="What do you want others to call you?"
    >
      <Select placeholder={t("ProvinceSelect")}>
        <Option value="ON">ON</Option>
        <Option value="QC">QC</Option>
        <Option value="NS">NS</Option>
        <Option value="NB">NB</Option>
        <Option value="MB">MB</Option>
        <Option value="BC">BC</Option>
        <Option value="SK">SK</Option>
        <Option value="AB">AB</Option>
        <Option value="NL">NL</Option>
      </Select>
    </Form.Item>

    <Form.Item
          {...formItemLayout}

      name="ville"
      label={t("city")}
       
      // tooltip="What do you want others to call you?"
  
    >
      <Input />
    </Form.Item>

  

    <Form.Item
          {...formItemLayout}

      name="code_postal"
      label={t("postalcode")}
       
    >
      <Input />
    </Form.Item>

   

    <Form.Item
          {...formItemLayout}

      name="date_de_fondation"
      label={t("foundingdate")}
     
      // tooltip="What do you want others to call you?"
      // validateStatus="error"
      // help="Please select right date"
    >
        <DatePicker format={"YYYY-MM-DD"} size={'large'} onChange={(date) => {
      const d = new Date(date).toLocaleDateString('en-US');
      console.log(d);
      setDatestart(d);
    }}/>

    </Form.Item>

    <Form.Item
      {...formItemLayout}

      name="date_fin_exercice"
      label={t("Yearenddate")}
       
    >
      <DatePicker format={"YYYY-MM-DD"} size={'large'} onChange={(date) => {
      const d = new Date(date).toLocaleDateString('en-US');
      console.log(d);
      setDateend(d);
    }}/>
    </Form.Item>
 
    <Form.Item
          {...formItemLayout}

      name="numéro_entreprise"
      label={t("Businessnumber")}
     
    >
      <Input />
    </Form.Item>

    <Form.Item
          {...formItemLayout}

      name="nombre_employés"
      label={t("Numberofemployees")}
      rules={[
        {
          type: 'number',
          min: 0,
          message: 'value cannot be less than 0',

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
            <PlusOutlined/>{t("AddnewtypeIndustry")}
          </Button>
         
          </Col>
        </Row>
      </Form.Item>





    
   
    <Form.Item
          {...formItemLayout}

      name="budget"
      label="budget"
       
      value={company.budget}

    >
      <Select placeholder={t("selectthebudget")}>
        <Option value="50-100">50 - 100</Option>
        <Option value="100-1000">100 - 1000</Option>
        <Option value="+1000">+1000</Option>
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
          message: 'please enter a number between 0 and 100',

        },
      ]}
    >
      <InputNumber />
   
    </Form.Item>

    <Divider orientation="left">{t("Targetcustomers")}</Divider>


    <Form.Item label={t("Market")}      {...formItemLayout}>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="market"
              label={t("Market")}  
              noStyle
            >
              <Select mode="multiple" allowClear placeholder={t("selectthemarket")}   size={'large'} style={{ width: '100%', }}>
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
            <PlusOutlined/> {t("AddnewmarketButton")}  
          </Button>
     
          </Col>
        </Row>
      </Form.Item>

      <Form.Item label= {t("MainCustomers")}      {...formItemLayout}>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="main_customers"
              label={t("MainCustomers")}  
              noStyle
              // rules={[{ required: true, message: 'Please input the main customers!'}]}
            >
              <Select mode="multiple" allowClear placeholder={t("selectthemaincustomers")}   size={'large'} style={{ width: '100%', }}>
                  {MainCustomer.map((e)=>(

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
                  url:"MainCustomers",
                  data:`${t("MainCustomers")}`});
                }}
            >
            <PlusOutlined/> {t("AddnewcustomerButton")}
          </Button>
          </Col>
        </Row>
      </Form.Item>

    
      <Form.Item label={t("RevenueModel")}     {...formItemLayout} >
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="revenue_model"
              label={t("RevenueModel")} 
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
                  data:`${t("RevenueModel")}`   });
                }}
            >
            <PlusOutlined/> {t("RevenueModelButton")} 
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
              noStyle
              // rules={[{ required: true, message: 'Please input the business partner!'}]}
            >
              <Select mode="multiple" allowClear placeholder={t("selectthebusinesspartners")}  size={'large'} style={{ width: '100%', }}>
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
            <PlusOutlined/> {t("Addnewbusinesspartner")}
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
              noStyle
            >
              <Select mode="multiple" allowClear placeholder={t("selectthestrategictarget")}  size={'large'} style={{ width: '100%', }}>
                  {StrategicTarget.map((e)=>(

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
                  url:"StrategicTargets",
                  data:`${t("Strategictargets")}` });
                }}
            >
            <PlusOutlined/> {t("StrategictargetsButton")}
          </Button>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item label={t("Typeofactivities")}        {...formItemLayout}>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="activity_type"
              label={t("Typeofactivities")}
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
            <PlusOutlined/>{t("TypeofactivitiesButton")} 
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
              noStyle
            >
              <Select mode="multiple" allowClear placeholder={t("selecttheproductsservices")}  size={'large'} style={{ width: '100%', }}>
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
            <PlusOutlined/> {t("ProductsServicesButton")} 
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
      <PlusOutlined/>{t("Addmanager")}
      </Button>
    </Form.Item>

   
      </Space>
     {ManagerData.length>0&&<Table
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={ManagerData}
        columns={managercolumns}

      />}
      

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
          placeholder="Search to Select"
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


      <Form.Item
        name="shares"
        label={t("Shares")}
      >
        <InputNumber
          // disabled={SHselected}
          min={0}
          max={100}
          size={'large'}
          formatter={(value) => `${value}%`}
          parser={(value) => value.replace('%', '')}
          onChange={e=>setShareHolderShares(e)}

        />

      </Form.Item>
      
      


      <Form.Item
      name="shares_startdate"
      label={t("Startdate")}
      >
        <DatePicker format={"YYYY-MM-DD"} size={'large'} onChange={(date) => {
      const d = new Date(date).toLocaleDateString('en-US');
      console.log(date);
      setDate({date,d});
    }}/>
      </Form.Item>

    <Form.Item name="add">
      <Button  onClick={()=>addShareholderdata()}>
      <PlusOutlined/>{t("CreateanewShareholder")}
      </Button>
    </Form.Item>

   
      </Space>
     {shareHolderData.length>0 && <Table
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={shareHolderData}
        columns={shareholdercolumns}

      />}
      

      

    <Form.Item {...tailFormItemLayout}>
      <Button type="primary" htmlType="submit">
        {t("submit")}
      </Button>
      <Button htmlType="button">
            Cancel
          </Button>
    </Form.Item>
   
  </Form>

    )}</>
  )
}

export default AddCompany