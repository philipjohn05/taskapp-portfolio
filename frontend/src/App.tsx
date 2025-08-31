import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    // Test API connection
    const testAPI = async () => {
      try {
        const response = await fetch('http://localhost:7071/api/health');
        const data = await response.json();
        setStatus(`API Connected: ${data.status}`);
      } catch (error) {
        setStatus(`API Error: ${error.message}`);
      }
    };
    
    testAPI();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8 px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            TaskApp Portfolio
          </h1>
          <p className="text-lg text-gray-600">
            Azure Functions + React Task Management
          </p>
        </header>

        <div className="max-w-md mx-auto">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              System Status
            </h2>
            <p>{status}</p>
            <div className="mt-4">
              <p>✅ Frontend: Running on port 5173</p>
              <p>✅ Backend: Running on port 7071</p>
              <p>✅ Vite + React + TypeScript</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
