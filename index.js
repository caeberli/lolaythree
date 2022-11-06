import express from "express";
import ethers from "ethers";
import https from "https";
import axios from "axios";
import alc from "alchemy-sdk";
import Web3 from "web3";
import Web3EthAbi from "web3-eth-abi";
import dotenv from "dotenv";
import * as PushAPI from "@pushprotocol/restapi";
import { Headers } from "node-fetch";
import fetch from "node-fetch";
dotenv.config();
const abiCoder = new ethers.utils.AbiCoder();
import { Web3Storage } from "web3.storage";
import { NFTStorage, File, Blob } from "nft.storage";

// Getting all ABIs
import lensProfileABI from "./ABIs/lensProfileABI.json" assert { type: "json" };
import lensMainABI from "./ABIs/lensMainABI.json" assert { type: "json" };
import worldLensABI from "./ABIs/worldLensABI.json" assert { type: "json" };
import tellorRNGABI from "./ABIs/tellorRNGABI.json" assert { type: "json" };
import tellorPlayABI from "./ABIs/tellorPlayABI.json" assert { type: "json" };

// Initializing Expresss
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

//////////////////////////////// WORLDCOIN START ////////////////////////////////

const worldLensContract = new ethers.Contract(
  "0x2E81a56E9Ca2bAb2E73EFE732606500b310ee8F7",
  worldLensABI,
  signer
);

app.post("/verifyWorldLens", async (req, res) => {
  const input = req.body.input;
  const root = req.body.root;
  const nullifierHash = req.body.nullifierHash;
  const proof = req.body.proof;

  const feeData = await alchemyProvider.getFeeData();
  let tx = await worldLensContract.verify(input, root, nullifierHash, proof, {
    gasPrice: Math.round(Number(feeData.gasPrice) * 1.5),
    gasLimit: 500000,
  });

  console.log(tx);

  res.json({
    error: "false",
    tx,
  });
});

//////////////////////////////// IPFS START ////////////////////////////////

const client = new Web3Storage({
  token: process.env.WEB3_STORAGE_API_KEY,
});

const nftClient = new NFTStorage({ token: process.env.NFT_STORAGE_TOKEN });

app.post("/uploadIPFS", async (req, res) => {
  const file = req.body.file;
  const cid = await nftClient.storeBlob(file);
  //const rootCid = await client.put([file]);

  res.json({
    error: "false",
    cid,
  });
});

//////////////////////////////// LENS START ////////////////////////////////

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

// We create the profiles with our key
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
    gas: "0x493E0", // customizable by user during MetaMask confirmation.
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

