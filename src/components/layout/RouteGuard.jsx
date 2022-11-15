import React from 'react';
import { Route, Redirect } from 'react-router-dom';
 
function RouteGuard ({ children, ...rest }) {
  //   let flag = false;
  //   localStorage.getItem("token") ? flag=true : flag=false

  // return flag ? children : <Navigate to="/login" />;
 
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
                    children
                   : 
           <Redirect from="*" to="/sign-in" />
          )}
       />
   );
};
 
export default RouteGuard;