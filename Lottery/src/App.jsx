import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import lotterylogo from '/lottery.svg';
import LOTTERY_ABI from './contracts/lot.json';
import './App.css';

const CONTRACT_ADDRESS = "0x703810897b2DE6AFaA98e1652c7f441f30597c51";

function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [provider, setSigner] = useState(null);
  const [balance, setBalance] = useState('0');
  const [players, setPlayers] = useState([]);
  const [lotteryId, setLotteryId] = useState('0');
  const [owner, setOwner] = useState('');
  const [entryAmount, setEntryAmount] = useState('0.01');
  const [loading, setLoading] = useState(false);
  const [lotteryToCheck, setLotteryToCheck] = useState('');
  const [winner, setWinner] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [count, setCount] = useState(0)

   // Connect to MetaMask
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        
        setAccount(address);
        setSigner(signer);
        
        // Initialize contract
        const lotteryContract = new ethers.Contract(CONTRACT_ADDRESS, LOTTERY_ABI, signer);
        setContract(lotteryContract);
        
        console.log('Connected to:', address);
      } else {
        alert('Please install MetaMask!');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  // Load contract data
  const loadContractData = async () => {
    if (!contract) return;
    
    try {
      const balance = await contract.getBalance();
      const players = await contract.getPlayers();
      const lotteryId = await contract.lotteryId();
      const owner = await contract.owner();
      
      setBalance(ethers.formatEther(balance));
      setPlayers(players);
      setLotteryId(lotteryId.toString());
      setOwner(owner);
      setIsOwner(account.toLowerCase() === owner.toLowerCase());
    } catch (error) {
      console.error('Error loading contract data:', error);
    }
  };

  // Enter lottery
  const enterLottery = async () => {
    if (!contract) return;
    
    try {
      setLoading(true);
      const tx = await contract.enter({
        value: ethers.parseEther(entryAmount)
      });
      
      console.log('Transaction sent:', tx.hash);
      await tx.wait();
      console.log('Transaction confirmed');
      
      await loadContractData();
    } catch (error) {
      console.error('Error entering lottery:', error);
      alert('Transaction failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Pick winner (owner only)
  const pickWinner = async () => {
    if (!contract || !isOwner) return;
    
    try {
      setLoading(true);
      const tx = await contract.pickWinner();
      
      console.log('Pick winner transaction sent:', tx.hash);
      await tx.wait();
      console.log('Winner picked!');
      
      await loadContractData();
    } catch (error) {
      console.error('Error picking winner:', error);
      alert('Transaction failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Get winner by lottery ID
  const getWinner = async () => {
    if (!contract || !lotteryToCheck) return;
    
    try {
      const winner = await contract.getWinnerByLottery(lotteryToCheck);
      setWinner(winner);
    } catch (error) {
      console.error('Error getting winner:', error);
      setWinner('');
    }
  };

  // Load data when contract is available
  useEffect(() => {
    if (contract) {
      loadContractData();
    }
  }, [contract]);

  // Auto-refresh data every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (contract) {
        loadContractData();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [contract]);



  return (
    <>
      <div>
        <a href="https://storyset.com/people">
          <img src={lotterylogo} className="logo" alt="lottery logo" />
        </a>
      </div>
      <h1>Lottery SweepStake</h1>
      <div className="card">
        {!account ? (
        <div>
          <p>Connect your wallet to participate in the lottery</p>
          <button onClick={connectWallet}>Connect MetaMask</button>
        </div>
        ) : (
        <div>
          <h2>Wallet Connected</h2>
          <p><strong>Account:</strong> {account}</p>
          <p><strong>Contract Owner:</strong> {owner}</p>
          {isOwner && <p><strong>You are the owner!</strong></p>}
          
          <hr />
          
          <h2>Current Lottery</h2>
          <p><strong>Lottery ID:</strong> {lotteryId}</p>
          <p><strong>Prize Pool:</strong> {balance} ETH</p>
          <p><strong>Number of Players:</strong> {players.length}</p>
          
          <h3>Players:</h3>
          {players.length > 0 ? (
            <ul>
              {players.map((player, index) => (
                <li key={index}>{player}</li>
              ))}
            </ul>
          ) : (
            <p>No players yet</p>
          )}
          
          <hr />
          
          <h2>Enter Lottery</h2>
          <div>
            <label>
              Entry Amount (ETH):
              <input
                type="number"
                step="0.001"
                min="0.001"
                value={entryAmount}
                onChange={(e) => setEntryAmount(e.target.value)}
              />
            </label>
          </div>
          <button 
            onClick={enterLottery} 
            disabled={loading || parseFloat(entryAmount) <= 0.001}
          >
            {loading ? 'Entering...' : 'Enter Lottery'}
          </button>
          <p><em>Minimum entry: 0.001 ETH</em></p>
          
          {isOwner && (
            <div>
              <hr />
              <h2>Owner Controls</h2>
              <button 
                onClick={pickWinner} 
                disabled={loading || players.length === 0}
              >
                {loading ? 'Picking Winner...' : 'Pick Winner'}
              </button>
              <p><em>Only available when there are players</em></p>
            </div>
          )}
          
          <hr />
          
          <h2>Check Previous Winners</h2>
          <div>
            <label>
              Lottery ID:
              <input
                type="number"
                min="1"
                value={lotteryToCheck}
                onChange={(e) => setLotteryToCheck(e.target.value)}
              />
            </label>
            <button onClick={getWinner} disabled={!lotteryToCheck}>
              Get Winner
            </button>
          </div>
          {winner && (
            <p><strong>Winner of Lottery #{lotteryToCheck}:</strong> {winner}</p>
          )}
          
          <hr />
          
          <button onClick={loadContractData}>Refresh Data</button>
        </div>
      
      )}
      </div>
    </>
  )
}

export default App
