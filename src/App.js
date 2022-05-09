import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";

import QRCode from "qrcode.react";
import * as KlipAPI from "./klip_test";
import {
  Alert,
  Container,
} from "react-bootstrap";


const DEFAULT_QR_CODE = "DEFAULT";
const DEFAULT_ADDRESS = "0x00000000000000000000000000000";

function App() {

  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
  const [myAddress, setMyAddress] = useState("0x00000000000000000000000000000");
  const [myBalance, setMyBalance] = useState("0");

  const getUserData = () => {
    KlipAPI.getAddress(setQrvalue, async (address) => {
      setMyAddress(address);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={getUserData}> "지갑 연동하기"</button>
        {qrvalue !== "DEFAULT" ? (
          <Container
            style={{
              backgroundColor: "white",
              width: 300,
              height: 300,
              padding: 20,
            }}
          >
            <QRCode value={qrvalue} size={256} style={{ margin: "auto" }} />

            <br />
            <br />
          </Container>
        ) : null}
        
      </header>
    </div>
  );
}

export default App;