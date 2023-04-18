import { React, Component } from "react";
import "./convert.css";
import { DataController } from "../../CurrencyConvert/components/DataController";

const API_ACCESS_KEY = "YOUR_API_ACCESS_KEY";
export const API_URL = `https://api.exchangeratesapi.io/v1/latest?access_key=${API_ACCESS_KEY}`;

class CurrencyConverter extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">Currency converter</header>
        <DataController url={API_URL} />
      </div>
    );
  }
}

export default CurrencyConverter;
