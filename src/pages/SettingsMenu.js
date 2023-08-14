import React, { useState, useEffect } from "react";
import { Menu, Switch, Card, Divider, Row, Col, Space } from "antd";
import { NavLink } from "react-router-dom";
import "./Setting.css";

import Home from "./Home";

import {
  MailOutlined,
  SettingOutlined,
  ReconciliationOutlined,
  DollarOutlined,
  RadarChartOutlined,
  CarryOutOutlined,
  BarChartOutlined,
  UserOutlined,
  BlockOutlined,
  DollarCircleFilled,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import Strategic_Planning from "./Strategic_planning";
import GeneralInformations from "./GeneralInformations";
import RHDashboard from "./RHDashboard";
import HumanResourcePlanning from "./Human Resources/HumanResourcePlanning";
import EmployeesManagment from "./Human Resources/EmployeesManagment";
import SalesOrderBook from "./SalesOrderBook";
import SalesOpportunities from "./SalesOpportunities";
import SalesDashboard from "./SalesDashboard";
import HyphotheseofGl from "./HyphotheseofGl";
import Devis from "./Devis";
import Asset from "./Asset/Asset";
import Liability from "./Financial Statement/Liability";
import Equity from "./Financial Statement/Equity";
import Expense from "./Expensive/Expense";
import Revenue from "./Revenue/Revenue";
import Investment from "./Parametre/InvestismentCategory";
import MarketingType from "./Parametre/MarketingType";
import IndustryType from "./Parametre/IdustryType";
import Market from "./Parametre/Market";
import Customer from "./Parametre/Customer";
import RevenueModel from "./Parametre/RevenueModel";
import BusnissePartner from "./Parametre/BusnissePartner";
import Product from "./Parametre/Product";
import Activity from "./Parametre/ActivityType";
import PaymentTerm from "./Parametre/PaymentTerm";
import Departments from "./Human Resources/Departments";
import PostClassification from "./Human Resources/PostClassification";
import EnterpriseTitles from "./Human Resources/EnterpriseTitles";
import Term from "./Parametre/Term";
import MargeCapital from "./Parametre/MargeCapital";
import EnterpriseDepartment from "./Human Resources/EnterpriseDepartment";

function SettingsMenu() {
  const [theme, setTheme] = useState("");

  const [selectedItemKey, setSelectedItemKey] = useState("1");
  const [selectedContent, setSelectedContent] = useState(null);

  const [current, setCurrent] = useState("1");
  let { t } = useTranslation();

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    setSelectedItemKey(e.key);
    const content = getContentForMenuItem(e.key);
    setSelectedContent(content);
  };
  useEffect(() => {
    setSelectedContent(<Home />);
  }, []);

  function getContentForMenuItem(key) {
    switch (key) {
      case "1":
        return null;

      case "2":
        return <Home />;
      case "4":
        return <IndustryType />;
      case "100":
        return <Market />;

      case "5":
        return <BusnissePartner />;
      case "6":
        return <Activity />;
      case "7":
        return <RevenueModel />;
      case "8":
        return <Product />;
      case "9":
        return <Customer />;

      case "10":
        return null;

      case "12":
        return <HyphotheseofGl />;
      case "13":
        return <Devis />;

      case "14":
        return null;
      case "15":
        return <Liability />;
      case "16":
        return <SalesOrderBook />;
      case "17":
        return <SalesOpportunities />;

      case "18":
        return null;
      case "19":
        return <Departments />;
      case "20":
        return <EnterpriseTitles />;
      case "21":
        return <PostClassification />;
      case "1200":
        return <EnterpriseDepartment />;
      case "22":
        return null;

      case "23":
        return null;
      case "24":
        return <MarketingType />;
      case "111":
        return null;
      case "240":
        return <Term />;

      case "250":
        return <MargeCapital />;

      case "26":
        return null;
      case "27":
        return <Liability />;
      case "28":
        return <PaymentTerm />;

      case "29":
        return null;
      case "30":
        return <Liability />;
      case "31":
        return null;

      case "32":
        return null;
      case "33":
        return <Investment />;

      case "34":
        return null;

      case "35":
        return null;
      case "36":
        return <HyphotheseofGl />;

      case "37":
        return null;

      // Add cases for other menu items if needed
      default:
        return null; // Return null for cases where no content is available
    }
  }

  // const t = (key) => key; // Translation function (if you are using localization)
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
      // Add the new style object
    };
  }
  const items = [
    getItem(t("dashboard"), "2", <BarChartOutlined />),
    getItem("generalinf ", "1", <RadarChartOutlined />, [
      // getItem(t("Currencies"), "3", <UserOutlined />),
      getItem(
        t("IndustryTypes"),
        "4",
        <UserOutlined style={{ color: "blue" }} />
      ),
      getItem(
        t("market"),
        "100",
        <ReconciliationOutlined style={{ color: "blue" }} />
      ),

      getItem(
        t("Businesspartners"),
        "5",
        <UserOutlined style={{ color: "blue" }} />
      ),
      getItem(
        t("Activitytypes"),
        "6",
        <UserOutlined style={{ color: "blue" }} />
      ),
      getItem(
        t("Revenuemodel"),
        "7",
        <CarryOutOutlined style={{ color: "blue" }} />
      ),
      getItem(t("Product"), "8", <UserOutlined style={{ color: "blue" }} />),
      getItem(
        t("MainCustomers"),
        "9",
        <UserOutlined style={{ color: "blue" }} />
      ),
    ]),

    // getItem(t("strategicplanning"), "10", <AimOutlined />),

    // getItem(t("Expense"), "12", <ReconciliationOutlined />),
    // getItem(t("Revenue"), "13", <ReconciliationOutlined />),

    // getItem(t("Sales"), "14", <ReconciliationOutlined />, [
    //   getItem(t("Dashboard"), "15", <ReconciliationOutlined />),
    //   getItem(t("Order boock"), "16", <BookFilled />),
    //   getItem(t("Opportunity book"), "17", <BookOutlined />),
    // ]),

    getItem(t("HumanResources"), "18", <UserOutlined />, [
      getItem(
        t("Departement"),
        "19",
        <UserOutlined style={{ color: "blue" }} />
      ),
      getItem(t("Titles"), "20", <UserOutlined style={{ color: "blue" }} />),
      getItem(
        t("JobClassification"),
        "21",
        <UserOutlined style={{ color: "blue" }} />
      ),
      getItem(
        t("EnterpriseDepartments"),
        "1200",
        <UserOutlined style={{ color: "blue" }} />
      ),
    ]),
    getItem(t("Marketing"), "23", <DollarOutlined />, [
      getItem(
        t("Marketingtypes"),
        "24",
        <CarryOutOutlined style={{ color: "blue" }} />
      ),
    ]),

    getItem(t("Financement"), "230", <ReconciliationOutlined />, [
      getItem(t("pret"), "111", <DollarOutlined />, [
        getItem(
          t("Capitalfreeperiod"),
          "250",
          <DollarOutlined style={{ color: "blue" }} />
        ),
        getItem(
          t("Terms"),
          "240",
          <DollarOutlined style={{ color: "blue" }} />
        ),
      ]),
    ]),
    // getItem(t("Production"), "26", <ReconciliationOutlined />),

    getItem(t("Financialstatements"), "27", <ReconciliationOutlined />, [
      getItem(
        t(" PaymentTerms"),
        "28",
        <ReconciliationOutlined style={{ color: "blue" }} />
      ),
    ]),
    // getItem(t("cashflow"), "29", <ReconciliationOutlined />, [
    //   getItem(t(" Model definition "), "30", <ReconciliationOutlined />),

    // ]),

    // getItem(t("Funding"), "31", <ReconciliationOutlined />),

    getItem(t("Investments"), "32", <ReconciliationOutlined />, [
      getItem(
        t("CategoriesOfInvestments"),
        "33",
        <DollarOutlined style={{ color: "gray" }} />
      ),
    ]),
    // getItem(t("Rapports"), "34", <ReconciliationOutlined />),

    getItem(t("Chartaccounts"), "35", <ReconciliationOutlined />, [
      getItem(
        t("Hypotheses"),
        "36",
        <BlockOutlined style={{ color: "blue" }} />
      ),
    ]),

    // getItem(t("Monthly Closing"), "37", <ReconciliationOutlined />),
    // getItem(t("Security "), "38", <ReconciliationOutlined />, [
    //   getItem(t("Acount"), "39", <ReconciliationOutlined />),
    //   getItem(t("Integrators "), "40", <UserOutlined />),
    //   getItem(t("Module & Sections   "), "41", <UserOutlined />),
    //   getItem(t("Role & Acces Control   "), "42", <UserOutlined />),
    // ]),
  ];

  return (
    <div>
      {""}

      <Card
        bordered={false}
        className="header-solid mb-24"
        title={
          <h3 className="font-semibold">
            <Divider>
              {" "}
              <SettingOutlined style={{ color: "#3947C4" }} />
              {t("SettingsPagee")}
            </Divider>
          </h3>
        }
      >
        <Row justify="space-between">
          <Col span={6}>
            {/* <Switch
              checked={theme === "dark"}
              onChange={changeTheme}
              checkedChildren="Dark"
              unCheckedChildren="Light"
              // style={{ width: 200, height: 35, marginLeft: 20 }}
            /> */}

            <Col lg={18} xl={18} className="mb-26">
              <Menu
                theme={theme}
                onClick={onClick}
                style={{
                  width: 250,
                }}
                selectedKeys={[selectedItemKey]}
                defaultOpenKeys={["sub1"]}
                // selectedKeys={[current]}
                mode="inline"
                items={items}
              />
            </Col>
          </Col>
          <Col xs={100} sm={100} md={20} lg={18} xl={18} className="mb-26">
            <Card
              style={{
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Black box shadow with 20% opacity
              }}
              bordered={false}
              className="criclebox h-full"
            >
              {/* Display the selected content in the card */}
              {selectedContent && (
                <div className="content-container">{selectedContent}</div>
              )}
            </Card>
          </Col>
        </Row>

        {/* Rest of the menu items */}

        <div className="content-container">{/* Your content goes here */}</div>
      </Card>
    </div>
  );
}

export default SettingsMenu;
