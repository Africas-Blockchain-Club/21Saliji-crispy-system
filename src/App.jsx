import { useState } from 'react'
import Web3 from 'web3';
import nftContract from './nftContract';
import './App.css'

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [mintAmount, setMintAmount] = useState(1); 
  const [isConnected, setIsConnected] = useState(false); // New state for connection status

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const accounts = await web3Instance.eth.requestAccounts();
        setAccounts(accounts);

        const instance = nftContract(web3Instance);
        setContract(instance);

        setIsConnected(true); // Set connection status to true after successful connection

      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('Web3 not found');
    }
  };

  const promptForMintAmount = () => {
    const userAmount = prompt("Enter the number of NFTs you want to mint:", mintAmount);
    const parsedAmount = parseInt(userAmount, 10);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Invalid number of NFTs. Please enter a positive integer.");
    } else {
      setMintAmount(parsedAmount);
    }
  }; 

  const mint = async () => {
    try {
      const costPerNFT = Web3.utils.toWei('0.05', 'wei');
      const totalCost = Web3.utils.toWei((costPerNFT * mintAmount).toString(), 'ether');

      await contract.methods.mint(accounts[0], mintAmount).send({ from: accounts[0], value: totalCost });
      alert('Minting successful!');
    } catch (error) {
      console.error("Minting failed!", error);
    }
  };


  return (
    <>
    <h3>Minting Machine App</h3>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
