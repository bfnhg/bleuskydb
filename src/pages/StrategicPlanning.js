
import React, { useCallback, useEffect, useState } from "react";
import {
  Space,
  Table,
  Tag,
  Progress,
  Form,
  Button,
  icon,
  Input,
  Popconfirm,
  Badge,
  DatePicker,
  Radio,
  Modal,
} from "antd";

import { useForm } from "rc-field-form";
import { PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import axios from "axios";
// import "./Tableau.css";
const items = [
  {
    key: "1",
    label: "Action 1",
  },
  {
    key: "2",
    label: "Action 2",
  },
];


function StrategicPlanning() {
  const [id, setid] = useState("");
  const [detail, setdetail] = useState("");
  const [type, settype] = useState("");
  const [count, setCount] = useState(2);
   const [Object, setObject] = useState([]);
    useEffect(() => {

      // axios
      //   .get("http://localhost:5000/StratigicTarget")

      //   .then((res) => {
      //     console.log(res);
      //     //  const array = res.data;
      //     // console.log(array[0]);

          setObject([{id:1,type:"Visibilité et notoriété",details:"Augmenter la visibilité et notoriété du collectif d'Experts",status:"valider"},
          {id:2,type:"Croissance",details:"Augmenter les ventes avec de la récurrence",status:"en attend"},
          {id:3,type:"Fidélisation des clients",details:"Ajouter à l'offre de valeur des produits",status:"en attend"}]);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    }, []);
   const onChangee = (date, dateString) => {
     console.log(date, dateString);
   };
   const [open, setOpen] = useState(false);
   const { TextArea } = Input;

  //  const [dataSource, setDataSource] = useState([]);

    // useEffect(() => {
    //   (async () => {
    //     axios
    //       .get("http://localhost:5000/StratigicTarget")
    //       .then((res) => {
    //         console.log(res);
    //         setObject(res);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   })();
    // }, []);
   

  // const handleDelete = (key) => {
  //   const newData = dataSource.filter((item) => item.key !== key);
  //   setDataSource(newData);
  // };
  


  const submite = async (e) => {
    //construction dobjet json
    const formData = {
      id: id,
      type: e.type,
      detail: e.detail,
    };

    console.log(formData);
    axios
      .post(`http://localhost:5000/StratigicTarget`, formData)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },

    {
      title: "Type de champ",
      dataIndex: "type",
    },
    {
      title: "Detail",
      dataIndex: "details",
    },
    {
      title: "statut",
      dataIndex: "status",

      render: (_,record ) => 
        
          {
              let color ="";
              if (record.status === "valider") {
                color = "green";
              } else if (record.status === "en attend") {
                color = "orange";
              } else if (record.status === "echouer") {
                color = "red";
              }
              return (
                <div className="">
                  <Tag color={color} key={record.status}>
                    {record.status.toUpperCase()}
                  </Tag>
                </div>
              );
            }
            
        
      
    },
    {
      title: "Progression",
      render: (_, record) => {
        return (
          <tr>
            <Space wrap>
              <td>
                <Progress type="circle" percent={30} width={50} />
              </td>
            </Space>
          </tr>
        );
      },
    },
    

    {
      title: "Action",
      key: "operation",
      render: (_, record) =>{
        <button> </button>
        
          // <Popconfirm
          //   title="Sure to delete?"
          //   onConfirm={() => handleDelete(record.key)}
          // >
            
            {/* <a style={{ margin: 20 }} >
              Add
            </a> */}
          }
          
    },
  ];
 
  

  // const onAddChamp = () => {
  //   const newChamp = {
  //     key: "",
  //     title: "",
  //     dataIndex: "",
  //   };
  //   // setDataSource((pre) => {
  //   //   return [...pre, newChamp];
  //   // });
  // };
  
  

  const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
       
    

    return (
      <Modal
        onClick={submite}
        open={open}
        title="Create a new Stratigic Target"
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
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
        >
          <Form.Item name="id" label="id">
            <Input />
          </Form.Item>

          <Form.Item
            name="type"
            label="type"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item name="detail" label="detail">
            <TextArea rows={4}></TextArea>
          </Form.Item>
          <Form.Item
            name="modifier"
            className="collection-create-form_last-form-item"
          ></Form.Item>
        </Form>
      </Modal>
    );
  };

 
  // const onCreate = (values) => {
  //   console.log("Received values of form: ", values);
  //   setOpen(false);
  // };

  return (
    <>
      <div>
        <span>
          Strategic Planning (Selected Year)
          <a style={{ marginLeft: ".5rem" }}>
            <DatePicker onChange={onChangee} />
          </a>
        </span>
      </div>
      <h3>Strategic targets </h3>{" "}
      <div>
        <Button
          className="Create-button"
          type="primary"
          onClick={() => {
            setOpen(true);
          }}
        >
          Create
        </Button>
        <CollectionCreateForm
          open={open}
          onCreate={submite}
          onCancel={() => {
            setOpen(false);
            // onAddChamp();
          }}
        />
      </div>
      <Table columns={columns} dataSource={Object} />
      <h2> Departements</h2>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={8}>
            <Card size="small" title="Comptabilité & Finance">
              <span>
                <h4>
                  Progression :
                  <Progress
                    style={{ marginLeft: ".5rem" }}
                    type="circle"
                    percent={90}
                    strokeColor={{
                      "0%": "#108ee9",
                      "100%": "#87d068",
                    }}
                    width={40}
                  />
                </h4>
              </span>
              <span>
                <h4> Targets : Financement</h4>
              </span>

              <button className="details-button">Details</button>
            </Card>
          </Col>

          <Col span={8}>
            <Card size="small" title="Human Resources" bordered={false}>
              {" "}
              <span>
                <h4>
                  Progression :
                  <Progress
                    style={{ marginLeft: ".5rem" }}
                    type="circle"
                    percent={30}
                    width={40}
                  />
                </h4>
              </span>
              <span>
                <h4> Targets : ressources humaines</h4>
              </span>
              <button className="details-button">Details</button>
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small" title="Human Resources" bordered={false}>
              <h4>
                Progression :
                <Progress
                  style={{ marginLeft: ".5rem" }}
                  type="circle"
                  percent={30}
                  width={40}
                />
              </h4>
              <h4> Targets : Croissance,Financement</h4>
              <button className="details-button">Details</button>
            </Card>
          </Col>
        </Row>
        <br></br>
      </div>
      <br></br>
    </>
  );
}

export default StrategicPlanning

