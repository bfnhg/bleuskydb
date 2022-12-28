import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input, Popconfirm, Table, Space, Card, message } from 'antd';
import {
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';

import {JSON_API} from '../services/Constants';
import axios from 'axios';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);



const SalesOrderBook = () => {
  const current = new Date();
  // const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const [dataSource, setDataSource] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    getorderbooks();
  }, []);


  const getorderbooks = async ()=>{
    await axios.get(`${JSON_API}/orderbook`)
    .then((response)=>{
      console.log("orderbook:",response.data);
      setDataSource(response.data);
    })
  };

  const handleDelete = async(id) => {
    await axios.delete(`${JSON_API}/orderbook/${id}`)
    .then(() => { 
    
      messageApi.info('Orderbook deleted successfully!');
      getorderbooks();
    })
    // const newData = dataSource.filter((item) => item.key !== id);
    // setDataSource(newData);
  };

  const defaultColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '30%',
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter orderbook name",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <>{text}</>;
        }

      }
    },
    {
      title: 'Creation Date',
      dataIndex: 'date',
      render: (_, record) =>(
        <>{dayjs(record.createdAt).format('YYYY/MM/DD')}</>
      )
    },
    {
      title: 'Total',
      dataIndex: 'total',
    },

    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Space size="middle">
            {
            editingRow === record.id?
            <>
            <Button type="link" onClick={()=>setEditingRow(null)}>
              Cancel
            </Button>
            <Button type="link" htmlType="submit">
              Save
            </Button>
            </>
            
            :
            <>
            <Button
              type="link"
              onClick={() => {

                setEditingRow(record.id);
                form.setFieldsValue({
                  name: record.name,
                });
              }}
            >
              Edit 
            </Button>
            <Popconfirm title="Are you sure delete this row?" onConfirm={() => handleDelete(record.id)} okText="Yes" cancelText="No">
            <a>Delete</a>
            </Popconfirm>

            <Link to={{
              pathname:`/orderbook/${record.id}`,
              state:{stateParam:record.id}
            }}>Details</Link>

            </>
            }
            
          </Space>
          
        ) : null,
    },
  ];


  const onFinish = async (values) => {
    var now = dayjs()

    const orderbook = {
      name:values.name,
      createdAt:now
    }

    console.log('Success:', orderbook);

    await axios.post(`${JSON_API}/orderbook`,orderbook)
    .then((response) => {
      getorderbooks();
      console.log('Orderbook added Successfully!');

      messageApi.open({
        type: 'success',
        content: 'Orderbook added Successfully!'
      });
    })
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onFinishEdit = async (values) => {

    const orderbookobj={
      id:editingRow,
      name:values.name,
    }

    console.log("orderbookedited: ",orderbookobj);

    await axios.put(`${JSON_API}/orderbook/${editingRow}`,orderbookobj)
    .then((response) => {
      getorderbooks();
      console.log('Orderbook updated Successfully!');

      messageApi.open({
        type: 'success',
        content: 'Orderbook updated Successfully!'
      });
    })
    setEditingRow(null);
  };
  

  return (
    <>
    {contextHolder}
    
    <Card
    bordered={false}
    className="header-solid mb-24"
    title={
        <h6 className="font-semibold">Order Book</h6>
    }
  >
    
    <Form
      name="basic"
      // labelCol={{
      //   span: 8,
      // }}
      // wrapperCol={{
      //   span: 16,
      // }}

      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Space style={{
          display: 'flex',
          marginBottom: 8,

        }}
        align="baseline" >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input a name for the orderbook!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Create Orderbook 
        </Button>
      </Form.Item>
      </Space>
    </Form>

    <Form form={form} onFinish={onFinishEdit}>
      <Table
        bordered
        dataSource={dataSource}
        columns={defaultColumns}
      />
    </Form>

    </Card>
    </>
  );
};
export default SalesOrderBook