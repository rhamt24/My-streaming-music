const ytsearch = require('yt-search');

module.exports = async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).send('Query tidak ditemukan');
  }
  try {
    const result = await ytsearch(query);
    res.json(result.videos);
  } catch (error) {
    console.error('Error during search:', error);
    res.status(500).send('Error during search');
  }
};
