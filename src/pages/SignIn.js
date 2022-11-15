/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { Component,useState } from "react";
import axios from 'axios';

import { Link } from "react-router-dom";
import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
  Divider,
} from "antd";

import { message } from 'antd';

import '../assets/styles/Login.css'
import logo from '../assets/images/blueskylogo.png'
import {
  DribbbleOutlined,
  TwitterOutlined,
  InstagramOutlined,
  GithubOutlined,
  LoadingOutlined 
} from "@ant-design/icons";
function onChange(checked) {
  console.log(`switch to ${checked}`);
}
const { Title } = Typography;
const { Content } = Layout;

const LoginIn= async (values)=>{
  const hide = message.loading('Action in progress..', 0);
  console.log("values are",values);
  // const [users,setUsers]=useState({
  //   username:"",
  //   password:""
  // });
    await axios.get('http://localhost:5000/users')
    .then((response) => {
      // setUsers(response.data);
      if(response.data.username!==values.username ) 
      {
        setTimeout(hide);
        message.error('username incorrect');
      }
      else if(response.data.username===values.username && response.data.password!==values.password)
      {
        setTimeout(hide);
        message.error('password incorrect');
      }else{
        const token  =  response.data.username;

        localStorage.setItem("token", token);

        setTimeout(hide);

        window.location.href = '/'         
       }

    })


  // axios.post(`https://localhost:7095/api/Tokenmanager/Authentification?user_login=${values.username}&user_password=${values.password}`)
  // .then(response => {
  //   setTimeout(hide, response);
  //   const token  =  response.data.token;

  //   localStorage.setItem("token", token);

  //   window.location.href = '/tables'
  // })
  .catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.toJSON());
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

const onFinish = async (values) => {
  
      console.log("Success:", values.username);
      // Dismiss manually and asynchronously
      LoginIn(values);
     
    };

  const SignIn = () => {


    const [loadings, setLoadings] = useState([]);
    const enterLoading = (index) => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = true;
        return newLoadings;
      });
      setTimeout(() => {
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[index] = false;
          return newLoadings;
        });
      }, 6000);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    return (
      <>
        <Layout className="layout-default layout-signin">

        <Content className="w-screen h-screen  justify-center items-center bg-slate-100">
            <Row justify="center">
              <Col  className="bg-white rounded-xl drop-shadow-lg space-y-5 w-96"
                // xs={{ span: 24 }}
                // lg={{ span: 6 }}
                // md={{ span: 12 }}
              >
                 <div className="m-3 flex justify-center">
                    <img
                      className=" w-auto h-32"
                      src={logo}
                      alt="logo"
                    />

                  </div>
                  <Divider />
                <div  className="px-10"> 
                <Title className="font-regular text-muted" type="secondary" level={5}>
                  Enter your email and password to sign in
                </Title>
                <Form
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  layout="vertical"
                  className="row-col"
                >
                  <Form.Item
                    className="username"
                    label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input placeholder="Username" />
                  </Form.Item>

                  <Form.Item
                    className="username"
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>

                  <Form.Item
                    name="remember"
                    className="aligin-center"
                    valuePropName="checked"
                  >
                    <Switch defaultChecked onChange={onChange} />
                    Remember me
                  </Form.Item>

                  <Form.Item>
                    {/* <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}
                    >
                      SIGN IN
                    </Button> */}
                    <Button type="primary"  htmlType="submit" style={{ width: "100%" }} loading={loadings[0]} >
                      SIGN IN
                    </Button>

                    {/* <button
                          type="submit"
                          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-br from-yellow-400 to-blue-600 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
                          onSubmit={handleSubmit}
                      >

                          SIGN IN
                      </button> */}
                  </Form.Item>
                  <p className="font-semibold text-muted">
                    Don't have an account?{" "}
                    <Link to="/sign-up" className="text-dark font-bold">
                      Contact us            
                    </Link>
                  </p>
                </Form>
                </div>
              </Col>
             
            </Row>
          </Content>
        </Layout>
      </>
    );
  
}
export default SignIn ;