app.post("/loyaltyPoint", async (req, res) => {
  const userId = req.body.userId;
  const businessId = req.body.businessId;

  let tx = await lensMainContract.comment(
    {
      profileId: businessId,
      contentURI: "Verified Store Visit!",
      profileIdPointed: userId,
      pubIdPointed: 1,
      referenceModuleData: "0x",
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

//////////////////////////////// COVALENT START ////////////////////////////////

app.post("/getProfileID", async (req, res) => {
  const address = req.body.address;

  let resp = await fetch(
    `https://api.covalenthq.com/v1/80001/address/${address}/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=false&key=${process.env.COVALENT_API_KEY}`
  );

  const ret = await resp.json();
  console.log(ret);

  const profileID = parseInt(
    ret.data.items.filter(
      (x) => x.contract_address === "0x60ae865ee4c725cd04353b5aab364553f56cef82"
    )[0].nft_data[0].token_id
  );

  res.json({
    profileID,
  });
});

//////////////////////////////// PUSH START ////////////////////////////////

app.post("/channelDataPush", async (req, res) => {
  const channelData = await PushAPI.channels.getChannel({
    channel: "eip155:80001:0x0687CB24af3884Cb221E5B27cC459EF880F24228", // channel address in CAIP
    env: "staging",
  });

  console.log(channelData);
  res.json({
    channelData,
  });
});

app.post("/messagePush", async (req, res) => {
  const address = req.body.address;

  const apiResponse = await PushAPI.payloads.sendNotification({
    signer,
    type: 3, // target
    identityType: 2, // direct payload
    notification: {
      title: `Test Message`,
      body: `Test Body`,
    },
    payload: {
      title: `Test Message`,
      body: `Test Body`,
      cta: "",
      img: "",
    },
    recipients: `eip155:80001:${address}`, // recipient address
    channel: "eip155:80001:0x0687CB24af3884Cb221E5B27cC459EF880F24228", // your channel address
    env: "staging",
  });

  console.log(apiResponse);
  res.json({
    error: "false",
  });
});

app.post("/optInPush", async (req, res) => {
  const PK = process.env.PRIVATE_KEY;
  const Pkey = `0x${PK}`;
  const pushSigner = new ethers.Wallet(Pkey);

  const address = req.body.address;

  await PushAPI.channels.subscribe({
    signer: pushSigner,
    channelAddress: "eip155:80001:0x0687CB24af3884Cb221E5B27cC459EF880F24228", // channel address in CAIP
    userAddress: `eip155:80001:${address}`, // user address in CAIP
    onSuccess: () => {
      console.log("opt in success");
      res.json({
        error: "false",
      });
    },
    onError: () => {
      console.error("opt in error");
      res.json({
        error: "true",
      });
    },
    env: "staging",
  });
});

//////////////////////////////// TELLOR START ////////////////////////////////

const tellorRNGContract = new ethers.Contract(
  "0x119A7388A5528AE522f6611C604bE8bd44E0850C",
  tellorRNGABI,
  signer
);

app.post("/callRNG", async (req, res) => {
  const timestamp = req.body.timestamp;

  let tx = await tellorRNGContract.requestRandomNumber(timestamp, {
    gasPrice: Math.round(Number(feeData.gasPrice) * 1.5),
    gasLimit: 500000,
  });

  const encodedTimestamp = abiCoder.encode(["uint256"], [timestamp]);
  const queryData = abiCoder.encode(
    ["string", "bytes"],
    ["TellorRNG", encodedTimestamp]
  );
  const queryId = Web3.utils.keccak256(queryData);

  res.json({
    tx,
    queryId,
    queryData,
  });
});

app.post("/testEncoding", async (req, res) => {
  const encodedTimestamp = abiCoder.encode(["uint256"], [147]);
  const queryData = abiCoder.encode(
    ["string", "bytes"],
    ["TellorRNG", encodedTimestamp]
  );
  const queryId = Web3.utils.keccak256(queryData);
  console.log(queryData);
  console.log(queryId);
  res.json({
    error: false,
  });
});

app.post("/getReceipt", async (req, res) => {
  const hash = req.body.hash;
  let receipt = await alchemyProvider.getTransactionReceipt(hash);

  console.log(receipt);
  res.json({
    receipt,
  });
});

const tellorPlayContract = new ethers.Contract(
  "0x3251838bd813fdf6a97D32781e011cce8D225d59",
  tellorPlayABI,
  signer
);

app.post("/submitValue", async (req, res) => {
  const queryId = req.body.queryId;
  const queryData = req.body.queryData;
  const value = req.body.value;

  let tx = await tellorPlayContract.submitValue(queryId, value, 0, queryData, {
    gasPrice: Math.round(Number(feeData.gasPrice) * 1.5),
    gasLimit: 500000,
  });

  console.log(tx);
  res.json({
    tx,
  });
});

app.post("/retriveValue", async (req, res) => {
  const queryId = req.body.queryId;

  let numTimestamps = await tellorPlayContract.getNewValueCountbyQueryId(
    queryId,
    {
      gasPrice: Math.round(Number(feeData.gasPrice) * 1.5),
      gasLimit: 500000,
    }
  );

  let lastTimestamps = await tellorPlayContract.getTimestampbyQueryIdandIndex(
    queryId,
    numTimestamps - 1,
    {
      gasPrice: Math.round(Number(feeData.gasPrice) * 1.5),
      gasLimit: 500000,
    }
  );

  let value = await tellorPlayContract.retrieveData(queryId, lastTimestamps, {
    gasPrice: Math.round(Number(feeData.gasPrice) * 1.5),
    gasLimit: 500000,
  });

  let intValue = parseInt(value);

  res.json({
    intValue,
  });
});

//////////////////////////////// DUNE START ////////////////////////////////

// Used to execute our three custom queries to track loyalty purchases
app.post("/duneApiExecute", async (req, res) => {
  const queryId = req.body.queryId;

  const meta = {
    "x-dune-api-key": process.env.DUNE_API_KEY,
  };
  const header = new Headers(meta);

  // Add parameters we would pass to the query
  var params = {
    query_parameters: {
      Profile_ID: 5,
      Pub_ID: 1,
    },
  };
  var body = JSON.stringify(params);

  //  Call the Dune API
  const response = await fetch(
    `https://api.dune.com/api/v1/query/${queryId}/execute`,
    {
      method: "POST",
      headers: header,
      body: body,
    }
  );

  const response_object = await response.text();

  // Log the returned response
  console.log(response_object);

  res.json({
    error: "false",
    response_object,
  });
});

app.post("/duneApiResults", async (req, res) => {
  const execution_id = req.body.execution_id;

  const meta = {
    "x-dune-api-key": process.env.DUNE_API_KEY,
  };
  const header = new Headers(meta);

  //  Call the Dune API
  const response = await fetch(
    `https://api.dune.com/api/v1/execution/${execution_id}/results`,
    {
      method: "GET",
      headers: header,
    }
  );

  const body = await response.json();

  // Log the returned response
  console.log(body);

  res.json({
    error: "false",
    body,
  });
});

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
