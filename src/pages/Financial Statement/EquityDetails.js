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
  Modal,
  Row,
  Col,
  Popconfirm,
  ConfigProvider,
} from "antd";
import "./tabscard.css";
import BudgetEquity from "./Tables/BudgetEquity";
import PerformanceEquity from "./Tables/PerformanceEquity";
import RealEquity from "./Tables/RealEquity";
import HyphothesisOfGl from "./Tables/HyphothesisOfGl";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { CompanyContext } from "../../contexts/CompanyContext";
import { JSON_API } from "../../services/Constants";
import { useHistory } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import Equity from "./Equity";
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

function EquityDetails() {
  //mode of tabs

  const { Companies, setCompanies, Company, Actionstate, setActionstate } =
    useContext(CompanyContext);
  const [messageApi, contextHolder] = message.useMessage();
  const { id } = useParams();
  const [balance, setbalance] = useState("");
  const { TextArea } = Input;
  const [liability, setliability] = useState([]);
  const [Real, setReal] = useState([]);
  const [performance, setperformance] = useState([]);
  const [Note, setNote] = useState("");
  const [Category, setCategory] = useState();
  const [open, setOpen] = useState(false);
   const history = useHistory();

  const [Class, setClass] = useState();
  useEffect(() => {
    getEquity();
    getReals();
    getPerformance();
    // getStatementClass();
    getHypothesis();
  }, [Company.id]);

  function handleredirection() {
    history.push("/equity");
    getEquity(false);
  }

  const getEquity = async () => {
    await axios
      .get(`${JSON_API}/Equity/EquityBudgets/${id}`)
      .then((res) => {
        console.log(res.data);
        setliability(res.data);
        setNote(res.data.note);
        {
          res.data.financialStatementCategory &&
            setCategory(res.data.financialStatementCategory.id);
        }
        setClass(res.data.financialStatementClass.id);
        handleclass(res.data.financialStatementClass.id);
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
      .get(`${JSON_API}/Equity/EquityPerformance/${id}`)
      .then((res) => {
        console.log("test", res.data);
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
      .get(`${JSON_API}/Equity/EquityReal/${id}`)
      .then((res) => {
        console.log("test", res.data);
        setReal(res.data);
         console.log( res.data);

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
      .delete(`${JSON_API}/Equity/${liability.id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const UpdateFinancialStatement = async () => {
    console.log(liability);
    console.log(Note);
    const obj = {
      id: liability.id,
      financialStatementClassId: liability.financialStatementClass.id,
      financialStatementCategoryId: Category,
      note: Note,
      budgets: liability.budgets,
      reals: Real.reals,
    };
    console.log(obj);
    await axios
      .put(`${JSON_API}/Equity/EquityBudgetUpdate`, obj)
      .then((res) => {
        getEquity();
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

  function handleBudgetChange(budget) {
    setliability((prevState) => {
      return { ...prevState, budgets: budget };
    });
    console.log(liability.budgets);
  }
  function handleRealChange(real) {
    setReal((prevState) => {
      return { ...prevState, reals: real };
    });
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
    getEquity();
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
  const handleclass = async (ClassId) => {
    // console.log(e);
    await axios
      .get(`${JSON_API}/FinancialStatementCategory/class/${ClassId}`)
      .then((res) => {
        console.log(res);
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
                defaultValue="Equity"
                disabled
                // placeholder={"Asset"}
              ></Select>
            </Form.Item>

            <Form.Item name="category" label="Category">
              <Select 
              // placeholder={Category}
               onChange={(e) => setCategory(e)}>
                {statementcategory &&
                  statementcategory.map(
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
                onChange={(e) => setNote(e.target.value)}
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
        <div>{Hypo && <HyphothesisOfGl HypothesesDataSource={Hypo} />}</div>
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
          {liability.budgets && (
            <BudgetEquity
              equityBudgets={
                liability.financialStatementClass && liability.budgets
              }
              onBudgetChange={handleBudgetChange}
            />
          )}
        </div>
      ),
    },

    {
      key: "2",
      label: <h1 style={{ width: 300, textAlign: "center" }}>Reals</h1>,
      children: (
        
        <div>
          {liability.budgets && (
            <RealEquity
              AssetReals={Real.reals}
              AssetBudgets={
                liability.financialStatementClass && liability.budgets
              }
              onRealChange={handleRealChange}
            />
          )}
        </div>
      ),
    },
    {
      key: "3",
      label: <h1 style={{ width: 300, textAlign: "center" }}>Perfermonce</h1>,
      children: (
        
        <div>
          {liability.budgets && (
            <PerformanceEquity
              AssetReals={Real.reals}
              AssetBudgets={
                liability.financialStatementClass && liability.budgets
              }
              AssetPerformance={performance.performances}
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      {contextHolder}

      <Card
        bordered={false}
        className="header-solid mb-24"
        title={<h3 className="font-semibold">Equity Details</h3>}
      >
        <Row>
          <Col span={8}>
            <ConfigProvider
              theme={{
                token: {
                  // colorPrimary: "#00629d",
                },
              }}
            >
              {" "}
              <Button
                block
                type="primary"
                style={{ width: "57%" }}
                onClick={UpdateFinancialStatement}
              >
                Save Changes
              </Button>
            </ConfigProvider>
          </Col>
          <Col span={6} offset={10}>
            <Space
              style={{
                // display: 'flex',
                marginBottom: 8,
              }}
            >
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#FFA805",
                  },
                }}
              >
                {" "}
                <Link to="/equity">
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
                <Button
                  type="primary"
                  block
                  onClick={() => setOpen(true)}
                  // onClick={DeleteFinancialStatement}
                >
                  Delete Statements
                </Button>
                <Modal
                  title="Delete the task"
                  showIcon
                  closable
                  description="Are you sure to delete this one"
                  centered
                  open={open}
                  // onConfirm={DeleteFinancialStatement}
                  // onOpenChange={() => console.log("open change")}

                  onOk={() => {
                    setOpen(false);
                    DeleteFinancialStatement(false);
                    handleredirection();
                  }}
                  onCancel={() => setOpen(false)}
                  width={400}
                >
                  <span> Are you sure to Delete liability </span>
                </Modal>
              </ConfigProvider>
            </Space>
          </Col>
        </Row>
        <br></br>

        {/* <Table columns={columns} dataSource={ChartofAccounts} bordered /> */}
        <Tabs
          style={{ marginBottom: 32, Color: "#059BFF" }}
          type="card"
          centered
          defaultActiveKey="1"
          items={itemsForm}
          onChange={onChangee}
        />
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
      </Card>
    </div>
  );
}

export default EquityDetails;
