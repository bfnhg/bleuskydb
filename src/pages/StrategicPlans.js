import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
    Space,
    Table,
    Tag,
    Progress,
    Form,
    Button,
    icon,
    Input,
    Badge,
    DatePicker,
    Radio,
    Modal,
    Tabs,
    Divider,
    Select,
    Popconfirm,
  } from "antd";
import {JSON_API} from '../services/Constants';
import dayjs from 'dayjs';
import { useForm } from "rc-field-form";
import { PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import { CompanyContext } from '../contexts/CompanyContext';
import { useTranslation } from 'react-i18next';

import axios from "axios";
// import "./Tableau.css";
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);


function StrategicPlans() {
    const [item, setitem] = useState([]);
    const [id, setid] = useState("");
    const [projnumber, setprojnumber] = useState("");
    const [responsable, setresponsable] = useState("");
    const [predictedDate, setpredictedDate] = useState("");
    const [endDate, setendDate] = useState("");
    const [comments, setcomments] = useState("");
    const [status,setstatus]=useState("");
    const [priorite,setpriorite]=useState("");
    const [activity,setactivity]=useState([]);
    const [tabe, settabe] = useState([]);
    const [departements,setDepartements]=useState();

  const getdata = async () => {
    await axios
      .get(`${JSON_API}/AssociateTarget`)

      .then((res) => {
        console.log(res.data);

        settabe(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => getdata(), []);


  const getActivity = async () => {
    await axios
      .get("http://localhost:5000/Activity")

      .then((res) => {
        console.log(res.data);

        setactivity(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
   


  // useEffect(() => {
  //   getType();
  //   getdata();
  // },[]);
  // const getType = async () => {
  //   await axios
  //     .get("http://localhost:5000/StratigicTarget")

  //     .then((response) => {
  //       const data = response.data;
  //       const list = [];
  //       data.forEach((element) => {
  //         let obj = {
  //           key: element.id,
  //           label: element.type,
  //           children: (
  //             <div>
  //               <h4>{element.type}</h4>
  //               <Table columns={columns} dataSource={tabe} />
  //             </div>
  //           ),
  //         };
  //         list.push(obj);
  //       });

  //       setitem(list);
  //       console.log(list);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const handleDeleteTarget = async (e) => {
    console.log(e);
    await axios
      .delete(`http://localhost:5000/AssociateTarget/${e}`)
      .then((response) => {
        console.log(response);
        getdata();
      });
  };


    const submite = async (e) => {
      //construction dobjet json
      const formData = {
        id: id,
        priorite: e.priorite,
        projnumber: e.projnumber,
        responsible: e.responsible,
        predictedDate: e.predictedDate,
        endDate: e.endDate,
        comments: e.comments,
        status: e.status,
      };

      console.log(formData);
      axios
        .post(`http://localhost:5000/AssociateTarget`, formData)
        .then((res) => {
          console.log(res);
          getdata();
          console.log(res.data);
          setOpen(!open);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  

  
    const handleChange = (value) => {
      console.log(`selected ${value}`);
    };

    ////// fonction  appeller lors de click sur le botton create TARGER
    const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
      const [form] = Form.useForm();
      const { TextArea } = Input;
      return (
        <Modal
          open={open}
          title="Create a new Target"
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

            {/* <Form.Item
              value={id}
              name="id"
              label="Id"
              rules={[
                {
                  required: true,
                  message: "Veuillez saisir un Id",
                },
              ]}
            >
              <Input
                style={{
                  width: 470,
                }}
              />
            </Form.Item> */}

            <Form.Item
              value={priorite}
              name="priorite"
              label="Priorité"
              rules={[
                {
                  required: true,
                  message: "Veuillez sélectionner un terme",
                },
              ]}
            >
              <Select
                defaultValue="1"
                style={{
                  width: 470,
                }}
                onChange={handleChange}
                options={[
                  {
                    value: "1",
                    label: "1",
                  },
                  {
                    value: "2",
                    label: "2",
                  },
                  {
                    value: "3",
                    label: "3",
                  },
                ]}
              />
            </Form.Item>

            <Form.Item
              value={projnumber}
              name="projnumber"
              label="project Number"
              rules={[
                {
                  required: true,
                  message: "Veuillez sélectionner un terme",
                },
              ]}
            >
              <Select
                defaultValue=""
                style={{
                  width: 470,
                }}
                onChange={handleChange}
                options={[
                  {
                    value: "1",
                    label: "1",
                  },
                  {
                    value: "2",
                    label: "2",
                  },

                  {
                    value: "3",
                    label: "3",
                  },
                  {
                    value: "4",
                    label: "4",
                  },
                  {
                    value: "5",
                    label: "6",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              value={responsable}
              name="responsable"
              label="Responssable"
              rules={[]}
            >
              <Select
                defaultValue=""
                style={{
                  width: 470,
                }}
                onChange={handleChange}
                options={[
                  {
                    value: "jack",
                    label: "Jack",
                  },
                  {
                    value: "amin",
                    label: "Amin",
                  },
                  {
                    value: "marouan",
                    label: "Marouan",
                  },
                  {
                    value: "omar",
                    label: "Omar",
                  },
                ]}
              />
              <br></br>
              <Button
                style={{
                  width: 470,
                }}
                type="primary"
                ghost
              >
                Add Responssable
              </Button>
            </Form.Item>

            <Form.Item
              value={predictedDate}
              name="predictedDate"
              label="Predicted Date :"
              rules={[
                {
                  required: true,
                  message: "Veuillez saisir le titre de Créancier!",
                },
              ]}
            >
              <DatePicker
                style={{
                  width: 470,
                }}
              />
            </Form.Item>

            <Form.Item
              value={endDate}
              name="endDate"
              label="End Date :"
              rules={[
                {
                  required: true,
                  message: "Veuillez saisir le titre de Créancier!",
                },
              ]}
            >
              <DatePicker
                style={{
                  width: 470,
                }}
              />
            </Form.Item>

            <Form.Item value={status} name="status" label="Status">
              <Select
                defaultValue=""
                style={{
                  width: 470,
                }}
                onChange={handleChange}
                options={[
                  {
                    value: "ValiderValider",
                    label: "Valider",
                  },
                  {
                    value: "en cours",
                    label: "en cours",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              value={comments}
              name="comments"
              label="Comments"
              rules={[
                {
                  required: true,
                  message: "Veuillez sélectionner un terme",
                },
              ]}
            >
              <TextArea
                style={{
                  width: 470,
                }}
                rows={4}
              />
            </Form.Item>
          </Form>
        </Modal>
      );
    };

    ////// fonction  appeler lors de click sur le botton Update target

    const CollectionUpdateTarget = ({ openn, onUpdateTarget, onCancel }) => {
      const [form] = Form.useForm();
      const { TextArea } = Input;
      return (
        <Modal
          open={openn}
          title="Update Strategic Target"
          okText="Update"
          cancelText="Cancel"
          onCancel={onCancel}
          onOk={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();
                onUpdateTarget(values);
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
            <Form.Item label="Project Number">
              <Input
                style={{
                  width: "95%",
                  height: "31%",
                }}
                type="textarea"
              />
            </Form.Item>
            <Form.Item label="Responssable">
              <Select
                defaultValue="Adham"
                style={{
                  width: "95%",
                  height: 40,
                }}
                onChange={handleChange}
                options={[
                  {
                    value: "jack",
                    label: "Jack",
                  },
                  {
                    value: "adham",
                    label: "adham",
                  },
                ]}
              />
              <Button
                style={{
                  width: "30%",
                  height: 30,
                }}
                type="primary"
                ghost
              >
                Add Responssable
              </Button>
            </Form.Item>
            <Form.Item label="Predicted Date :">
              <DatePicker
                style={{
                  width: "95%",
                }}
              />
            </Form.Item>

            <Form.Item label="End Date :">
              <DatePicker
                style={{
                  width: "95%",
                }}
              />
            </Form.Item>

            <Form.Item name="number" label="Priority">
              <Select
                defaultValue="1"
                style={{
                  width: "95%",
                  height: 40,
                }}
                onChange={handleChange}
                options={[
                  {
                    value: "2",
                    label: "2",
                  },
                  {
                    value: "1",
                    label: "1",
                  },
                ]}
              />
            </Form.Item>

            <Form.Item name="descreption" label="Status">
              <Select
                defaultValue="In Comming"
                style={{
                  width: "95%",
                  height: 40,
                }}
                onChange={handleChange}
                options={[
                  {
                    value: "validate",
                    label: "validate",
                  },
                  {
                    value: "In Comming",
                    label: "In Comming",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="Comments">
              <TextArea
                style={{
                  width: "95%",
                  height: 71,
                }}
                rows={4}
              />
            </Form.Item>
          </Form>
        </Modal>
      );
    };

    const CollectionAddActivity = ({
      openActivity,
      OnopenActivity,
      onCancel,
    }) => {
      const [form] = Form.useForm();
      // const { TextArea } = Input;
      return (
        <Modal
          open={openActivity}
          title=" Creat new Activity"
          okText="Create"
          cancelText="Cancel"
          onCancel={onCancel}
          onOk={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();
                OnopenActivity(values);
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
            <Form.Item label="Titre">
              <Input
                style={{
                  width: "95%",
                  height: "31%",
                }}
                type="textarea"
              />
            </Form.Item>
          </Form>
        </Modal>
      );
    };

  const onChange = (key) => {
    console.log(key);
  };
  const columns = [
    {
      title: <h1> ID</h1>,
      dataIndex: "id",
    },
    {
      title: <h1> Priorité</h1>,
      dataIndex: "priorite",
    },
    {
      title: <h1> project Number</h1>,
      dataIndex: "projnumber",
    },
    {
      title: <h1> Responsable</h1>,
      dataIndex: "responsable",
    },
    {
      title: <h1> Predicted Date</h1>,
      dataIndex: "predictedDate",
    },
    {
      title: <h1> End Date</h1>,
      dataIndex: "endDate",
    },
    {
      title: <h1> Status</h1>,
      dataIndex: "status",
    },
    {
      title: <h1> Comments</h1>,
      dataIndex: "comments",
      width: "18%",
    },
    {
      title: <h1> Actions</h1>,
      dataIndex: "",
      render: (_, record) => {
        return (
          <>
            <Popconfirm
              // onClick={handleRefreshClick}
              title="Sure to delete?"
              onConfirm={() => handleDeleteTarget(record.id)}
            >
              <a>Delete</a>
            </Popconfirm>

            <Button
              type="link"
              style={{ marginLeft: ".5rem" }}
              onClick={() => {
                setOpenn(true);
              }}
            >
              <a>Edit</a>
            </Button>

            <CollectionUpdateTarget
              openn={openn}
              onUpdateTarget={onUpdateTarget}
              onCancel={() => {
                setOpenn(false);
              }}
            />
          </>
        );
      },
    },
  ];

  const items = [
    {
      key: "2",
      label: <h1> Financement</h1>,
      children: (
        <div>
          <h1>Financement</h1>
          <Table columns={columns} dataSource={tabe} />
        </div>
      ),
    },
    {
      key: "3",
      label: <h1> Rentabilité</h1>,
      children: (
        <div>
          <h1>Rentability</h1>
          <Table columns={columns} dataSource={tabe} />
        </div>
      ),
    },
    {
      key: "4",
      label: <h1> Croissance</h1>,
      children: (
        <div>
          <h1>Croissance</h1>
          <Table columns={columns} dataSource={tabe} />
        </div>
      ),
    },
    {
      key: "5",
      label: <h1> Notorité</h1>,
      children: (
        <div>
          <h1>Notorité</h1>
          <Table columns={columns} dataSource={tabe} />
        </div>
      ),
    },
    {
      key: "6",
      label: <h1> Visibilité</h1>,
      children: (
        <div>
          <h1>Visibilité</h1>
          <Table columns={columns} dataSource={tabe} />
        </div>
      ),
    },
  ];

  ///// CREATE
  const [open, setOpen] = useState(false);
  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setOpen(false);
  };

  ///// UPDATE
  const [openn, setOpenn] = useState(false);
  const onUpdateTarget = (values) => {
    console.log("Received values of form: ", values);
    setOpenn(false);
  };
  ////// ACtivity
  const [openActivity, setOpenActivity] = useState(false);
  const OnopenActivity = (values) => {
    console.log("Received values of form: ", values);
    setOpenActivity(false);
  };

  /////////////////////////Activities Colums
  const columnss = [
    {
      title: "Activity",
      dataIndex: "nom",

    },

    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => {
        return (
          <>
            <Popconfirm type="link" title="Sure to delete?">
              <a>Delete</a>
            </Popconfirm>
            <Button style={{ marginLeft: ".5rem" }} type="link">
              Edit
            </Button>
          </>
        );
      },
    },
  ];
  // const dataa = [
  //   {
  //     key: "1",
  //     activity: "Activity 1",
  //   },
  //   {
  //     key: "2",
  //     activity: "Activity 2",
  //   },
  //   {
  //     key: "3",
  //     activity: "Activity 3",
  //   },
  // ];
  const jjkk = () => {
    setOpen(true);
    // console.log(setOpen);
   
  };
  return (
    <div>
      <span>
        Associate a Strategic Target
        <Select
          defaultValue=" Select Strategic Target"
          style={{
            width: 350,
            marginLeft: "3rem",
          }}
          onChange={handleChange}
          options={[
            {
              value: "Fidélisation",
              label: "Fidélisation des Clients",
            },
            {
              value: "Financement",
              label: "Financement",
            },
            // {
            //   value: "Rentabilite",
            //   label: "Rentabilité",
            // },
          ]}
        />
      </span>
      <Button
        style={{
          width: 130,
          height: 35,
          marginLeft: "3rem",
        }}
        type="primary"
      >
        {" "}
        Associate a Target
      </Button>{" "}
      {/*///////////  Create new Strategic Target */}
      <Button style={{ marginLeft: "82%" }} type="primary" onClick={jjkk}>
        Create new Strategic Target
      </Button>
      <CollectionCreateForm
        open={open}
        onCreate={submite}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      {/*////////////////// Create new Activity */}
      {/* <Table
        columns={columns}
        dataSource={tabe}
        scroll={{
          x: 1300,
        }} 
      />
      */}
      <br></br>
      <Button
        style={{ marginLeft: "40%" }}
        type="primary"
        onClick={() => {
          setOpenActivity(true);
        }}
      >
        Add new Activity
      </Button>
      <CollectionAddActivity
        openActivity={openActivity}
        OnopenActivity={OnopenActivity}
        onCancel={() => {
          setOpenActivity(false);
        }}
      />
      <h4>Activities</h4>
      <Table
        style={{ width: "50%" }}
        columns={columnss}
        dataSource={activity}
        size="small"
      />
    </div>
  );
}

export default StrategicPlans;