/*
  The code sets up the React app to render the <App /> component to the DOM element with an ID of 'root'.
  It also includes the necessary CSS files for the app and enables strict mode to detect potential issues in the code.
*/

// Import the required libraries/modules
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

// Create a new root using ReactDOM.createRoot, which returns a root object
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component wrapped in React.StrictMode to the root object
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

