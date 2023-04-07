import React, { useMemo, useContext, useEffect, useState } from "react";
import { JSON_API } from "../../services/Constants";
import { CompanyContext } from '../../contexts/CompanyContext';
import axios from "axios";
import { Link } from 'react-router-dom';
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
  Descriptions,
} from "antd";
const onChangee = (date, dateString) => {
  console.log(date, dateString);
};

function Liability() {
  const {Lang,setLang,Shares,setShares,ShareHolders,setShareHolders,Product,setProduct,ActivityType,setActivityType,StrategicTarget,setStrategicTarget,BusinessPartner,setBusinessPartner,MainCustomer,setMainCustomer,RevenueModel,setRevenueModel,Companies,setCompanies,Company,setCompany,Actionstate,setActionstate,Edited,setEdited,TypeIndustries,setTypeIndustries,Market,setMarket}=useContext(CompanyContext);
  const [year,setYear]=useState(null);
  const [liabilities,setliabilities] = useState(null);
  const [form2] = Form.useForm();
  const [editingRowbook, setEditingRowbook] = useState(null);
  const [statementcategory, setStatementCategory]=useState([{}]);
  var date;
  useEffect(() => {
    //date =  new Date().getFullYear();
    //if( year == null){
    //  setYear(date);
    //}
    console.log("year"+date);
    getLiabilities();
    }, [Company.id,year]);
    const onChangeyear = (date, dateString) => {
    setliabilities(null);
    console.log(date, dateString);
    setYear(dateString);
  };
  
    const columns = [
    {
      title: "GIFI",
      // dataIndex: "financialStatementTypeId",
      align: "center",
      // render: (text) => <a>{text}</a>,
      render: (_,record) => <div style={{ textAlign: "left" }}>{record.financialStatementType.gifi}</div> ,

    },
    {
      title:"Class",
      align: "center",
      render: (_,record) => <div style={{ textAlign: "left" }}>{record.financialStatementType.financialStatementCategory.financialStatementClass.label}</div>,


    },
    {
      title: "Category",
      // dataIndex: "category",
      align: "center",
      render: (_,record) => <div style={{ textAlign: "left" }}>{record.financialStatementType.financialStatementCategory.label}</div> ,
    },
    {
      title: "GL Number",
      // dataIndex: "glAccountId",
      align: "center",
      render: (_,record) => <div style={{ textAlign: "right" }}>{record.chartAccount.glAccount.glNumber}</div> ,

    },
    {
      title: "Description",
      // dataIndex: "note",
      align: "center",
      render: (_,record) => <div style={{ textAlign: "left" }}>{record.note}</div>,
    },
    {
      title: "Actions",
      align: "center",

      render: (_, record) => {
        return (
                <Link to={{
              pathname:`/liabilityDetail/${record.id}`,
              state:{stateParam:record.id}
            }}>details</Link>
        );
      },
    },
  ];
    const getLiabilities = async () => {
      if(year==null){
    await axios
      .get(`${JSON_API}/Liability/filter/${Company.id}`)
      .then((res) => {
        console.log(res);
        setliabilities(res.data);
      })
      .catch((err) => {
        console.log(err);
      });}
      else{
        await axios
      .get(`${JSON_API}/Liability/filter/${Company.id}?year=${year}`)
      .then((res) => {
        console.log(res);
        setliabilities(res.data);
        console.log(liabilities);
      })
      .catch((err) => {
        console.log(err);
      });
      }
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        {" "}
        Liabilities for {Company.name}
      </h1>
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

        
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button
            className="Create-button"
            type="primary"
            
            style={{
              textAlign: "right",
            }}
          >
            Upload the Reals
          </Button>
          
          <Button
            className="Create-button"
            type="primary"
            style={{
              textAlign: "right",
              marginLeft: "2rem",
            }}
           
          >
            Summary
          </Button>
          
        </div>
      </div>
      <div>
        <Table columns={columns} dataSource={liabilities} bordered />
      </div>
    </div>
  );
}

export default Liability;
