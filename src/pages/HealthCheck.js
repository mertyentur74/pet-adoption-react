import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import './HealthCheck.css';

const HealthCheck = () => {
  const [status, setStatus] = useState('checking');
  const [backendUrl, setBackendUrl] = useState('');

  useEffect(() => {
    checkBackend();
  }, []);

  const checkBackend = async () => {
    const url = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
    setBackendUrl(url);
    
    try {
      const response = await api.get('/health');
      if (response.data.status === 'OK') {
        setStatus('connected');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Health check failed:', error);
      setStatus('disconnected');
    }
  };

  return (
    <div className="health-check-page">
      <div className="container">
        <div className="health-card">
          <h1>Backend Connection Status</h1>
          
          <div className="backend-url">
            <strong>Backend URL:</strong> {backendUrl}
          </div>

          {status === 'checking' && (
            <div className="status-checking">
              <div className="spinner"></div>
              <p>Checking connection...</p>
            </div>
          )}

          {status === 'connected' && (
            <div className="status-success">
              <div className="status-icon">✓</div>
              <h2>Connected!</h2>
              <p>Backend is running and responding correctly.</p>
              <p>You can now use Login, Signup, and Browse Pets features.</p>
            </div>
          )}

          {status === 'disconnected' && (
            <div className="status-error">
              <div className="status-icon">✕</div>
              <h2>Connection Failed</h2>
              <p>Unable to connect to the backend server.</p>
              
              <div className="troubleshooting">
                <h3>Possible Issues:</h3>
                <ul>
                  <li>Backend server is not running on Render</li>
                  <li>Cold start delay (Render free tier - wait 30-60 seconds)</li>
                  <li>CORS not configured correctly</li>
                  <li>Network connection issues</li>
                </ul>
                
                <h3>Solutions:</h3>
                <ul>
                  <li>Visit <a href={backendUrl.replace('/api', '/api/health')} target="_blank" rel="noopener noreferrer">backend health check</a> to wake it up</li>
                  <li>Wait 60 seconds and try again</li>
                  <li>Check Render dashboard to ensure backend is deployed</li>
                  <li>Verify FRONTEND_URL in Render environment variables</li>
                </ul>
              </div>

              <button onClick={checkBackend} className="btn btn-primary">
                Try Again
              </button>
            </div>
          )}

          {status === 'error' && (
            <div className="status-warning">
              <div className="status-icon">!</div>
              <h2>Unexpected Response</h2>
              <p>Backend responded but with an unexpected format.</p>
              <button onClick={checkBackend} className="btn btn-primary">
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthCheck;
