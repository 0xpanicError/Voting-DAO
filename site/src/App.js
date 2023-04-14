import React, { useState } from "react";
import { ethers } from "ethers";
import "./App.css";

function App() {
  const [_des, setProposalName] = useState("");
  const [_time, setProposalAmount] = useState(0);
  const [_id, setProposalId] = useState(0);
  const [_vote, setUserVote] = useState(false);

  const [proposalData, setProposalData] = useState({});

  const votingAddress = "0x725d28d392005D991a185455f32d379A63fB4903";
  const votingABI = [
    {
      inputs: [
        {
          internalType: "string",
          name: "_des",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "_time",
          type: "uint256",
        },
      ],
      name: "createProposal",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
      ],
      name: "endProposal",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
      ],
      name: "getCreator",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
      ],
      name: "getDeadline",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
      ],
      name: "getDescription",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
      ],
      name: "getNayCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
      ],
      name: "getProposalById",
      outputs: [
        {
          components: [
            {
              internalType: "string",
              name: "description",
              type: "string",
            },
            {
              internalType: "bool",
              name: "isActive",
              type: "bool",
            },
            {
              internalType: "address",
              name: "creator",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "deadline",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "yayCount",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "nayCount",
              type: "uint256",
            },
          ],
          internalType: "struct Voting.Proposal",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getProposalCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
      ],
      name: "getYayCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
      ],
      name: "isActive",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "_vote",
          type: "bool",
        },
      ],
      name: "vote",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        console.log("Connected to MetaMask", signer.getAddress());
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        alert("Failed to connect to MetaMask");
      }
    } else {
      alert("Please install MetaMask to use this app");
    }
  };

  const createProposal = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const voting = new ethers.Contract(votingAddress, votingABI, signer);
      const proposalId = await voting.createProposal(_des, _time);
      alert("Proposal created successfully!");
      console.log(proposalId);
    } catch (error) {
      console.error(error);
      alert("Failed to create proposal");
    }
  };

  const vote = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const voting = new ethers.Contract(votingAddress, votingABI, signer);
      const tx = await voting.vote(_id, _vote);
      await tx.wait();
      alert("Vote submitted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to submit vote");
    }
  };

  const endProposal = async () => {
    try {
      alert(`Proposal result: {result}`);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch proposal result");
    }
  };

  const getProposalById = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(votingAddress, votingABI, provider);
    const proposal = await contract.getProposalById(_id);
    setProposalData({ proposal });
    console.log(proposalData);
  };

  const getProposalCount = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(votingAddress, votingABI, provider);
    const count = await contract.getProposalCount();
    setProposalData({ count });
    console.log(proposalData);
  };

  const getDescription = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(votingAddress, votingABI, provider);
    const description = await contract.getDescription(_id);
    setProposalData({ description });
    console.log(proposalData);
  };

  const getCreator = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(votingAddress, votingABI, provider);
    const creator = await contract.getCreator(_id);
    setProposalData({ creator });
    console.log(proposalData);
  };

  const getDeadline = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(votingAddress, votingABI, provider);
    const deadline = await contract.getDeadline(_id);
    setProposalData({ deadline });
    console.log(proposalData);
  };

  const isActive = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(votingAddress, votingABI, provider);
    const active = await contract.isActive(_id);
    setProposalData({ active });
    console.log(proposalData);
  };

  const getYayCount = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(votingAddress, votingABI, provider);
    const yayCount = await contract.getYayCount(_id);
    setProposalData({ yayCount });
    console.log(proposalData);
  };

  const getNayCount = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(votingAddress, votingABI, provider);
    const nayCount = await contract.getNayCount(_id);
    setProposalData({ nayCount });
    console.log(proposalData);
  };

  return (
    <div className="App">
      <h1 className="title">DAO Voting App</h1>

      <button
        onClick={connectWallet}
        className="connect-wallet-btn"
        id="metamask"
      >
        Connect Wallet
      </button>

      <div className="input-section">
        <input
          type="text"
          placeholder="Proposal Description"
          value={_des}
          onChange={(e) => setProposalName(e.target.value)}
          className="input-field"
        />
        <input
          type="number"
          placeholder="Days to vote"
          value={_time}
          onChange={(e) => setProposalAmount(e.target.value * 86400)}
          className="input-field"
        />
        <button onClick={createProposal} className="action-btn">
          Create Proposal
        </button>
      </div>

      <div className="input-section">
        <input
          type="number"
          placeholder="Proposal ID"
          value={_id}
          onChange={(e) => setProposalId(e.target.value)}
          className="input-field"
        />
        <select
          value={_vote}
          onChange={(e) => setUserVote(e.target.value === "true")}
          className="select-field"
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <button onClick={vote} className="action-btn">
          Vote
        </button>
      </div>

      <div className="input-section">
        <input
          type="number"
          placeholder="Proposal ID"
          value={_id}
          onChange={(e) => setProposalId(e.target.value)}
          className="input-field"
        />
        <button onClick={endProposal} className="action-btn">
          End Proposal
        </button>
      </div>
      <div>
        <input
          type="number"
          placeholder="Proposal ID"
          value={_id}
          onChange={(e) => setProposalId(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="read-btn">
        <button onClick={getProposalById} className="action-btn">
          Get Proposal by ID
        </button>
      </div>
      <div className="read-btn">
        <button onClick={getProposalCount} className="action-btn">
          Get Proposal Count
        </button>
      </div>
      <div className="read-btn">
        <button onClick={getDescription} className="action-btn">
          Get Description
        </button>
      </div>
      <div className="read-btn">
        <button onClick={isActive} className="action-btn">
          Check Active Status
        </button>
      </div>
      <div className="read-btn">
        {" "}
        <button onClick={getCreator} className="action-btn">
          Get Creator
        </button>
      </div>
      <div className="read-btn">
        <button onClick={getDeadline} className="action-btn">
          Get Deadline
        </button>
      </div>

      <div className="read-btn">
        <button onClick={getYayCount} className="action-btn">
          Get Yay Count
        </button>
      </div>
      <div className="read-btn">
        <button onClick={getNayCount} className="action-btn">
          Get Nay Count
        </button>
      </div>
    </div>
  );
}

export default App;
