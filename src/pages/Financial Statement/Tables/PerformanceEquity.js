import React, { useContext } from "react";
import { Button, Input, Table, Typography } from "antd";
import { useState } from "react";
import { CompanyContext } from "../../../contexts/CompanyContext";
const { Text } = Typography;
const { TextArea } = Input;

function PerformanceEquity(props) {
  const [Reals, setReals] = useState("");
  const { TextArea } = Input;

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
      children: [
        {
          title: "Budget",
          dataIndex: "montantbudget",
          width: 150,
          align: "right",
          
          render: (text, record) => {
            let budget = 0;
            return (
              <>
                {props.AssetBudgets.map((e) => {
                  if (e.year == record.year) {
                    budget = e.budgets[monthIndex].toFixed(2);
                    
                  }
                })}
                <p style={{ textAlign: "right" }}>{budget}</p>
              </>
            );
          },
        },
        {
          title: "Real",

          dataIndex: "montantbudget",
          aligne: "left",
          width: 150,
          align: "right",
          render: (text, record) => {
            return (
              <p style={{ textAlign: "right" }}>
                {record.reals[monthIndex].toFixed(2)}
              </p>
            );
          },
        },
        {
          title: "Difference",

          dataIndex: "street",
          width: 150,
          align: "right",
          render: (text, record) => {
            let budget = 0;
            return (
              <>
                {props.AssetBudgets.map((e) => {
                  if (e.year == record.year) {
                    budget = e.budgets[monthIndex].toFixed(2);
                  }
                })}
                <p style={{ textAlign: "right" }}>
                  {(record.reals[monthIndex] - budget).toFixed(2)}
                </p>
              </>
            );
          },
          render: (text, record) => {
            let budget = 0;
            return (
              <>
                {props.AssetBudgets.map((e) => {
                  if (e.year == record.year) {
                    budget = e.budgets[monthIndex].toFixed(2);
                  }
                })}
                <p style={{ textAlign: "right" }}>
                  {(record.reals[monthIndex] - budget).toFixed(2)}
                </p>
              </>
            );
          },
        },
      ],
    });
  }

  // items.push({
  //   title:"Total",
  //   width: 120,
  //   render: (_, record) => {
  //     let performance = 0;
  //     return (
  //       <>
  //         {props.AssetBudgets.map((e) => {
  //           if (e.year == record.year) {
  //             performance = (
  //               record.reals[0] -
  //               e.budgets[0] +
  //               record.reals[1] -
  //               e.budgets[1] +
  //               record.reals[2] -
  //               e.budgets[2] +
  //               record.reals[3] -
  //               e.budgets[3] +
  //               record.reals[4] -
  //               e.budgets[4] +
  //               record.reals[5] -
  //               e.budgets[5] +
  //               record.reals[6] -
  //               e.budgets[6] +
  //               record.reals[7] -
  //               e.budgets[7] +
  //               record.reals[8] -
  //               e.budgets[8] +
  //               record.reals[9] -
  //               e.budgets[9] +
  //               record.reals[10] -
  //               e.budgets[10] +
  //               record.reals[11] -
  //               e.budgets[11]
  //             ).toFixed(2);
  //           }
  //         })}
  //         <p style={{ textAlign: "right" }}>{performance}</p>
  //       </>
  //     );
  //   },
  // });

  return (
    <Table
      columns={items}
      dataSource={props.AssetReals}
      scroll={{
        x: 1300,
      }}
      pagination={true}
      bordered
      summary={(pageData) => {
        const items = [];

        const startingMonthIndex = Company.startPeriod - 1;

        let totalmontant = 0;
        let totalbudget = 0;
        let totalfevrierbudget = 0;
        let totalMarsbudget = 0;
        let totalavrilbudget = 0;
        let totalmaibudget = 0;
        let totalJuinbudget = 0;
        let totaljuilletbudget = 0;
        let totalaoutbudget = 0;
        let totalseptembrebudget = 0;
        let totaloctobrebudget = 0;
        let totalnovemberbudget = 0;
        let totaldecembrebudget = 0;
        let totaltotal = 0;
        let totalReal = 0;
        let totalfevrierReal = 0;
        let totalMarsReal = 0.0;
        let totalavrilReal = 0;
        let totalmaiReal = 0;
        let totalJuinReal = 0.0;
        let totaljuilletReal = 0;
        let totalaoutReal = 0;
        let totalseptembreReal = 0;
        let totaloctobreReal = 0;
        let totalnovemberReal = 0;
        let totaldecembreReal = 0;
        let totaltotalreal = 0;

        {
          props.AssetBudgets &&
            props.AssetBudgets.map(
              (e) => (
                //console.log(e.budgets[1]),
                //console.log(fevrierbudget),
                (totalmontant = e.budgets[0]),
                (totalbudget += totalmontant),
                (totalmontant = e.budgets[1]),
                (totalfevrierbudget += totalmontant),
                (totalmontant = e.budgets[2]),
                (totalMarsbudget += totalmontant),
                (totalmontant = e.budgets[3]),
                (totalavrilbudget += totalmontant),
                (totalmontant = e.budgets[4]),
                (totalmaibudget += totalmontant),
                (totalmontant = e.budgets[5]),
                (totalJuinbudget += totalmontant),
                (totalmontant = e.budgets[6]),
                (totaljuilletbudget += totalmontant),
                (totalmontant = e.budgets[7]),
                (totalaoutbudget += totalmontant),
                (totalmontant = e.budgets[8]),
                (totalseptembrebudget += totalmontant),
                (totalmontant = e.budgets[9]),
                (totaloctobrebudget += totalmontant),
                (totalmontant = e.budgets[10]),
                (totalnovemberbudget += totalmontant),
                (totalmontant = e.budgets[11]),
                (totaldecembrebudget += totalmontant),
                (totalmontant = e.totalBudget),
                (totaltotal -= totalmontant),
                console.log()
              )
            );
        }
        props.AssetReals &&
          props.AssetReals.map((e) => {
            //console.log(e.Reals[1]),
            totalmontant = e.reals[0];
            totalReal += totalmontant;
            totalmontant = e.reals[1];
            totalfevrierReal += totalmontant;
            totalmontant = e.reals[2];
            totalMarsReal += totalmontant;
            totalmontant = e.reals[3];
            totalavrilReal += totalmontant;
            totalmontant = e.reals[4];
            totalmaiReal += totalmontant;
            totalmontant = e.reals[5];
            totalJuinReal += totalmontant;
            totalmontant = e.reals[6];
            totaljuilletReal += totalmontant;
            totalmontant = e.reals[7];
            totalaoutReal += totalmontant;
            totalmontant = e.reals[8];
            totalseptembreReal += totalmontant;
            totalmontant = e.reals[9];
            totaloctobreReal += totalmontant;
            totalmontant = e.reals[10];
            totalnovemberReal += totalmontant;
            totalmontant = e.reals[11];
            totaldecembreReal += totalmontant;
            totalmontant = e.totalReal;
            totaltotalreal += totalmontant;
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
        const monthsReal = [
          totalReal,
          totalfevrierReal,
          totalMarsReal,
          totalavrilReal,
          totalmaiReal,
          totalJuinReal,
          totaljuilletReal,
          totalaoutReal,
          totalseptembreReal,
          totaloctobreReal,
          totalnovemberReal,
          totaldecembreReal,
        ];
        for (let i = 0; i < months.length; i++) {
          const monthIndex = (i + startingMonthIndex) % months.length;
          const monthNameReal = monthsReal[monthIndex];
          const monthNameBudget = months[monthIndex];

          items.push(
            <Table.Summary.Cell index={monthIndex}>
              <Text style={{ textAlign: "right" }}>
                {monthNameBudget.toFixed(2)}
              </Text>
            </Table.Summary.Cell>
          );
          items.push(
            <Table.Summary.Cell index={monthIndex}>
              <Text style={{ textAlign: "right" }}>
                {monthNameReal.toFixed(2)}
              </Text>
            </Table.Summary.Cell>
          );
          items.push(
            <Table.Summary.Cell index={monthIndex}>
              <Text style={{ textAlign: "right" }}>
                {(monthNameReal - monthNameBudget).toFixed(2)}
              </Text>
            </Table.Summary.Cell>
          );
        }

        return (
          <>
            <Table.Summary.Row>
              <Table.Summary.Cell index={1} colSpan={1}>
                <h3 style={{ textAlign: "center" }}>Total</h3>
              </Table.Summary.Cell>

              {items}

              {/* <Table.Summary.Cell index={10}>
                <Text>
                  {totalReal -
                    totalbudget +
                    totalfevrierReal -
                    totalfevrierbudget +
                    totalMarsReal -
                    totalMarsbudget +
                    totalavrilReal -
                    totalavrilbudget +
                    totalmaiReal -
                    totalmaibudget +
                    totalJuinReal -
                    totalJuinbudget +
                    totaljuilletReal -
                    totaljuilletbudget +
                    totalaoutReal -
                    totalaoutbudget +
                    totalseptembreReal -
                    totalseptembrebudget +
                    totaloctobreReal -
                    totaloctobrebudget +
                    totalnovemberReal -
                    totalnovemberbudget +
                    totaldecembreReal -
                    totaldecembrebudget}
                </Text>
              </Table.Summary.Cell> */}
            </Table.Summary.Row>
          </>
        );
      }}
    />
  );
}

export default PerformanceEquity;
