import React,{useState,useEffect, useContext} from 'react';
import axios from 'axios';
import TutorialDataService from "../services/TutorialService";
import { NavLink,useHistory } from 'react-router-dom';
import {JSON_API} from '../services/Constants';
import {PlusOutlined } from '@ant-design/icons';
import { CompanyContext } from '../contexts/CompanyContext';

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
  Modal
} from 'antd';
const { Panel } = Collapse;
const { TextArea } = Input;
const { Text, Title } = Typography;
const { Option } = Select;

  // needed of update
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

  // needed of update
const CollectionCreateForm = ({ open, onCreate, onCancel, data }) => {
  const [form] = Form.useForm();
  console.log('data est '+ data.data);
  return (

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
              name="label"
              label="Label"
              
              rules={[
                {
                  required: true,
                  message: `Please input the ${data.data} label!`,
                },
              ]}
            >
              <Input placeholder={data.data+" Label"}/>
            </Form.Item>
          </Form>
    
    
        </Modal>    
  );
};
const UpdateCompany = () => {

  
const {Companies,setCompanies,Company,setCompany,Actionstate,setActionstate,Edited,setEdited}=useContext(CompanyContext);
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


    // needed of update
useEffect(()=>{getData();},[]);
  const getData = async () =>{

    await axios.get(`${JSON_API}/type_industry`)
    .then((response) => {
      setTypeIndustries(response.data);
    })

    await axios.get(`${JSON_API}/market`)
    .then((response) => {
      setMarket(response.data);
    })

    await axios.get(`${JSON_API}/revenue_model`)
    .then((response) => {
      setRevenueModel(response.data);
    })

    await axios.get(`${JSON_API}/main_customer`)
    .then((response) => {
      setMainCustomer(response.data);
    })

    await axios.get(`${JSON_API}/business_partner`)
    .then((response) => {
      setBusinessPartner(response.data);
    })

    await axios.get(`${JSON_API}/strategic_target`)
    .then((response) => {
      setStrategicTarget(response.data);
    })

    await axios.get(`${JSON_API}/activity_type`)
    .then((response) => {
      setActivityType(response.data);
    })

    await axios.get(`${JSON_API}/product`)
    .then((response) => {
      setProduct(response.data);
    })

    await axios.get(`${JSON_API}/shareholders`)
    .then((response) => {
      setShareHolders(response.data);
    })

  };

   // needed of update
   const [form] = Form.useForm();
    // needed of update
const history = useHistory();

    // needed of update
const [Open, setOpen] = useState({
    open:false,
    url:"",
    data:""
  });
  // needed of update
  const onCreate = async ({values,url,data}) => {
    console.log('Received values of form: ', data);

    await axios.post(`${JSON_API}/${url}`,values)
    .then((response) => {
      getData();
      console.log('values were added to' + data + " Successfully!");
    })
    setOpen(false);

  };
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
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
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCompany({ ...Company, [name]: value });
  };
  
      const saveCompany = (values) => {



        var companies = {
          nom_de_la_société: values.nom_de_la_société,
          adresse: values.adresse,
          ville: values.ville,
          province: values.province,
          code_postal: values.code_postal,
          pays: values.pays,
          date_de_fondation: values.date_de_fondation,
          date_fin_exercice: values.date_fin_exercice,
          numéro_entreprise: values.numéro_entreprise,
          nombre_employés: values.nombre_employés,
          type_industrie: values.type_industrie.map(i=>{return {id:i}}) ,
          budget: values.budget,
          taux_imposition_annuel_estimé: values.taux_imposition_annuel_estimé,
          Target_customers:{ 
            market:values.market,
            main_customers:values.main_customers,
            revenue_model:values.revenue_model,
            business_partners:values.business_partners,
          }
           

          
        };
        console.log('Received values of form: ', companies);

        axios.post(`${JSON_API}/companies`,companies)
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
        setEdited(!Edited);
        let path = `/generalinformations`; 
        history.push(path);    
      };
      
  return (
<>
      <CollectionCreateForm
        open={Open.open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen({open:false,
          url:"",
          data:""});
        }}
        data={Open}
      />
    {submitted ? (
     
       <Result
       status="success"
       title="Your Company has been updated successfully"
       extra={[
         <Button type="link" onClick={gotoGI}>
         <span className="label">Return to General Informations</span>
       </Button>
       ]}
     />
    ) : (
      

    <Form
    {...formItemLayout}
    form={form}
    name="register"
    onFinish={saveCompany}
    initialValues={{
      nom_de_la_société: Company.nom_de_la_société,
      adresse: Company.adresse,
      ville: Company.ville,
      province: Company.province,
      code_postal: Company.code_postal,
      pays: Company.pays,
      // date_de_fondation: Company.date_de_fondation,
      // date_fin_exercice: Company.date_fin_exercice,
      numéro_entreprise: Company.numéro_entreprise,
      nombre_employés: Company.nombre_employés,
      type_industrie: Company.type_industrie ,
      budget: Company.budget,
      taux_imposition_annuel_estimé: Company.taux_imposition_annuel_estimé,
      Target_customers:{ 
        market:Company.market,
        main_customers:Company.main_customers,
        revenue_model:Company.revenue_model,
        business_partners:Company.business_partners,
      }

    }}
    scrollToFirstError
  >
    

    <Title>Update Company: {Company.nom_de_la_société}</Title>
    <Collapse defaultActiveKey={['1']}>
      <Panel header="General information" key="1">
            <Form.Item
      name="nom_de_la_société"
      label="Company name"
       
      // tooltip="What do you want others to call you?"
      rules={[
        {
          required: true,
          message: 'Please input the company name!',
          // whitespace: true,
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="adresse"
      label="Address"
           >
      <Input />
    </Form.Item>
    <Form.Item
      name="ville"
      label="City"
       
      // tooltip="What do you want others to call you?"
  
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="province"
      label="Province"
       
      // tooltip="What do you want others to call you?"
    >
      <Select placeholder="select the province">
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
      name="code_postal"
      label="Postal code"
       
    >
      <Input />
    </Form.Item>

    <Form.Item
      name="pays"
      label="Country"
       
      // tooltip="What do you want others to call you?"
      
    >
      <Input />
    </Form.Item>

    <Form.Item
      name="date_de_fondation"
      label="Founding date"
       
      // tooltip="What do you want others to call you?"
      // validateStatus="error"
      // help="Please select right date"
    >
        <DatePicker />
    </Form.Item>

    <Form.Item

      name="date_fin_exercice"
      label="Year-end date"
       
    >
        <DatePicker />
    </Form.Item>
 
    <Form.Item
      name="numéro_entreprise"
      label="Business Number"

    >
      <Input />
    </Form.Item>

    <Form.Item
      name="nombre_employés"
      label="Number of employees"
       

    >
      <Input />
    </Form.Item>



    <Form.Item label="Type of industry">
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="type_industrie"
              label="Type of industry"
              noStyle
            >
              <Select mode="multiple" allowClear placeholder="select the type of industry" size={'large'} style={{ width: '100%', }}>
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
                url:"type_industry",
                data:"Type of industry"});
              }}
            >
            <PlusOutlined/> Add new type
          </Button>
         
          </Col>
        </Row>
      </Form.Item>





    
   
    <Form.Item
      name="budget"
      label="budget"
       
      // value={company.budget}

    >
      <Select placeholder="select the budget">
        <Option value="50-100">50 - 100</Option>
        <Option value="100-1000">100 - 1000</Option>
        <Option value="+1000">+1000</Option>
      </Select>
    </Form.Item>

    <Form.Item
      name="taux_imposition_annuel_estimé"
      label="Taux d'imposition annuel estimé(%)"
       
      // value={company.taux_imposition_annuel_estimé}
    >
      <Input />
    </Form.Item>
    </Panel>
    <Panel header="Target customers" key="2">

    <Form.Item label="Market" >
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="market"
              label="Market"
              noStyle
            >
              <Select mode="multiple" allowClear placeholder="select the market" size={'large'} style={{ width: '100%', }}>
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
                  url:"market",
                  data:"Market"});
                }}
            >
            <PlusOutlined/> Add new market
          </Button>
     
          </Col>
        </Row>
      </Form.Item>

      <Form.Item label="Main Customers">
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="main_customers"
              label="Main Customers"
              noStyle
              // rules={[{ required: true, message: 'Please input the main customers!'}]}
            >
              <Select mode="multiple" allowClear placeholder="select the main customers" size={'large'} style={{ width: '100%', }}>
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
                  url:"main_customer",
                  data:"Main customers"});
                }}
            >
            <PlusOutlined/> Add new customer
          </Button>
          </Col>
        </Row>
      </Form.Item>

    
      <Form.Item label="Revenue Model" >
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="revenue_model"
              label="Revenue Model"
              noStyle
            >
              <Select mode="multiple" allowClear placeholder="select the revenue model" size={'large'} style={{ width: '100%', }}>
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
                  url:"revenue_model",
                  data:"Revenue model"});
                }}
            >
            <PlusOutlined/> Add new revenue model
          </Button>
     
          </Col>
        </Row>
      </Form.Item>
    
      <Form.Item label="Business partners">
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="business_partners"
              label="Business partners"
              noStyle
              // rules={[{ required: true, message: 'Please input the business partner!'}]}
            >
              <Select mode="multiple" allowClear placeholder="select the business partners" size={'large'} style={{ width: '100%', }}>
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
                  url:"business_partners",
                  data:"Business partners"});
                }}
            >
            <PlusOutlined/> Add new business partner
          </Button>
     
          </Col>
        </Row>
      </Form.Item>
      </Panel>

      <Panel header="Description of services and products" key="3">

      <Form.Item label="Strategic targets">
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="strategic_target"
              label="Strategic targets"
              noStyle
            >
              <Select mode="multiple" allowClear placeholder="select the strategic target" size={'large'} style={{ width: '100%', }}>
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
                  url:"strategic_target",
                  data:"Strategic Target"});
                }}
            >
            <PlusOutlined/> Add new strategic target
          </Button>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item label="Type of activities">
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="activity_type"
              label="Type of activities"
              noStyle
            >
              <Select mode="multiple" allowClear placeholder="select the type of activities" size={'large'} style={{ width: '100%', }}>
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
                  url:"activity_type",
                  data:"Type of activities"});
                }}
            >
            <PlusOutlined/> Add new type of activity
          </Button>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item label="Products / Services">
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="product"
              label="Products / Services"
              noStyle
            >
              <Select mode="multiple" allowClear placeholder="select the products / services" size={'large'} style={{ width: '100%', }}>
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
                  url:"product",
                  data:"Products / Services"});
                }}
            >
            <PlusOutlined/> Add new product / service
          </Button>
          </Col>
        </Row>
      </Form.Item>
      </Panel>
      <Panel  header="Legal structure" key="4">

      <Form.Item label="ShareHolders">
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="shareholders"
              label="ShareHolders"
              noStyle
            >
              <Select mode="multiple" allowClear placeholder="select the shareholders" size={'large'} style={{ width: '100%', }}>
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
                  url:"product",
                  data:"Products / Services"});
                }}
            >
            <PlusOutlined/> Add new product / service
          </Button>
          </Col>
        </Row>
      </Form.Item>

      </Panel>
      </Collapse>

    <Form.Item {...tailFormItemLayout}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
      <Button onClick={gotoGI}>
        Cancel
      </Button>
    </Form.Item>

  </Form>

    )}</>
  )
}

export default UpdateCompany