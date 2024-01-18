import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51MqAR9AaUQ4WyfXOQEq7XO6LKUoTsdTycKGed2oCsthMwjbvOT8GrZNQ4NxklNsO6VIkyeQUjJD5loawReFoHdwd000AEPBns9"
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>
);
