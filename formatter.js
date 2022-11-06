var useradd = "";
const meta = document.getElementById("meta");
const lens = document.getElementById("meta");
const handleField = document.getElementById("meta");

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
  lens.style.display = "none";
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
});
