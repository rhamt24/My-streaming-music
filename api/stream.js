const ytdl = require('ytdl-core');

module.exports = (req, res) => {
  const videoId = req.query.id;
  if (!videoId) {
    return res.status(400).send('ID video tidak ditemukan');
  }
  try {
    const stream = ytdl(videoId, { filter: 'audioonly' });
    stream.pipe(res);
  } catch (error) {
    console.error('Error during streaming:', error);
    res.status(500).send('Error during streaming');
  }
};
