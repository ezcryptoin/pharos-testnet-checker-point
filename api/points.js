export default async function handler(req, res) {
  const { address } = req.query;

  const endpoint = `https://api.pharosnetwork.xyz/user/activity?address=${address}`;

  try {
    const apiRes = await fetch(endpoint);
    const data = await apiRes.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from upstream' });
  }
}
