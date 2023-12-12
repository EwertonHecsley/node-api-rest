import 'dotenv/config';
import axios from 'axios';

const instanciaAxios = axios.create({
    baseURL: process.env.BREVO_URL_EMAIL,
    headers: {
        'Accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY_EMAIL,
        'Content-Type': 'application/json',
    }
});

export default instanciaAxios;

