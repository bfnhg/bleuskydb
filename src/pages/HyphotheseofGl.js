import React, { useContext, useEffect, useState } from "react";

import { Table, Button, Select, Modal, Form, Row, Input, InputNumber, Card, Space, DatePicker, Popconfirm } from "antd";
import {JSON_API} from '../services/Constants';
import axios from 'axios';
import { CompanyContext } from '../contexts/CompanyContext';
import dayjs from "dayjs";

function HyphotheseofGl() {

  const {Lang,setLang,Shares,setShares,ShareHolders,setShareHolders,Product,setProduct,ActivityType,setActivityType,StrategicTarget,setStrategicTarget,BusinessPartner,setBusinessPartner,MainCustomer,setMainCustomer,RevenueModel,setRevenueModel,Companies,setCompanies,Company,setCompany,Actionstate,setActionstate,Edited,setEdited,TypeIndustries,setTypeIndustries,Market,setMarket}=useContext(CompanyContext);
  const { Option } = Select;

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  const [form3] = Form.useForm();
  const [form4] = Form.useForm();

  const [statementtype, setStatementType]=useState([{}]);
  const [RowGlaccountID, setRowGlaccountId] = useState(null);
  const [HypothesesDataSource, sethypothesesDataSource] = useState(null);

  const [disabledYears, setDisabledYears] = useState([]); // Array of years to disable

  const [editingRow, setEditingRow] = useState(null);
  const [editingRow2, setEditingRow2] = useState(null);

  const [open, setOpen] = useState(false);
  const [openHyphothese, setopenHyphothese] = useState(false);
  const [DataSource,setDataSource]=useState(null);

  const { TextArea } = Input;

  useEffect(()=>{

    getData();

  },[Company.id]);

  const getGlaccount = async () =>{
    await axios.get(`${JSON_API}/GLAccount/${RowGlaccountID}`)
    .then((response)=>{

      console.log("GLAccount:",response.data);
      const data=response.data;
      setDisabledYears([]);
      data.hypotheses.map(o=>{o.key=o.id;setDisabledYears(current => [...current, Number(o.beginsOnYear)])});

      console.log('data:',data);

      // setDataSource(response.data);
      sethypothesesDataSource(data.hypotheses);

    })
    .catch(function (error) {
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
  })
}

  const getData = async() => { 

    await axios.get(`${JSON_API}/GLAccount/Enterprise/${Company.id}`)
    .then((response)=>{
      const newState = response.data.map((obj) => {
        // 👇️ if id equals 2, update country property

        return { ...obj, key: obj.id };
      });
      setDataSource(newState);
      console.log(newState);
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
      setDataSource(null);

      console.log(error.config);
    });

    await axios
    .get(`${JSON_API}/FinancialStatementType`)

    .then((res) => {
      console.log(res);
      setStatementType(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  }
  const handletype = async (e) => {
    sethypothesesDataSource(null);
    setDataSource(null);
    console.log(e);

    if (e!=0){
      await axios
      .get(`${JSON_API}/GLAccount/FinancialStatementType/${Company.id}/${e}`)

      .then((res) => {
        console.log(res);
        const newState = res.data.map((obj) => {
          // 👇️ if id equals 2, update country property

          return { ...obj, key: obj.id };
        });
        setDataSource(newState);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else{
      getData();
    }
    
  };

  const disabledDate = (current) => {
    // Disable dates that match any year in the disabledYears array
    // console.log("disabledYears:",disabledYears);

    return disabledYears.some((year) => current.year() === year);
  };
  

  const handlehypoDelete = async (id) => {
    await axios
      .delete(`${JSON_API}/Hypothesis/${id}`)
      .then(() => {
        getData();
        getGlaccount();
        // messageApi.open({
        //   type: "success",
        //   content: t("Orderdeletedsuccessfully"),
        // });
      })
      .catch(function (error) {
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
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };
  const OnopenHyphothese = async (values) => {
    console.log("Received values of form: ", values);

    const obj={
      glAccountId:RowGlaccountID ,
      annualIncrease: values.annualIncrease,
      beginsOnYear: values.beginsOnYear.$y+"",
      beginsOnMonth:values.beginsOnMonth,
      hypothesis: values.hypothesis
    }

    console.log("obj:",obj);
    await axios
      .post(`${JSON_API}/Hypothesis`,obj)
      .then((res) => {
        console.log(res);
        getData();
        getGlaccount();
        // setcountry(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setopenHyphothese(false);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows[0]
      );

      const array = selectedRows[0].hypotheses;
      console.log(array);
      setDisabledYears([]);
      array.map(o=>{setDisabledYears(current => [...current, Number(o.beginsOnYear)])})
      setRowGlaccountId(selectedRowKeys[0]);

      if(array.length !=0 ){
        array.map(o=>{o.key=o.id});
      }
     

      sethypothesesDataSource(array.length !=0 &&array);

      console.log("HypothesesDataSource: ",HypothesesDataSource);
    },
  };
  // "id": 1,
  // "glNumber": "12322",
  // "description": "GL Description",
  // "enterpriseId": 1,
  // "enterpriseName": "Company 1",
  // "financialStatementTypeGIFI": "GIFI 1",
  // "hypotheses": []
  const columnsGLAccount = [
    {
      title: "GL Number",
      dataIndex: "glNumber",
      align: "center",

      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="GLNumber"
              rules={[
                {
                  required: true,
                  message: "Please enter your ",
                },
              ]}
            >
              <Input defaultValue="GL Number" />
            </Form.Item>
          );
        } else {
          return <div style={{ textAlign: "right" }}>{text}</div>;
        }
      },
    },
    {
      title: "Related GIFI",
      dataIndex: "financialStatementTypeGIFI",
      align: "center",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="gifi"
              rules={[
                {
                  required: true,
                  message: "Please enter your ",
                },
              ]}
            >
             <Select
              size="large"
              showSearch
              placeholder="Select a Financial Statement Type"
            >
              {statementtype.map((o) => {
              return <Option value={o.gifi}>{"(GIFI: "+ o.gifi +") "+ o.description}</Option>;
            })}
            </Select>
            </Form.Item>
          );
        } else {
          return <div style={{ textAlign: "right" }}>{text}</div>;
        }
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      align: "center",

      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="Description"
              rules={[
                {
                  required: true,
                  message: "Please enter your ",
                },
              ]}
            >
              <Input defaultValue="Descreption" />
            </Form.Item>
          );
        } else {
          return <div style={{ textAlign: "left" }}>{text}</div>;
        }
      },
    },
    {
      title:"Actions",
      align: "center",

      render: (_, record) =>
      DataSource.length >= 1 ? (
        <Space size="middle">
          {editingRow === record.key ? (
            <>
              <Button type="link" onClick={() => setEditingRow(null)}>
                Cancel
              </Button>
              <Button type="link" htmlType="submit">
                Save
              </Button>
            </>
          ) : (
            <>
              <Popconfirm
                type="link"
                onClick={() => {
                  setEditingRow(record.key);
                  form3.setFieldsValue({
                    GLNumber: record.glNumber,
                    gifi: record.financialStatementTypeGIFI,
                    Description: record.description,
                  });
                }}
              >
                <a>Edit</a>
              </Popconfirm>
            </>
          )}
        </Space>
      ) : null,
 

    
    },
  ];
  const columnsHyphothese = [
    {
      title: "Year",
      dataIndex: "beginsOnYear",
      align: "center",
      render: (text, record) => {
        if (editingRow2 === record.key) {
          return (
            <Form.Item
              name="year"
              rules={[
                {
                  required: true,
                  message: "Please enter your ",
                },
              ]}
            >
              <DatePicker
                  disabled
                  picker="year"
                  />
            </Form.Item>
          );
        } else {
          return <div style={{ textAlign: "right" }}>{text}</div>
        }
          ;
      },
    },
    {
      title:"Annual Increase",
      dataIndex: "annualIncrease",
      align: "center",

      render: (text, record) => {
        if (editingRow2 === record.key) {
          return (
            <Form.Item
              name="annualIncrease"
              rules={[
                {
                  required: true,
                  message: "Please enter your ",
                },
              ]}
            >
              <InputNumber
          // disabled={SHselected}
          min={0}
          max={100}
          size={'large'}
          formatter={(value) => `${value}%`}
          parser={(value) => value.replace('%', '')}
          // onChange={e=>setShareHolderShares(e)}

        />
            </Form.Item>
          );
        } else {
          return <div style={{ textAlign: "right" }}>{text}%</div>;
        }
      },
    },
    {
      title: "Begin On",
      dataIndex: "beginsOnMonth",
      align: "center",
      render: (text, record) => {
        if (editingRow2 === record.key) {
          return (
            <Form.Item
              name="begin"
              rules={[
                {
                  required: true,
                  message: "Please enter your ",
                },
              ]}
            >
               <Select
              placeholder="Select month"
              // onChange={handleStartPeriodChange}
              size={"large"}
              // style={{
              //   width: "50%",
              // }}
            >
              <Option value={1}>January</Option>
              <Option value={2}>February</Option>
              <Option value={3}>March</Option>
              <Option value={4}>April</Option>
              <Option value={5}>May</Option>
              <Option value={6}>June</Option>
              <Option value={7}>July</Option>
              <Option value={8}>August</Option>
              <Option value={9}>September</Option>
              <Option value={10}>October</Option>
              <Option value={11}>November</Option>
              <Option value={12}>December</Option>
            </Select>

            </Form.Item>
          );
        } else {
          return record.beginsOnMonth+"/"+record.beginsOnYear;
        }
      },
    },
    {
      title:"Hyphothesis",
      dataIndex: "hypothesis",
      align: "center",
      render: (text, record) => {
        if (editingRow2 === record.key) {
          return (
            <Form.Item
              name="HyphotheseofGl"
              rules={[
                {
                  required: true,
                  message: "Please enter your ",
                },
              ]}
            >
              <Input
                defaultValue="HyphotheseofGl"
                // onChange={(event) => {
                //   setdetails(event.target.value);
                //   console.log(details);
                // }}
              />
            </Form.Item>
          );
        } else {
          return <div style={{ textAlign: "left" }}>{text}</div>;
        }
      },
    },

    {
      title: "Actions",
      align: "center",

       render: (_, record) =>
      HypothesesDataSource.length >= 1 ? (
        <Space size="middle">
          {editingRow2 === record.key ? (
            <>
              <Button type="link" onClick={() => setEditingRow2(null)}>
                Cancel
              </Button>
              <Button type="link" htmlType="submit">
                Save
              </Button>
            </>
          ) : (
            <>
              <Popconfirm
                type="link"
                onClick={() => {
                  setEditingRow2(record.key);
                  form4.setFieldsValue({
                    year: dayjs(record.beginsOnYear),
                    annualIncrease: record.annualIncrease,
                    begin: record.beginsOnMonth,
                    HyphotheseofGl:record.hypothesis
                  });
                }}
              >
                <a>Edit</a>
              </Popconfirm>
              <Popconfirm
              title="Are you sure you want to delete this row?"
              cancelText="no"
              okText="yes"
              onConfirm={() => handlehypoDelete(record.id)}
            >
              <a style={{ marginLeft: ".5rem" }}> Delete</a>
            </Popconfirm>
            </>
          )}
        </Space>
      ) : null,
 
    },
  ];

  
  const onFinishEditHypo = async(e)=>{
    const obj={
      id: editingRow2,
      annualIncrease: e.annualIncrease,
      beginsOnYear: e.year.$y+"",
      beginsOnMonth: e.begin,
      hypothesis: e.HyphotheseofGl
    }
    console.log("updated data:",obj);
  
    await axios
        .put(`${JSON_API}/Hypothesis`, obj)
        .then((res) => {
          getGlaccount();
          getData();
          setEditingRow2(null);
  
        })
        .catch(function (error) {
          console.log(error);
        });
    
  }

const onFinishEdit= async(e)=>{
  const obj={
    id: editingRow,
    glNumber: e.GLNumber,
    description: e.Description,
    enterpriseId: Company.id,
    financialStatementTypeGIFI: e.gifi
  }
  console.log("updated data:",obj);

  await axios
      .put(`${JSON_API}/GLAccount/glaccount/UpdateGLAccount`, obj)
      .then((res) => {
        getData();
        setEditingRow(null);

      })
      .catch(function (error) {
        console.log(error);
      });
  
}


  const Submit = async (e) => {
    const formData = {
      glNumber:e.glNumber,
      description:e.description,
      enterpriseId:Company.id,
      financialStatementTypeGIFI:e.financialStatementTypeGIFI,
    };

    console.log(formData);
    await axios
      .post(`${JSON_API}/GLAccount`, formData)
      .then((res) => {
        getData();
        console.log(res.data);
        setOpen(!open);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const CollectionCreateGlAcount = ({ open, onCreate, onCancel }) => {
    return (
      <Modal
        forceRender
        open={open}
        width={650}
        title="Create new GL Account "
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
              console.log("Validate Failed:", info);
            });
        }}
      >
        
        <Form
          form={form}
          name="form_in_modal"
         
        >
          <Form.Item
            //  value={nom}
            name="glNumber"
            label="GL Number"
            rules={[
              {
                required: true,
                message: "Please input the title of GL Number",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            // value={nom}
            name="financialStatementTypeGIFI"
            label="Type"
            rules={[
              {
                required: true,
                message: "Please input the title of type!",
              },
            ]}
          >
           <Select
              size="large"
              placeholder="Select a Financial Statement Type"
              style={{width:550}}
            >
              {statementtype.map((o) => {
              return <Option value={o.gifi}>{"(GIFI: "+ o.gifi +") "+ o.description}</Option>;
            })}
            </Select>
          </Form.Item>

          <Form.Item
            // value={nom}
             name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please input the title of Descreption ",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  const CollectionCreateHyphothesis = ({
    openHyphothese,
    OnopenHyphothese,
    onCancel,
  }) => {
    return (
      <Modal
        forceRender
        open={openHyphothese}
        title="Create GL Number "
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form2
            .validateFields()
            .then((values) => {
              form2.resetFields();
              OnopenHyphothese(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form2}
          // layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
        >
          <Form.Item
            // value={nom}
            name="beginsOnYear"
            label="Year"
            rules={[
              {
                required: true,
                message: "Please input the title of ",
              },
            ]}
          >
            <DatePicker
              // placeholder={t("Selectyear")}
              picker="year"
              disabledDate={disabledDate}
              style={{
                width: "50%",
                textAlign: "center",
              }}
              size={"large"}
            />          
            </Form.Item>
          <Form.Item
            // value={nom}
            name="annualIncrease"
            label="Annual Increase"
            rules={[
              {
                required: true,
                message: "Please input the title of ",
              },
            ]}
          >
            <InputNumber
          // disabled={SHselected}
          min={0}
          max={100}
          size={'large'}
          formatter={(value) => `${value}%`}
          parser={(value) => value.replace('%', '')}
          // onChange={e=>setShareHolderShares(e)}

        />
        
          </Form.Item>

          <Form.Item
            // value={nom}
            name="beginsOnMonth"
            label="Begin On Month"
            rules={[
              {
                required: true,
                message: "Please input the title of ",
              },
            ]}
          >
             <Select
              placeholder="Select month"
              // onChange={handleStartPeriodChange}
              size={"large"}
              // style={{
              //   width: "50%",
              // }}
            >
              <Option value={1}>January</Option>
              <Option value={2}>February</Option>
              <Option value={3}>March</Option>
              <Option value={4}>April</Option>
              <Option value={5}>May</Option>
              <Option value={6}>June</Option>
              <Option value={7}>July</Option>
              <Option value={8}>August</Option>
              <Option value={9}>September</Option>
              <Option value={10}>October</Option>
              <Option value={11}>November</Option>
              <Option value={12}>December</Option>
            </Select>

          </Form.Item>

          
          <Form.Item
            name="hypothesis"
            label="Hyphothesis"
            rules={[
              {
                required: true,
                message: "Please input the title of  ",
              },
            ]}
          >
            <TextArea
              
              rows={2}
            ></TextArea>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  return (
    <Card
    bordered={false}
    className="header-solid mb-24"
    title={
        <h3 className="font-semibold" textAlign="center"> GL Accounts & Their Hyphothesis</h3>
    }
  
    >
       <Row justify="end" gutter={[16, 16]}>
      <Space style={{
          // display: 'flex',
          // marginBottom: 8,
        }}
        align="baseline" >
      <Button
        className="Create-button"
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Create a new GL Account
      </Button>

      <CollectionCreateGlAcount
        open={open}
        onCreate={Submit}
        onCancel={() => {
          setOpen(false);
          // onAddChamp();
        }}
      />

        <Form.Item
            name="type"
            label="Filter by type"
           
          >
           <Select showSearch  onChange={(e)=>handletype(e)} style={{width:550}} placeholder="Select a Financial Statement Type" size="large" >
           <Option value={0}>All types</Option>
            {statementtype.map((o) => {
              return <Option value={o.gifi}>{"(GIFI: "+ o.gifi +") "+ o.description}</Option>;
            })}
           
          </Select>
          </Form.Item>
          
            
     
</Space>
  </Row>
      <Form form={form3} onFinish={onFinishEdit}>
        <Table
          bordered
          rowSelection={{
            type: "radio",
            ...rowSelection,
          }}
          columns={columnsGLAccount}
          dataSource={DataSource}
        />
      </Form> 

<h1
        style={{
          width: 80,
          height: 35,
          marginLeft: "2rem",
        }}
      >
        Hyphothesis
      </h1>
      <Row justify="end" gutter={[16, 16]}>
      <Space style={{
          display: 'flex',
          marginBottom: 8,
        }}
        align="baseline" >
           <Button
        className="Create-button"
        disabled={RowGlaccountID?false:true}
        type="primary"
        onClick={() => {
          setopenHyphothese(true);
        }}
        style={{
          textAlign: "right",
        }}
      >
        Create a new Hyphothesis
      </Button>
          </Space></Row>
     
      <CollectionCreateHyphothesis
        openHyphothese={openHyphothese}
        OnopenHyphothese={OnopenHyphothese}
        onCancel={() => {
          setopenHyphothese(false);
          form2.resetFields();
          // onAddChamp();
        }}
      />



<Form form={form4} onFinish={onFinishEditHypo}>
          <Table bordered columns={columnsHyphothese} dataSource={HypothesesDataSource} />
</Form>
    </Card>
  );
}

export default HyphotheseofGl;
