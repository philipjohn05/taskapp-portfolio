import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [status, setStatus] = useState('Loading...');
  // Use the deployed Azure Functions URL instead of localhost
  const [apiUrl] = useState('https://func-taskapp-72728.azurewebsites.net/api');

  useEffect(() => {
    const testAPI = async () => {
      try {
        console.log('Testing API at:', apiUrl);
        const response = await fetch(`${apiUrl}/health`);
        console.log('API Response:', response.status);
        const data = await response.json();
        console.log('API Data:', data);
        setStatus(`✅ API Connected: ${data.status} at ${new Date().toLocaleTimeString()}`);
      } catch (error) {
        console.error('API Error:', error);
        setStatus(`❌ API Error: ${(error as Error).message}`);
      }
    };
    
    testAPI();
  }, [apiUrl]);

  return (
    <div className="min-h-screen bg-gray-50" style={{padding: '2rem'}}>
      <div className="container">
        <header style={{textAlign: 'center', marginBottom: '2rem'}}>
          <h1 style={{fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937'}}>
            TaskApp Portfolio
          </h1>
          <p style={{fontSize: '1.2rem', color: '#6b7280'}}>
            Azure Functions + React Task Management
          </p>
        </header>

        <div style={{maxWidth: '600px', margin: '0 auto'}}>
          <div className="card">
            <h2 style={{fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem'}}>
              🚀 Production Deployment Status
            </h2>
            <div style={{marginBottom: '1rem'}}>
              <p><strong>Status:</strong> {status}</p>
              <p><strong>Environment:</strong> Production</p>
              <p><strong>Frontend:</strong> Azure Static Web Apps</p>
              <p><strong>Backend:</strong> {apiUrl}</p>
              <p><strong>Database:</strong> Azure SQL Database</p>
            </div>
            
            <div style={{marginTop: '1rem', padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '0.5rem'}}>
              <h3 style={{marginBottom: '0.5rem'}}>✅ Production Architecture:</h3>
              <ul style={{margin: 0, paddingLeft: '1.5rem'}}>
                <li>Frontend: Azure Static Web Apps (Global CDN)</li>
                <li>Backend: Azure Functions (Serverless)</li>
                <li>Database: Azure SQL Database (Managed)</li>
                <li>CI/CD: GitHub Actions</li>
                <li>Region: Australia Southeast & East Asia</li>
              </ul>
            </div>

            <button 
              onClick={() => window.location.reload()} 
              style={{
                marginTop: '1rem',
                width: '100%',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              Test API Connection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
