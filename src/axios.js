import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api', // Cambia esto si tu backend corre en una URL diferente
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance;
