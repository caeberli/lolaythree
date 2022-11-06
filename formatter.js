var useradd = "";
const meta = document.getElementById("meta");
const lens = document.getElementById("lens");
const handleField = document.getElementById("handleField");

meta.addEventListener("click", async function handleClick() {
  meta.style.display = "none";
  lottie.style.display = "flex";
  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  useradd = accounts[0];
  lottie.style.display = "none";
  lens.style.display = "flex";
  handleField.style.display = "flex";
});

var handle = "";
lens.addEventListener("click", async function handleClick() {
  handle = "l3u-" + handleField.value;
  lens.style.display = "none";
  handleField.style.display = "none";
  lottie.style.display = "flex";

  await fetch("https://loyalthree.herokuapp.com/lensCreateProfile", {
    method: "POST",
    body: JSON.stringify({
      address: useradd,
      handle: handle,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(async (data) => {
      console.log(data.tx);
    });
  lottie.style.display = "none";

  worldID.init("world-id-container", {
    enable_telemetry: true,
    action_id: "wid_staging_4e61cc77b9254a91e0f7c107dec20c9a", // obtain this from developer.worldcoin.org
    signal:
      "0x0000000000000000000000000000000000000000000000000000000000005075",
    on_success: async (entireProof) => {
      console.log(entireProof);

      const dec = ethers.utils.defaultAbiCoder;
      console.log(ethers.utils.defaultAbiCoder);
      console.log(dec.decode(["uint256[8]"], entireProof.proof)[0]);

      var input = "";
      const root = entireProof.merkle_root;
      const nullifierHash = entireProof.nullifier_hash;
      const proof = dec.decode(["uint256[8]"], entireProof.proof)[0];

      await fetch("https://loyalthree.herokuapp.com/getProfileID", {
        method: "POST",
        body: JSON.stringify({
          address: useradd,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          input = data.profileID;
        });

      await fetch("https://ethsfprep.herokuapp.com/prepareTxn2", {
        method: "POST",
        body: JSON.stringify({
          input: input,
          root: root,
          nullifierHash: nullifierHash,
          proof: proof,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          console.log(data.tx);
        });
    },
    on_error: (error) => console.error(error),
  });
});
