import { Radio,Card,DatePicker,Select,Divider,Typography,Row,Col,Button,Descriptions,Modal,Avatar,Tabs, Form, Input,Tag,Table  } from 'antd';
import axios from 'axios';
import React,{useState,useEffect, useContext} from 'react';
import { Redirect,NavLink,useHistory } from 'react-router-dom';
import {JSON_API} from '../services/Constants';
import { ExclamationCircleOutlined,CaretRightOutlined,EditOutlined,SaveFilled,DeleteOutlined, PicCenterOutlined     } from '@ant-design/icons';
import moment from 'moment';
import BgProfile from "../assets/images/bg-profile.jpg";
import { CompanyContext } from '../contexts/CompanyContext';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useTranslation } from 'react-i18next';
dayjs.extend(customParseFormat);

const { TextArea } = Input;
const { confirm } = Modal;
const { Title,Text } = Typography;
const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';
const { Meta } = Card;


const GeneralInformations = () => {
  const history = useHistory();
  let {t} =useTranslation();
  const {Lang,setLang,Shares,setShares,ShareHolders,setShareHolders,Product,setProduct,ActivityType,setActivityType,StrategicTarget,setStrategicTarget,BusinessPartner,setBusinessPartner,MainCustomer,setMainCustomer,RevenueModel,setRevenueModel,Companies,setCompanies,Company,setCompany,Actionstate,setActionstate,Edited,setEdited,TypeIndustries,setTypeIndustries,Market,setMarket}=useContext(CompanyContext);
  const [ManagerData, setManagerData] = useState([]);

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
      title: `${t("Nameshareholders")}`,
      dataIndex: 'name',
      width: '30%',
      align:"center",
      render: (_, record) =>(
        <div style={{textAlign: "left"}}>{record.name}</div>
      )
    },
    {
      title: `${t("percentshares")}`,
      dataIndex: 'shares',
      align:"center",
      render: (_, record) =>(
          <div style={{textAlign: "right"}}>{record.shares}%</div>
        )
    },
    {
      title:  `${t("Startdate")}`,
      dataIndex: 'startedAt',
      align:"center",
      render: (_, record) =>(
          <div style={{textAlign: "center"}}>{dayjs(record.startedAt).format('YYYY/MM/DD')}</div>
        )
    },
    
  ];
  const defaultmanagerColumns = [
    {
      title: 'Id',
      dataIndex: 'id',
      align:"center",
      render: (text, record) =>(
        <div style={{textAlign: "right"}}>{text}</div>
      )
    },
    {
      title: `${t("Lastname")}`,
      dataIndex: 'name',
      width: '30%',
      align:"center",
      render:(text,record)=><div style={{textAlign: "left"}}>{text}</div>

    },
    {
      title: `${t("Firstname")}`,
      dataIndex: 'firstName',
      align:"center",
      render:(text,record)=><div style={{textAlign: "left"}}>{text}</div>

    },
    {
      title: `${t("Titles")}`,
      dataIndex: 'titles',
      align:"center",
      render :(_,record)=>{
       return record.titles.map(o=><Tag >{o.title.label}</Tag> )
      }
    },
    {
      title: `${t("Yearsofexperience")}`,
      dataIndex: 'yearsOfExperience',
      align:"center",
      render:(text,record)=><div style={{textAlign: "right"}}>{text}</div>
    }
  ];
  const showDeleteConfirm = () => {
    confirm({
      title: `${t("deletecompanytext")} ${Company.name} ?`,
      icon: <ExclamationCircleOutlined />,
      okText: `${t("yes")}`,
      okType: 'danger',
      cancelText: `${t("no")}`,
      onOk() {
        deleteCompany();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
   

  };
  const [UpdateData,setUpdateData]=useState({
    id:"",
    name: "",
          adresse: "",
          ville: "",
          province: "",
          code_postal: "",
          pays: "",
          date_de_fondation: "",
          date_fin_exercice: "",
          numéro_entreprise: "",
          nombre_employés: "",
          type_industrie: "",
          budget: "",
          taux_imposition_annuel_estimé: "",
          Target_customers:{ 
            market:"",
            main_customers:"",
            revenue_model:"",
            business_partners:"",
          }
  });
  const deleteCompany = async () => {
    await axios.delete(`${JSON_API}/Enterprises/${Company.id}`)
    .then((response) => alert("Company deleted successfully"))
    setCompany({});
    getCompanies();
  };
  const updateCompany = async () => {
    await axios.put(`${JSON_API}/companies/${UpdateData.id}`,UpdateData)
    .then((response) => alert("Company updated successfully"))

    await axios.get(`${JSON_API}/companies/${UpdateData.id}`)
    .then((response) => {
      setCompany(response.data);
    })
    setEdited(true);

    // let path = `/generalinformations`; 
    // history.push(path);  
  };


  // useEffect(()=>{getCompanies();},[]);

  const getCompanies = async () =>{

    await axios.get(`${JSON_API}/Enterprises`)
    .then((response) => {
      setCompanies(response.data);
    })

  };
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const generateUpdateformdata = () => {
    // setEdited(false);
    let path = `/updatecompany`; 
    history.push(path);
    // setUpdateData({
    //   id:Company.id,
    //   name: Company.name,
    //   adresse:Company.adresse,
    //   ville: Company.ville,
    //   province: Company.province,
    //   code_postal: Company.code_postal,
    //   pays: Company.pays,
    //   date_de_fondation: Company.date_de_fondation,
    //   date_fin_exercice: Company.date_fin_exercice,
    //   numéro_entreprise: Company.numéro_entreprise,
    //   nombre_employés:Company.nombre_employés,
    //   type_industrie: Company.type_industrie,
    //   budget:Company.budget,
    //   taux_imposition_annuel_estimé:Company.taux_imposition_annuel_estimé,
    //   Target_customers:{ 
    //     market:Company.Target_customers?Company.Target_customers.market:"",
    //     main_customers:Company.Target_customers?Company.Target_customers.main_customers:"",
    //     revenue_model:Company.Target_customers?Company.Target_customers.revenue_model:"",
    //     business_partners:Company.Target_customers?Company.Target_customers.business_partners:"",
    //   }
    // });
  };
  
  return (
    <>

    {


Company.name &&



  <Card bordered={false} className="header-solid mb-24">
<Row justify="space-between" align="middle" > 
  <Col span={24} md={12} className="col-info">
                <Meta
                  avatar={<Avatar size={74} shape="square" style={{backgroundColor: '#f56a00',}}> {Company.name} </Avatar>}
                  title={Company.name}
                  description={Company.industryTypes.map((e)=>(
                    TypeIndustries.map((type)=> {  return (type.id===e.id&&<Tag>{type.label}</Tag> )})
                  ))}
                />
                </Col>

              <Col  span={12} md={6}
              
                style={{
                display: "flex",
                  alignItems: "center",
                justifyContent: "flex-end",
                }}
              >
              {/* <Radio.Group>
                <Radio.Button value="edit" ><EditOutlined /> Edit company </Radio.Button>
                <Radio.Button value="delete" danger><DeleteOutlined /> Delete company</Radio.Button>
              </Radio.Group> */}
                  <Button disabled={Actionstate} onClick={() => generateUpdateformdata()}> <EditOutlined /> {t("editcompany")} </Button>
              </Col>
              <Col  span={12} md={6}
              
                style={{
                display: "flex",
                  alignItems: "center",
                justifyContent: "flex-end",
                }}
              >
              {/* <Radio.Group>
                <Radio.Button value="edit" ><EditOutlined /> Edit company </Radio.Button>
                <Radio.Button value="delete" danger><DeleteOutlined /> Delete company</Radio.Button>
              </Radio.Group> */}
                  <Button type='link' danger onClick={showDeleteConfirm} ><DeleteOutlined /> {t("deletecompany")}</Button>
              </Col>
              </Row>
  </Card>


}


<Card bordered={false} className="header-solid mb-24" >
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
    
      // initialValues={{
      //   remember: true,
      // }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      // autoComplete="off"
    >
<Tabs defaultActiveKey="1">
    <Tabs.TabPane tab={t("generalinf")} key="1">

      <Descriptions  bordered >
        <Descriptions.Item label={t("companyname")}>{Company.name?Company.name:""}</Descriptions.Item>
        <Descriptions.Item label={t("Businessnumber")}>{Company.businessNumber?Company.businessNumber:""}</Descriptions.Item>
        <Descriptions.Item label={t("Typeofindustry")}>{Company.industryTypes&&Company.industryTypes.map((e)=>{return (<Tag>{e.label}</Tag> )})}</Descriptions.Item>
        <Descriptions.Item label={t("address")}>{Company.address?Company.address:""}</Descriptions.Item>
        <Descriptions.Item label={t("city")}>{Company.city?Company.city.name:""}</Descriptions.Item>
        <Descriptions.Item label={t("Postalcode")}>{Company.postalCode?Company.postalCode:""} </Descriptions.Item>
        <Descriptions.Item contentStyle={{textAlign:'center'}} label={t("Foundingdate")}>{Company.startingDate?dayjs(Company.startingDate).format('YYYY/MM/DD'):""}</Descriptions.Item>
        <Descriptions.Item contentStyle={{textAlign:'center'}} label={t("Yearenddate")}>{Company.endDate?dayjs(Company.endDate).format('YYYY/MM/DD'):""}</Descriptions.Item>
        <Descriptions.Item contentStyle={{textAlign:'right'}} label={t("Numberofemployees")}>{Company.employeesCount?Company.employeesCount:""}</Descriptions.Item>
        <Descriptions.Item label="Budget">{Company.budgetRange?Company.budgetRange==0?"50 - 100":Company.budgetRange==1?"100 - 1000":"+1000":""}</Descriptions.Item>
        <Descriptions.Item contentStyle={{textAlign:'right'}} label={t("Estimatedannualtaxrate")}>{Company.taxes?(Company.taxes+"%"):""}</Descriptions.Item>
      </Descriptions>

    </Tabs.TabPane>

    <Tabs.TabPane tab={t("Targetcustomers")} key="2">
      <Descriptions bordered  >
        <Descriptions.Item label={t("Market")}>{Company.markets&&Company.markets.map((e)=>{return (<Tag>{e.label}</Tag> )})}</Descriptions.Item>
        <Descriptions.Item label={t("Themaincustomers")}>{Company.customers&&Company.customers.map((e)=>{return (<Tag>{e.name}</Tag> )})}</Descriptions.Item>
        <Descriptions.Item label={t("RevenueModel")}>{Company.revenueModelItems&&Company.revenueModelItems.map((e)=>{return (<Tag>{e.label}</Tag> )})}</Descriptions.Item>
        <Descriptions.Item label={t("Businesspartners")}>{Company.businessPartners&&Company.businessPartners.map((e)=>{return (<Tag>{e.name}</Tag> )})}</Descriptions.Item>
      </Descriptions>
    </Tabs.TabPane>

    <Tabs.TabPane tab={t("Descriptionofservicesandproducts")} key="3">
      <Descriptions bordered   >
        <Descriptions.Item label={t("Strategictargets")}>{Company.strategicTargets&&Company.strategicTargets.map((e)=>{return (<Tag>{e.type}</Tag> )})}</Descriptions.Item>
        <Descriptions.Item label={t("Typeofactivities")}>{Company.activityTypes&&Company.activityTypes.map((e)=>{return (<Tag>{e.label}</Tag> )})}</Descriptions.Item>
        <Descriptions.Item label={t("Descriptionofservicesandproducts")}>{Company.products&&Company.products.map((e)=>{return (<Tag>{e.label}</Tag> )})}</Descriptions.Item>
      </Descriptions>
    </Tabs.TabPane>

    <Tabs.TabPane tab={t("Managementteam")} key="4">
     {Company.managers&&<Table
        bordered
        dataSource={Company.managers}
        columns={defaultmanagerColumns}

      />}
    </Tabs.TabPane>

    <Tabs.TabPane tab={t("Legalstructure")} key="5">
    {Company.shareHolders&& <Table
        bordered
        dataSource={Company.shareHolders}
        columns={defaultshareholderColumns}

      />}
    </Tabs.TabPane>
  </Tabs>
  </Form>

  </Card>




  

 

  </>
  )
}

export default GeneralInformations