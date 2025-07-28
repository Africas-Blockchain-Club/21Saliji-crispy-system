import { useState } from 'react'
import {ethers} from "ethers";
import vendingLogo from '/vending.svg'
import './App.css'

function App() {

  async function connectWallet() {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      console.log("Wallet connected");
    } catch (err) {
      console.error("User rejected wallet connection", err);
    }
  } else {
    alert("Please install MetaMask!");
  }
}

  return (
    <>
      <div>
        <a href="https://storyset.com/online">
        <img src={vendingLogo} className='logo vending' alt="Vending Machine logo" />
        </a>
      </div>
      <h1>Vending Machine</h1>
      <div className="card">
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
        <button onClick={connectWallet} className="connect-wallet-button">
          connect wallet
        </button>
        {/* <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p> */}
      </div>
      {/* <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
