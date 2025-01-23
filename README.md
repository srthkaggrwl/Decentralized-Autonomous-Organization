# DAO Web Application

This project is a decentralized application (DApp) that allows users to interact with a Decentralized Autonomous Organization (DAO) on the Ethereum blockchain. Users can create proposals, vote on them, and view proposal details, all within a secure and transparent environment. This DApp is built with HTML, JavaScript, and Web3.js, and communicates with an Ethereum smart contract deployed to a blockchain network.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Smart Contract](#smart-contract)
- [License](#license)

## Project Overview

The DAO Web Application allows users to participate in a DAO by proposing changes and voting on proposals in a decentralized manner. The application uses Web3.js to connect to the Ethereum blockchain via MetaMask and interacts with the smart contract to store and retrieve information related to proposals.

## Features

- **Create Proposals**: Users can submit new proposals with a description that gets recorded on the blockchain.
- **Vote on Proposals**: Users can vote in favor or against a proposal.
- **View Proposals**: Users can view details of proposals, including the description, vote counts, status, and proposer information.

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript
- **Blockchain Interface**: Web3.js
- **Ethereum Wallet**: MetaMask
- **Smart Contract**: Solidity

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/srthkaggrwl/Decentralized-Autonomous-Organization
    cd Decentralized-Autonomous-Organization
    ```

2. **Install Dependencies**:
    Ensure you have `web3.js` installed:
    ```bash
    npm install web3
    ```

3. **Deploy the Smart Contract**:
    Use Truffle or Hardhat to deploy the `SimpleDAO` smart contract to a test blockchain (e.g., Ganache or an Ethereum testnet).
    
    After deploying, replace `contractAddress` in `app.js` with your deployed contract address.

## Usage

1. **Start Ganache or Connect MetaMask** to an Ethereum network to deploy and test the DApp.

2. **Run the Application**:
    Open `index.html` in a web browser. MetaMask will prompt you to connect your wallet and approve interactions with the DApp.

3. **Create and Vote on Proposals**:
    - **Create Proposal**: Enter a proposal description and click "Create Proposal."
    - **Vote on Proposal**: Enter the proposal ID, then click "Vote For" or "Vote Against."
    - **View Proposal**: Enter the proposal ID to fetch proposal details.

## Smart Contract

The smart contract, `SimpleDAO`, is written in Solidity and handles core functionalities of the DAO:
- `createProposal`: Allows any user to submit a new proposal.
- `vote`: Enables users to vote on an active proposal.
- `getProposal`: Fetches details of a specified proposal.
- Events, such as `ProposalCreated` and `Voted`, help provide feedback on the blockchain's state.

### Smart Contract Functions

- **`createProposal(string description)`**: Creates a new proposal.
- **`vote(uint proposalId, bool support)`**: Casts a vote (in favor or against).
- **`getProposal(uint proposalId)`**: Retrieves proposal details.

## License

This project is licensed under the MIT License.
