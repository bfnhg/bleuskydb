import React, { useState,useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CompanyContext } from '../../contexts/CompanyContext';
import { Result  } from 'antd';

function RouteGuard ({ children, ...rest }) {
  //   let flag = false;
  //   localStorage.getItem("token") ? flag=true : flag=false

  // return flag ? children : <Navigate to="/login" />;
  
  const {Lang,setLang,Shares,setShares,ShareHolders,setShareHolders,Product,setProduct,ActivityType,setActivityType,StrategicTarget,setStrategicTarget,BusinessPartner,setBusinessPartner,MainCustomer,setMainCustomer,RevenueModel,setRevenueModel,Companies,setCompanies,Company,setCompany,Actionstate,setActionstate,Edited,setEdited,TypeIndustries,setTypeIndustries,Market,setMarket}=useContext(CompanyContext);

  const [childrenname,setChildrenname]=useState(React.Children.toArray(children).map(x => x.type.name ))
   function hasJWT() {
       let flag = false;
 
       //check user has JWT token
       localStorage.getItem("token") ? flag=true : flag=false
       console.log("token:", flag)
       return flag
   }
 
   return (
       <Route {...rest}
           render={() => (
               hasJWT() ? 
               Company? children
                : 
                childrenname[0]== "AddCompany" ? children:

                <Result title="Select a company to display its data."

                // extra={
                //   <Button type="primary" key="console">
                //     Go Console
                //   </Button>
                // }

                />

                   : 
           <Redirect from="*" to="/sign-in" />
          )}
       />
   );
};
 
export default RouteGuard;