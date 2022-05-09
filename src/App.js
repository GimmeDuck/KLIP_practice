import logo from './logo.svg';
import './App.css';

import QRCode from "qrcode.react";
import * as KlipAPI from "./klip_test";


function App() {

  const getUserData = () => {
    setModalProps({
      title: "Klip 지갑을 연동하시겠습니까?",
      onConfirm: () => {
        KlipAPI.getAddress(setQrvalue, async (address) => {
          setMyAddress(address);
          
        });
      },
    });
    setShowModal(true);
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
        <button onClick={getUserData}>지갑 연동하기</button>
        
      </header>
    </div>
  );
}

export default App;