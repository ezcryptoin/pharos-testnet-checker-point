async function checkPoints() {
  const address = document.getElementById("wallet").value.trim();
  const resultDiv = document.getElementById("result");

  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    resultDiv.innerText = "❌ Invalid wallet address.";
    return;
  }

  resultDiv.innerText = "⏳ Checking...";

  const body = {
    jsonrpc: "2.0",
    method: "eth_getTransactionCount",
    params: [address, "latest"],
    id: 1
  };

  try {
    const response = await fetch("https://testnet.dplabs-internal.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    const hexCount = data.result;
    const txCount = parseInt(hexCount, 16);

    resultDiv.innerHTML = `
      ✅ <strong>${txCount}</strong> transactions<br>
      🏅 <strong>${txCount}</strong> points
    `;
  } catch (err) {
    console.error(err);
    resultDiv.innerText = "❌ Failed to fetch data.";
  }
}
