import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/auth';
import Routes from './routes';
import 'antd/dist/antd.min.css';

export default function App() {
  return (
    <main className="app">
      <div className="background" />
      <AuthProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AuthProvider>
    </main>
  );
}
