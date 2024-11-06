// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleDAO {
    // Define the structure of a Proposal
    struct Proposal {
        uint id;
        string description;
        uint forVotes;
        uint againstVotes;
        bool active;
        address proposer;
    }

    // State variables
    address public owner;
    uint public nextProposalId;
    mapping(uint => Proposal) public proposals;
    mapping(address => mapping(uint => bool)) public votes; // track if an address has voted on a proposal

    // Events
    event ProposalCreated(uint id, string description, address proposer);
    event Voted(uint id, bool support, address voter);

    // Constructor
    constructor() {
        owner = msg.sender;
        nextProposalId = 1;
    }

    // Modifier to check if a proposal exists
    modifier validProposal(uint proposalId) {
        require(proposals[proposalId].id != 0, "Proposal does not exist");
        _;
    }

    // Function to create a proposal
    function createProposal(string calldata description) external {
        proposals[nextProposalId] = Proposal({
            id: nextProposalId,
            description: description,
            forVotes: 0,
            againstVotes: 0,
            active: true,
            proposer: msg.sender
        });
        
        emit ProposalCreated(nextProposalId, description, msg.sender);
        nextProposalId++;
    }

    // Function to vote on a proposal
    function vote(uint proposalId, bool support) external validProposal(proposalId) {
        Proposal storage proposal = proposals[proposalId];
        require(proposal.active, "Proposal is no longer active");
        require(!votes[msg.sender][proposalId], "You have already voted on this proposal");

        if (support) {
            proposal.forVotes++;
        } else {
            proposal.againstVotes++;
        }

        votes[msg.sender][proposalId] = true; // Mark that the voter has voted on this proposal
        emit Voted(proposalId, support, msg.sender);
    }

    // Function to get proposal details
    function getProposal(uint proposalId) external view validProposal(proposalId) returns (
        string memory description,
        uint forVotes,
        uint againstVotes,
        bool active,
        address proposer
    ) {
        Proposal storage proposal = proposals[proposalId];
        return (
            proposal.description,
            proposal.forVotes,
            proposal.againstVotes,
            proposal.active,
            proposal.proposer
        );
    }

    // Function to close a proposal (only owner)
    function closeProposal(uint proposalId) external validProposal(proposalId) {
        require(msg.sender == owner, "Only the owner can close proposals");
        Proposal storage proposal = proposals[proposalId];
        proposal.active = false;
    }
}
