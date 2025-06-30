const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3001;

// RPC endpoint dari Pharos Testnet
const PHAROS_RPC = "https://testnet.dplabs-internal.com";

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve file static dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Fungsi untuk mengambil jumlah transaksi dari sebuah wallet
async function getTxCount(address) {
  const body = {
    jsonrpc: "2.0",
    method: "eth_getTransactionCount",
    params: [address, "latest"],
    id: 1
  };

  try {
    const res = await axios.post(PHAROS_RPC, body);
    const hexCount = res.data.result;
    return parseInt(hexCount, 16); // Konversi dari hex ke decimal
  } catch (err) {
    console.error("RPC Error:", err.message);
    return 0;
  }
}

// Endpoint API untuk mengecek point berdasarkan wallet address
app.get('/api/points/:address', async (req, res) => {
  const address = req.params.address.toLowerCase();
  const txCount = await getTxCount(address);
  const points = txCount * 1; // 1 tx = 1 poin, bisa kamu ubah logikanya

  res.json({
    address,
    points,
    details: {
      transactions: txCount
    }
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
