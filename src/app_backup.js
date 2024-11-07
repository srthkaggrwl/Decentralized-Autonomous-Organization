const abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "proposer",
          "type": "address"
        }
      ],
      "name": "ProposalCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "support",
          "type": "bool"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "voter",
          "type": "address"
        }
      ],
      "name": "Voted",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "nextProposalId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "proposals",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "forVotes",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "againstVotes",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "active",
          "type": "bool"
        },
        {
          "internalType": "address",
          "name": "proposer",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "votes",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        }
      ],
      "name": "createProposal",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "proposalId",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "support",
          "type": "bool"
        }
      ],
      "name": "vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "proposalId",
          "type": "uint256"
        }
      ],
      "name": "getProposal",
      "outputs": [
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "forVotes",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "againstVotes",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "active",
          "type": "bool"
        },
        {
          "internalType": "address",
          "name": "proposer",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "proposalId",
          "type": "uint256"
        }
      ],
      "name": "closeProposal",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
];
const contractAddress = '0xc1dcbb69898C1C63745014D7cbE84EC2196f8a44'; // Replace with actual contract address
let accounts = [];
let daoContract;


// Ensure you have web3.js included
window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            // Use the eth_requestAccounts method to request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            accounts = await web3.eth.getAccounts();
        } catch (error) {
            console.error("User denied account access");
        }
    } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

   daoContract = new web3.eth.Contract(abi, contractAddress);
});



async function getUserAccount() {
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
            return accounts[0]; // Use the first account
        } else {
            throw new Error('No MetaMask accounts found.');
        }
    } catch (error) {
        console.error('Error getting user account:', error.message);
        alert('Failed to get user account. Please ensure MetaMask is connected.');
        return null;
    }
}


// Create proposal using web3.js
async function createProposal() {
    const proposalText = document.getElementById("proposalText").value;
    if (daoContract && proposalText && accounts.length > 0) {
        try {
            await daoContract.methods.createProposal(proposalText).send({ from: accounts[0], gas: 3000000 });
            alert("Proposal created successfully!");
        } catch (err) {
            console.error("Error creating proposal:", err);
            alert("Failed to create proposal.");
        }
    } else {
        alert("Please connect your wallet and enter a proposal description.");
    }
}

// Voting functions
async function vote(proposalId, support) {
    if (daoContract && accounts.length > 0) {
        try {
            await daoContract.methods.vote(proposalId, support).send({ from: accounts[0], gas: 300000 });
            alert(`Voted ${support ? "For" : "Against"} the proposal!`);
        } catch (err) {
            console.error("Error voting on proposal:", err);
            alert("Failed to vote.");
        }
    } else {
        alert("Please connect your wallet.");
    }
}

// Viewing proposal
async function viewProposal() {
    const proposalId = document.getElementById("viewProposalId").value;
    if (daoContract && proposalId) {
        try {
            const proposal = await daoContract.methods.getProposal(proposalId).call();
            const details = `
                Description: ${proposal[0]}
                For Votes: ${proposal[1]}
                Against Votes: ${proposal[2]}
                Active: ${proposal[3]}
                Proposer: ${proposal[4]}
            `;
            document.getElementById("proposalDetails").innerText = details;
        } catch (err) {
            console.error("Error fetching proposal details:", err);
            alert("Failed to fetch proposal details.");
        }
    } else {
        alert("Please connect your wallet and enter a proposal ID.");
    }
}

// Event listeners
document.getElementById("createProposal").addEventListener("click", createProposal);
document.getElementById("voteFor").addEventListener("click", () => {
    const proposalId = document.getElementById("proposalId").value;
    vote(proposalId, true);
});
document.getElementById("voteAgainst").addEventListener("click", () => {
    const proposalId = document.getElementById("proposalId").value;
    vote(proposalId, false);
});
document.getElementById("viewProposal").addEventListener("click", viewProposal);


window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
    } else {
        console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
    }

    daoContract = new web3.eth.Contract(abi, contractAddress);
});
