import express from "express";
import ethers from "ethers";
import https from "https";
import axios from "axios";
import alc from "alchemy-sdk";
import Web3 from "web3";
import Web3EthAbi from "web3-eth-abi";

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

app.post("/testServer", async (req, res) => {
  res.json({
    error: "false",
    tx,
  });
});

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
