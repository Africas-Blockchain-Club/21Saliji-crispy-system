import { useState, useEffect } from 'react'
import {ethers} from "ethers";
import vendingMachine from './contract/vending.json';
import vendingLogo from '/vending.svg'
import './App.css'

const CONTRACT_ADDRESS = "0xA77f483174E7f3E0976F379b9BE3FBD9db1A84d8";
const VENDING_MACHINE_ABI = vendingMachine;

function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [provider, setSigner] = useState(null);
  const [vendingMachineBalance, setVendingMachineBalance] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userCokeBalance, setUserCokeBalance] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0); 

  const connectWallet = async () => {
      try {
        if (typeof window.ethereum !== 'undefined') {
          setLoading(true);
          setError('');
          
          console.log('Requesting account access...');
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          
          console.log('Creating provider and signer...');
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          
          console.log('Connected address:', address);
          

          const balance = await provider.getBalance(address);
          setWalletBalance(ethers.formatEther(balance));
          
          console.log('Creating contract instance...');
          const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, VENDING_MACHINE_ABI, signer);
          
          console.log('Setting state...');
          setAccount(address);
          setContract(contractInstance);
          setSigner(signer);
          
          console.log('Checking owner...');
          const owner = await contractInstance.owner();
          console.log('Contract owner:', owner);
          console.log('Connected address:', address);
          setIsOwner(owner.toLowerCase() === address.toLowerCase());
          
          console.log('Getting vending machine balance...');
          await getVendingMachineBalance(contractInstance);
          
          console.log('Connection completed successfully');
          await getUserCokeBalance(contractInstance);
          
        } else {
          setError('Please install MetaMask to use this application');
        }
      } catch (err) {
        console.error('Connection error:', err);
        setError('Failed to connect wallet: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

  const getVendingMachineBalance = async (contractInstance = contract) => {
      try {
        if (contractInstance) {
          console.log('Getting vending machine balance...');
          const balance = await contractInstance.getVendingMachineBalance();
          console.log('Vending machine balance:', balance.toString());
          setVendingMachineBalance(Number(balance));
        }
      } catch (err) {
        console.error('Balance error:', err);
        setError('Failed to get balance: ' + err.message);
      }
    };

  const restockVendingMachine = async () => {
      try {
        if (!contract) return;
        
        setLoading(true);
        setError('');
        
        const tx = await contract.restock(3); 
        await tx.wait();
        
        
        await getVendingMachineBalance(contract);
        
      } catch (err) {
        setError('Failed to restock: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

  const getUserCokeBalance = async (contractInstance = contract) => {
    try {
      if (contractInstance && account) {
        const balance = await contractInstance.getCokeBalance(account);
        console.log('User Coke balance:', balance.toString());
        setUserCokeBalance(parseInt(balance.toString()));
      }
    } catch (err) {
      console.error('User balance error:', err);
      setError('Failed to get your Coke balance: ' + err.message);
    }
  };

  const buyCoke = async () => {
    try {
      if (!contract) return;
      
      setLoading(true);
      setError('');
      
      
      const cost = ethers.parseEther("0.02");
      
      const tx = await contract.purchase(1, { value: cost });
      await tx.wait();
      
      
      await getVendingMachineBalance(contract);
      await getUserCokeBalance(contract);
      
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);
      setWalletBalance(ethers.formatEther(balance));
      
    } catch (err) {
      setError('Failed to purchase: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setAccount('');
    setContract(null);
    setSigner(null);
    setVendingMachineBalance(0);
    setIsOwner(false);
    setWalletBalance(0);
  };

 return (
    <>
      <div>
        <a href="https://storyset.com/online">
          <img src={vendingLogo} className="logo vending" alt="Vending Machine logo" />
        </a>
      </div>
      <h1>Vending Machine</h1>
      <div className="card">
        {error && (
          <div style={{ color: 'red', marginBottom: '10px', padding: '10px', border: '1px solid red', borderRadius: '5px' }}>
            {error}
          </div>
        )}
        
        {!account ? (
          <button onClick={connectWallet} className="connect-wallet-button" disabled={loading}>
            {loading ? 'Connecting...' : 'Connect Wallet'}
          </button>
        ) : (
          <>
            <p>Wallet: {account}</p>
            <p>Status: {isOwner ? 'Owner' : 'Customer'}</p>
            <p>Balance: {parseFloat(walletBalance || 0).toFixed(4)} ETH</p>
            <p>Your Coke Inventory: {userCokeBalance} 🧃</p>
            <p>Vending Balance: {parseFloat(vendingMachineBalance).toFixed(0)} items</p>
            <button onClick={buyCoke} disabled={loading}>
              {loading ? 'Purchasing...' : 'Buy 1 Coke (0.02 ETH)'}
            </button> <span/>
            <button onClick={() => getUserCokeBalance(contract)}>Refresh My Inventory</button>
            <span/> <span/> 
            {isOwner && (
              <button onClick={() => restockVendingMachine()} disabled={loading}>
                {loading ? 'Restocking...' : 'Restock (owner only)'}
              </button>
            )}
            <br/> <br/>
            <button onClick={disconnectWallet}>Disconnect Wallet</button>
          </>
        )}
      </div>
    </>
  );
}

export default App