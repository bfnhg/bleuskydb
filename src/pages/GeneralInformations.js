import { Radio,Card,DatePicker,Select,Divider,Typography,Row,Col,Button,Descriptions,Modal,Avatar,Tabs, Form, Input,Tag  } from 'antd';
import axios from 'axios';
import React,{useState,useEffect, useContext} from 'react';
import { Redirect,NavLink,useHistory } from 'react-router-dom';
import {JSON_API} from '../services/Constants';
import { ExclamationCircleOutlined,CaretRightOutlined,EditOutlined,SaveFilled,DeleteOutlined     } from '@ant-design/icons';
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

  const showDeleteConfirm = () => {
    confirm({
      title: `Are you sure you want to delete ${Company.name} company ?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
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
                  <Button disabled={Actionstate} onClick={() => generateUpdateformdata()}> <EditOutlined /> Edit company</Button>
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
                  <Button type='link' danger onClick={showDeleteConfirm} ><DeleteOutlined /> Delete company</Button>
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
    <Tabs.TabPane tab="General Information" key="1">

      <Descriptions  bordered size={"small"}>
        <Descriptions.Item label={t("company name")}>{Company.name?Company.name:""}</Descriptions.Item>
        <Descriptions.Item label="Business number">{Company.businessNumber?Company.businessNumber:""}</Descriptions.Item>
        <Descriptions.Item label="Type of industry">{Company.industryTypes&&Company.industryTypes.map((e)=>{return (<Tag>{e.label}</Tag> )})}</Descriptions.Item>
        <Descriptions.Item label="Address">{Company.address?Company.address:""}</Descriptions.Item>
        <Descriptions.Item label="City">{Company.city?Company.city:""}</Descriptions.Item>
        <Descriptions.Item label="Postal code">{Company.postalCode?Company.postalCode:""} </Descriptions.Item>

        <Descriptions.Item label="Founding date">{Company.startingDate?dayjs(Company.startingDate).format('YYYY/MM/DD'):""}</Descriptions.Item>
        <Descriptions.Item label="Year-end date">{Company.endDate?dayjs(Company.endDate).format('YYYY/MM/DD'):""}</Descriptions.Item>
        {/* <Descriptions.Item label="Country">{Company&&Company.pays}</Descriptions.Item> */}
        {/* <Descriptions.Item label="Province">{Company&&Company.province}</Descriptions.Item> */}
        <Descriptions.Item label="Number of employees">{Company.empoyeesCount?Company.empoyeesCount:""}</Descriptions.Item>
        <Descriptions.Item label="Budget">{Company.budget?Company.budget:""}</Descriptions.Item>
        <Descriptions.Item label="Estimated annual tax rate">{Company.taxes?(Company.taxes+"%"):""}</Descriptions.Item>
      </Descriptions>

    </Tabs.TabPane>

    <Tabs.TabPane tab="Target customers" key="2">
      <Descriptions bordered   size={"small"}>
        <Descriptions.Item label="Market">{Company.markets&&Company.markets.map((e)=>{return (<Tag>{e.label}</Tag> )})}</Descriptions.Item>
        <Descriptions.Item label="The main customers">{Company.mainCustomers&&Company.mainCustomers.map((e)=>{return (<Tag>{e.name}</Tag> )})}</Descriptions.Item>
        <Descriptions.Item label="Revenue model">{Company.revenueModelItems&&Company.revenueModelItems.map((e)=>{return (<Tag>{e.label}</Tag> )})}</Descriptions.Item>
        <Descriptions.Item label="Business partners">{Company.businessPartners&&Company.businessPartners.map((e)=>{return (<Tag>{e.name}</Tag> )})}</Descriptions.Item>
      </Descriptions>
    </Tabs.TabPane>

    {/* <Tabs.TabPane tab="Tab 3" key="3">
      Content of Tab Pane 3
    </Tabs.TabPane> */}
  </Tabs>
  </Form>

  </Card>




  

 

  </>
  )
}

export default GeneralInformations