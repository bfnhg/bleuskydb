import { Radio,Card,DatePicker,Select,Divider,Typography,Row,Col,Button,Descriptions,Modal,Avatar,Tabs, Form, Input  } from 'antd';
import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { Redirect,NavLink } from 'react-router-dom';
import { ExclamationCircleOutlined,CaretRightOutlined,EditOutlined,SaveFilled,DeleteOutlined     } from '@ant-design/icons';
import moment from 'moment';
import BgProfile from "../assets/images/bg-profile.jpg";
const { TextArea } = Input;
const { confirm } = Modal;
const { Title,Text } = Typography;
const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';
const { Meta } = Card;



const GeneralInformations = () => {

  const [Company,setCompany]=useState({});

  const onChange = async (value) => {
    console.log(`selected ${value}`);
    await axios.get(`http://localhost:5000/companies/${value}`)
    .then((response) => {
      setCompany(response.data);
      console.log("info of this company", Company)
    })
  };

  const showDeleteConfirm = () => {
    confirm({
      title: `Are you sure you want to delete ${Company.nom_de_la_société} company ?`,
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
  const [Companies,setCompanies]=useState([{}]);
  const [UpdateData,setUpdateData]=useState({
    id:"",
    nom_de_la_société: "",
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
    await axios.delete(`http://localhost:5000/companies/${Company.id}`)
    .then((response) => alert("Company deleted successfully"))
    window.location.reload(false)
  };
  const updateCompany = async () => {
    await axios.put(`http://localhost:5000/companies/${UpdateData.id}`,UpdateData)
    .then((response) => alert("Company updated successfully"))
    getCompanies();
    setEdited(true);

     window.location.reload(false);
  };

  const [Edited,setEdited]=useState(true);

  useEffect(()=>{getCompanies();},[]);
  const getCompanies = async () =>{
    await axios.get('http://localhost:5000/companies')
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
    setEdited(false);
    setUpdateData({
      id:Company.id,
      nom_de_la_société: Company.nom_de_la_société,
      adresse:Company.adresse,
      ville: Company.ville,
      province: Company.province,
      code_postal: Company.code_postal,
      pays: Company.pays,
      date_de_fondation: Company.date_de_fondation,
      date_fin_exercice: Company.date_fin_exercice,
      numéro_entreprise: Company.numéro_entreprise,
      nombre_employés:Company.nombre_employés,
      type_industrie: Company.type_industrie,
      budget:Company.budget,
      taux_imposition_annuel_estimé:Company.taux_imposition_annuel_estimé,
      Target_customers:{ 
        market:Company.Target_customers?Company.Target_customers.market:"",
        main_customers:Company.Target_customers?Company.Target_customers.main_customers:"",
        revenue_model:Company.Target_customers?Company.Target_customers.revenue_model:"",
        business_partners:Company.Target_customers?Company.Target_customers.business_partners:"",
      }
    });
  };
  
  return (
    <>
      {/* <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      ></div> */}
    {
    Companies.length>=1 ? 
    (
      <Card
        bordered={false} className="header-solid mb-24"
        bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
        title={
      <Row  justify="space-between" align="middle" gutter={[24, 0]}>
          <Col span={24} md={12}>
            <Text type="secondary">Select and Access Company Information: </Text>

            <Select
              disabled={!Edited}
              placeholder="Select a company"
              onChange={onChange}
              >
                {Companies.map((company)=>(

              <Option value={company.id}>{company.nom_de_la_société}</Option>

                ))}

              </Select>
            </Col>
          <Col span={24} md={12}  style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}>
          <NavLink to="/addcompany">
            <span className="label">Add new company</span>
          </NavLink>
          </Col>
          {/* <Col flex={1}>
          <Button onClick={showDeleteConfirm} type="dashed">
            Delete company
          </Button>
          </Col> */}
      </Row>
       }
       >
{

Company.nom_de_la_société ? 

<Row justify="space-between" align="middle" gutter={[24, 0]} > 
<Col span={24} md={12} className="col-info">
  <Card className="card-project" bordered={false}>


            <Meta
                  avatar={<Avatar size={74} shape="square" style={{backgroundColor: '#f56a00',}}> {Company.nom_de_la_société} </Avatar>}
                  title={Company.nom_de_la_société}
                  description={Company.type_industrie}
                />


  </Card>
  </Col>
  <Col  span={24}
              md={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}>
              {/* <Radio.Group>
                <Radio.Button value="edit" ><EditOutlined /> Edit company </Radio.Button>
                <Radio.Button value="delete" danger><DeleteOutlined /> Delete company</Radio.Button>
              </Radio.Group> */}
                  <Button danger onClick={showDeleteConfirm} ><DeleteOutlined /> Delete company</Button>
              </Col>
</Row>
:""}

       </Card>
    )
    : 
    <Redirect from="*" to="/addcompany" />
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
<Tabs defaultActiveKey="1" centred tabBarExtraContent={Edited ? <Button onClick={() => generateUpdateformdata()}> <EditOutlined /> Edit company's informations</Button>:(<> 
  <Button  type="primary" onClick={() => updateCompany()}> <SaveFilled  /> Save</Button>
     <Button onClick={() => setEdited(true)}> Cancel</Button></>)}>
    <Tabs.TabPane tab="General Information" key="1">
      <Descriptions layout="vertical">
        <Descriptions.Item label="Company name">{Company?!Edited?
        
        <Form.Item
        name="Company_name"
        rules={[
          {
            required: true,
            message: 'Please input the company name!',
          },
        ]}
      >
        <Input onChange={(e)=>setUpdateData({ ...UpdateData,nom_de_la_société:e.target.value})} defaultValue={UpdateData.nom_de_la_société} />
      </Form.Item>
        
        :Company.nom_de_la_société:""}</Descriptions.Item>
        <Descriptions.Item label="Business number">{Company?!Edited?<Form.Item

        name="Business_number"
        rules={[
          {
            required: true,
            message: 'Please input the business number!',
          },
        ]}
      >
        <Input onChange={(e)=>setUpdateData({ ...UpdateData,numéro_entreprise:e.target.value})} defaultValue={UpdateData.numéro_entreprise}/>
      </Form.Item>:Company.numéro_entreprise:""}</Descriptions.Item>
        <Descriptions.Item label="Founding date">{Company?!Edited?<Form.Item

        name="founding_date"
        rules={[
          {
            required: true,
            message: 'Please input the founding date!',
          },
        ]}
      >
        <DatePicker onChange={(e)=>setUpdateData({ ...UpdateData,date_de_fondation:e.target.value})} defaultValue={moment(UpdateData.date_de_fondation,dateFormat)}/>
      </Form.Item>:Company.date_de_fondation:""}</Descriptions.Item>
        <Descriptions.Item label="Type of industry">{Company?!Edited?<Form.Item

        name="Type_of_industry"
        rules={[
          {
            required: true,
            message: 'Please input the type of industry!',
          },
        ]}
      >
        <Select placeholder="select the type of industry" onChange={(e)=>setUpdateData({ ...UpdateData,type_industrie:e.target.value})} defaultValue={UpdateData.type_industrie}>
          <Option value="Administrations publiques">Public administration</Option>
          <Option value="Agriculture, foresterie, pêche et chasse">Agriculture, forestry, fishing and hunting</Option>
          <Option value="Arts, spectacles et loisirs">Arts, entertainment and recreation</Option>
          <Option value="Autres services (sauf les administrations publiques)">Other services (except public administration)</Option>
          <Option value="Commerce de détail">Retail business</Option>
          <Option value="Commerce de gros">Wholesale</Option>
          <Option value="Construction">Construction</Option>
          <Option value="Extraction minière, exploitation en carrière, et extraction de pétrole et de gaz">Mining, quarrying, and oil and gas extraction</Option>
          <Option value="Fabrication">Manufacturing</Option>
          <Option value="Finance et assurances">Finance and insurance</Option>
          <Option value="Gestion de sociétés et d’entreprises">Management of companies and enterprises</Option>
          <Option value="Hébergement et services de restauration">Accommodation and food services</Option>
          <Option value="Industrie de l’information et industrie culturelle">Information industry and cultural industry</Option>
          <Option value="Services administratifs, services de soutien, services de gestion des déchets et services d’assainissement">Administrative services, support services, waste management services and remediation services</Option>
          <Option value="Services d’enseignement">Educational services</Option>
          <Option value="Services de restauration et débit de boisson">Food services and drinking establishments</Option>
          <Option value="Services immobiliers et services de location et de location à bail">Real estate and rental and leasing services</Option>
          <Option value="Services professionnels, scientifiques et techniques">Professional, scientific and technical services</Option>
          <Option value="Services publics">Public services</Option>
          <Option value="Soins de santé et assistance sociale">Health care and social assistance</Option>
          <Option value="Transport et entreposage">Transport and storage</Option>
          <Option value="Transport par camion">Transport by truck</Option>
      </Select>
      </Form.Item>:Company.type_industrie:""}</Descriptions.Item>
        <Descriptions.Item label="Address">
        {Company?!Edited?<Form.Item

        name="address"
        rules={[
          {
            required: true,
            message: 'Please input the address!',
          },
        ]}
      >
        <Input onChange={(e)=>setUpdateData({ ...UpdateData,adresse:e.target.value})} defaultValue={UpdateData.adresse} />
      </Form.Item>:Company.adresse:""}
        </Descriptions.Item>
        <Descriptions.Item label="City">{Company?!Edited?<Form.Item

        name="city"
        rules={[
          {
            required: true,
            message: 'Please input the city!',
          },
        ]}
      >
        <Input onChange={(e)=>setUpdateData({ ...UpdateData,ville:e.target.value})} defaultValue={UpdateData.ville} />
      </Form.Item>:Company.ville:""}</Descriptions.Item>
        <Descriptions.Item label="Country">{Company?!Edited?<Form.Item

        name="country"
        rules={[
          {
            required: true,
            message: 'Please input the country!',
          },
        ]}
      >
        <Input onChange={(e)=>setUpdateData({ ...UpdateData,pays:e.target.value})} defaultValue={UpdateData.pays}/>
      </Form.Item>:Company.pays:""}</Descriptions.Item>
        <Descriptions.Item label="Province">{Company?!Edited?<Form.Item

        name="province"
        rules={[
          {
            required: true,
            message: 'Please input the province!',
          },
        ]}
      >
<Select placeholder="select the province" defaultValue={UpdateData.province} onChange={(e)=>setUpdateData({ ...UpdateData,province:e.target.value})}>
        <Option value="ON">ON</Option>
        <Option value="QC">QC</Option>
        <Option value="NS">NS</Option>
        <Option value="NB">NB</Option>
        <Option value="MB">MB</Option>
        <Option value="BC">BC</Option>
        <Option value="SK">SK</Option>
        <Option value="AB">AB</Option>
        <Option value="NL">NL</Option>
      </Select>      </Form.Item>:Company.province:""}</Descriptions.Item>
        <Descriptions.Item label="Postal code">{Company?!Edited?<Form.Item

        name="postal_code"
        rules={[
          {
            required: true,
            message: 'Please input the postal code!',
          },
        ]}
      >
        <Input onChange={(e)=>setUpdateData({ ...UpdateData,code_postal:e.target.value})} defaultValue={UpdateData.code_postal} />
      </Form.Item>:Company.code_postal:""}</Descriptions.Item>
        <Descriptions.Item label="Year-end date">{Company?!Edited?<Form.Item

        name="year-end_date"
        rules={[
          {
            required: true,
            message: 'Please input the year-end date!',
          },
        ]}
      >
        <DatePicker />
      </Form.Item>:Company.date_fin_exercice:""}</Descriptions.Item>
        <Descriptions.Item label="Number of employees">{Company?!Edited?<Form.Item

        name="employees_number"
        rules={[
          {
            required: true,
            message: 'Please input the number of employees!',
          },
        ]}
      >
        <Input onChange={(e)=>setUpdateData({ ...UpdateData,nombre_employés:e.target.value})} defaultValue={UpdateData.nombre_employés}/>
      </Form.Item>:Company.nombre_employés:""}</Descriptions.Item>
        <Descriptions.Item label="Budget">{Company?!Edited?<Form.Item

        name="budget"
        rules={[
          {
            required: true,
            message: 'Please input the budget!',
          },
        ]}
      >
      <Select placeholder="select the budget" defaultValue={UpdateData.budget} onChange={(e)=>setUpdateData({ ...UpdateData,budget:e.target.value})}>
        <Option value="50-100">50 - 100</Option>
        <Option value="100-1000">100 - 1000</Option>
        <Option value="+1000">+1000</Option>
      </Select>      </Form.Item>:Company.budget:""}</Descriptions.Item>
        <Descriptions.Item label="Taux d'imposition annuel estimé (%)">{Company?!Edited?<Form.Item

        name="taux_imposition_annuel_estimé"
        rules={[
          {
            required: true,
            message: `Please input your Taux d'imposition annuel estimé!`,
          },
        ]}
      >
        <Input onChange={(e)=>setUpdateData({ ...UpdateData,taux_imposition_annuel_estimé:e.target.value})}  defaultValue={UpdateData.taux_imposition_annuel_estimé}/>
      </Form.Item>:Company.taux_imposition_annuel_estimé:""}</Descriptions.Item>
      </Descriptions>
    </Tabs.TabPane>

    <Tabs.TabPane tab="Target customers" key="2">
      <Descriptions layout="vertical">
        <Descriptions.Item label="Market">{Company.Target_customers?!Edited?<Form.Item

        name="market"
        rules={[
          {
            required: true,
            message: 'Please input the market!',
          },
        ]}
      >
        <TextArea rows={4}  maxLength={1000} defaultValue={UpdateData.Target_customers.market} onChange={(e)=>setUpdateData({ ...UpdateData.Target_customers,market:e.target.value})}/>
      </Form.Item>:Company.Target_customers.market:""}</Descriptions.Item>
        <Descriptions.Item label="The main customers">{Company.Target_customers?!Edited?<Form.Item

        name="main_customers"
        rules={[
          {
            required: true,
            message: 'Please input the main customers!',
          },
        ]}
      >
        <TextArea rows={4}  maxLength={1000} defaultValue={UpdateData.Target_customers.main_customers} onChange={(e)=>setUpdateData({ ...UpdateData.Target_customers,main_customers:e.target.value})}/>
      </Form.Item>:Company.Target_customers.main_customers:""}</Descriptions.Item>
        <Descriptions.Item label="Revenue model">{Company.Target_customers?!Edited?<Form.Item

        name="revenue_model"
        rules={[
          {
            required: true,
            message: 'Please input the revenue model!',
          },
        ]}
      >
        <TextArea rows={4}  maxLength={1000}  defaultValue={UpdateData.Target_customers.revenue_model} onChange={(e)=>setUpdateData({ ...UpdateData.Target_customers,revenue_model:e.target.value})}/>
      </Form.Item>:Company.Target_customers.revenue_model:""}</Descriptions.Item>
        <Descriptions.Item label="Business partners">{Company.Target_customers?!Edited?<Form.Item

        name="business_partners"
        rules={[
          {
            required: true,
            message: 'Please input the Business partners!',
          },
        ]}
      >
        <TextArea rows={4}  maxLength={1000} defaultValue={UpdateData.Target_customers.business_partners} onChange={(e)=>setUpdateData({ ...UpdateData.Target_customers,business_partners:e.target.value})}/>
      </Form.Item>:Company.Target_customers.business_partners:""}</Descriptions.Item>
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