# 21Saliji-crispy-system

Welcome to my Web3 / blockchain portfolio monorepo. 👋

This repository is a collection of the **decentralized applications (DApps) and smart-contract projects I have built**. Each project lives in its own folder at the root of this repo, with its own frontend, backend, and Solidity contracts. They range from focused learning exercises to fully functional DApps that connect to Ethereum wallets (MetaMask) and interact with on-chain smart contracts.

> **TL;DR** – This repo contains **all the projects I worked on**. Browse the folders listed in [Projects in this Repository](#projects-in-this-repository) below to explore each one.

---

## Projects in this Repository

| Project | Folder | Description | Stack |
| --- | --- | --- | --- |
| **QuizDapp** | [`QuizDapp/`](./QuizDapp) | A decentralized quiz game where players answer questions, earn scores, and can win crypto rewards. | Solidity, Web3.js, Truffle, React |
| **Vending Machine DApp** | [`Vending_Machine/`](./Vending_Machine) | A decentralized vending machine: connect a wallet, buy "Cokes" for 0.02 ETH each, and track your inventory. Supports stock checks and owner-only restocking. | Solidity, ethers.js, React + Vite, Tailwind |
| **Lottery DApp** | [`Lottery/`](./Lottery) | A lottery / sweepstake DApp. Players enter with ETH, the owner picks a winner, and past winners can be queried by lottery ID. Auto-refreshes prize pool and player list every 10s. | Solidity, ethers.js, React + Vite |
| **NFT Minting DApp (Steven Universe)** | [`Minting/`](./Minting) | An ERC-1155 NFT collection ("Steven Universe"). Users connect a wallet and mint NFTs (max 10) whose metadata/images resolve from IPFS via Pinata. Includes a Solidity backend (Hardhat) and React frontend. | Solidity (ERC-1155, OpenZeppelin), Hardhat, ethers.js, React, IPFS/Pinata |

---

## Project Details

### 1. QuizDapp

A decentralized quiz game built on the Ethereum blockchain. Players participate in quizzes, answer questions, earn scores, and potentially win rewards in cryptocurrency. The goal is to use blockchain technology for transparency, security, and a novel gaming experience.

**Features**

- **Quiz Participation**: Players can join quizzes available on the platform.
- **Question Types**: Multiple choice, true/false, and other formats.
- **Scoring and Rewards**: Earn scores based on correct answers and win crypto rewards.
- **Decentralized**: Built on Ethereum smart contracts for fairness and transparency.

**Technologies Used**

- **Solidity** – Smart contracts for quiz logic and reward distribution.
- **Web3.js** – Ethereum blockchain interaction from the frontend.
- **Truffle** – Development environment and testing framework.
- **React.js** – Interactive user interface.
- **MetaMask** – Wallet integration for auth and transaction signing.

### 2. Vending Machine DApp

A decentralized vending machine application where users buy virtual "Cokes" with ETH.

**Features**

- Connect your Ethereum wallet (MetaMask).
- View your wallet balance and vending machine stock balance.
- Buy Cokes for 0.02 ETH each.
- View your personal Coke inventory.
- Owner can restock the vending machine.
- Error handling and loading states included.

**Technologies Used**

- React (hooks / functional components), ethers.js, Solidity, MetaMask.
- Deployed on the **Scroll Sepolia** testnet.

### 3. Lottery DApp

A lottery / sweepstake DApp with transparent, on-chain prize pools.

**Features**

- Connect MetaMask and enter the lottery with ETH (minimum entry 0.001 ETH).
- Live prize pool, current lottery ID, and player list.
- Owner-only "Pick Winner" control.
- Look up past winners by lottery ID.
- Auto-refresh of contract data every 10 seconds.

**Technologies Used**

- React + Vite, ethers.js, and a Solidity smart contract.

### 4. NFT Minting DApp (Steven Universe)

An ERC-1155 NFT collection themed around *Steven Universe*.

**Features**

- Connect a wallet and mint NFTs (one at a time, up to 10).
- Metadata and artwork resolve from IPFS via Pinata (`.../{id}.json`).
- Displays minted NFTs with name, token ID, and image.
- Scaffolded Stake / Unstake buttons for future staking support.

**Technologies Used**

- Solidity (ERC-1155 via OpenZeppelin), Hardhat (with Hardhat Ignition for deploys), ethers.js, React, IPFS/Pinata.
- Includes a GitHub Actions workflow (`node.js.yml`) for CI.

---

## Repository Structure

```
21Saliji-crispy-system/
├── QuizDapp/            # Decentralized quiz game
├── Vending_Machine/     # Decentralized vending machine DApp
├── Lottery/             # Lottery / sweepstake DApp
├── Minting/             # Steven Universe ERC-1155 NFT minting DApp
│   ├── Backend/         #   Solidity contracts + Hardhat
│   └── Frontend/        #   React frontend
└── README.md
```

Each project folder is self-contained and has its own `package.json`, dependencies, and setup instructions. See the README inside each individual folder (where available) for project-specific setup.

---

## Common Prerequisites

Most projects in this monorepo share the same requirements:

- **Node.js** and **npm** installed.
- **MetaMask** browser extension (or another Ethereum wallet).
- Access to an Ethereum-compatible testnet (e.g., Scroll Sepolia) and, for contract deployment, a funded test account.

---

## Getting Started

Because this repo contains multiple independent projects, the general workflow is:

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd 21Saliji-crispy-system
   ```

2. Enter the project you want to run:

   ```bash
   cd <project-folder>   # e.g. cd Vending_Machine
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. For projects with smart contracts, compile and deploy (command varies per project — Truffle or Hardhat).

5. Start the frontend dev server (e.g. `npm run dev` or `npm start`) and open the app in your browser.

See the individual project folders for the exact commands.

---

## Usage

- Connect your Ethereum wallet (e.g., MetaMask) to any of the DApps.
- Interact with the relevant smart contract (buy items, enter a lottery, mint an NFT, play a quiz, etc.).
- View your balances, inventory, scores, or minted assets as applicable to each project.

---

## Contributing

Contributions, suggestions, and feedback are welcome! Please fork the repository and create a pull request with your improvements.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Inspired by the potential of blockchain technology in gaming and DApps.
- Special thanks to the Ethereum community for their development tools and resources (Truffle, Hardhat, OpenZeppelin, ethers.js).
- Thanks to Africa's Blockchain Club for the learning environment behind these projects.

---