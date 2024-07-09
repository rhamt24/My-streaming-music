import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const searchMusic = async () => {
    const response = await axios.get(`/api/search?query=${query}`);
    setTracks(response.data);
  };

  const getRecommendations = async (seedTrack) => {
    const response = await axios.get(`/api/recommendations?seed_tracks=${seedTrack}`);
    setRecommendations(response.data);
  };

  return (
    <div className="App">
      <h1>Music Streaming App</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for music..."
      />
      <button onClick={searchMusic}>Search</button>
      <div className="results">
        {tracks.map((track) => (
          <div key={track.id} className="track">
            <p>{track.artists[0].name} - {track.name}</p>
            <audio controls src={track.preview_url}></audio>
            <button onClick={() => getRecommendations(track.id)}>Get Recommendations</button>
          </div>
        ))}
      </div>
      <div className="recommendations">
        <h2>Recommendations</h2>
        {recommendations.map((track) => (
          <div key={track.id} className="track">
            <p>{track.artists[0].name} - {track.name}</p>
            <audio controls src={track.preview_url}></audio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
