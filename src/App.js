import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";

import QRCode from "qrcode.react";
import * as KlipAPI from "./klip_test.js";
import {
  Alert,
  Container,
} from "react-bootstrap";

import execute_func from "./execute.js";

import { Buffer } from "buffer";
var global = global || window;
global.Buffer = global.Buffer || require("buffer").Buffer;



const DEFAULT_QR_CODE = "DEFAULT";
const DEFAULT_ADDRESS = "0x00000000000000000000000000000";

function App() {

  const [qrvalue_auth, setQrvalue_auth] = useState(DEFAULT_QR_CODE);
  const [qrvalue_send, setQrvalue_send] = useState(DEFAULT_QR_CODE);
  const [qrvalue_execute, setQrvalue_execute] = useState(DEFAULT_QR_CODE);
  const [myAddress, setMyAddress] = useState(DEFAULT_ADDRESS);

  const getUserData = () => {
    KlipAPI.getAddress(setQrvalue_auth, async (address) => {
      setMyAddress(address);
    });
  };

  const sendKLAYtoGMD = () => {
    KlipAPI.send_klay(setQrvalue_send, setMyAddress);
  };

/*
  const executeContract = () => {
    KlipAPI.execute_contract(setQrvalue_execute, setMyAddress);
  };
*/

const executeContract = () => {
  execute_func();
}

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={getUserData}> "지갑 연동하기"</button>
        {qrvalue_auth !== "DEFAULT" ? (
          <Container
            style={{
              backgroundColor: "white",
              width: 300,
              height: 300,
              padding: 20,
            }}
          >
            <QRCode value={qrvalue_auth} size={256} style={{ margin: "auto" }} />

            <br />
            <br />
          </Container>
        ) : null}

        <button onClick={sendKLAYtoGMD}> "klay 전송"</button>
        {qrvalue_send !== "DEFAULT" ? (
          <Container
            style={{
              backgroundColor: "white",
              width: 300,
              height: 300,
              padding: 20,
            }}
          >
            <QRCode value={qrvalue_send} size={256} style={{ margin: "auto" }} />

            <br />
            <br />
          </Container>
        ) : null}

        
        <button onClick={executeContract}> "컨트랙트 실행"</button>
        
        
      </header>
    </div>
  );
}

export default App;