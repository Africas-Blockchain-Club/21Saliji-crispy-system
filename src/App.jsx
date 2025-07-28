import { useState, useEffect } from 'react'
import {ethers} from "ethers";
import vendingMachine from './contract/vending.json';
import vendingLogo from '/vending.svg'
import './App.css'

function App() {
  const vendingMachineAddress = "0xdEA61c34bB21B3104D24965B2Bd30860FEd4F09f";
  const [vendingBalance, setVendingBalance] = useState(0);
  const [walletAddress, setWalletAddress] = useState("");
  const [status, setStatus] = useState("");

  async function connectWallet() {
  if (window.ethereum) {
    try {
      const [account] = await window.ethereum.request({ method: "eth_requestAccounts" });
      setWalletAddress(account);
      setStatus("Wallet connected");
    } catch (err) {
      setStatus("User rejected wallet connection", err);
    }
  } else {
    setStatus("Please install MetaMask!");
  }
}

async function getVendingBalance() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(vendingMachineAddress, vendingMachine.abi, await provider.getSigner());
    const balance = await contract.getVendingMachineBalance();
    setVendingBalance(ethers.formatUnits(balance, "ether"));
  }
}

async function buyCoke() {
  if (!walletAddress) return;

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(vendingMachineAddress, vendingMachine.abi, signer);
    const tx = await contract.purchase(1, { value: ethers.parseEther("0.01") }); // adjust value if needed
    await tx.wait();
    setStatus("Purchase successful!");
    getVendingBalance(); // refresh balance
  } catch (err) {
    console.error(err);
    setStatus("Transaction failed!");
  }
}

useEffect(() => {
  if (walletAddress) {
    getVendingBalance();
  }
}, [walletAddress]);


return (
  <>
    <div>
      <a href="https://storyset.com/online">
        <img src={vendingLogo} className="logo vending" alt="Vending Machine logo" />
      </a>
    </div>
    <h1>Vending Machine</h1>
    <div className="card">
      {!walletAddress ? (
        <button onClick={connectWallet} className="connect-wallet-button">
          Connect Wallet
        </button>
      ) : (
        <>
          <p>Wallet: {walletAddress}</p>
          <p>Status: {status}</p>
          <p>Balance: {parseFloat(vendingBalance).toFixed(4)} ETH</p>
          <button onClick={buyCoke}>Buy 1 Coke (0.01 ETH)</button>
        </>
      )}
    </div>
  </>
  );
}

export default App
