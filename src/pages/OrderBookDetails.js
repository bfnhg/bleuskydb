import React,{ useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { useLocation,useParams } from 'react-router-dom';
import { Divider, Table, Popconfirm, Modal, message, Form, Button,InputNumber, Input, Select, DatePicker, Typography, Space, Row, Descriptions } from 'antd';
import {JSON_API} from '../services/Constants';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import moment from 'moment';
import {
  PlusOutlined,
} from '@ant-design/icons';
dayjs.extend(customParseFormat);

const { Option } = Select;
const { Text, Link, Title } = Typography;
const { TextArea } = Input;


const OrderBookDetails = () => {

  const [messageApi, contextHolder] = message.useMessage();

  const {id}=useParams();
  const stateParamVal = useLocation().state.stateParam;
  
  console.log('props parametre value',id);
  console.log('props state value',stateParamVal);

  const [OrderDetails,setOrderDetails]=useState();
  const [Customer,setCustomer]=useState();
  const [Product,setProduct]=useState();

  const [editingRow, setEditingRow] = useState(null);
  const [editingRowbook, setEditingRowbook] = useState(null);

  const [form1] = Form.useForm();
  const [form2] = Form.useForm();

  const [costDataSource, setCostDataSource] = useState();
  const [RowCostData,setRowCostData]=useState();

  const CollectionCreateForm = ({ open, onCreate, onCancel, data }) => {
    const [form] = Form.useForm();
    {
    return data.data==="OrderDetail"?
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
            }}>
              {Customer?.map((e)=>(
  
            e&&<Option value={e.id}>{e.name}</Option>
  
            ))}
            </Select>
            {/* <Input type="textarea" /> */}
          </Form.Item>

          <Form.Item
            name="product"
            label="Product"
            rules={[
              {
                required: true,
                message: 'Please select a product!',
              },
            ]}
          >
            <Select
            placeholder="Select a product"
            style={{
              // width: 120,
            }}>
              {Product?.map((e)=>(
  
            e&&<Option value={e.id}>{e.label}</Option>
  
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

          <Form.Item name="pricePerDay" label="Price Per Day">
              <InputNumber  min={0}
                  size={'large'}
                  // style={{width:}}
                  formatter={(value) => `$${value}`}
                  parser={(value) => value.replace('$', '')}
                  />
          </Form.Item>
  
          <Form.Item name="description" label="Description">
            <Input type="textarea" />
          </Form.Item>
          
      </Form>
      </Modal>
    :data.data==="Customer"?
    <Modal
    open={open}
    title={"Create a new Customer"}
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
      label="Customer's name"
      
      rules={[
        {
          required: true,
          message: `Please input the name!`,
        },
      ]}
    >
      <Input/>
    </Form.Item>


  </Form>
  </Modal>:
  <Modal
  open={open}
  title={"Create a new Product"}
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
    name="label"
    label="Product's label"
    
    rules={[
      {
        required: true,
        message: `Please input the label!`,
      },
    ]}
  >
    <Input/>
  </Form.Item>


</Form>
</Modal>

    }
  };

  useEffect(()=>getData(),[]);


  const getData = async () =>{

    await axios.get(`${JSON_API}/Customers`)
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

    await axios.get(`${JSON_API}/Products`)
    .then((response)=>{

      setProduct(response.data);
      // setCustomerClone(Object.assign([],Customer))
      console.log("all products ",Product);

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
    
    await axios.get(`${JSON_API}/Orders/orderBook/${stateParamVal}`)
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
   

  //   {
  //   title: 'Cost Per Day',
  //   dataIndex: 'costPerDay',
  //   width: 130,
  //   render: (text, record) => {
  //       if (editingRow) {
  //         return (
  //           <Form.Item
  //             name="costPerDay"
             
  //           >
  //             <InputNumber/>
  //           </Form.Item>
  //         );
  //       } else {
  //         return <>{text}</>;
  //       }

  //     }
  // },
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
            <Form.Item name="marchCost">
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
            <Form.Item name="novemberCost">
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
      render: (text,record) => {
        
        // console.log('t',customerClone);
        // const name= customerClone.length>0?customerClone.filter(o=>o.id==record.customerId)[0].name:"unkown";
        // const name= Customer?Customer.filter(o=>o.id==record.customerId)[0].name:"unkown";
          if (editingRowbook === record.id) {
          return (
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter customer name",
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
            </Form.Item>
          );
        } else {
          return <>{record.customer === null ? "__":record.customer.name}</>;
        };
      
      }
    },
    {
      title: 'Product',
      dataIndex: 'productId',
      render: (_,record) => {
        
        // console.log('t',customerClone);
        // const name= customerClone.length>0?customerClone.filter(o=>o.id==record.customerId)[0].name:"unkown";
        // const name= Product?Product.filter(o=>o.id==record.productId)[0].label:"unkown";
          if (editingRowbook === record.id) {
          return (
            <Form.Item
              name="product"
              rules={[
                {
                  required: true,
                  message: "Please enter product label",
                },
              ]}
            >
              <Select
                placeholder="Select a product"
                style={{
                  width: 120,
                }}>
                  {Product?.map((e)=>(
      
                    e&&<Option value={e.id}>{e.label}</Option>
        
                  ))}
              </Select>
            </Form.Item>
          );
        } else {
          return <>{record.product===null?"__":record.product.label}</>;
        };
      
      }
    },
    {
      title: 'Start date',
      dataIndex: 'startDate',
      render: (_, record) =>{

        if (editingRowbook === record.id) {
          return (
            <Form.Item
              name="startDate"
              rules={[
                {
                  required: true,
                  message: "Please enter a date",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
          );
        } else {
          return <div style={{textAlign: "center"}}>

          {dayjs(record.startDate).format('YYYY/MM/DD')}
          
          </div>;
        }
        
      }
    },
    {
      title: 'End date',
      dataIndex: 'endDate',
      render: (_, record) =>{
        if (editingRowbook === record.id) {
          return (
            <Form.Item
              name="startDate"
              rules={[
                {
                  required: true,
                  message: "Please enter a date",
                },
              ]}
            >
              <DatePicker/>
            </Form.Item>
          );
        } else {
          return  <div style={{textAlign: "center"}}>{dayjs(record.endDate).format('YYYY/MM/DD')}</div>;
        }

       
      }
    },
    {
      title: 'Price per day',
      dataIndex: 'pricePerDay',
      render: (text, record) => {
          if (editingRowbook === record.id) {
            return (
              <Form.Item name="priceperday">
                <InputNumber  
                  min={0}
                  // size={'large'}
                  formatter={(value) => `$${value}`}
                  parser={(value) => value.replace('$', '')}
                />
              </Form.Item>
            );
          } else {
            return <div style={{textAlign: "right"}}>${text}</div>;
          }
  
        }
    },
    {
      title: 'Description',
      dataIndex: 'description',
      render: (text,record) => {
        
        // console.log('t',customerClone);
        // const name= customerClone.length>0?customerClone.filter(o=>o.id==record.customerId)[0].name:"unkown";
          if (editingRowbook === record.id) {
          return (
            <Form.Item
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please enter a description",
                },
              ]}
            >
              <TextArea />
            </Form.Item>
          );
        } else {
          return <>{text}</>;
        };
      
      }
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render:(_, record) =>

      (
        editingRowbook === record.key?
        <>
        <Button type="link" onClick={()=>setEditingRowbook(null)}>
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

            setEditingRowbook(record.key);
            form2.setFieldsValue({
              name: record.customerId,
              product: record.productId,
              startDate: dayjs(record.startDate),
              endDate: dayjs(record.endDate),
              description: record.description,
              priceperday:record.priceperday,
            });
          }}
        >
          Edit 
        </Button>

        <Popconfirm title="Sure to delete?" onConfirm={() => handleshareholderDelete(record.id)}>
          <a>Delete</a>
        </Popconfirm>
      </>
      )
      
        
    },
  ];

  const [Open, setOpen] = useState({
    open:false,
    url:null,
    data:null
  });
  const [Costdetails, setCostdetails] = useState(()=>null);
  const onCreate = async({values,url,data}) => {
if (data=="OrderDetail"){
  const obj={
      orderBookId:stateParamVal,
      customerId:values.customer,
      startDate:values.startDate,
      endDate:values.endDate,
      pricePerDay:values.pricePerDay,
      description:values.description,
      productId:values.product,
      // costdetails:{
      //   costPerDay: 0,
      //   januaryCost: 0,
      //   februaryCost: 0,
      //   marchCost: 0,
      //   aprilCost: 0,
      //   mayCost: 0,
      //   juneCost: 0,
      //   julyCost: 0,
      //   augustCost: 0,
      //   septemberCost: 0,
      //   octoberCost: 0,
      //   novemberCost: 0,
      //   decemberCost: 0
      // }
    }

    console.log("obj",obj);

    await axios.post(`${JSON_API}/Orders`,obj).then(()=>{
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
}else{
  await axios.post(`${JSON_API}/${url}`,values).then(()=>{
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
}
    

   

    setOpen(false);
  };
  const Edited = (values) => {
    console.log("values are :",values)
  };

  const onFinishEdit = async (values) => {

    console.log("RowCostData:",RowCostData);

    const orderbookobj={

      commandId: RowCostData.id,
      id: RowCostData.id,
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

    console.log("orderbookcostedited: ",orderbookobj);


    await axios.put(`${JSON_API}/Orders/UpdateRevenueDetail`,orderbookobj)
    .then((response) => {
      console.log('Orderbook updated Successfully!',response);
      getData();
      setCostDataSource([response.data.revenueDetail]);

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

    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows[0]);
    
    const obj=selectedRows[0].revenueDetail;

    setRowCostData(selectedRows[0]);

    obj.key=selectedRowKeys[0];

    setCostDataSource([obj]);

  },

};

const coulumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => (
      <Input defaultValue={text} onChange={e => handleNameChange(e, record.key)} />
    ),
  },
  {
    title: 'Date of Birth',
    dataIndex: 'dateOfBirth',
    key: 'dateOfBirth',
    render: (text, record) => (
      <div style={{textAlign: "center"}}> <DatePicker value={dayjs(text)} onChange={(date, dateString) => handleDOBChange(dateString, record.key)} /></div>
     
    ),
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    render: (text, record) => (
      <Input defaultValue={text} onChange={e => handleAgeChange(e, record.key)} />
    ),
  },
];

const [dataSource,setDataSource] = useState([
  {
    key: '1',
    id: '1',
    name: 'John Doe',
    dateOfBirth: '01/01/2000',
    age: '21',
  },
  {
    key: '2',
    id: '2',
    name: 'Jane Smith',
    dateOfBirth: '02/02/2001',
    age: '20',
  },
  {
    key: '3',
    id: '3',
    name: 'Bob Johnson',
    dateOfBirth: '03/03/2002',
    age: '19',
  },
  {
    key: '4',
    id: '4',
    name: 'Alice Williams',
    dateOfBirth: '04/04/2003',
    age: '18',
  },
]);

function handleNameChange(e, key) {
  const newDataSource = [...dataSource];
  const target = newDataSource.find(item => item.key === key);
  if (target) {
    target.name = e.target.value;
    setDataSource(newDataSource);
  }
}

function handleDOBChange(dateString, key) {
  const newDataSource = [...dataSource];
  const target = newDataSource.find(item => item.key === key);
  if (target) {
    target.dateOfBirth = dateString;
    setDataSource(newDataSource);
  }
}

function handleAgeChange(e, key) {
  const newDataSource = [...dataSource];
  const target = newDataSource.find(item => item.key === key);
  if (target) {
    target.age = e.target.value;
    setDataSource(newDataSource);
  }
}

function handleSubmit() {

  console.log("data source is :", dataSource);
  // axios.post('/api/updateData', dataSource)
  //     .then(res => {
  //         if(res.status === 200) {
  //             console.log('Data updated successfully');
  //         }
  //     })
  //     .catch(err => {
  //         console.error(err);
  //     });
}
  
  return (
    <>
        {contextHolder}

    {/* <div>OrderBook {stateParamVal}</div> */}

    {/* <Table columns={coulumns} dataSource={dataSource} />
    <Button onClick={handleSubmit}>Save Changes</Button> */}
  <Title level={4}>Revenue Summary</Title>

  <Descriptions bordered column={6} size={"small"} >
    <Descriptions.Item label="January">0</Descriptions.Item>
    <Descriptions.Item label="February">0</Descriptions.Item>
    <Descriptions.Item label="March">0</Descriptions.Item>
    <Descriptions.Item label="April">0</Descriptions.Item>
    <Descriptions.Item label="May">0 </Descriptions.Item>
    <Descriptions.Item label="June">0 </Descriptions.Item>
    <Descriptions.Item label="July">0 </Descriptions.Item>
    <Descriptions.Item label="August">0 </Descriptions.Item>
    <Descriptions.Item label="September">0 </Descriptions.Item>
    <Descriptions.Item label="October">0  </Descriptions.Item>
    <Descriptions.Item label="November">0 </Descriptions.Item>
    <Descriptions.Item label="December">0 </Descriptions.Item>
  </Descriptions>

  <Title level={4}>Commands</Title>
      <Row justify="end" gutter={[16, 16]}> 
        <Space align="center">
          <Button
            onClick={() => {
              setOpen({open:true,
                url:"Customers",
                data:"Customer"});
            }}
          >
            <PlusOutlined /> Create Customer
          </Button>
          <Button
            onClick={() => {
              setOpen({open:true,
                url:"Products",
                data:"Product"});
            }}
          >
            <PlusOutlined /> Create Product
          </Button>

          <Button
            type="primary"
            onClick={() => {
              setOpen({open:true,
                url:"orderdetail",
                data:"OrderDetail"});
            }}>
            <PlusOutlined /> Create book
          </Button>
        </Space>
      </Row>

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
      
      <Form form={form2} onFinish={Edited}>
        <Table
          bordered
          rowSelection={{
            type: "radio",
            ...rowSelection,
          }}
          columns={columns}
          dataSource={OrderDetails}
        />
      </Form>
     
    {/* <Divider>
      <Text type="secondary">Select an order to display its revenue details in the table bellow</Text>
    </Divider> */}
    <Title level={4}>Revenue Details</Title>
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