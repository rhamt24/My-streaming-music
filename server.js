const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/api/search', async (req, res) => {
  console.log('Search query received:', req.query.q);
  // kode search...
});

app.get('/api/stream', (req, res) => {
  console.log('Stream request received for video ID:', req.query.id);
  // kode stream...
});

app.get('/api/recommendations', async (req, res) => {
  console.log('Recommendations request received for video ID:', req.query.id);
  // kode recommendations...
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
