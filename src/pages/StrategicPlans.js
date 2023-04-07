import React, { useMemo, useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
  message,
} from "antd";
import { JSON_API } from "../services/Constants";
import dayjs from "dayjs";
import { useForm } from "rc-field-form";
import {
  PlusCircleOutlined,
  PlusOutlined,
  LinkOutlined,
  DisconnectOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Spin } from "antd";
import { CompanyContext } from "../contexts/CompanyContext";

import axios from "axios";
// import "./Tableau.css";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { render } from "@testing-library/react";
import locale from "antd/es/date-picker/locale/zh_CN";
import moment from "moment";

dayjs.extend(customParseFormat);
const { TextArea } = Input;

function StrategicPlans() {
  const [projectNumber, setProjectNumber] = useState("");
  const [predictedEndDate, setPredictedEndDate] = useState("");
  const [actualEndDate, setActualEndDate] = useState("");
  const [comments, setcomments] = useState("");
  const [priority, setPriority] = useState(null);
  const [activity, setActivity] = useState({});
  const [label, setLabel] = useState();
  const [deptdata,setdeptdata]=useState();
  const [deptid,setdeptid]=useState();

  const [activities, setActivities] = useState([]);
  const [steps, setSteps] = useState([]);
  const [step, setStep] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [disableBtn,setdisableBtn]=useState(true);
  const [plans, setPlans] = useState([]); //contient les plans du deparment de lentreprise

  const [plan, setPlan] = useState([]);
  const [planId, setPlanId] = useState(null);
  const [stepId, setStepId] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState(null);
  const [checkRow, setCheckRow] = useState(false);
  const year = useLocation().state.year;
  const departmentId = useLocation().state.departmentId;

  const [strategicTargets, setStrategicTargets] = useState([]);
  const [strategicTargetId, setStrategicTargetId] = useState(null);
  const [departmentName, setDepartmentName] = useState(null);

  const [spinner, setSpinner] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const { Company } = useContext(CompanyContext);
  const { Option } = Select;
  const [form] = Form.useForm();
  
  const getDepartmentdata = async (e)=>{
    await axios
    .get(`${JSON_API}/Departments/${e}`)
    .then((res) => {
      setDepartmentName(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const getfirstplan =async () => {
    await axios
    .get(`${JSON_API}/StrategicPlans/${departmentId}/${year}`)
    .then((res) => {
      setPlans(res.data);
      const data = res.data[0];
      console.log("strategic plans du departement:",data)
      getSteps(data.id);
      setPlanId(data.id);

      setPlan(data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const getdata = async () => {

    await axios
      .get(`${JSON_API}/EnterpriseDepartments/${departmentId}`)
      .then((res) => {
        console.log("departement de lentreprise:",res.data)
        getDepartmentdata(res.data.departmentId);
      })
      .catch((err) => {
        console.log(err);
      });

      await axios
      .get(`${JSON_API}/EnterpriseDepartments/${Company.id}/${year}`)
      .then((res) => {
        const person = res.data.find((p) => p.id === departmentId);
        setdeptdata(person);

        console.log("data dept,",person);
      })
      .catch((err) => {
        console.log(err);
      });

   

    // await axios
    //   .get(`${JSON_API}/StrategicPlans/${departmentId}/${year}`)
    //   .then((res) => {
    //     setPlans(res.data);
    //     const data = res.data[0];
    //     console.log("strategic plans du departement:",data)
    //     getSteps(data.id);
    //     setPlanId(data.id);

    //     setPlan(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });


    await axios
      .get(`${JSON_API}/Employees/enterprise/${Company.id}`)
      .then((res) => {
        setEmployees(res.data);
        console.log(employees);
      })
      .catch((err) => {
        console.log(err);
      });
    await axios
      .get(`${JSON_API}/StrategicTargets/targets/${departmentId}/${year}`)
      .then((res) => {
        console.log(res);
        setStrategicTargets(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //Get Steps
  const getSteps = async (e) => {

    console.log("eee",e);
    await axios
      .get(`${JSON_API}/StrategicPlanSteps/plan/${e}`)
      .then((res) => {
        console.log("steps:",res.data);
        setSteps(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Get Activities
  useEffect(() => {

    getdata();
    getfirstplan();
    // getSteps()
  }, []);
  useEffect(() => {
    return planId == null ? null : getSteps();
  }, [planId]);
  useEffect(() => {
    return stepId == null ? null : getActivities();
  }, [stepId]);

  const selectTargetId = (targetId) => {
    console.log(targetId);
    setStrategicTargetId(targetId);
  };
  const createStrategicPlan = async () => {
    setSpinner(true);
    const plan = {
      strategicTargetId: strategicTargetId,
      enterpriseDepartmentId: departmentId,
    };
    await axios
      .post(`${JSON_API}/StrategicPlans`, plan)
      .then((res) => {
        setPlanId(res.data.id);
        console.log("OOOOOOOOOOOOOOOOOOO "+res.data.id)
        message.success("Strategic Plan Created successfully!", 3);
        setSpinner(false);
        getdata();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deletStrategicPlan = async (id) => {
    setSpinner(true);

    await axios
      .delete(`${JSON_API}/StrategicPlans/${id}`)
      .then((res) => {
        console.log(res.data);
        message.success("Strategic Plan Deleted successfully!", 3);
        setSpinner(false);
        getdata();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const columnss = [
    {
      title: "Activity",
      dataIndex: "label",
      align:"center",
      render: (label, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="label"
              rules={[
                {
                  required: true,
                  message: `please enter label`,
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <div style={{ textAlign: "left" }}>{label}</div>;
        }
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      align:"center",

      render: (status, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="status"
              rules={[
                {
                  type: "number",
                  required: true,
                  message: "Select A Status",
                },
              ]}
            >
              <Select
                defaultValue="Medium"
                style={
                  {
                    // width: 470,
                  }
                }
                // onChange={handleChange}
                options={[
                  {
                    value: 0,
                    label: "(0%) In Progress",
                  },
                  {
                    value: 25,
                    label: "(25%) Low Progress",
                  },
                  {
                    value: 50,
                    label: "(50%) Medium Progress",
                  },
                  {
                    value: 75,
                    label: "(75%) High Progress",
                  },
                  {
                    value: 100,
                    label: "(100%) Done",
                  },
                ]}
              />
            </Form.Item>
          );
        } else {
          switch (status) {
            case 25:
              return <Tag color={"#ffbb96"}> Low Progress </Tag>;
            case 50:
              return <Tag color={"#b7eb8f"}>Medium Progress </Tag>;
            case 75:
              return <Tag color={"#bae637"}> High Progress </Tag>;
            case 100:
              return <Tag color={"#52c41a"}> Done </Tag>;
            default:
              return <Tag color={"red"}> In Progress </Tag>;
          }
        }
      },
    },
    {
      title: "Actions",
      key: "operation",
      align:"center",

      render: (_, record) => (
        <Space size="middle">
          {editingRow === record.id ? (
            <>
              <Button type="link" onClick={() => setEditingRow(null)}>
                {"cancel"}
              </Button>
              <Button type="link" htmlType="submit">
                {"save"}
              </Button>
            </>
          ) : (
            <>
              <Button
                type="link"
                onClick={() => {
                  setEditingRow(record.id);
                  form.setFieldsValue({
                    label: record.label,
                    status: record.status,
                  });
                }}
              >
                {"Edit"}
              </Button>
              <Popconfirm
                title={"deleterow"}
                onConfirm={() => handleDeleteActivity(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <a>{"Delete"}</a>
              </Popconfirm>
            </>
          )}
        </Space>
      ),
    },
  ];
  const columns = [
    {
      title: "Priority",
      dataIndex: "priority",
      align:"center",

      render: (_, { priority }) => {
        switch (priority) {
          case 0:
            return (
              <Tag color={"geekblue"}>
                <b>High</b>
              </Tag>
            );
          case 1:
            return (
              <Tag color={"#fa2"}>
                <b>Medium</b>
              </Tag>
            );
          case 2:
            return (
              <Tag color={"green"}>
                <b>Low</b>
              </Tag>
            );
        }
      },
    },
    {
      title: "Project Number",
      dataIndex: "projectNumber",
      align:"center",
      render: (_, record) => {
        return(
          <div style={{ textAlign: "left" }}>
            {record.projectNumber}
          </div>
        )
      }
    },
    {
      title: "Responsable",
      dataIndex: "responsible",
      align:"center",
      render: (_, record) => {
        return(
          <div style={{ textAlign: "left" }}>
            {record.responsible.name}
          </div>
        )
      }

    },
    {
      title: "Predicted Date",
      dataIndex: "predictedEndDate",
      align:"center",
      render: (_, record) => {
        
          return (
            <div style={{ textAlign: "center" }}>
              {dayjs(record.predictedEndDate).format("YYYY/MM/DD")}
            </div>
          );
        
      },
    },
    {
      title: "End Date",
      dataIndex: "actualEndDate",   
      align:"center",
  
      render: (_, record) => {
        
        return (
          <div style={{ textAlign: "center" }}>
            {dayjs(record.actualEndDate).format("YYYY/MM/DD")}
          </div>
        );
      
    },
    },
    {
      title: "Progression",
      dataIndex: "progress",
      align:"center",

      render: (_, { progress }) => {
        return (
           
                <Progress
                  type="circle"
                  percent={Math.round(progress)}
                  width={50}
                />
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      align:"center",

      render: (_, { status }) => {
        switch (status) {
          case 25:
            return <Tag color={"#ffbb96"}> Low Progress </Tag>;
          case 50:
            return <Tag color={"#b7eb8f"}>Medium Progress </Tag>;
          case 75:
            return <Tag color={"#bae637"}> High Progress </Tag>;
          case 100:
            return <Tag color={"#52c41a"}> Done </Tag>;
          default:
            return <Tag color={"red"}> In Progress </Tag>;
        }
      },
    },
    {
      title: "Comments",
      dataIndex: "comments",
      align:"center",
      render: (text, record) => {
       return(
        <div style={{ textAlign: "left" }}>
         {text}
        </div>
       )
      },
    },
    {
      title: "Actions",
      align:"center",

      fixed: 'right',
      render: (_, record) => {
        return (
          <>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDeleteStep(record.key)}
            >
              
                <a>Delete</a>
              
            </Popconfirm>

            <Button
              type="link"
              onClick={() => {
                handleEdit(record.key);               
                form.setFieldsValue({
                  projectNumber: record.projectNumber,
                  employeeId: record.responsible.id,
                  predictedEndDate: dayjs(record.predictedEndDate),
                  actualEndDate: dayjs(record.actualEndDate),
                  priority: record.priority,
                  comments: record.comments,
                  // priceperday: record.pricePerDay,
                });
              }}
            >
              <a style={{ marginLeft: ".5rem" }}>Edit</a>
            </Button>

            {/* <Button
              type="link"
              style={{ marginLeft: ".5rem" }}
              onClick={() => handleEdit(key)}
            >
              <b>
                <a>Edit</a>
              </b>
            </Button> */}
          </>
        );
      },
    },
  ];
  const handleEditActivity = async (values) => {
    const activity = {
      id: editingRow,
      label: values.label,
      status: values.status,
    };
    await axios
      .put(`${JSON_API}/StrategicPlanStepActivitys`, activity)
      .then((response) => {
        getActivities();
        getSteps(planId);
        getdata();
        message.open({
          type: "success",
          content: "Activity edited successfully!",
        });
      });
    setEditingRow(null);
  };
  const rowSelection = (key) => {
    setdisableBtn(false);
    setSelectedRowKeys(key);
    console.log(`selectedRowKeys: ${key}`);
    setCheckRow(true);
    setStepId(key[0]);
    // setCheckRow(false)
  };
  const stepsDto =
    steps == null
      ? []
      : steps.map((p) => ({
          key: p.id,
          projectNumber: p.projectNumber,
          responsible: p.responsible,
          responsibleid:p.responsible.id,
          predictedEndDate: p.predictedEndDate,
          actualEndDate: p.actualEndDate,
          comments: p.comments,
          priority: p.priority,
          status: p.status,
          progress: p.progress,
        }));

  const items =
    plans == null
      ? []
      : plans.map((p) => ({
          key: p.id,
          label: p.target,
          children: (
            <>
            
            <Row justify="end" gutter={[16, 16]}>

        <Space style={{
          display: 'flex',
          marginBottom: 8,

        }} align="center">

           <Popconfirm
                onConfirm={() => deletStrategicPlan(p.id)}
                type="link"
                title={departmentName?"Sure you want to remove "+ p.target+" from "+ departmentName.label+" ?":""}
              >
                <Button
                  icon={<DisconnectOutlined />}
                  // style={{
                  //   width: 120,
                  //   height: 35,
                  // }}
                  danger
                >
                  <b>Dissociate</b>
                </Button>

              </Popconfirm>

              <Button
                icon={<PlusCircleOutlined />}
                // style={{
                //   marginLeft: "80%",
                //   width: 130,
                //   height: 35,
                // }}
                type="primary"
                onClick={() => setOpen(true)}
              >
                New Step
              </Button>
        </Space>
        </Row>
             
           
              <Table
                rowSelection={{ type: "radio",selectedRowKeys: selectedRowKeys, onChange: rowSelection }}
                columns={columns}
                dataSource={stepsDto}
                scroll={{ x: 1500, y: 500 }}
              />

      <h3 style={{ display: "inline-block", width: "10%", height: "3%" }}>
              Activities
            </h3>

     
            <Row justify="end" gutter={[16, 16]}>

<Space style={{
  display: 'flex',
  marginBottom: 8,

}} align="center">

  <Button
        icon={<PlusCircleOutlined />}
       disabled={disableBtn}
        type="primary"
        onClick={() => {
          setOpenActivity(true);
        }}
      >
        New Activity
      </Button>
      
</Space>
</Row>
            
      <Form form={form} onFinish={handleEditActivity}>

        <Table

          columns={columnss}
          dataSource={activities}
        
        />
      </Form>

              </>
          ),
        }));

  const onChange = (key) => {
    setSelectedRowKeys([]);
    setdisableBtn(true);

    console.log("key is:",key);
    getSteps(key);
    setPlanId(key);
    setActivities(null);
    // setStepId(0);
    // getdata();
  };

  const getActivities = async () => {
    await axios
      .get(`${JSON_API}/StrategicPlanStepActivitys/activities/${stepId}`)
      .then((res) => {
        console.log(res.data);
        setActivities(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteStep = async (id) => {
    console.log(id);
    await axios
      .delete(`${JSON_API}/StrategicPlanSteps/${id}`)
      .then((response) => {
        getSteps(planId);
        // getdata();
      });
  };

  const submite = async (e) => {
    const formData = {
      projectNumber: e.projectNumber,
      predictedEndDate: e.predictedEndDate,
      actualEndDate: e.actualEndDate,
      comments: e.comments,
      priority: e.priority,
      employeeId: employeeId,
      strategicPlanId: planId,
    };
    console.log(formData);
    axios
      .post(`${JSON_API}/StrategicPlanSteps`, formData)
      .then((res) => {
        getSteps(planId);
        setOpen(!open);
      })
      .catch(function (error) {
        console.log("Erreuuuuuuuuuuuuuur!" + error);
      });
  };


  const handleEdit = async (id) => {
   
        setStep(id);
        setOpenn(true);
     
  };

  const employeesList =
    employees == null
      ? []
      : employees.map((emp) => ({
          value: emp.id,
          label: emp.name,
        }));

        const StatefulModalContent = (props) => {

          return(
            <Form
            form={props.form}
            layout="vertical"
            name="form_in_modal"
            initialValues={{
              modifier: "public",
            }}
          >
            {/* <Form.Item
              name="planid"
            ></Form.Item> */}
            <Form.Item
              value={employeeId}
              name="employeeId"
              label="Responsible"
              rules={[]}
            >
              <Select
                onChange={(val) => setEmployeeId(val)}
                style={{ width: 470 }}
                options={employeesList}
              />
  
              {/* <br></br>
              <Button
                style={{
                  width: 470,
                }}
                type="primary"
                ghost
              >
                Add Responsible
              </Button> */}
            </Form.Item>
            <Form.Item
              // value={projectNumber}
              name="projectNumber"
              label="Project Number"
              rules={[
                {
                  required: true,
                  message: "Enter Project Number Please !",
                },
              ]}
            >
              <Input
                placeholder="edm. prj-01"
                style={{
                  width: 470,
                }}
              />
            </Form.Item>
  
            
            <Form.Item
              // value={predictedEndDate}
              name="predictedEndDate"
              label="Predicted Date :"
              rules={[
                {
                  required: true,
                  message: "Select An Estimated Finish Date!",
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
              // value={actualEndDate}
              name="actualEndDate"
              label="End Date :"
              rules={[
                {
                  required: true,
                  message: "elect A Date!",
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
              // value={priority}
              name="priority"
              label="Priority"
              rules={[
                {
                  type: "number",
                  required: true,
                  message: "Select A Priority",
                },
              ]}
            >
              <Select
                style={{
                  width: 470,
                }}
                // onChange={handleChange}
                options={[
                  {
                    value: 0,
                    label: "High",
                  },
                  {
                    value: 1,
                    label: "Medium",
                  },
                  {
                    value: 2,
                    label: "Low",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              // value={comments}
              name="comments"
              label="Comments"
              rules={[
                {
                  required: true,
                  message: "Veuillez sélectionner un terme",
                },
              ]}
            >
              <TextArea style={{ width: 470 }} rows={4} />
            </Form.Item>
          </Form>
    )}

  const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
    const content = useMemo(() => <StatefulModalContent form={form}  />, [employeeId]);
  
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
        {content}
      
      </Modal>
    );
  };
  const CollectionUpdateTarget = ({ openn, onUpdateTarget, onCancel }) => {
    const content = useMemo(() => <StatefulModalContent form={form}  />, [employeeId]);

    return (
      <Modal
        open={openn}
        title="Update Step"
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
        {content}

        {/* <Form
          form={form}
          // initialValues={stepData}
          layout="vertical"
          name="form_in_modal"
        >
          <Form.Item
            name="projectNumber"
            label="Project Number"
          >
            <Input style={{ width: "95%", height: "31%" }} type="textarea" />
          </Form.Item>

          <Form.Item name="employeeId" label="Responsible">
            <Select
              onChange={(val) => setEmployeeId(val)}
              style={{ width: "95%", height: 40 }}
              options={employeesList}
            ></Select>
            
            {/* <Button style={{ width: "30%", height: 30 }} type="primary" ghost>
              Add Responsible
            </Button> 
          </Form.Item>
          <Form.Item
            name="predictedEndDate"
            label="Predicted Date"
          >
            <DatePicker  style={{ width: "95%" }} />
          </Form.Item>
          <Form.Item
            value={actualEndDate}
            name="actualEndDate"
            label="End Date"
          >
            <DatePicker
              style={{
                width: "95%",
              }}
            />
          </Form.Item>
          <Form.Item value={priority} name="priority" label="Priority">
            <Select
              style={{
                width: "95%",
                height: 40,
              }}
              options={[
                {
                  value: 0,
                  label: "High",
                },
                {
                  value: 1,
                  label: "Medium",
                },
                {
                  value: 2,
                  label: "Low",
                },
              ]}
            />
          </Form.Item>
          <Form.Item value={comments} name="comments" label="Comments">
            <TextArea style={{ width: "95%", height: 71 }} rows={4} />
          </Form.Item>
        </Form> */}


      </Modal>
    );
  };

  const CollectionAddActivity = ({ openActivity, onCreate, onCancel }) => {
    const [form] = Form.useForm();
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
          initialValues={{ modifier: "public" }}
        >
          <Form.Item value={label} name="label" label="Label">
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
  //Update Activity
  const CollectionUpdateActivity = ({
    openEditActivity,
    onUpdateActivity,
    onCancel,
  }) => {
    return (
      <Modal
        openEditActivity={openEditActivity}
        title="Update Activity"
        okText="Update"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onUpdateActivity(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item label="Label">
            <Input
              defaultValue={activity.label}
              style={{ width: "95%", height: "31%" }}
              type="textarea"
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  };
 
  const handleDeleteActivity = async (id) => {
    await axios
      .delete(`${JSON_API}/StrategicPlanStepActivitys/${id}`)
      .then((response) => {
        console.log(response);
        message.success("Activity Deleted successfully!", 3);
        getActivities();
        getSteps(planId);
      });
  };
  ///// CREATE
  const [open, setOpen] = useState(false);
  ///// UPDATE
  const [openn, setOpenn] = useState(false);

  const onUpdateTarget = async (values) => {
    console.log("Received values of form: ", values);

    const formData = {
      id: step,
      projectNumber: values.projectNumber,
      predictedEndDate: moment(values.predictedEndDate).format("YYYY-MM-DD"),
      actualEndDate: moment(values.actualEndDate).format("YYYY-MM-DD"),
      comments: values.comments,
      priority: values.priority,
      employeeId: values.employeeId,
      // strategicPlanId: planId,
    };
    console.log("Received values of form: ", formData);
    await axios
      .put(`${JSON_API}/StrategicPlanSteps`, formData)
      .then((res) => {
        // setStep(res.data);
        getSteps(planId);
        setOpenn(false);
      })
      .catch(function (error) {
        console.log("Erreuuuuuuuuuuuuuur!" + error);
        setOpenn(true);
      });
  };
  ////// ACtivity
  const [openActivity, setOpenActivity] = useState(false);
  const [openEditActivity, setOpenEditActivity] = useState(false);
  const addActivity = async (e) => {
    const formData = {
      label: e.label,
      strategicPlanStepId: stepId,
    };
    console.log(formData);
    axios
      .post(`${JSON_API}/StrategicPlanStepActivitys`, formData)
      .then((res) => {
        getActivities();
        setOpenActivity(!openActivity);
      })
      .catch(function (error) {
        console.log("Erreuuuuuuuuuuuuuur!" + error);
      });
  };
  const onUpdateActivity = async (values) => {
    console.log("Received values of form: ", values);
    await axios
      .put(`${JSON_API}/StrategicPlanStepActivitys`, values)
      .then((res) => {
        setActivity(res.data);
        setOpenEditActivity(false);
        getdata()
      })
      .catch(function (error) {
        console.log("Erreuuuuuuuuuuuuuur!" + error);
        setOpenEditActivity(true);
      });
  };

 
  return (
    <Card
    bordered={false}
    className="header-solid mb-24"
    title={departmentName&&
        <h3 className="font-semibold">Strategic planning  for {departmentName.label} ({year}) </h3>
    }
  >

       <Progress
                percent={deptdata&&Math.round(deptdata.strategicProgress)}
                strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}/>

<Form
      name="basic"
      // labelCol={{
      //   span: 8,
      // }}
      // wrapperCol={{
      //   span: 16,
      // }}

      // onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >

<Space style={{
          display: 'flex',
          marginBottom: 8,

        }}
        align="baseline" >

           <Form.Item
        label="Associate a Strategic Target"
        name="target"
        rules={[
          {
            required: true,
            message: `Select a Target`,
          },
        ]}
      >
         <Select
          onChange={selectTargetId}
          defaultValue=" Select Strategic Target"
          size="large"
          style={{ width: 300}}
        >
          {strategicTargets.map((st) => (
            <Option key={st.id} value={st.id}>
              {st.type}
            </Option>
          ))}
        </Select>
      </Form.Item>
          {/* <Space>{spinner ? <Spin style={{ marginLeft: "2rem" }} /> : <></>}</Space> */}
     

      <Form.Item
        // wrapperCol={{
        //   offset: 8,
        //   span: 16,
        // }}
      >
      <Button
        onClick={() => createStrategicPlan()}
        loading={spinner}
        icon={<LinkOutlined />}
        // style={{
        //   width: 120,
        //   height: 35,
        //   marginLeft: "3rem",
        // }}
        type="primary"
      >
        <b>Associate</b>
      </Button>
      </Form.Item>
        </Space>
    </Form>
     
       

  
      
      <CollectionUpdateTarget
        openn={openn}
        onUpdateTarget={onUpdateTarget}
        onCancel={() => {
          setOpenn(false);
          form.resetFields();
        }}
      />
      <Tabs items={items} onChange={onChange} />

      
      <CollectionCreateForm
        open={open}
        onCreate={submite}
        onCancel={() => {
          setOpen(false);
          form.resetFields();
        }}
      />
    
      <CollectionUpdateActivity
        openEditActivity={openEditActivity}
        onUpdateActivity={onUpdateActivity}
        onCancel={() => {
          setOpenEditActivity(false);
        }}
      />
     
      <CollectionAddActivity
        openActivity={openActivity}
        onCreate={addActivity}
        onCancel={() => {
          setOpenActivity(false);
        }}
      />
    </Card>
  );
}
export default StrategicPlans;