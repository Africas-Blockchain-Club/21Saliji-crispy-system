import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'; 
import Web3 from 'web3';
import nftContract from './nftContract';
import './app.css'; 

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [mintAmount, setMintAmount] = useState(1); 
  const [isConnected, setIsConnected] = useState(false); // New state for connection status
  const [mintedNFTs, setMintedNFTs] = useState([]);

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
      const costPerNFT = Web3.utils.toWei('0.05', 'ether'); // Changed to 'ether' for correct conversion
      const totalCost = (costPerNFT * mintAmount).toString(); // Convert to string
      await contract.methods.mint(accounts[0], mintAmount).send({ from: accounts[0], value: totalCost });
      alert('Minting successful!');
      fetchNFTsFromOpenSea(accounts[0]);
    } catch (error) {
      console.error("Minting failed!", error);
    }
  };

  const fetchNFTsFromOpenSea = async (walletAddress) => {
    const contractAddress = '0x938fC3B6DA9801D01bA292eA1784Da79113ce4e6'; // Your NFT contract address
    const apiUrl = `https://testnets-api.opensea.io/api/v1/assets?owner=${walletAddress}&asset_contract_address=${contractAddress}&order_direction=desc`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); // Ensure 'data' is defined here

      if (data.assets) {
        setMintedNFTs(data.assets); // Store the fetched NFTs
        console.log("Fetched NFTs:", data.assets);
      } else {
        console.error("Error fetching NFTs:", data);
      }
    } catch (error) {
      console.error("Failed to fetch NFTs from OpenSea", error);
    }
  };

  return (
  <>
    <h1>Minting Machine App</h1>
    {isConnected ? (
      <>
        <p className="text">Your Wallet is connected  <FontAwesomeIcon icon={faCircleCheck} style={{ color: '#63E6BE' }} /></p>

        <div className="button-container">
          <button onClick={promptForMintAmount} className="prompt-button">Set Mint Amount</button>
          <button onClick={mint} className="mint-button">Mint {mintAmount} NFT(s)</button>
        </div>

        {mintedNFTs.length > 0 ? (
            <div className="nft-gallery">
              {mintedNFTs.map((nft, index) => (
                <div key={index} className="nft-item">
                  <img src={nft.image_url} alt={nft.name} style={{ maxWidth: '200px', borderRadius: '10px' }} />
                  <p>{nft.name}</p>
                  <p>Token ID: {nft.token_id}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No NFTs found for this wallet.</p>
          )}
      </>
    ) : (
      <button onClick={connectWallet} className="connect-button">Connect Wallet</button>
    )}
  </>
  );
}

export default App;
