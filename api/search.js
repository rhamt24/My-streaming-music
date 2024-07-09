const ytsearch = require('yt-search');

module.exports = async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).send('Query tidak ditemukan');
  }
  const result = await ytsearch(query);
  res.json(result.videos);
};
