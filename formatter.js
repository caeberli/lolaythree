var handle = "";
lens.addEventListener("click", async function handleClick() {
  worldID.init("world-id-container", {
    enable_telemetry: true,
    action_id: "wid_staging_4e61cc77b9254a91e0f7c107dec20c9a", // obtain this from developer.worldcoin.org
    signal:
      "0x0000000000000000000000000000000000000000000000000000000000005101",

    on_error: (error) => console.error(error),
  });
});
