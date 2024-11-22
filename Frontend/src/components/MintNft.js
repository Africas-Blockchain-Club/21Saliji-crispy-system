import React, { useState } from "react";
import { BrowserProvider, Contract, parseEther } from "ethers";
import StevenUniverse from "../contract/stevenuni.json";

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

function MintNFT() {
  const [walletAddress, setWalletAddress] = useState("");
  const [status, setStatus] = useState("");
  const [mintedNFT, setMintedNFT] = useState([]);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const [account] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(account);
        setStatus("Wallet connected!");
      } catch (error) {
        setStatus("Error connecting wallet.");
      }
    } else {
      setStatus("Please install MetaMask.");
    }
  };

  const mintNFT = async () => {
    if (!walletAddress) {
      setStatus("Connect your wallet first.");
      return;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, StevenUniverse.abi, signer);

      // Token ID for the minted NFT (replace with dynamic logic if needed)
      const tokenId = mintedNFT.length + 1;

      const tx = await contract.ownerMint(walletAddress, tokenId, 1, {
        value: parseEther("0.01"), // Use parseEther directly
      });

      setStatus("Minting NFT...");
      await tx.wait();
      setStatus("NFT Minted Successfully!");

      // Assuming metadata URL follows the ERC1155 standard (adjust as needed)
      const metadataURL = `https://gateway.pinata.cloud/ipfs/QmPHyvqT3ggXJaCXaM8CbEaC72s6x2MMHKJrK2BsitBMRz/${tokenId}.json`;
      const response = await fetch(metadataURL);
      const metadata = await response.json();
      console.log("Metadata:", metadata); 
      
      // Store minted NFT details
      setMintedNFT((prevNFTs) => [
        ...prevNFTs,
        {
          image: metadata.image,
          name: metadata.name,
          tokenId,
        },
      ]);
    } catch (error) {
      setStatus("Error minting NFT: " + error.message);
    }
  };

  return (
    <div>
      {!walletAddress && (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
      {walletAddress && <p>{status}</p>}

      <button
        onClick={mintNFT}
        disabled={!walletAddress || mintedNFT.length >= 10}
      >
        Mint NFT
      </button>

      <div>
        {mintedNFT.length > 0 && (
          <div>
            <p>NFTs Minted Successfully!</p>

            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {mintedNFT.map((nft, index) => (
                <div key={index} style={{ margin: "10px" }}>
                  <img
                    src={nft.image}
                    alt={`NFT Token ${nft.tokenId}`}
                    style={{ width: "150px", height: "150px", margin: "20px 0" }}
                  />
                  <p>Name    : {nft.name}</p>
                  <p>Token ID: {nft.tokenId}</p>
                  <button type="button">Stake</button>
                  <button type="button">Unstake</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MintNFT;
