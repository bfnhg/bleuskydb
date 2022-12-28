import React,{ useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { useLocation,useParams } from 'react-router-dom';
import { Divider, Table, Popconfirm, Modal, message, Form, Button,InputNumber, Input, Select, DatePicker, Typography, Space } from 'antd';
import {JSON_API} from '../services/Constants';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const { Option } = Select;
const { Text, Link } = Typography;


const OrderBookDetails = () => {

  const [messageApi, contextHolder] = message.useMessage();

  const {id}=useParams();
  const stateParamVal = useLocation().state.stateParam;
  
  console.log('props parametre value',id);
  console.log('props state value',stateParamVal);

  const [OrderDetails,setOrderDetails]=useState();
  const [Customer,setCustomer]=useState();
  const [editingRow, setEditingRow] = useState(null);
  const [form1] = Form.useForm();
  const [costDataSource, setCostDataSource] = useState();
  const [RowCostData,setRowCostData]=useState();

  const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        open={open}
        title="Create a new collection"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
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
          initialValues={{
            modifier: 'public',
          }}
        >
  
  
          <Form.Item
            name="customer"
            label="Customer"
            rules={[
              {
                required: true,
                message: 'Please select a customer!',
              },
            ]}
          >
            <Select
            placeholder="Select a customer"
            style={{
              width: 120,
            }}>
              {Customer?.map((e)=>(
  
            e&&<Option value={e.id}>{e.name}</Option>
  
            ))}
            </Select>
            {/* <Input type="textarea" /> */}
          </Form.Item>
  
          <Form.Item name="startDate" label="Start date">
            <DatePicker />
          </Form.Item>
  
          <Form.Item name="endDate" label="End date">
            <DatePicker />
          </Form.Item>
  
          <Form.Item name="description" label="Description">
            <Input type="textarea" />
          </Form.Item>
          
        </Form>
      </Modal>
    );
  };

  useEffect(()=>getData(),[]);


  const getData = async () =>{
    
    await axios.get(`${JSON_API}/orderdetail`)
    .then((response)=>{

      const newState = response.data.map(obj => {
        // 👇️ if id equals 2, update country property
        
          return {...obj, key: obj.id};
        
      });  

      setOrderDetails(newState);
      console.log("all orderdetails ",newState);

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

    await axios.get(`${JSON_API}/customer`)
    .then((response)=>{
      setCustomer(response.data);
      // setCustomerClone(Object.assign([],Customer))
      console.log("all customers ",Customer);
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

  const handleshareholderDelete = async (id) => {
    await axios.delete(`${JSON_API}/orderdetail/${id}`).then(()=>{console.log("order detail"+id+" deleted successfully");getData()}).catch(function (error) {
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

  const costdetailsColumns = [
   

    {
    title: 'Cost Per Day',
    dataIndex: 'costPerDay',
    width: 130,
    render: (text, record) => {
        if (editingRow) {
          return (
            <Form.Item
              name="costPerDay"
             
            >
              <InputNumber/>
            </Form.Item>
          );
        } else {
          return <>{text}</>;
        }

      }
  },
  {
    title: 'January',
    dataIndex: 'januaryCost',
    width: 130,
    render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="januaryCost"
              
            >
              <InputNumber/>
            </Form.Item>
          );
        } else {
          return <>{text}</>;
        }

      }
  },
  {
    title: 'February',
    dataIndex: 'februaryCost',
    width: 130,
    render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="februaryCost"
              
            >
              <InputNumber/>
            </Form.Item>
          );
        } else {
          return <>{text}</>;
        }

      }
  },
  {
    title: 'March',
    dataIndex: 'marchCost',
    width: 130,
    render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="marchCost"
              
            >
              <InputNumber/>
            </Form.Item>
          );
        } else {
          return <>{text}</>;
        }

      }
  },
  {
    title: 'April',
    dataIndex: 'aprilCost',
    width: 130,
    render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="aprilCost"
             
            >
              <InputNumber/>
            </Form.Item>
          );
        } else {
          return <>{text}</>;
        }

      }
  },
  {
    title: 'May',
    dataIndex: 'mayCost',
    width: 130,
    render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="mayCost"
              
            >
              <InputNumber/>
            </Form.Item>
          );
        } else {
          return <>{text}</>;
        }

      }
  },
  {
    title: 'June',
    dataIndex: 'juneCost',
    width: 130,
    render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="juneCost"
             
            >
              <InputNumber/>
            </Form.Item>
          );
        } else {
          return <>{text}</>;
        }

      }
  },
  {
    title: 'July',
    dataIndex: 'julyCost',
    width: 130,
    render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="julyCost"
              
            >
              <InputNumber/>
            </Form.Item>
          );
        } else {
          return <>{text}</>;
        }

      }
  },
  {
    title: 'August',
    dataIndex: 'augustCost',
    width: 130,
    render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="augustCost"
             
            >
              <InputNumber/>
            </Form.Item>
          );
        } else {
          return <>{text}</>;
        }

      }
  },
  {
    title: 'September',
    dataIndex: 'septemberCost',
    width: 130,
    render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="septemberCost"
              
            >
              <InputNumber/>
            </Form.Item>
          );
        } else {
          return <>{text}</>;
        }

      }
  },
  {
    title: 'October',
    dataIndex: 'octoberCost',
    width: 130,
    render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="octoberCost"
              
            >
              <InputNumber/>
            </Form.Item>
          );
        } else {
          return <>{text}</>;
        }

      }
  },
  {
    title: 'November',
    dataIndex: 'novemberCost',
    width: 130,
    render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="novemberCost"
             
            >
              <InputNumber/>
            </Form.Item>
          );
        } else {
          return <>{text}</>;
        }

      }
  },
  {
    title: 'December',
    dataIndex: 'decemberCost',
    width: 130,
    render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="decemberCost"
             
            >
              <InputNumber/>
            </Form.Item>
          );
        } else {
          return <>{text}</>;
        }

      }
  },
  
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
    fixed: 'right',
    width: 130,
  },
     {
      title: 'Action',
      dataIndex: 'action',
      fixed: 'right',
      width: 180,

      render: (_, record) =>
        costDataSource.length >= 1 ? (
          <Space size="middle">
            {
            editingRow === record.key?
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

                setEditingRow(record.key);
                form1.setFieldsValue({
                  costPerDay: record.costPerDay,
                  januaryCost: record.januaryCost,
                  februaryCost: record.februaryCost,
                  marchCost: record.marchCost,
                  aprilCost: record.aprilCost,
                  mayCost: record.mayCost,
                  juneCost: record.juneCost,
                  julyCost: record.julyCost,
                  augustCost: record.augustCost,
                  septemberCost: record.septemberCost,
                  octoberCost: record.octoberCost,
                  novemberCost: record.novemberCost,
                  decemberCost: record.decemberCost,
                });
              }}
            >
              Edit 
            </Button>
            

            

            </>
            }
            
          </Space>
          
        ) : null,
    }

    
  ];

  const columns = [
    {
      title: 'Customer',
      dataIndex: 'name',
      render: (_,record) => {
        
        // console.log('t',customerClone);
        // const name= customerClone.length>0?customerClone.filter(o=>o.id==record.customerId)[0].name:"unkown";
        const name= Customer?Customer.filter(o=>o.id==record.customerId)[0].name:"unkown";
        return <>{name}</>;
      
      }
    },
    {
      title: 'Start date',
      dataIndex: 'startDate',
      render: (_, record) =>(
        <>{dayjs(record.startDate).format('YYYY/MM/DD')}</>
      )
    },
    {
      title: 'End date',
      dataIndex: 'endDate',
      render: (_, record) =>(
        <>{dayjs(record.endDate).format('YYYY/MM/DD')}</>
      )
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render:(_, record) =>
        <Popconfirm title="Sure to delete?" onConfirm={() => handleshareholderDelete(record.id)}>
          <a>Delete</a>
        </Popconfirm>
    },
  ];

  const [open, setOpen] = useState(false);
  const [Costdetails, setCostdetails] = useState(()=>null);
  const onCreate = async(values) => {

    const obj={
      orderbookId:stateParamVal,
      customerId:values.customer,
      startDate:values.startDate,
      endDate:values.endDate,
      description:values.description
    }

    await axios.post(`${JSON_API}/orderdetail`,obj).then(()=>{
      getData();
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

    console.log('Received values of form: ', obj);
    setOpen(false);
  };

  const onFinishEdit = async (values) => {

    console.log("RowCostData:",RowCostData);

    const orderbookobj={

      orderbookId: RowCostData.orderbookId,
      customerId: RowCostData.customerId,
      startDate: RowCostData.startDate,
      description: RowCostData.description,
      id: RowCostData.id,
      costdetails: {
      costPerDay: values.costPerDay,
      januaryCost: values.januaryCost,
      februaryCost: values.februaryCost,
      marchCost: values.marchCost,
      aprilCost: values.aprilCost,
      mayCost: values.mayCost,
      juneCost: values.juneCost,
      julyCost: values.julyCost,
      augustCost: values.augustCost,
      septemberCost: values.septemberCost,
      octoberCost: values.octoberCost,
      novemberCost: values.novemberCost,
      decemberCost: values.decemberCost,
      }
    }

    console.log("orderbookcostedited: ",orderbookobj);


    await axios.put(`${JSON_API}/orderdetail/${RowCostData.id}`,orderbookobj)
    .then((response) => {
      getData();
      console.log('Orderbook updated Successfully!');

      messageApi.open({
        type: 'success',
        content: 'Order cost details updated Successfully!'
      });
    })
    setEditingRow(null);
  };

const refreshCostdetails= () =>{
  
}

const rowSelection = {

  onChange: (selectedRowKeys, selectedRows) => {

    const obj=selectedRows[0].costdetails;

    console.log("costDataSource before key add:",obj);


    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    
    setRowCostData(selectedRows[0]);

    obj.key=selectedRowKeys[0];

    setCostDataSource([obj]);

  },

};
  
  return (
    <>
        {contextHolder}

    <div>OrderBook {stateParamVal}</div>

    <div>
    <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Create
      </Button>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <Divider />
        <Table
        bordered
        rowSelection={{
          type: "radio",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={OrderDetails}
      />
     
    </div>
    <Divider><Text type="secondary">Select an order to display its cost details in the table bellow</Text></Divider>
    <Form form={form1} onFinish={onFinishEdit}>
       <Table
        bordered
        dataSource={costDataSource && costDataSource}
        columns={costdetailsColumns}
        scroll={{
          x: 1300,
        }}
      /> 
    </Form>

    </>
    
  )
}

export default OrderBookDetails