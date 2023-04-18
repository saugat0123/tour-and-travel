import React from "react";
// import "./Convert.css";
import { DataController } from "../../CurrencyConvert/components/DataController";

const API_ACCESS_KEY = "YOUR_API_ACCESS_KEY";
export const API_URL = `https://api.exchangeratesapi.io/v1/latest?access_key=${API_ACCESS_KEY}`;

function Convert() {
  return (
    <div className="app-convert">
      {/* <header className="app-header">
        Currency converter
      </header> */}
      <DataController url={API_URL} />
    </div>
  );
}

export default Convert;
