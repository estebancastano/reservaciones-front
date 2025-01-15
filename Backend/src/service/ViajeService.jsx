
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
},

    deleteViaje = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error al eliminar el viaje:", error);
            throw error; // Esto permitirá que el componente muestre el error en caso de fallo
        }
    },
    
    updateViaje = async (id, viajeData) => {
        try {
            console.log(viajeData);
            const response = await axios.put(`http://localhost:8000/api/v1/viajes/${id}`, viajeData);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar el viaje:", error);
            throw error;
        }
    };


export default {
    getViajes, deleteViaje, updateViaje
};
