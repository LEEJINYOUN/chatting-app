import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import Router from "./components/Router";
import firebase from "./firebase";
console.log(firebase);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <Router />
  </React.StrictMode>
);
