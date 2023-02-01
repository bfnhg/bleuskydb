import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import axios from "axios";


axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);






// axios.interceptors.response.use(
//   (response) => {
//     console.log("inteceptor");

//     if (response.status === 200) {
//       console.log("200 interceptor");
//       return response;
//     }
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       console.log("401");
//       axios
//         .post(
//           "https://localhost:7232/api/Authentication/refresh-token",
//           {
//             hash: localStorage.getItem("token"),
//           },
//           { withCredentials: true }
//         )
//         .then((res) => {
//           const token = res.data.hash;
//           console.log("res reftoken : ", res);
//           localStorage.setItem("token", token);
//           // setAuthHeader(res.data.token);
//         });
//     }
//   }
// );

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root"),
);
