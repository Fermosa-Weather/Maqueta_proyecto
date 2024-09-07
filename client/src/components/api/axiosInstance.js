// src/api/axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Cambia esto si el backend está en otro puerto o dominio
});

export default instance;