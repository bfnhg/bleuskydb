import React, { useContext } from "react";
import { useState, useEffect } from "react";
import {
  Button,
  message,
  Form,
  Table,
  Card,
  Input,
  InputNumber,
  Typography,
  Select,
  Space,
  Radio,
  Tabs,
  Popconfirm,
  ConfigProvider,
} from "antd";
import Budget from "./Tables/Budget";
import Performance from "./Tables/Performance";
import Reals from "./Tables/Reals";
import HyphothesisOfGl from "./Tables/HyphothesisOfGl";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { CompanyContext } from "../../contexts/CompanyContext";
import { JSON_API } from "../../services/Constants";

import { useParams, Link } from "react-router-dom";
const { Option } = Select;

const { TextArea } = Input;
const { Text } = Typography;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 12,
  },
};

// ON CHANGE SELECT
const handleChange = (value) => {
  console.log(`selected ${value}`);
};
// For tabs
const onChange = (key) => {
  console.log(key);
};

//for tabs Form
const onChangee = (key) => {
  console.log(key);
};

function LiabilityDetail() {
  //mode of tabs


  const {Companies,setCompanies,Company,Actionstate,setActionstate}=useContext(CompanyContext);
  const [messageApi, contextHolder] = message.useMessage();
  const { id } = useParams();
  const [balance, setbalance] = useState("");
  const { TextArea } = Input;
  const [liability,setliability] = useState([]);
  const [Real,setReal] = useState([]);
  const [performance,setperformance] = useState([]);
  const [Note,setNote] = useState("");
  const [Category,setCategory] = useState();
  useEffect(()=>  {
    getLiability();
    getReals();
    getPerformance();
    getStatementClass();
    handleclass();
    getHypothesis();
    },[Company.id]);

    const getLiability = async () => {
    await axios
      .get(`${JSON_API}/Liability/LiabilityBudgets/${id}`)
      .then((res) => {
        console.log(res.data);
        setliability(res.data);
        setNote(res.data.note);
        {res.data.financialStatementCategory &&
          setCategory(res.data.financialStatementCategory.id);}
        setGifi(res.data.financialStatementType.gifi);
        setglAccount(res.data.glAccount.glNumber);
        getHypothesis(res.data.glAccount.id);
      })
      .catch((err) => {
        console.log(err);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPerformance = async () => {
    await axios
      .get(`${JSON_API}/Liability/LiabilityPerformance/${id}`)
      .then((res) => {
        console.log("test",res.data);
        setperformance(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const getReals = async () => {
    await axios
      .get(`${JSON_API}/Liability/LiabilityReal/${id}`)
      .then((res) => {
        console.log("test",res.data);
        setReal(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const DeleteFinancialStatement = async () => {
    await axios
      .delete(`${JSON_API}/Liability/${liability.id}`)
      .then((res) => {
        console.log(res.data);
        
        //setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const UpdateFinancialStatement = async () => {
    console.log(liability)
    console.log(Note)
    const obj = {
      id : liability.id,
      financialStatementClassId : liability.financialStatementClass.id,
      financialStatementCategoryId : Category,
      note : Note,
      budgets : liability.budgets,
      reals : Real.reals
    }
    console.log(obj)
    await axios
      .put(`${JSON_API}/Liability/LiabilityBudgetUpdate`,obj)
      .then((res) => {
        getLiability();
        messageApi.open({
          type: "success",
          content: "Updated successfully",
        });
        //console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .catch((err) => {
        console.log(err);
      });
  };




  function handleBudgetChange(budget){
    setliability(prevState => {
      return {...prevState,budgets:budget}
    })
    console.log(liability.budgets);
  }
  function handleRealChange(real){
    setReal(prevState => {
      return {...prevState,reals:real}
    })
  }
  const [gifi, setGifi] = useState("");
  const [glAccount, setglAccount] = useState(null);
  const [note, setnote] = useState("");

  const [Hypo, setHypo] = useState(null);
  // const [liabilities,setliabilities=useState("");

  const [statementcategory, setStatementCategory] = useState([{}]);
  const [statementtype, setStatementType] = useState([{}]);
  const [statementclass, setStatementClass] = useState([{}]);

  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  useEffect(() => {
    getLiability();
    getStatementClass();
    handleclass();
    getHypothesis();
    console.log(liability);
  }, []);
  
  const getHypothesis = async (e) => {
    await axios
      .get(`${JSON_API}/GLAccount/${e}`)
      .then((res) => {
        console.log("hypothesis: ", res.data);
        setHypo(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleclass = async () => {
    // console.log(e);
    await axios
      .get(`${JSON_API}/FinancialStatementCategory/class/${id}`)
      .then((res) => {
        console.log("testtest",res);
        setStatementCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStatementClass = async () => {
    await axios
      .get(`${JSON_API}/FinancialStatementClass`)
      .then((res) => {
        console.log(res);
        setStatementClass(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //default values

  //main Information
  const itemsForm = [
    {
      key: "1",
      label: (
        <h1 style={{ width: 300, textAlign: "center" }}>Main information</h1>
      ),
      children: liability.budgets && (
        <div>
          <Form

          
            {...layout}
            name="nest-messages"
            style={{
              maxWidth: 800,
              margin: "auto",
            }}
          >
            <h1
              style={{
                margin: "auto",
                textAlign: "center",
              }}
            >
              Single Blance Sheet Details
            </h1>

            <Form.Item
              // value={nom}
              name="class"
              label="Class"
              value={liability}
              rules={[
                {
                  required: true,
                  message: "Please input the class",
                },
              ]}
            >
              {" "}
              <Select
                defaultValue="Liability"
                disabled
                // placeholder={"Asset"}
              ></Select>
            </Form.Item>

            <Form.Item name="category" label="Category">
              <Select placeholder={Category} onChange={e=>setCategory(e)}>
                {statementcategory && statementcategory.map(
                  (e) => e && <Option value={e.id}>{e.label}</Option>
                )}
              </Select>
            </Form.Item>

            <Form.Item
              // name={["user", "website"]}
              label={"Type"}
            >
              <Select
                value={gifi}
                disabled
                style={{
                  width: 400,
                }}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item
              // name={["user", "website"]}
              label={"Gl Number"}
            >
              <Select
                value={glAccount}
                disabled
                style={{
                  width: 400,
                }}
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item label="Note">
              <Input.TextArea
              onChange={e=>setNote(e.target.value)}
                style={{
                  width: 400,
                }}
                placeholder={Note}
                rows={2}
              />
            </Form.Item>
            <Form.Item></Form.Item>
          </Form>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <h1 style={{ width: 300, textAlign: "center" }}>Hyphotheses GL</h1>
      ),
      children: (
        <div>
          {Hypo && <HyphothesisOfGl HypothesesDataSource={Hypo} />}
        </div>
      ),
    },
  ];

  // for table Buget ,Reals and Performance
  const items = [
    {
      key: "1",
      label: <h1 style={{ width: 300, textAlign: "center" }}>Budget</h1>,
      children: (
        <div>
          {liability.budgets && <Budget liabilityBudgets={liability.financialStatementClass && liability.budgets} onBudgetChange={handleBudgetChange} />}
        </div>
      ),
    },

    {
      key: "2",
      label: <h1 style={{ width: 300, textAlign: "center" }}>Reals</h1>,
      children: (
        <div>
          {liability.budgets && <Reals liabilityReals={Real.reals} liabilityBudgets={liability.financialStatementClass && liability.budgets} onRealChange={handleRealChange} />}
        </div>
      ),
    },
    {
      key: "3",
      label: <h1 style={{ width: 300, textAlign: "center" }}>Perfermonce</h1>,
      children: <div>
        {liability.budgets && <Performance liabilityReals={Real.reals} liabilityBudgets={liability.financialStatementClass && liability.budgets} liabilityPerformance={performance.performances}/>}
      </div>,
    },
  ];

  return (
    <div>
      {contextHolder}
      <Card
        style={{
          width: 900,
          margin: "auto",
          background: "#FFFDFD",
        }}
      >
        <Space
          direction="vertical"
          style={{
            width: "27%",
            height: "50",
          }}
        >
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#059BFF",
              },
            }}
          >
            {" "}
            <Button type="primary" block onClick={UpdateFinancialStatement}>
              Save Changes
            </Button>
          </ConfigProvider>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#FFA805",
              },
            }}
          >
            {" "}
            <Link to="/liabilities">
            <Button type="primary" block>
              Back to Financial Statements
            </Button>
            </Link>
          </ConfigProvider>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#FF0606",
              },
            }}
          >
            {" "}
            <Button type="primary" block onClick={DeleteFinancialStatement}>
              Delete Statements
            </Button>
          </ConfigProvider>
        </Space>{" "}
        <br></br>
        <br></br>
        <Tabs
          style={{ marginBottom: 32, Color: "#059BFF" }}
          type="card"
          centered
          defaultActiveKey="1"
          items={itemsForm}
          onChange={onChangee}
        />
      </Card>

      <br></br>
      <br></br>
      <div>
        <Tabs
          style={{ marginBottom: 32, Color: "#059BFF" }}
          type="card"
          centered
          defaultActiveKey="2"
          items={items}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default LiabilityDetail;