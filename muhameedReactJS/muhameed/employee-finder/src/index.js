import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { WishlistProvider } from './context/WishlistContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <WishlistProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </WishlistProvider>
);

