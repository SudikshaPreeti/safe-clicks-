// client/src/App.jsx
import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    if (!url) return;
    
    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post('http://localhost:3000/scan', { url });
      setResult(response.data);
    } catch (error) {
      console.error("Error scanning URL", error);
      alert("Failed to scan. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>
        <span role="img" aria-label="shield">🛡️</span> Safe Clicks
      </h1>
      <p className="subtitle">Detect unsafe or phishing URLs instantly.</p>

      <div className="input-group">
        <input 
          type="text" 
          placeholder="Paste a link here (e.g., secure-login-update.com)" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleScan()}
        />
        <button onClick={handleScan} disabled={loading || !url}>
          {loading ? <div className="spinner"></div> : 'Check Safety'}
        </button>
      </div>

      {result && (
        <div className={`result-card ${result.status.toLowerCase()}`}>
          <div className="result-header">
            <h2>Status: {result.status}</h2>
            <div className="score-badge">Risk Score: {result.score}/100</div>
          </div>
          
          <div className="score-bar">
            <div className="fill" style={{ width: `${result.score}%` }}></div>
          </div>
          
          <h3>Risk Indicators</h3>
          <ul>
            {result.reasons.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;