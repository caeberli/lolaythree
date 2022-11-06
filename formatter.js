function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

var useradd = "";
const meta = document.getElementById("meta");
const lens = document.getElementById("lens");
const handleField = document.getElementById("handleField");
const insights = document.getElementById("insights");

const divMeta = document.getElementById("divMeta");
const divLens = document.getElementById("divLens");
const divLottie = document.getElementById("divLottie");

const textBlock1 = document.getElementById("textBlock1");
const textBlock2 = document.getElementById("textBlock2");
const textBlock3 = document.getElementById("textBlock3");

meta.addEventListener("click", async function handleClick() {
  divMeta.style.display = "none";
  divLottie.style.display = "flex";
  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  useradd = accounts[0];
  divLottie.style.display = "none";
  divLens.style.display = "flex";
  textBlock1.style.display = "none";
  textBlock2.style.display = "flex";
});

var handle = "";
lens.addEventListener("click", async function handleClick() {
  handle = "l3b-" + handleField.value;

  divLens.style.display = "none";
  divLottie.style.display = "flex";

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

  await delay(1000);

  textBlock2.style.display = "none";
  textBlock3.style.display = "flex";
  divLottie.style.display = "none";
  divWorld.style.display = "flex";

  var widget = uploadcare.Widget("[role=uploadcare-uploader]");
  var selecedfileurl = "";

  widget.onUploadComplete(async function(fileInfo) {
    selecedfileurl = fileInfo.cdnUrl;

    insights.style.display = "flex";
  });
});
