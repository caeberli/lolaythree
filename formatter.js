const joinHuel = document.getElementById("joinHuel");
const joinDomino = document.getElementById("joinDomino");
const joinBlue = document.getElementById("joinBlue");
const joinDunkin = document.getElementById("joinDunkin");
const joinStarbucks = document.getElementById("joinStarbucks");
const joinChipotle = document.getElementById("joinChipotle");

joinHuel.addEventListener("click", async function handleClick() {
  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  const useradd = accounts[0];

  await fetch("https://loyalthree.herokuapp.com/prepareJoinLoyaltyProgram", {
    method: "POST",
    body: JSON.stringify({
      signerAddress: useradd,
      businessProfileId: 20741,
      handle: "l3b-huel",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(async (data) => {
      console.log(data.tx);
    });

  const txHash = await ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  });
});
