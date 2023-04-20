import React, { useMemo, useContext, useEffect, useState } from "react";
import { JSON_API } from "../../services/Constants";
import { CompanyContext } from "../../contexts/CompanyContext";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Table,
  Select,
  Button,
  DatePicker,
  Collapse,
  Popconfirm,
  Modal,
  message,
  Form,
  Checkbox,
  InputNumber,
  Input,
  Typography,
  Space,
  Row,
  Tabs,
  Descriptions,
  Card,
} from "antd";

function LiabilitySummary() {
  const {
    Lang,
    setLang,
    Shares,
    setShares,
    ShareHolders,
    setShareHolders,
    Product,
    setProduct,
    ActivityType,
    setActivityType,
    StrategicTarget,
    setStrategicTarget,
    BusinessPartner,
    setBusinessPartner,
    MainCustomer,
    setMainCustomer,
    RevenueModel,
    setRevenueModel,
    Companies,
    setCompanies,
    Company,
    setCompany,
    Actionstate,
    setActionstate,
    Edited,
    setEdited,
    TypeIndustries,
    setTypeIndustries,
    Market,
    setMarket,
  } = useContext(CompanyContext);
  const [year, setYear] = useState(null);
  const [Liability, setLiability] = useState(null);
  const [form2] = Form.useForm();
  const [liability, setliability] = useState([]);
  const [editingRowbook, setEditingRowbook] = useState(null);
  const [statementcategory, setStatementCategory] = useState([{}]);
  const onChange = (key) => {
    console.log(key);
  };
  // const [open, setOpen] = useState(false);
  var date;
  useEffect(() => {
    console.log("year" + date);
    getLiability();
  }, [Company.id, year]);

  const onChangeyear = (date, dateString) => {
    setLiability();
    console.log(date, dateString);
    setYear(dateString);
  };

  const getLiability = async () => {
    await axios
      .get(`${JSON_API}/assets/summaries/${Company.id}/${year}`)

      .then((res) => {
        setLiability(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columnsbalanceBudget = [
    {
      title: <h1 style={{ textAlign: "center" }}>GL Number</h1>,
      dataIndex: "glNumber",
    },
    {
      title: <h1 style={{ textAlign: "center" }}>Category</h1>,
      dataIndex: "category",
    },
    {
      title: <h1 style={{ textAlign: "center" }}>Type</h1>,
      dataIndex: "type",
    },
    {
      title: <h1 style={{ textAlign: "center" }}>Year</h1>,
      dataIndex: "year",
    },
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const startingMonthIndex = Company.startPeriod - 1;

  for (let i = 0; i < months.length; i++) {
    const monthIndex = (i + startingMonthIndex) % months.length;
    const monthName = months[monthIndex];

    columnsbalanceBudget.push({
      title: monthName,
      width: 120,
      render: (text, record) => {
        return record.monthlyBudgets[monthIndex].toFixed(2);
      },
    });
  }
  columnsbalanceBudget.push({
    title: <h1 style={{ textAlign: "center" }}> Total $ </h1>,

    key: "7",
    render: (text, record) => {
      return record.budgetTotal;
    },
  });
  const columnsbalanceBudgetReal = [
    {
      title: <h1 style={{ textAlign: "center" }}>GL Number</h1>,
      dataIndex: "glNumber",
    },
    {
      title: <h1 style={{ textAlign: "center" }}>Category</h1>,
      dataIndex: "category",
    },
    {
      title: <h1 style={{ textAlign: "center" }}>Type</h1>,
      dataIndex: "type",
    },
    {
      title: <h1 style={{ textAlign: "center" }}>Year</h1>,
      dataIndex: "year",
    },
  ];

  for (let i = 0; i < months.length; i++) {
    const monthIndex = (i + startingMonthIndex) % months.length;
    const monthName = months[monthIndex];

    columnsbalanceBudgetReal.push({
      title: monthName,
      width: 120,
      render: (text, record) => {
        return record.monthlyReals[monthIndex].toFixed(2);
      },
    });
  }
  columnsbalanceBudgetReal.push({
    title: <h1 style={{ textAlign: "center" }}> Total $ </h1>,

    key: "7",
    render: (text, record) => {
      return record.realTotal;
    },
  });
  const columnsbalancePerformance = [
    {
      title: <h1 style={{ textAlign: "center" }}>GL Number</h1>,
      dataIndex: "glNumber",
    },
    {
      title: <h1 style={{ textAlign: "center" }}>Category</h1>,
      dataIndex: "category",
    },
    {
      title: <h1 style={{ textAlign: "center" }}>Type</h1>,
      dataIndex: "type",
    },
    {
      title: <h1 style={{ textAlign: "center" }}>Year</h1>,
      dataIndex: "year",
    },
  ];

  for (let i = 0; i < months.length; i++) {
    const monthIndex = (i + startingMonthIndex) % months.length;
    const monthName = months[monthIndex];

    columnsbalancePerformance.push({
      title: monthName,
      children: [
        {
          title: <p style={{ color: "green" }}>Budget</p>,

          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyBudgets[monthIndex].toFixed(2);
          },
        },
        {
          title: <p style={{ color: "green" }}>Real</p>,

          aligne: "left",
          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyReals[monthIndex].toFixed(2);
          },
        },
        {
          title: <p style={{ color: "green" }}>Difference</p>,
          dataIndex: "street",
          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyPerformances[monthIndex].toFixed(2);
          },
        },
      ],
    });
  }
  columnsbalancePerformance.push({
    title: <h1 style={{ textAlign: "center" }}> Total $ </h1>,

    key: "7",
    render: (text, record) => {
      return record.realTotal;
    },
  });

  const columnsbalanceReals = [
    {
      title: <p style={{ textAlign: "center" }}>GL Number</p>,
      dataIndex: "glNumber",
      width: 100,
    },
    {
      title: <p style={{ textAlign: "center" }}>Category</p>,
      dataIndex: "category",
      width: 100,
    },
    {
      title: <p style={{ textAlign: "center" }}>Type</p>,
      dataIndex: "type",
      width: 100,
    },
    {
      title: <p style={{ textAlign: "center" }}>Year</p>,
      dataIndex: "year",
      width: 100,
    },

    {
      title: <p style={{ textAlign: "center" }}> Jan</p>,

      children: [
        {
          title: <p style={{ color: "green" }}>Budget</p>,

          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyBudgets[0].toFixed(2);
          },
        },
        {
          title: <p style={{ color: "green" }}>Real</p>,

          aligne: "left",
          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyReals[0].toFixed(2);
          },
        },
        {
          title: <p style={{ color: "green" }}>Difference</p>,
          dataIndex: "street",
          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyPerformances[0].toFixed(2);
          },
        },
      ],
      // render: (text, record) => {
      //   <p style={{ textAlign: "right" }}>{record.montant}</p>;
      // },
    },

    {
      title: <h1 style={{ textAlign: "center" }}> Feb</h1>,

      children: [
        {
          title: <p style={{ color: "green" }}>Budget</p>,

          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyBudgets[1];
          },
        },
        {
          title: <p style={{ color: "green" }}>Real</p>,

          aligne: "left",
          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyReals[1];
          },
        },
        {
          title: <p style={{ color: "green" }}>Difference</p>,
          dataIndex: "street",
          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyPerformances[1];
          },
        },
      ],
    },

    {
      title: <h1 style={{ textAlign: "center" }}> Mar</h1>,

      children: [
        {
          title: <p style={{ color: "green" }}>Budget</p>,

          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyBudgets[2];
          },
        },
        {
          title: <p style={{ color: "green" }}>Real</p>,

          aligne: "left",
          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyReals[2];
          },
        },
        {
          title: <p style={{ color: "green" }}>Difference</p>,
          dataIndex: "street",
          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyPerformances[2];
          },
        },
      ],
    },
    {
      title: <h1 style={{ textAlign: "center" }}> Apr</h1>,

      children: [
        {
          title: <p style={{ color: "green" }}>Budget</p>,

          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyBudgets[3];
          },
        },
        {
          title: <p style={{ color: "green" }}>Real</p>,

          aligne: "left",
          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyReals[3];
          },
        },
        {
          title: <p style={{ color: "green" }}>Difference</p>,
          dataIndex: "street",
          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyPerformances[3];
          },
        },
      ],
    },
    {
      title: <h1 style={{ textAlign: "center" }}> May</h1>,

      children: [
        {
          title: <p style={{ color: "green" }}>Budget</p>,

          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyBudgets[4];
          },
        },
        {
          title: <p style={{ color: "green" }}>Real</p>,

          aligne: "left",
          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyReals[4];
          },
        },
        {
          title: <p style={{ color: "green" }}>Difference</p>,
          dataIndex: "street",
          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyPerformances[4];
          },
        },
      ],
    },

    {
      title: <h1 style={{ textAlign: "center" }}> Jun</h1>,

      children: [
        {
          title: <p style={{ color: "green" }}>Budget</p>,

          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyBudgets[5];
          },
        },
        {
          title: <p style={{ color: "green" }}>Real</p>,

          aligne: "left",
          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyReals[5];
          },
        },
        {
          title: <p style={{ color: "green" }}>Difference</p>,
          dataIndex: "street",
          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyPerformances[5];
          },
        },
      ],
    },

    {
      title: <h1 style={{ textAlign: "center" }}> July</h1>,

      children: [
        {
          title: <p style={{ color: "green" }}>Budget</p>,

          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyBudgets[6];
          },
        },
        {
          title: <p style={{ color: "green" }}>Real</p>,

          aligne: "left",
          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyReals[6];
          },
        },
        {
          title: <p style={{ color: "green" }}>Difference</p>,
          dataIndex: "street",
          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyPerformances[6];
          },
        },
      ],
    },

    {
      title: <h1 style={{ textAlign: "center" }}> Aug </h1>,

      children: [
        {
          title: <p style={{ color: "green" }}>Budget</p>,

          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyBudgets[7];
          },
        },
        {
          title: <p style={{ color: "green" }}>Real</p>,

          aligne: "left",
          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyReals[7];
          },
        },
        {
          title: <p style={{ color: "green" }}>Difference</p>,
          dataIndex: "street",
          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyPerformances[7];
          },
        },
      ],
    },

    {
      title: <h1 style={{ textAlign: "center" }}> Sept </h1>,

      children: [
        {
          title: <p style={{ color: "green" }}>Budget</p>,

          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyBudgets[8];
          },
        },
        {
          title: <p style={{ color: "green" }}>Real</p>,

          aligne: "left",
          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyReals[8];
          },
        },
        {
          title: <p style={{ color: "green" }}>Difference</p>,
          dataIndex: "street",
          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyPerformances[8];
          },
        },
      ],
    },

    {
      title: <h1 style={{ textAlign: "center" }}> Oct </h1>,

      children: [
        {
          title: <p style={{ color: "green" }}>Budget</p>,

          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyBudgets[9];
          },
        },
        {
          title: <p style={{ color: "green" }}>Real</p>,

          aligne: "left",
          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyReals[9];
          },
        },
        {
          title: <p style={{ color: "green" }}>Difference</p>,
          dataIndex: "street",
          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyPerformances[9];
          },
        },
      ],
    },

    {
      title: <h1 style={{ textAlign: "center" }}> Nov </h1>,

      children: [
        {
          title: <p style={{ color: "green" }}>Budget</p>,

          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyBudgets[10];
          },
        },
        {
          title: <p style={{ color: "green" }}>Real</p>,

          aligne: "left",
          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyReals[10];
          },
        },
        {
          title: <p style={{ color: "green" }}>Difference</p>,

          dataIndex: "street",
          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyPerformances[10];
          },
        },
      ],
    },

    {
      title: <h1 style={{ textAlign: "center" }}> Dec </h1>,

      children: [
        {
          title: <p style={{ color: "green" }}>Budget</p>,

          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyBudgets[11];
          },
        },
        {
          title: <p style={{ color: "green" }}>Real</p>,

          aligne: "left",
          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyReals[11];
          },
        },
        {
          title: <p style={{ color: "green" }}>Difference</p>,

          dataIndex: "street",
          // width: 150,
          align: "right",
          render: (text, record) => {
            return record.monthlyPerformances[11];
          },
        },
      ],
    },
  ];

  const items = [
    {
      key: "1",
      label: <h1 style={{ width: 300, textAlign: "center" }}>Budget</h1>,
      children: (
        <div>
          <Table
            columns={columnsbalanceBudget}
            dataSource={Liability}
            scroll={{
              x: 1300,
            }}
            bordered
          />
        </div>
      ),
    },
    {
      key: "2",
      label: <h1 style={{ width: 300, textAlign: "center" }}>Reals</h1>,
      children: (
        <div>
          <Table
            columns={columnsbalanceBudgetReal}
            dataSource={Liability}
            scroll={{
              x: 1300,
            }}
            bordered
          />
        </div>
      ),
    },

    {
      key: "3",
      label: <h1 style={{ width: 300, textAlign: "center" }}>Perfermonce</h1>,
      children: (
        <div>
          {" "}
          <Table
            columns={columnsbalancePerformance}
            dataSource={Liability}
            scroll={{
              x: 1300,
            }}
            bordered
          />
        </div>
      ),
    },
  ];

  return (
    <Card>
      <div>
        <h1 style={{ textAlign: "center" }}> Liability for {Company.name}</h1>
        <br></br>
        <div>
          <span>
            <DatePicker
              name="year"
              picker="year"
              placeholder="Selected Year"
              style={{ width: 200, height: 35 }}
              onChange={onChangeyear}
            />
          </span>
          <br></br>
          <br></br>

          <div
            style={{
              textAlign: "right",
            }}
          >
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
        </div>
        <div></div>
      </div>
    </Card>
  );
}

export default LiabilitySummary;
