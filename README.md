Adress used to transact for almost everything: 0x0687CB24af3884Cb221E5B27cC459EF880F24228

The graoh suggraph deployed to here
https://thegraph.com/explorer/subgraph/caeberli/loyalthree-subgraph

Push Channel creation
https://goerli.etherscan.io/tx/0x4b1ffa29507f298b2a5c68b7308e70e6667b3ac3854ac02d6f4f339c6886da7e

ICON for our Push Channel is on IPFS:
https://gateway.ipfs.io/ipfs/bafybeigzj5fjdhjg73h6ddgk7t5r2wuybfnse6egdhafpycmganmskner4/QmQtBJk8eKxkophdb9ofpSMwPnhmzjgToukcr36QaKhqLT,

FINDINGS:
For Push, when opting in via the backend, the documentation just takes the channel owners key to sign with opting in api call

For DUNE, it doesn't pass the queryID that it says it does on the second Javascript example in the Documentation

Deployed Dune Queries:
Total Loyalty Purchases // Query ID: 1530608
Total Loyalty Customers // Query ID: 1530542
Timestamp of Purchases // Query ID: 1530675

Tellor:
Deployed Modified RNG contract via remix to: 0x119A7388A5528AE522f6611C604bE8bd44E0850C
We have 3 endpoints that are live:

- Call random number generator
- Submit Value
- Retrieve Value
