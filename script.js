async function checkPoints() {
  const address = document.getElementById("wallet").value;
  const resultDiv = document.getElementById("result");

  resultDiv.innerHTML = "Checking...";

  try {
    const res = await fetch(`http://localhost:3001/api/points/${address}`);
    const data = await res.json();

    resultDiv.innerHTML = `
      <h2>Total Points: ${data.points}</h2>
      <p>Transactions: ${data.details.transactions}</p>
      <p>Wallet: ${data.address}</p>
    `;
  } catch (err) {
    resultDiv.innerHTML = "Error checking points.";
  }
}
