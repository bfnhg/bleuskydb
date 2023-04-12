import React from "react";

import { useState, useEffect } from "react";
import {
  Button,
  Form,
  Table,
  Card,
  Input,
  InputNumber,
  Typography,
  Space,
  Select,
  Radio,
  Tabs,
  Popconfirm,
} from "antd";
import axios from "axios";
const { Text } = Typography;
const { TextArea } = Input;

function Performance(props) {
  const [Reals, setReals] = useState("");
  const { TextArea } = Input;

  const [editingRow, setEditingRow] = useState(null);
  const [balance, setbalance] = useState("");
  const [categori, setcategori] = useState("");
  const [year, setyear] = useState("");
  const [montant, setmontant] = useState("");
  const [repayment, setrepayment] = useState("");
  const [fevrierbudget, setfevrierbudget] = useState("");

  const [Marsbudget, setMarsbudget] = useState("");
  const [avrilbudget, setavrilbudget] = useState("");
  const [maibudget, setmaibudget] = useState("");
  const [Juinbudget, setJuinbudget] = useState("");

  const [juilletbudget, setjuilletbudget] = useState("");
  const [aoutbudget, setaoutbudget] = useState("");
  const [septembrebudget, setseptembrebudget] = useState("");

  const [octobrebudget, setoctobrebudget] = useState("");
  const [novemberbudget, setnovemberbudget] = useState("");
  const [decembrebudget, setdecembrebudget] = useState("");

  const columnsbalanceReals = [
    {
      title: <h1 style={{ textAlign: "center" }}>Year</h1>,

      width: 120,
      dataIndex: "year",
      aligne: "center",
      render: (text, record) => {
          return <p style={{textAlign: "center" }}>{text}</p>;
      },
    },
    {
      title: <h1 style={{ textAlign: "center" }}> Janvier</h1>,

      children: [
        {
          title: "Budget",
          dataIndex: "montantbudget",
          width: 150,
          align: "right",
          render: (text, record) => {
        let budget=0;
          return (
            <>
        {props.AssetBudgets.map(e=>{if(e.year==record.year){
            budget = e.budgets[0].toFixed(2);
          }})}
          <p style={{ textAlign: "right" }}>{budget}</p>
          </>);}
    },
        {
          title: "Real",

          dataIndex: "montantbudget",
          aligne: "left",
          width: 150,
          align: "right",
          render: (text, record) => {
          return <p style={{ textAlign: "right" }}>{record.reals[0].toFixed(2)}</p>
      },
        },
        {
          title: "Difference",

          dataIndex: "street",
          width: 150,
          align: "right",
          render: (text, record) => {
            let budget=0;
          return (
            <>
        {props.AssetBudgets.map(e=>{if(e.year==record.year){
            budget = e.budgets[0].toFixed(2);
          }})}
          <p style={{ textAlign: "right" }}>{(record.reals[0]-budget).toFixed(2)}</p>
          </>
          );
           },
          render: (text, record) => {
            let budget=0;
          return (
            <>
        {props.AssetBudgets.map(e=>{if(e.year==record.year){
            budget = e.budgets[0].toFixed(2);
          }})}
          <p style={{ textAlign: "right" }}>{(record.reals[0]-budget).toFixed(2)}</p>
          </>
          );
           },
        },
      ],
      // render: (text, record) => {
      //   <p style={{ textAlign: "right" }}>{record.montant}</p>;
      // },
    },

    {
      title: <h1 style={{ textAlign: "center" }}> Février</h1>,
      aligne: "right",
      width: 120,
      children: [
        {
          title: "Budget",
          dataIndex: "fevrierbudget",
          width: 150,
          align: "right",
          render: (text, record) => {
        let budget=0;
          return (
            <>
        {props.AssetBudgets.map(e=>{if(e.year==record.year){
            budget = e.budgets[1].toFixed(2);
          }})}
          <p style={{ textAlign: "right" }}>{budget}</p>
          </>
          );
      },
        },
        {
          title: "Real",

          dataIndex: "fevrierbudget",
          width: 150,
          align: "right",
          render: (text, record) => {
          return <p style={{ textAlign: "right" }}>{record.reals[1].toFixed(2)}</p>
      },
        },
        {
          title: "Difference",

          dataIndex: "street",
          width: 150,
          align: "right",
          render: (text, record) => {
            let budget=0;
          return (
            <>
        {props.AssetBudgets.map(e=>{if(e.year==record.year){
            budget = e.budgets[1].toFixed(2);
          }})}
          <p style={{ textAlign: "right" }}>{(record.reals[1]-budget).toFixed(2)}</p>
          </>
          );
           },
        },
      ],
      // render: (text, record) => {
      //   <p style={{ textAlign: "right" }}>{record.fevrierbudget}</p>;
      // },
    },

    {
      title: <h1 style={{ textAlign: "center" }}> Mars</h1>,
      aligne: "right",
      children: [
        {
          title: "Budget",
          dataIndex: "Marsbudget",
          width: 150,
          align: "right",
          render: (text, record) => {
        let budget=0;
          return (
            <>
        {props.AssetBudgets.map(e=>{if(e.year==record.year){
            budget = e.budgets[2].toFixed(2);
          }})}
          <p style={{ textAlign: "right" }}>{budget}</p>
          </>
          );
      },
        },
        {
          title: "Real",

          dataIndex: "Marsbudget",
          width: 150,
          align: "right",
          render: (text, record) => {
          return <p style={{ textAlign: "right" }}>{record.reals[2].toFixed(2)}</p>
      },
        },
        {
          title: "Difference",

          dataIndex: "street",
          width: 150,
          align: "right",
          render: (text, record) => {
            let budget=0;
          return (
            <>
        {props.AssetBudgets.map(e=>{if(e.year==record.year){
            budget = e.budgets[2].toFixed(2);
          }})}
          <p style={{ textAlign: "right" }}>{(record.reals[2]-budget).toFixed(2)}</p>
          </>
          );
           },
        },
      ],
      // render: (text, record) => {
      //   <p style={{ textAlign: "right" }}>{record.Marsbudget}</p>;
      // },
    },

    {
      title: <h1 style={{ textAlign: "center" }}> Avril</h1>,
      aligne: "right",
      children: [
        {
          title: "Budget",
          dataIndex: "avrilbudget",
          width: 150,
          align: "right",
          render: (text, record) => {
        let budget=0;
          return (
            <>
        {props.AssetBudgets.map(e=>{if(e.year==record.year){
            budget = e.budgets[3].toFixed(2);
          }})}
          <p style={{ textAlign: "right" }}>{budget}</p>
          </>
          );
      },
        },
        {
          title: "Real",

          dataIndex: "avrilbudget",
          width: 150,
          align: "right",
          render: (text, record) => {
          return <p style={{ textAlign: "right" }}>{record.reals[3].toFixed(2)}</p>
      },
        },
        {
          title: "Difference",

          dataIndex: "street",
          width: 150,
          align: "right",
          render: (text, record) => {
            let budget=0;
          return (
            <>
        {props.AssetBudgets.map(e=>{if(e.year==record.year){
            budget = e.budgets[3].toFixed(2);
          }})}
          <p style={{ textAlign: "right" }}>{(record.reals[3]-budget).toFixed(2)}</p>
          </>
          );
           },
        },
      ],
      render: (text, record) => {
        <p style={{ textAlign: "right" }}>{record.avrilbudget}</p>;
      },
    },

    {
      title: <h1 style={{ textAlign: "center" }}> Mai</h1>,
      aligne: "right",
      children: [
        {
          title: "Budget",
          dataIndex: "maibudget",
          width: 150,
          align: "right",
          render: (text, record) => {
        let budget=0;
          return (
            <>
        {props.AssetBudgets.map(e=>{if(e.year==record.year){
            budget = e.budgets[4].toFixed(2);
          }})}
          <p style={{ textAlign: "right" }}>{budget}</p>
          </>
          );
      },
        },
        {
          title: "Real",

          dataIndex: "maibudget",
          width: 150,
          align: "right",
          render: (text, record) => {
          return <p style={{ textAlign: "right" }}>{record.reals[4].toFixed(2)}</p>
      },
        },
        {
          title: "Difference",

          dataIndex: "street",
          width: 150,
          align: "right",
          render: (text, record) => {
            let budget=0;
          return (
            <>
        {props.AssetBudgets.map(e=>{if(e.year==record.year){
            budget = e.budgets[4].toFixed(2);
          }})}
          <p style={{ textAlign: "right" }}>{(record.reals[4]-budget).toFixed(2)}</p>
          </>
          );
           },
        },
      ],
      render: (text, record) => {
        <p style={{ textAlign: "right" }}>{record.avrilbudget}</p>;
      },
    },

    {
      title: <h1 style={{ textAlign: "center" }}> Juin</h1>,
      aligne: "right",
      children: [
        {
          title: "Budget",
          dataIndex: "Juinbudget",
          width: 150,
          align: "right",
          render: (text, record) => {
        let budget=0;
          return (
            <>
        {props.AssetBudgets.map(e=>{if(e.year==record.year){
            budget = e.budgets[5].toFixed(2);
          }})}
          <p style={{ textAlign: "right" }}>{budget}</p>
          </>
          );
      },
        },
        {
          title: "Real",

          dataIndex: "Juinbudget",
          width: 150,
          align: "right",
          render: (text, record) => {
          return <p style={{ textAlign: "right" }}>{record.reals[5].toFixed(2)}</p>
      },
        },
        {
          title: "Difference",

          dataIndex: "street",
          width: 150,
          align: "right",
          render: (text, record) => {
            let budget=0;
          return (
            <>
        {props.AssetBudgets.map(e=>{if(e.year==record.year){
            budget = e.budgets[5].toFixed(2);
          }})}
          <p style={{ textAlign: "right" }}>{(record.reals[5]-budget).toFixed(2)}</p>
          </>
          );
           },
        },
      ],
      render: (text, record) => {
        <p style={{ textAlign: "right" }}>{record.avrilbudget}</p>;
      },
    },

    {
      title: <h1 style={{ textAlign: "center" }}> Juillet</h1>,
      aligne: "right",
      children: [
        {
          title: "Budget",
          dataIndex: "juilletbudget",
          width: 150,
          align: "right",
          render: (text, record) => {
        let budget=0;
          return (
            <>
        {props.AssetBudgets.map(e=>{if(e.year==record.year){
            budget = e.budgets[6].toFixed(2);
          }})}
          <p style={{ textAlign: "right" }}>{budget}</p>
          </>
          );
      },
        },
        {
          title: "Real",

          dataIndex: "juilletbudget",
          width: 150,
          align: "right",
          render: (text, record) => {
          return <p style={{ textAlign: "right" }}>{record.reals[6].toFixed(2)}</p>
      },
        },
        {
          title: "Difference",

          dataIndex: "street",
          width: 150,
          align: "right",
          render: (text, record) => {
            let budget=0;
          return (
            <>
        {props.AssetBudgets.map(e=>{if(e.year==record.year){
            budget = e.budgets[6].toFixed(2);
          }})}
          <p style={{ textAlign: "right" }}>{(record.reals[6]-budget).toFixed(2)}</p>
          </>
          );
           },
        },
      ],
      render: (text, record) => {
        <p style={{ textAlign: "right" }}>{record.juilletbudget}</p>;
      },
    },

    {
      title: <h1 style={{ textAlign: "center" }}> Août </h1>,
      aligne: "right",
      children: [
        {
          title: "Budget",
          dataIndex: "aoutbudget",
          width: 150,
          align: "right",
          render: (text, record) => {
        let budget=0;
          return (
            <>
        {props.AssetBudgets.map(e=>{if(e.year==record.year){
            budget = e.budgets[7].toFixed(2);
          }})}
          <p style={{ textAlign: "right" }}>{budget}</p>
          </>
          );
      },
        },
        {
          title: "Real",

          dataIndex: "aoutbudget",
          width: 150,
          align: "right",
          render: (text, record) => {
          return <p style={{ textAlign: "right" }}>{record.reals[7].toFixed(2)}</p>
      },
        },
        {
          title: "Difference",

          dataIndex: "street",
          width: 150,
          align: "right",
          render: (text, record) => {
            let budget=0;
          return (
            <>
        {props.AssetBudgets.map(e=>{if(e.year==record.year){
            budget = e.budgets[7].toFixed(2);
          }})}
          <p style={{ textAlign: "right" }}>{(record.reals[7]-budget).toFixed(2)}</p>
          </>
          );
           },
        },
      ],
      render: (text, record) => {
        <p style={{ textAlign: "right" }}>{record.aoutbudget}</p>;
      },
    },


    {
      title: <h1 style={{ textAlign: "center" }}> Septembre </h1>,
      aligne: "right",
      children: [
        {
          title: "Budget",
          dataIndex: "septembrebudget",
          width: 150,
          align: "right",
          render: (text, record) => {
        let budget=0;
          return (
            <>
        {props.AssetBudgets.map(e=>{if(e.year==record.year){
            budget = e.budgets[8].toFixed(2);
          }})}
          <p style={{ textAlign: "right" }}>{budget}</p>
          </>
          );
      },
        },
        {
          title: "Real",

          dataIndex: "septembrebudget",
          width: 150,
          align: "right",
          render: (text, record) => {
          return <p style={{ textAlign: "right" }}>{record.reals[8].toFixed(2)}</p>
      },
        },
        {
          title: "Difference",

          dataIndex: "street",
          width: 150,
          align: "right",
          render: (text, record) => {
            let budget=0;
          return (
            <>
        {props.AssetBudgets.map(e=>{if(e.year==record.year){
            budget = e.budgets[8].toFixed(2);
          }})}
          <p style={{ textAlign: "right" }}>{(record.reals[8]-budget).toFixed(2)}</p>
          </>
          );
           },
        },
      ],
      render: (text, record) => {
        <p style={{ textAlign: "right" }}>{record.septembrebudget}</p>;
      },
    },
    {
      title: <h1 style={{ textAlign: "center" }}> Octobre </h1>,
      aligne: "right",
      children: [
        {
          title: "Budget",
          dataIndex: "octobrebudget",
          width: 150,
          align: "right",
          render: (text, record) => {
        let budget=0;
          return (
            <>
        {props.AssetBudgets.map(e=>{if(e.year==record.year){
            budget = e.budgets[9].toFixed(2);
          }})}
          <p style={{ textAlign: "right" }}>{budget}</p>
          </>
          );
      },
        },
        {
          title: "Real",

          dataIndex: "octobrebudget",
          width: 150,
          align: "right",
          render: (text, record) => {
          return <p style={{ textAlign: "right" }}>{record.reals[9].toFixed(2)}</p>
      },
        },
        {
          title: "Difference",

          dataIndex: "street",
          width: 150,
          align: "right",
          render: (text, record) => {
            let budget=0;
          return (
            <>
        {props.AssetBudgets.map(e=>{if(e.year==record.year){
            budget = e.budgets[9].toFixed(2);
          }})}
          <p style={{ textAlign: "right" }}>{(record.reals[9]-budget).toFixed(2)}</p>
          </>
          );
           },
        },
      ],
      render: (text, record) => {
        <p style={{ textAlign: "right" }}>{record.octobrebudget}</p>;
      },
    },

    
    {
      title: <h1 style={{ textAlign: "center" }}> Novembre </h1>,
      aligne: "right",
      children: [
        {
          title: "Budget",
          dataIndex: "novemberbudget",
          width: 150,
          align: "right",
          render: (text, record) => {
        let budget=0;
          return (
            <>
        {props.AssetBudgets.map(e=>{if(e.year==record.year){
            budget = e.budgets[10].toFixed(2);
          }})}
          <p style={{ textAlign: "right" }}>{budget}</p>
          </>
          );
      },
        },
        {
          title: "Real",

          dataIndex: "novemberbudget",
          width: 150,
          align: "right",
          render: (text, record) => {
          return <p style={{ textAlign: "right" }}>{record.reals[10].toFixed(2)}</p>
      },
        },
        {
          title: "Difference",

          dataIndex: "street",
          width: 150,
          align: "right",
          render: (text, record) => {
            let budget=0;
          return (
            <>
        {props.AssetBudgets.map(e=>{if(e.year==record.year){
            budget = e.budgets[10].toFixed(2);
          }})}
          <p style={{ textAlign: "right" }}>{(record.reals[10]-budget).toFixed(2)}</p>
          </>
          );
           },
        },
      ],
      render: (text, record) => {
        <p style={{ textAlign: "right" }}>{record.novemberbudget}</p>;
      },
    },
    {
      title: <h1 style={{ textAlign: "center" }}> Décembre </h1>,
      aligne: "right",
      children: [
        {
          title: "Budget",
          dataIndex: "decembrebudget",
          width: 150,
          align: "right",
          render: (text, record) => {
        let budget=0;
          return (
            <>
        {props.AssetBudgets.map(e=>{if(e.year==record.year){
            budget = e.budgets[11].toFixed(2);
          }})}
          <p style={{ textAlign: "right" }}>{budget}</p>
          </>
          );
      },
        },
        {
          title: "Real",

          dataIndex: "decembrebudget",
          width: 150,
          align: "right",
          render: (text, record) => {
          return <p style={{ textAlign: "right" }}>{record.reals[11].toFixed(2)}</p>
      },
        },
        {
          title: "Difference",

          dataIndex: "street",
          width: 150,
          align: "right",
          render: (text, record) => {
            let budget=0;
          return (
            <>
        {props.AssetBudgets.map(e=>{if(e.year==record.year){
            budget = e.budgets[11].toFixed(2);
          }})}
          <p style={{ textAlign: "right" }}>{(record.reals[11]-budget).toFixed(2)}</p>
          </>
          );
           },
        },
      ],
      render: (text, record) => {
        <p style={{ textAlign: "right" }}>{record.decembrebudget}</p>;
      },
    },
    
    {
      title: <h1 style={{ textAlign: "center" }}>Total $</h1>,
      width: 120,
      render: (text, record) => {
            let performance=0;
          return (
            <>
            {props.AssetBudgets.map(e=>{if(e.year==record.year){
            performance = (record.reals[0]-e.budgets[0]+
            record.reals[1]-e.budgets[1]+
            record.reals[2]-e.budgets[2]+
            record.reals[3]-e.budgets[3]+
            record.reals[4]-e.budgets[4]+
            record.reals[5]-e.budgets[5]+
            record.reals[6]-e.budgets[6]+
            record.reals[7]-e.budgets[7]+
            record.reals[8]-e.budgets[8]+
            record.reals[9]-e.budgets[9]+
            record.reals[10]-e.budgets[10]+
            record.reals[11]-e.budgets[11]).toFixed(2);
          }})}
          <p style={{ textAlign: "right" }}>{performance}</p>
          </>
          );
      },
           },
  ];


  return (
    <div>
      <Table
        columns={columnsbalanceReals}
        dataSource={props.AssetReals}
        scroll={{
          x: 1300,
        }}
        pagination={true}
        bordered
        summary={(pageData) => {
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
          let totalreal=0;
          let totalfevrierreal = 0;
          let totalMarsreal = 0.00;
          let totalavrilreal = 0;
          let totalmaireal = 0;
          let totalJuinreal = 0.00;
          let totaljuilletreal = 0;
          let totalaoutreal = 0;
          let totalseptembrereal = 0;
          let totaloctobrereal = 0;
          let totalnovemberreal = 0;
          let totaldecembrereal = 0;
          let totaltotalreal = 0;
          pageData.forEach(
            ({
              montantbudget,
              repayment,
              fevrierbudget,
              Marsbudget,
              avrilbudget,
              maibudget,
              Juinbudget,
              juilletbudget,
              aoutbudget,
              septembrebudget,
              octobrebudget,
              novemberbudget,
              decembrebudget,
            }) => {
            }
          );
          return (
            <>
            {props.AssetBudgets && props.AssetBudgets.map((e)=>(
                        //console.log(e.budgets[1]),
                        //console.log(fevrierbudget),
                        totalmontant = e.budgets[0],
                        totalbudget += totalmontant,
                        totalmontant = e.budgets[1],
                        totalfevrierbudget += totalmontant,
                        totalmontant = e.budgets[2],
                        totalMarsbudget += totalmontant,
                        totalmontant = e.budgets[3],
                        totalavrilbudget += totalmontant,
                        totalmontant = e.budgets[4],
                        totalmaibudget += totalmontant,
                        totalmontant = e.budgets[5],
                        totalJuinbudget += totalmontant,
                        totalmontant = e.budgets[6],
                        totaljuilletbudget += totalmontant,
                        totalmontant = e.budgets[7],
                        totalaoutbudget += totalmontant,
                        totalmontant = e.budgets[8],
                        totalseptembrebudget += totalmontant,
                        totalmontant = e.budgets[9],
                        totaloctobrebudget += totalmontant,
                        totalmontant = e.budgets[10],
                        totalnovemberbudget += totalmontant,
                        totalmontant = e.budgets[11],
                        totaldecembrebudget += totalmontant,
                        totalmontant = e.totalBudget,
                        totaltotal -= totalmontant, 
                        console.log()
                        ))}
                        {props.AssetReals && props.AssetReals.map((e)=>(
                        //console.log(e.budgets[1]),
                        //console.log(fevrierbudget),
                        totalmontant = e.reals[0],
                        totalreal += totalmontant,
                        totalmontant = e.reals[1],
                        totalfevrierreal += totalmontant,
                        totalmontant = e.reals[2],
                        totalMarsreal += totalmontant,
                        totalmontant = e.reals[3],
                        totalavrilreal += totalmontant,
                        totalmontant = e.reals[4],
                        totalmaireal += totalmontant,
                        totalmontant = e.reals[5],
                        totalJuinreal += totalmontant,
                        totalmontant = e.reals[6],
                        totaljuilletreal += totalmontant,
                        totalmontant = e.reals[7],
                        totalaoutreal += totalmontant,
                        totalmontant = e.reals[8],
                        totalseptembrereal += totalmontant,
                        totalmontant = e.reals[9],
                        totaloctobrereal += totalmontant,
                        totalmontant = e.reals[10],
                        totalnovemberreal += totalmontant,
                        totalmontant = e.reals[11],
                        totaldecembrereal += totalmontant,
                        totalmontant = e.totalReal,
                        totaltotalreal += totalmontant,
                        totaltotal += totalmontant,
                        console.log()
                        ))}
              <Table.Summary.Row>
                <Table.Summary.Cell index={1} colSpan={1}>
                  <h3 style={{ textAlign: "center" }}> Total $</h3>
                </Table.Summary.Cell>

                {/* Janvier */}
                {/* Budget */}
                <Table.Summary.Cell index={4}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totalbudget}
                    </h6>
                  </Text>
                </Table.Summary.Cell>
                {/* Reals */}

                <Table.Summary.Cell index={4}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totalreal}
                    </h6>
                  </Text>
                </Table.Summary.Cell>
                {/* Performance */}

                <Table.Summary.Cell index={4}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totalreal-totalbudget}
                    </h6>
                  </Text>
                </Table.Summary.Cell>

                {/* Fevrier */}

                <Table.Summary.Cell index={4}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totalfevrierbudget}
                    </h6>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totalfevrierreal}
                    </h6>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totalfevrierreal-totalfevrierbudget}
                    </h6>
                  </Text>
                </Table.Summary.Cell>

                {/* mars */}

                <Table.Summary.Cell index={5}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totalMarsbudget}
                    </h6>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={5}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totalMarsreal}
                    </h6>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={5}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totalMarsreal-totalMarsbudget}
                    </h6>
                  </Text>
                </Table.Summary.Cell>

                {/* Avril  */}

                <Table.Summary.Cell index={6}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totalavrilbudget}
                    </h6>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={6}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totalavrilreal}
                    </h6>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={6}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totalavrilreal-totalavrilbudget}
                    </h6>
                  </Text>
                </Table.Summary.Cell>

                {/* Mai  */}

                <Table.Summary.Cell index={7}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totalmaibudget}
                    </h6>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={7}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totalmaireal}
                    </h6>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={7}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totalmaireal-totalmaibudget}
                    </h6>
                  </Text>
                </Table.Summary.Cell>
                {/* Jui  */}

                <Table.Summary.Cell index={8}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totalJuinbudget}
                    </h6>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={8}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totalJuinreal}
                    </h6>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={8}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totalJuinreal-totalJuinbudget}
                    </h6>
                  </Text>
                </Table.Summary.Cell>
                {/* Juillet  */}

                <Table.Summary.Cell index={9}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totaljuilletbudget}
                    </h6>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={9}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totaljuilletreal}
                    </h6>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={9}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totaljuilletreal-totaljuilletbudget}
                    </h6>
                  </Text>
                </Table.Summary.Cell>

                {/* aout  */}
                <Table.Summary.Cell index={10}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totalaoutbudget}
                    </h6>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={10}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totalaoutreal}
                    </h6>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={10}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totalaoutreal-totalaoutbudget}
                    </h6>
                  </Text>
                </Table.Summary.Cell>

                {/* Septembre  */}

                <Table.Summary.Cell index={10}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totalseptembrebudget}
                    </h6>
                  </Text>
                </Table.Summary.Cell>

                <Table.Summary.Cell index={10}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totalseptembrereal}
                    </h6>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={10}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totalseptembrereal-totalseptembrebudget}
                    </h6>
                  </Text>
                </Table.Summary.Cell>
                {/* Octobre  */}

                <Table.Summary.Cell index={10}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totaloctobrebudget}
                    </h6>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={10}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totaloctobrereal}
                    </h6>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={10}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totaloctobrereal-totaloctobrebudget}
                    </h6>
                  </Text>
                </Table.Summary.Cell>

                {/* Novembre  */}
                <Table.Summary.Cell index={10}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totalnovemberbudget}
                    </h6>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={10}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totalnovemberreal}
                    </h6>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={10}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totalnovemberreal-totalnovemberbudget}
                    </h6>
                  </Text>
                </Table.Summary.Cell>
                {/* Decembre  */}

                <Table.Summary.Cell index={11}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totaldecembrebudget}
                    </h6>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={10}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totaldecembrereal}
                    </h6>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={10}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totaldecembrereal-totaldecembrebudget}
                    </h6>
                  </Text>
                </Table.Summary.Cell>

                <Table.Summary.Cell index={10}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totalreal-totalbudget+
                      totalfevrierreal-totalfevrierbudget+
                      totalMarsreal-totalMarsbudget+
                      totalavrilreal-totalavrilbudget+
                      totalmaireal-totalmaibudget+
                      totalJuinreal-totalJuinbudget+
                      totaljuilletreal-totaljuilletbudget+
                      totalaoutreal-totalaoutbudget+
                      totalseptembrereal-totalseptembrebudget+
                      totaloctobrereal-totaloctobrebudget+
                      totalnovemberreal-totalnovemberbudget+
                      totaldecembrereal-totaldecembrebudget}
                    </h6>
                  </Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
      />
    </div>
  );
}

export default Performance;