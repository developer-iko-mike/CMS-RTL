import React from 'react';
import ReactDOM from 'react-dom/client';
import './AllRoute_Components/index.css';
import './AllRoute_Components/MyBootsrap.css'
import './AllRoute_Components/fontBootstarp.css'
import 'react-toastify/dist/ReactToastify.css';
import App from './Pages/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

// cd f/B-VSCode/project/CMS-RTL-app
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
