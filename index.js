import express from "express";
import ethers from "ethers";
import https from "https";
import axios from "axios";
import alc from "alchemy-sdk";
import Web3 from "web3";
import Web3EthAbi from "web3-eth-abi";
import dotenv from "dotenv";
dotenv.config();

// Getting all ABIs
import lensProfileABI from "./ABIs/lensProfileABI.json" assert { type: "json" };
import lensMainABI from "./ABIs/lensMainABI.json" assert { type: "json" };

// Initializing Express
const app = express();
const PORT = process.env.PORT || 9001;
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Our Ethers Signer with Alchemy Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(
  "maticmum",
  process.env.ALCHEMY_API_KEY
);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, alchemyProvider);
const feeData = await alchemyProvider.getFeeData();

//////////////////////////////// LENS ENDPOINTS AND LOGIC

const mockProfileContract = new ethers.Contract(
  "0x420f0257D43145bb002E69B14FF2Eb9630Fc4736",
  lensProfileABI,
  signer
);

const lensMainContract = new ethers.Contract(
  "0x60Ae865ee4C725cd04353b5AAb364553f56ceF82",
  lensMainABI,
  signer
);

// We create the profiles with out key
app.post("/lensCreateProfile", async (req, res) => {
  const address = req.body.address;
  const handle = req.body.handle;

  let tx = await mockProfileContract.proxyCreateProfile(
    {
      to: address,
      handle: handle,
      imageURI: "",
      followModule: "0x0000000000000000000000000000000000000000",
      followModuleInitData: "0x",
      followNFTURI: "",
    },
    {
      gasPrice: Math.round(Number(feeData.gasPrice) * 1.5),
      gasLimit: 500000,
    }
  );
  //console.log(tx);
  res.json({
    tx,
  });
});

app.post("/prepareDispatchTx", async (req, res) => {
  const signerAddress = req.body.signerAddress;
  const handle = req.body.handle;
  const fullhandle = handle + ".test";

  let profileId = await lensMainContract.getProfileIdByHandle(fullhandle, {
    gasPrice: Math.round(Number(feeData.gasPrice) * 1.5),
    gasLimit: 500000,
  });

  console.log(profileId);

  const txnData = Web3EthAbi.encodeFunctionCall(
    {
      inputs: [
        { internalType: "uint256", name: "profileId", type: "uint256" },
        { internalType: "address", name: "dispatcher", type: "address" },
      ],
      name: "setDispatcher",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    [profileId, "0x0687CB24af3884Cb221E5B27cC459EF880F24228"]
  );

  console.log(txnData);

  // From Metamask Documentation
  const transactionParameters = {
    nonce: "0x00", // ignored by MetaMask
    gasPrice: "0xEE6B2800", // customizable by user during MetaMask confirmation.
    gas: "0x186A0", // customizable by user during MetaMask confirmation.
    to: "0x60Ae865ee4C725cd04353b5AAb364553f56ceF82", // Required except during contract publications.
    from: signerAddress, // must match user's active address.
    value: "0x00", // Only required to send ether to the recipient from the initiating external account.
    data: txnData,
    // Optional, but used for defining smart contract creation and interaction.
    chainId: "80001", // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
  };

  res.json({
    transactionParameters,
  });
});

app.post("/createLoyaltyProgram", async (req, res) => {
  const businessAddress = req.body.businessAddress;
  const handle = req.body.handle;
  //const contentURI = req.body.contentURI;
  const fullhandle = handle + ".test";

  let profileId = await lensMainContract.getProfileIdByHandle(fullhandle, {
    gasPrice: Math.round(Number(feeData.gasPrice) * 1.5),
    gasLimit: 500000,
  });

  let tx = await lensMainContract.post(
    {
      profileId: profileId,
      contentURI: "",
      collectModule: "0x0BE6bD7092ee83D44a6eC1D949626FeE48caB30c",
      collectModuleInitData:
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      referenceModule: "0x0000000000000000000000000000000000000000",
      referenceModuleInitData: "0x",
    },
    {
      gasPrice: Math.round(Number(feeData.gasPrice) * 1.5),
      gasLimit: 500000,
    }
  );
  console.log(tx);

  res.json({
    tx,
  });
});

// Mirror the loyalty program publication to join the program
app.post("/prepareJoinLoyaltyProgram", async (req, res) => {
  const signerAddress = req.body.signerAddress;
  const businessProfileId = req.body.businessProfileId;
  const handle = req.body.handle;
  const fullhandle = handle + ".test";

  let profileId = await lensMainContract.getProfileIdByHandle(fullhandle, {
    gasPrice: Math.round(Number(feeData.gasPrice) * 1.5),
    gasLimit: 500000,
  });

  console.log(profileId);

  const txnData = Web3EthAbi.encodeFunctionCall(
    {
      inputs: [
        {
          components: [
            { internalType: "uint256", name: "profileId", type: "uint256" },
            {
              internalType: "uint256",
              name: "profileIdPointed",
              type: "uint256",
            },
            { internalType: "uint256", name: "pubIdPointed", type: "uint256" },
            {
              internalType: "bytes",
              name: "referenceModuleData",
              type: "bytes",
            },
            {
              internalType: "address",
              name: "referenceModule",
              type: "address",
            },
            {
              internalType: "bytes",
              name: "referenceModuleInitData",
              type: "bytes",
            },
          ],
          internalType: "struct DataTypes.MirrorData",
          name: "vars",
          type: "tuple",
        },
      ],
      name: "mirror",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "nonpayable",
      type: "function",
    },

    [
      {
        profileId: profileId,
        profileIdPointed: businessProfileId,
        pubIdPointed: 1,
        referenceModuleData: "0x",
        referenceModule: "0x0000000000000000000000000000000000000000",
        referenceModuleInitData: "0x",
      },
    ]
  );

  console.log(txnData);

  // From Metamask Documentation
  const transactionParameters = {
    nonce: "0x00", // ignored by MetaMask
    gasPrice: "0xEE6B2800", // customizable by user during MetaMask confirmation.
    gas: "0x186A0", // customizable by user during MetaMask confirmation.
    to: "0x60Ae865ee4C725cd04353b5AAb364553f56ceF82", // Required except during contract publications.
    from: signerAddress, // must match user's active address.
    value: "0x00", // Only required to send ether to the recipient from the initiating external account.
    data: txnData,
    // Optional, but used for defining smart contract creation and interaction.
    chainId: "80001", // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
  };

  res.json({
    transactionParameters,
  });
});

app.post("/testServer", async (req, res) => {
  console.log(process.env.DUMMY_KEY);
  res.json({
    error: false,
  });
});

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
