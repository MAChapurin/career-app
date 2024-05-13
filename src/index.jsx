import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './components/App/App';
// Импортируем сначала глобальные стили, иначе они будут приоритетнее модульных

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
