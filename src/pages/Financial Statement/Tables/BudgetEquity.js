

import React, { useContext } from "react";

import { Button, Input, Popconfirm, message,Table, Typography } from "antd";
import { useState } from "react";
import { CompanyContext } from "../../../contexts/CompanyContext";
const { Text } = Typography;
const { TextArea } = Input;

function BudgetEquity(props) {
  const [equityBudgets, setequityBudgets] = useState(props.equityBudgets);
  const { TextArea } = Input;

  function handleinputchange(ee, i, n) {
    //if(ee.target.value){
    const newBudget = [...equityBudgets];
    newBudget.map((e) => {
      if (e.id == i) {
        e.budgets[n] = parseFloat(ee.target.value) || 0;
      }
    });
    //newBudget[i]=e.target.value;
    setequityBudgets(newBudget);
    props.onBudgetChange(newBudget);
    //}
  }
  const cancel = (e) => {
    console.log(e);
    // message.error("Click on No");
  };

  function confirm(i) {
    const newBudget = [...equityBudgets];
    newBudget.map((e) => {
      if (e.id == i) {
        e.confirmed = true;
      }
    });
    setequityBudgets(newBudget);
    props.onBudgetChange(newBudget);
  }

  const { Companies, setCompanies, Company, Actionstate, setActionstate } =
    useContext(CompanyContext);

  

 
    console.log("ttesstt 1");
    const items = [
      {
        title: "Year",
        width: 120,
        dataIndex: "year",
        aligne: "right",
        //   key: "year",
        render: (text, record) => {
          return <p style={{ textAlign: "center" }}>{text}</p>;
        },
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

      items.push({
        title: monthName,
        width: 120,
        align: "center",
        render: (ID, record) => {
          return (
            <Input
              // type="number"
              value={record.budgets[monthIndex].toFixed(2)}
              disabled={record.confirmed}
              onChange={(e) => handleinputchange(e, record.id, monthIndex)}
              style={{ textAlign: "right", width: 120 }}
            />
          );
        },
      });
    }

    items.push(
      // {
      //   title: "Total $",
      //   width: 120,

      //   align: "center",
      //   render: (_, record) => {
      //     return (
      //       <h3 style={{ textAlign: "right", width: 120 }}>
      //         {record.budgets[0] +
      //           record.budgets[1] +
      //           record.budgets[2] +
      //           record.budgets[3] +
      //           record.budgets[4] +
      //           record.budgets[5] +
      //           record.budgets[6] +
      //           record.budgets[7] +
      //           record.budgets[8] +
      //           record.budgets[9] +
      //           record.budgets[10] +
      //           record.budgets[11]}
      //       </h3>
      //     );
      //   },
      // },

      {
        title: "Actions",
        // fixed: "right",
        width: 100,
        render: (_, record) => (
          <>
            <Popconfirm
              type="link"
              title="Are you sure to confirm ?"
              
             
              onConfirm={() => confirm(record.id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
              
            >
              <a>Confirm</a>
            </Popconfirm>
          </>
        ),
      }
    );

    return (
      <Table
        columns={items}
        dataSource={props.equityBudgets}
        scroll={{
          x: 1300,
        }}
        bordered
        summary={(pageData) => {
          const items = [];

          const startingMonthIndex = Company.startPeriod - 1;

          let totalmontant = 0;
          let totalbudget = 0;
          let totalfevrierbudget = 0;
          let totalMarsbudget = 0.0;
          let totalavrilbudget = 0;
          let totalmaibudget = 0;
          let totalJuinbudget = 0.0;
          let totaljuilletbudget = 0;
          let totalaoutbudget = 0;
          let totalseptembrebudget = 0;
          let totaloctobrebudget = 0;
          let totalnovemberbudget = 0;
          let totaldecembrebudget = 0;
          let totaltotal = 0;

          props.equityBudgets &&
            props.equityBudgets.map((e) => {
              //console.log(e.budgets[1]),
              totalmontant = e.budgets[0];
              totalbudget += totalmontant;
              totalmontant = e.budgets[1];
              totalfevrierbudget += totalmontant;
              totalmontant = e.budgets[2];
              totalMarsbudget += totalmontant;
              totalmontant = e.budgets[3];
              totalavrilbudget += totalmontant;
              totalmontant = e.budgets[4];
              totalmaibudget += totalmontant;
              totalmontant = e.budgets[5];
              totalJuinbudget += totalmontant;
              totalmontant = e.budgets[6];
              totaljuilletbudget += totalmontant;
              totalmontant = e.budgets[7];
              totalaoutbudget += totalmontant;
              totalmontant = e.budgets[8];
              totalseptembrebudget += totalmontant;
              totalmontant = e.budgets[9];
              totaloctobrebudget += totalmontant;
              totalmontant = e.budgets[10];
              totalnovemberbudget += totalmontant;
              totalmontant = e.budgets[11];
              totaldecembrebudget += totalmontant;
              totalmontant = e.totalBudget;
              totaltotal += totalmontant;
            });

          const months = [
            totalbudget,
            totalfevrierbudget,
            totalMarsbudget,
            totalavrilbudget,
            totalmaibudget,
            totalJuinbudget,
            totaljuilletbudget,
            totalaoutbudget,
            totalseptembrebudget,
            totaloctobrebudget,
            totalnovemberbudget,
            totaldecembrebudget,
          ];
          for (let i = 0; i < months.length; i++) {
            const monthIndex = (i + startingMonthIndex) % months.length;
            const monthName = months[monthIndex];

            items.push(
              <Table.Summary.Cell index={monthIndex}>
                <Text style={{ textAlign: "center" }}>
                  {monthName.toFixed(2)}
                </Text>
              </Table.Summary.Cell>
            );
          }

          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell index={1} colSpan={1}>
                  <h3 style={{ textAlign: "right" }}>Total</h3>
                </Table.Summary.Cell>

                {items}

                {/* <Table.Summary.Cell index={10}>
                  <Text style={{ textAlign: "right" }}>{totaltotal}</Text>
                </Table.Summary.Cell> */}
              </Table.Summary.Row>
            </>
          );
        }}
      />
    );
  };

  


export default BudgetEquity;
