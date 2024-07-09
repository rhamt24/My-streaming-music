const express = require('express');
const router = express.Router();
const axios = require('axios');

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

async function spotifyCreds() {
  const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'),
    },
  });
  return tokenResponse.data.access_token;
}

router.get('/search', async (req, res) => {
  try {
    const token = await spotifyCreds();
    const response = await axios.get(`https://api.spotify.com/v1/search?q=${req.query.query}&type=track`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    res.json(response.data.tracks.items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/recommendations', async (req, res) => {
  try {
    const token = await spotifyCreds();
    const response = await axios.get(`https://api.spotify.com/v1/recommendations?seed_tracks=${req.query.seed_tracks}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    res.json(response.data.tracks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
