const ytdl = require('ytdl-core');

module.exports = (req, res) => {
  const videoId = req.query.id;
  if (!videoId) {
    return res.status(400).send('ID video tidak ditemukan');
  }
  const stream = ytdl(videoId, { filter: 'audioonly' });
  stream.pipe(res);
};
