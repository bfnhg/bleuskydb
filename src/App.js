import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import ComingSoon from "./pages/ComingSoon";

import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";

import GeneralInformations from "./pages/GeneralInformations";
import Details from "./pages/Details";
import AddCompany from "./pages/AddCompany";

import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import RouteGuard from './components/layout/RouteGuard'
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
        <RouteGuard exact path='/'><Home /></RouteGuard>
        <RouteGuard exact path='/dashboard'><Home /></RouteGuard>
        <RouteGuard exact path='/tables'><Tables /></RouteGuard>
        <RouteGuard exact path='/billing'><Billing /></RouteGuard>
        <RouteGuard exact path='/rtl'><Rtl /></RouteGuard>
        <RouteGuard exact path='/profile'><Profile /></RouteGuard>
        <RouteGuard exact path='/generalinformations'><GeneralInformations /></RouteGuard>
        <RouteGuard exact path='/addcompany'><AddCompany /></RouteGuard>
        <RouteGuard exact path='/comingsoon'><ComingSoon /></RouteGuard>

        <RouteGuard exact path='/generalinformations/:id'><Details /></RouteGuard>

        </Main>
      </Switch>
    </div>
  );
}

export default App;
