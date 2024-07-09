const ytsearch = require('yt-search');

module.exports = async (req, res) => {
  const videoId = req.query.id;
  if (!videoId) {
    return res.status(400).send('ID video tidak ditemukan');
  }
  const result = await ytsearch({ videoId });
  res.json(result.related);
};
