const ytsearch = require('yt-search');

module.exports = async (req, res) => {
  const videoId = req.query.id;
  if (!videoId) {
    return res.status(400).send('ID video tidak ditemukan');
  }
  try {
    const result = await ytsearch({ videoId });
    res.json(result.related);
  } catch (error) {
    console.error('Error during fetching recommendations:', error);
    res.status(500).send('Error during fetching recommendations');
  }
};
