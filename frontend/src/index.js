import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

if (process.env.NODE_ENV === 'production') {
  const reportWebVitals = require('./reportWebVitals').default;
  reportWebVitals(console.log);
}
