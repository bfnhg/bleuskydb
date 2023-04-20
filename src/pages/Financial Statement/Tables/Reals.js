import React, { useContext } from "react";

import { Button, Input, Table, Typography } from "antd";
import { useState } from "react";
import { CompanyContext } from "../../../contexts/CompanyContext";
const { Text } = Typography;
const { TextArea } = Input;

function Real(props) {

  const [LiabilityReals, setLiabilityReals] = useState(props.LiabilityReals);
  const { TextArea } = Input;
  console.log(LiabilityReals);



  function handleinputchange(ee,i,n){
    //if(ee.target.value){
    console.log(props.LiabilityReals)
    const newReal = [...props.LiabilityReals];
    newReal.map(e=>{if(e.id==i){
      e.reals[n]=parseFloat(ee.target.value) || 0;
    }})
    //newReal[i]=e.target.value;
    setLiabilityReals(newReal);
    props.onRealChange(newReal);
    //}
  }

  const { Companies, setCompanies, Company, Actionstate, setActionstate } =
    useContext(CompanyContext);

  const [editingRow, setEditingRow] = useState(null);
  const [category, setcategory] = useState("");
  const [year, setyear] = useState("");
  const [montant, setmontant] = useState("");
  const [repayment, setrepayment] = useState("");
  const [fevrierReal, setfevrierReal] = useState(0);

  const [MarsReal, setMarsReal] = useState("");
  const [avrilReal, setavrilReal] = useState("");
  const [maiReal, setmaiReal] = useState("");
  const [JuinReal, setJuinReal] = useState("");

  const [juilletReal, setjuilletReal] = useState("");
  const [aoutReal, setaoutReal] = useState("");
  const [septembreReal, setseptembreReal] = useState("");

  const [octobreReal, setoctobreReal] = useState("");
  const [novemberReal, setnovemberReal] = useState("");
  const [decembreReal, setdecembreReal] = useState("");

  /*useEffect(() => getdata(), []);
  const getdata = async () => {
        await setbalance(Liability);
  };*/
    console.log("ttesstt 1");
    const items = [
      {
        title: <h1 style={{ textAlign: "center" }}>Year</h1>,
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
        render: (text, record) => {
          let confirm=false;
          return (
            <>
        {props.LiabilityBudgets.map(e=>{if(e.year==record.year){
            confirm = !e.confirmed;
            if(confirm){
            record.reals[monthIndex] = e.budgets[monthIndex]}
          }})}
            <Input
              type="number"
              value={record.reals[monthIndex].toFixed(2)}
              disabled={confirm}
              onChange={(e) => handleinputchange(e, record.id, monthIndex)}
              style={{ textAlign: "right", width: 100 }}
            />
            </>
          );
        },
      });
    }


    /*items.push({
      title: <h1 style={{ textAlign: "center" }}>Total $</h1>,
      width: 120,
      render: (_, record) => {
        return (
          <h3 style={{ textAlign: "right" }}>
            {" "}
            {(record.reals[0]+
            record.reals[1]+
            record.reals[2]+
            record.reals[3]+
            record.reals[4]+
            record.reals[5]+
            record.reals[6]+
            record.reals[7]+
            record.reals[8]+
            record.reals[9]+
            record.reals[10]+
            record.reals[11]).toFixed(2)}
          </h3>
        );
      },
    })*/

    return (
      <Table
        columns={items}
        dataSource={props.LiabilityReals}
        scroll={{
          x: 1300,
        }}
        pagination={true}
        bordered
        summary={(pageData) => {
          const items = [];

          const startingMonthIndex = Company.startPeriod - 1;

          let totalmontant = 0;
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
          let totaltotal = 0;

          props.LiabilityReals &&
            props.LiabilityReals.map((e) => {
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
              totaltotal += totalmontant;
            });

          const months = [
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
            const monthName = months[monthIndex];

            items.push(
              <Table.Summary.Cell index={monthIndex}>
                <Text style={{ textAlign: "right" }}>
                  {monthName.toFixed(2)}
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
                  <Text>{(totalReal+
                      totalfevrierReal+
                      totalMarsReal+
                      totalavrilReal+
                      totalmaiReal+
                      totalJuinReal+
                      totaljuilletReal+
                      totalaoutReal+
                      totalseptembreReal+
                      totaloctobreReal+
                      totalnovemberReal+
                      totaldecembreReal).toFixed(2)}</Text>
                </Table.Summary.Cell> */}
              </Table.Summary.Row>
            </>
          );
        }}
      />
    );
  };

export default Real;