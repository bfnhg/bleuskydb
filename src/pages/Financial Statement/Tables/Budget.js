import React,{ useContext } from "react";

import { useState, useEffect } from "react";
import {
  Button,
  Form,
  Table,
  Card,
  Input,
  InputNumber,
  Typography,
  Select,
  Radio,
  Tabs,
  Popconfirm,
} from "antd";
import axios from "axios";
import { CompanyContext } from '../../../contexts/CompanyContext';
const { Text } = Typography;
const { TextArea } = Input;

function Budget(props) {
  const [LiabilityBudgets, setLiabilityBudgets] = useState(props.liabilityBudgets);
  const { TextArea } = Input;




  function handleinputchange(ee,i,n){
    //if(ee.target.value){
    const newBudget = [...LiabilityBudgets];
    newBudget.map(e=>{if(e.id==i){
      e.budgets[n]=parseFloat(ee.target.value) || 0;
    }})
    //newBudget[i]=e.target.value;
    setLiabilityBudgets(newBudget);
    props.onBudgetChange(newBudget);
    //}
  }

  function confirm(i){
    const newBudget = [...LiabilityBudgets];
    newBudget.map(e=>{if(e.id==i){
      e.confirmed=true;
    }})
    setLiabilityBudgets(newBudget);
    props.onBudgetChange(newBudget);
  }




  const {Companies,setCompanies,Company,Actionstate,setActionstate}=useContext(CompanyContext);

  const [editingRow, setEditingRow] = useState(null);
  const [category, setcategory] = useState("");
  const [year, setyear] = useState("");
  const [montant, setmontant] = useState("");
  const [repayment, setrepayment] = useState("");
  const [fevrierbudget, setfevrierbudget] = useState(0);

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

  /*useEffect(() => getdata(), []);
  const getdata = async () => {
        await setbalance(liability);
  };*/



  

  const columnsbalanceBudget = [
    {
      title: <h1 style={{ textAlign: "center"}}>Year</h1>,
      width: 120,
      dataIndex: "year",
      aligne: "right",
      //   key: "year",
      render: (text, record) => {
          return <p style={{ textAlign: "center" }}>{text}</p>;
      },
    },
    {
      title: <h1 style={{ textAlign: "center" }}>Janvier</h1>,
      dataIndex: "montant",
      //  key: "2",
      width: 120,
      render: (text, record) => {
          return <Input type="number" value={record.budgets[0].toFixed(2)} disabled={record.confirmed} onChange={(e)=>handleinputchange(e,record.id,0)} style={{ textAlign: "right" }}/>;
      },
    },
    {
      title: <h1 style={{ textAlign: "center" }}> Février </h1>,
      dataIndex: "fevrierbudget",
      //  key: "3",
      width: 120,
      render: (text, record) => {
          return <Input type="number" value={record.budgets[1].toFixed(2)} disabled={record.confirmed} onChange={(e)=>handleinputchange(e,record.id,1)} style={{ textAlign: "right" }}/>
      },
    },
    {
      title: <h1 style={{ textAlign: "center" }}>Mars</h1>,
      dataIndex: "Marsbudget",
      key: "4",
      width: 120,
      render: (text, record) => {
          return <Input type="number" value={record.budgets[2].toFixed(2)} disabled={record.confirmed} onChange={(e)=>handleinputchange(e,record.id,2)} style={{ textAlign: "right" }}/>;
      },
    },
    {
      title: <h1 style={{ textAlign: "center" }}>Avril</h1>,
      dataIndex: "avrilbudget",
      key: "5",
      width: 120,
      render: (text, record) => {
          return <Input type="number" value={record.budgets[3].toFixed(2)} disabled={record.confirmed} onChange={(e)=>handleinputchange(e,record.id,3)} style={{ textAlign: "right" }}/>
      },
    },
    {
      title: <h1 style={{ textAlign: "center" }}>Mai</h1>,
      dataIndex: "maibudget",
      key: "6",
      width: 120,
      render: (text, record) => {
          return <Input type="number" value={record.budgets[4].toFixed(2)} disabled={record.confirmed} onChange={(e)=>handleinputchange(e,record.id,4)} style={{ textAlign: "right" }}/>
      },
    },
    {
      title: <h1 style={{ textAlign: "center" }}>Juin</h1>,
      dataIndex: "Juinbudget",
      key: "7",
      width: 120,
      render: (text, record) => {
          return <Input type="number" value={record.budgets[5].toFixed(2)} disabled={record.confirmed} onChange={(e)=>handleinputchange(e,record.id,5)} style={{ textAlign: "right" }}/>
      },
    },
    {
      title: <h1 style={{ textAlign: "center" }}>Juillet</h1>,
      dataIndex: "juilletbudget",
      key: "8",
      width: 120,
      render: (text, record) => {
          return <Input type="number" value={record.budgets[6].toFixed(2)} disabled={record.confirmed} onChange={(e)=>handleinputchange(e,record.id,6)} style={{ textAlign: "right" }}/>
      },
    },
    {
      title: <h1 style={{ textAlign: "center" }}>Août</h1>,
      dataIndex: "aoutbudget",
      key: "9",
      width: 120,
      render: (text, record) => {
          return <Input type="number" value={record.budgets[7].toFixed(2)} disabled={record.confirmed} onChange={(e)=>handleinputchange(e,record.id,7)} style={{ textAlign: "right" }}/>
      },
    },
    {
      title: <h1 style={{ textAlign: "center" }}>Septembre</h1>,
      dataIndex: "septembrebudget",
      key: "10",
      width: 120,
      render: (text, record) => {
          return <Input type="number" value={record.budgets[8].toFixed(2)} disabled={record.confirmed} onChange={(e)=>handleinputchange(e,record.id,8)} style={{ textAlign: "right" }}/>
      },
    },
    {
      title: <h1 style={{ textAlign: "center" }}>Octobre</h1>,
      dataIndex: "octobrebudget",
      key: "11",
      width: 120,
      render: (text, record) => {
          return <Input type="number" value={record.budgets[9].toFixed(2)} disabled={record.confirmed} onChange={(e)=>handleinputchange(e,record.id,9)} style={{ textAlign: "right" }}/>
      },
    },
    {
      title: <h1 style={{ textAlign: "center" }}> Novembre</h1>,
      dataIndex: "novemberbudget",
      key: "12",
      width: 120,
      render: (text, record) => {
          return <Input type="number" value={record.budgets[10].toFixed(2)} disabled={record.confirmed} onChange={(e)=>handleinputchange(e,record.id,10)} style={{ textAlign: "right" }}/>;
      },
    },
    {
      title: <h1 style={{ textAlign: "center" }}>Décembre</h1>,
      dataIndex: "decembrebudget",
      key: "12",
      width: 120,
      render: (text, record) => {
          return <Input type="number" value={record.budgets[11].toFixed(2)} disabled={record.confirmed} onChange={(e)=>handleinputchange(e,record.id,11)} style={{ textAlign: "right" }}/>;
      },
    },
    {
      title: <h1 style={{ textAlign: "center" }}>Total $</h1>,
      width: 120,
      render: (_, record) => {
        return (
          <h3 style={{ textAlign: "right" }}>
            {" "}
            {(record.budgets[0]+
            record.budgets[1]+
            record.budgets[2]+
            record.budgets[3]+
            record.budgets[4]+
            record.budgets[5]+
            record.budgets[6]+
            record.budgets[7]+
            record.budgets[8]+
            record.budgets[9]+
            record.budgets[10]+
            record.budgets[11]).toFixed(2)}
          </h3>
        );
      },
    },
    {
      title: <h1>Action</h1>,
      key: "operation",
      fixed: "left",
      width: 200,
      render: (_, record) => (
        <>
          <Button
            type="link"
            style={{ marginLeft: ".1rem" }}
            onClick={()=>confirm(record.id)}
          >
            <a>Confirm</a>
          </Button>
        </>
      ),
    },
  ];
  return (
    <div>
      <Table
        columns={columnsbalanceBudget}
        dataSource={props.liabilityBudgets}
        scroll={{
          x: 1300,
        }}
        pagination={true}
        bordered
        summary={(pageData) => {
          let totalmontant = 0;
          let totalbudget=0;
          let totalfevrierbudget = 0;
          let totalMarsbudget = 0.00;
          let totalavrilbudget = 0;
          let totalmaibudget = 0;
          let totalJuinbudget = 0.00;
          let totaljuilletbudget = 0;
          let totalaoutbudget = 0;
          let totalseptembrebudget = 0;
          let totaloctobrebudget = 0;
          let totalnovemberbudget = 0;
          let totaldecembrebudget = 0;
          let totaltotal = 0;
          pageData.forEach(
            ({
              montant,
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
            {props.liabilityBudgets && props.liabilityBudgets.map((e)=>(
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
                        totaltotal += totalmontant,
                        console.log()
                        ))}
              <Table.Summary.Row>
                <Table.Summary.Cell index={1} colSpan={1}>
                  <h3 style={{ textAlign: "center" }}> {props.liabilityBudgets && console.log("balance",props.liabilityBudgets)}</h3>
                </Table.Summary.Cell>

                <Table.Summary.Cell index={4}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totalbudget}
                    </h6>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {console.log(props.liabilityBudgets)}
                      {totalfevrierbudget}
                    </h6>
                  </Text>
                </Table.Summary.Cell>

                <Table.Summary.Cell index={5}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totalMarsbudget}
                    </h6>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={6}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totalavrilbudget}
                    </h6>
                  </Text>
                </Table.Summary.Cell>

                <Table.Summary.Cell index={7}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {console.log(totalmaibudget)}
                      {totalmaibudget}
                    </h6>
                  </Text>
                </Table.Summary.Cell>

                <Table.Summary.Cell index={8}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totalJuinbudget}
                    </h6>
                  </Text>
                </Table.Summary.Cell>

                <Table.Summary.Cell index={9}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totaljuilletbudget}
                    </h6>
                  </Text>
                </Table.Summary.Cell>
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
                      {totalseptembrebudget}
                    </h6>
                  </Text>
                </Table.Summary.Cell>

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
                      {totalnovemberbudget}
                    </h6>
                  </Text>
                </Table.Summary.Cell>

                <Table.Summary.Cell index={10}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {totaldecembrebudget}
                    </h6>
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={10}>
                  <Text>
                    <h6 style={{ textAlign: "right", width: 100 }}>
                      {(totalbudget+
                      totalfevrierbudget+
                      totalMarsbudget+
                      totalavrilbudget+
                      totalmaibudget+
                      totalJuinbudget+
                      totaljuilletbudget+
                      totalaoutbudget+
                      totalseptembrebudget+
                      totaloctobrebudget+
                      totalnovemberbudget+
                      totaldecembrebudget).toFixed(2)}
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

export default Budget;
