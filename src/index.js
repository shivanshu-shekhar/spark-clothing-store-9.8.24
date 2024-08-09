import 'bootstrap/dist/css/bootstrap.css'; // importing the bootstrap here from the create-react-app.dev.
import 'bootstrap/dist/js/bootstrap.bundle';//we imported this js part of bootstrap
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 //<React.StrictMode>
    <App />
 //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
