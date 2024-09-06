import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ToastContainer } from 'react-toastify'; // Importa ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importa el CSS para las notificaciones

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <ToastContainer /> {/* Agrega ToastContainer */}
  </React.StrictMode>,
);
