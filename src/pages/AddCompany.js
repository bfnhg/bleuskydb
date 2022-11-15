import React, { useState } from "react";
import axios from 'axios';
import TutorialDataService from "../services/TutorialService";
import { NavLink } from 'react-router-dom';
import {JSON_API} from '../services/Constants';

import {
  DatePicker,
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Result,
  Typography, 
  Divider
} from 'antd';
const { TextArea } = Input;
const { Text, Title } = Typography;
const { Option } = Select;
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

const AddCompany = () => {

  const [form] = Form.useForm();
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
      const [company, setCompany] = useState(initialCompanyState);
      const [submitted, setSubmitted] = useState(false);
    
      const handleInputChange = event => {
        const { name, value } = event.target;
        setCompany({ ...company, [name]: value });
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
          type_industrie: values.type_industrie,
          budget: values.budget,
          taux_imposition_annuel_estimé: values.taux_imposition_annuel_estimé,
          Target_customers:{ 
            market:values.market,
            main_customers:values.main_customers,
            revenue_model:values.revenue_model,
            business_partners:values.business_partners,
          }
           

          
        };
        axios.post(`${JSON_API}/companies`,companies)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);

        })
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.toJSON());
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
    
      const newCompany = () => {
        setCompany(initialCompanyState);
        setSubmitted(false);
      };

      
  return (
<>
    {submitted ? (
     
       <Result
       status="success"
       title="Your Company has been added successfully"
       extra={[
         <Button type="primary" onClick={newCompany} key="console">
           Add another company
         </Button>,
         <NavLink to="/GeneralInformations">
         <span className="label">Return to General Informations</span>
       </NavLink>
       ]}
     />
    ) : (
      
    <Form
    {...formItemLayout}
    form={form}
    name="register"
    onFinish={saveCompany}
    initialValues={{
      // residence: ['zhejiang', 'hangzhou', 'xihu'],
      // prefix: '86',
    }}
    scrollToFirstError
  >
    
    <Title>Add Company</Title>
    <Text type="secondary">Please fill out the required fields below and click on the "Submit" button to add your company's informations</Text>
    <Divider/>
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
       
      // tooltip="What do you want others to call you?"
      rules={[
        {
          required: true,
          message: 'Please input the address!',
          // whitespace: true,
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="ville"
      label="City"
       
      // tooltip="What do you want others to call you?"
      rules={[
        {
          required: true,
          message: 'Please input the city!',
          // whitespace: true,
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="province"
      label="Province"
       
      // tooltip="What do you want others to call you?"
      rules={[
        {
          required: true,
          message: 'Please input the province!',
          // whitespace: true,
        },
      ]}
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
       
      // tooltip="What do you want others to call you?"
      rules={[
        {
          required: true,
          message: 'Please input the postal code!',
          // whitespace: true,
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      name="pays"
      label="Country"
       
      // tooltip="What do you want others to call you?"
      rules={[
        {
          required: true,
          message: 'Please input the country!',
          // whitespace: true,
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      name="date_de_fondation"
      label="Founding date"
       
      // tooltip="What do you want others to call you?"
      // validateStatus="error"
      // help="Please select right date"
      rules={[
        {
          required: true,
          message: 'Please input the country!',
          // whitespace: true,
        },
      ]}
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
       
      // tooltip="What do you want others to call you?"
      rules={[
        {
          required: true,
          message: 'Please input the business number!',
          // whitespace: true,
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      name="nombre_employés"
      label="Number of employees"
       
      // tooltip="What do you want others to call you?"
      rules={[
        {
          required: true,
          message: 'Please input the number of employees!',
          // whitespace: true,
        },
      ]}
    >
      <Input />
    </Form.Item>
 
    <Form.Item
      name="type_industrie"
      label="Type of industry"
       
      // tooltip="What do you want others to call you?"
      rules={[
        {
          required: true,
          message: 'Please input the type of industry!',
          // whitespace: true,
        },
      ]}
    >


      <Select placeholder="select the type of industry">
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
    </Form.Item>

    
    <Form.Item
      name="budget"
      label="budget"
       
      value={company.budget}

      rules={[
        {
          required: true,
          message: 'Please select the budget!',
        },
      ]}
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
       
      value={company.taux_imposition_annuel_estimé}
      // tooltip="What do you want others to call you?"
      rules={[
        {
          required: true,
          message: 'this field is empty!',
          // whitespace: true,
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Divider>Target customers</Divider>

    <Form.Item
      name="market"
      label="Market"
      rules={[
        {
          required: true,
          message: 'this field is empty!',
        },
      ]}
    >
    <TextArea rows={4}  maxLength={1000} />
    </Form.Item>
    <Form.Item
      name="main_customers"
      label="The main customers"
      rules={[
        {
          required: true,
          message: 'this field is empty!',
        },
      ]}
    >
    <TextArea rows={4}  maxLength={1000} />
    </Form.Item>  <Form.Item
      name="revenue_model"
      label="Revenue model"
      rules={[
        {
          required: true,
          message: 'this field is empty!',
        },
      ]}
    >
    <TextArea rows={4}  maxLength={1000} />
    </Form.Item>  <Form.Item
      name="business_partners"
      label="Business partners"
      rules={[
        {
          required: true,
          message: 'this field is empty!',
        },
      ]}
    >
    <TextArea rows={4}  maxLength={1000} />
    </Form.Item>
    
    <Form.Item {...tailFormItemLayout}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
    )}</>
  )
}

export default AddCompany