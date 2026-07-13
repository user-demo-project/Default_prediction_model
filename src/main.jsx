import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { DemoProvider } from './context/DemoContext';
import App from './app/App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <DemoProvider>
      <App />
    </DemoProvider>
  </HashRouter>
);
