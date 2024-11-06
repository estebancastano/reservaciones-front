
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/viajes';

const getViajes = async () => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data; // Retorna los datos de la respuesta
    } catch (error) {
        console.error('Error al obtener los viajes:', error);
        throw error; // Propaga el error para manejarlo en el componente
    }
};

export default {
    getViajes,
};
