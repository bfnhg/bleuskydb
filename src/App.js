import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import ComingSoon from "./pages/ComingSoon";
import {useState} from 'react';
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import SalesOrderBook from "./pages/SalesOrderBook";
import GeneralInformations from "./pages/GeneralInformations";
import Details from "./pages/Details";
import AddCompany from "./pages/AddCompany";
import { CompanyContext } from "./contexts/CompanyContext";
// import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import RouteGuard from './components/layout/RouteGuard';
import OrderBookDetails from "./pages/OrderBookDetails";
import Testpage from "./pages/Testpage";
import UpdateCompany from "./pages/UpdateCompany";
// import StrategicPlanning from "./pages/StrategicPlanning";
import Chartofaccounts from "./pages/Chartofaccounts";
import ChartofAcount from "./pages/ChartofAcount";

import Newchartofaccounts from "./pages/Newchartofaccounts";
import SalesOpportunities from "./pages/SalesOpportunities";
import OpportunityDetails from "./pages/OpportunityDetails";
import HyphotheseofGl from "./pages/HyphotheseofGl";
import Strategic_Planning from "./pages/Strategic_planning";
import StrategicPlans from "./pages/StrategicPlans";

import Liabilities from "./pages/Financial Statement/Liability";
import LiabilityDetail from "./pages/Financial Statement/LiabilityDetail";
import Assets from "./pages/Asset/Asset";
import AssetsDetail from "./pages/Asset/AssetDetail";
import AssetSummary from "./pages/Asset/AssetSummary";

function App() {
  const [Company,setCompany]=useState(null);
  const [Companies,setCompanies]=useState([]);

  const[TempCompany,setTempCompany]=useState({});

  const [Actionstate,setActionstate]=useState(true);
  const [Edited,setEdited]=useState(true);

  const [TypeIndustries,setTypeIndustries]=useState([]);
  const [Market,setMarket]=useState([]);
  const [RevenueModel,setRevenueModel]=useState([]);
  const [MainCustomer,setMainCustomer]=useState([]);
  const [BusinessPartner,setBusinessPartner]=useState([]);
  const [StrategicTarget,setStrategicTarget]=useState([]);
  const [ActivityType,setActivityType]=useState([]);
  const [Product,setProduct]=useState([]);
  const [ShareHolders,setShareHolders]=useState([]);
  const [Shares,setShares]=useState([]);
  const [Lang,setLang]=useState("en");
  const [submitted, setSubmitted]=useState(false);
  return (
    <div className="App">
      <CompanyContext.Provider value={{submitted, setSubmitted,Lang,setLang,TempCompany,setTempCompany,Shares,setShares,ShareHolders,setShareHolders,Product,setProduct,ActivityType,setActivityType,StrategicTarget,setStrategicTarget,BusinessPartner,setBusinessPartner,MainCustomer,setMainCustomer,RevenueModel,setRevenueModel,Companies,setCompanies,Company,setCompany,Actionstate,setActionstate,Edited,setEdited,TypeIndustries,setTypeIndustries,Market,setMarket}}>
      <Switch>
        
        <Route path="/sign-in" exact component={SignIn} />

        
        <Main>
        <RouteGuard exact path='/'><Home /></RouteGuard>
        <RouteGuard exact path='/dashboard'><Home /></RouteGuard>
        <RouteGuard exact path='/tables'><Tables /></RouteGuard>
        <RouteGuard exact path='/billing'><Billing /></RouteGuard>
        <RouteGuard exact path='/rtl'><Rtl /></RouteGuard>
        <RouteGuard exact path='/profile'><Profile /></RouteGuard>
        <RouteGuard exact path='/orderbooks'><SalesOrderBook /></RouteGuard>
        <RouteGuard exact path='/opportunities'><SalesOpportunities /></RouteGuard>
        <RouteGuard exact path='/orderbook/:id'><OrderBookDetails /></RouteGuard>
        <RouteGuard exact path='/opportunitybook/:id'><OpportunityDetails /></RouteGuard>

        <RouteGuard exact path='/generalinformations'><GeneralInformations /></RouteGuard>
        <RouteGuard exact path='/addcompany'><AddCompany /></RouteGuard>
        <RouteGuard exact path='/updatecompany'><UpdateCompany /></RouteGuard>
        <RouteGuard exact path='/comingsoon'><ComingSoon /></RouteGuard>
        {/* <RouteGuard exact path='/strategicplanning'><StrategicPlanning/></RouteGuard> */}
        <RouteGuard exact path='/strategic_planning'><Strategic_Planning/></RouteGuard>
        <RouteGuard exact path="/strategicplans/:id/:year"><StrategicPlans/></RouteGuard>
        <RouteGuard exact path='/chartofaccounts1'><Chartofaccounts/></RouteGuard>
        <RouteGuard exact path='/chartofaccounts'><ChartofAcount/></RouteGuard>

        <RouteGuard exact path='/glaccountsandhyphotheses'><HyphotheseofGl/></RouteGuard>

        <RouteGuard exact path='/testpage'><Testpage /></RouteGuard>
        <RouteGuard exact path='/new_chart_of_accounts'><Newchartofaccounts /></RouteGuard>


        <RouteGuard exact path='/generalinformations/:id'><Details /></RouteGuard>

        <RouteGuard exact path='/liabilities'><Liabilities /></RouteGuard>
        <RouteGuard exact path='/liabilityDetail/:id'><LiabilityDetail /></RouteGuard>

        <RouteGuard exact path='/Assets'><Assets /></RouteGuard>
        <RouteGuard exact path='/AssetDetail/:id'><AssetsDetail /></RouteGuard>

        <RouteGuard exact path='/AssetSummary'><AssetSummary /></RouteGuard>
        </Main>
        
      </Switch>
      </CompanyContext.Provider>
    </div>
  );
}

export default App;
