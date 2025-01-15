import { useState, useEffect } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import isAuthenticated from "./Login";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Admin = () => {
    const [formData, setFormData] = useState({
        estado: "",
        tiempoFin: "",
        tiempoInicio: "",
        municipio: { idMunicipio: "" },
        desplazamiento: { idDesplazamiento: "" },
        usuarioCrea: { idusuario: "" },
        vehiculo: { idVehiculo: "" },
        misiones: [{ numeroMision: "" }]
    });

    const [municipios, setMunicipios] = useState([]);
    const [vehiculos, setVehiculos] = useState([]);
    const [desplazamientos, setDesplazamientos] = useState([]);
    const [creadores, setCreadores] = useState([]);
    const [misiones, setMisiones] = useState([]);

    useEffect(() => {
        // Carga los municipios desde el backend
        axios.get("http://localhost:8000/api/v1/municipios")
            .then(response => setMunicipios(response.data))
            .catch(error => console.error("Error al cargar municipios:", error));
    }, []);

    useEffect(() => {
        // Carga los vehiculos desde el backend
        axios.get("http://localhost:8000/api/v1/vehiculos")
            .then(response => setVehiculos(response.data))
            .catch(error => console.error("Error al cargar vehiculos:", error));
    }, []);

    useEffect(() => {
        // Carga los desplazamientos desde el backend
        axios.get("http://localhost:8000/api/v1/desplazamientos")
            .then(response => setDesplazamientos(response.data))
            .catch(error => console.error("Error al cargar desplazamientos:", error));
    }, []);

    useEffect(() => {
        // Carga los creadores desde el backend
        axios.get("http://localhost:8000/api/v1/usuarios")
            .then(response => setCreadores(response.data))
            .catch(error => console.error("Error al cargar creadores:", error));
    }, []);

    useEffect(() => {
        // Carga los creadores desde el backend
        axios.get("http://localhost:8000/api/v1/misiones")
            .then(response => setMisiones(response.data))
            .catch(error => console.error("Error al cargar misiones:", error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isAuthenticated) {
            try {
                console.log(formData);
                const body = {
                    tiempoInicio: formData.tiempoInicio,
                    tiempoFin: formData.tiempoFin,
                    estado: formData.estado,
                    vehiculo: {
                        idVehiculo: formData.vehiculo
                    },
                    usuarioCrea: {
                        idusuario: formData.usuarioCrea
                    },
                    tipoDesplazamiento: {
                        idDesplazamiento: formData.desplazamiento
                    },
                    municipio: {
                        idMunicipio: formData.municipio
                    },
                    misiones: [{ numeroMision: formData.misiones }]
                }

                console.log(body);
                const response = await fetch("http://localhost:8000/api/v1/viajes", {
                    method: "POST",
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                    
                });
                if (response.ok) {
                    toast.success("Agendamiento guardado exitosamente.");
                    // Opcional: reiniciar el formulario
                    setFormData({
                        estado: "",
                        tiempoFin: "",
                        tiempoInicio: "",
                        municipio: { idMunicipio: "" },
                        desplazamiento: { idDesplazamiento: "" },
                        usuarioCrea: { idusuario: "" },
                        vehiculo: { idVehiculo: "" },
                        misiones: [{ numeroMision: "" }]

                    });
                } else {
                    toast.error("Error al guardar el agendamiento.");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };



    return (
        <>
            <ToastContainer
                position="top-center"  // Esto centra el toast en la parte inferior
                autoClose={3000}          // Cierra automáticamente después de 3 segundos
                hideProgressBar={false}    // Muestra la barra de progreso
                newestOnTop={false}        // Las notificaciones no se apilan con la más nueva arriba
                closeOnClick               // Cierra cuando haces clic en la notificación
                rtl={false}                // No usa el modo RTL (de derecha a izquierda)
                pauseOnFocusLoss           // Pausa cuando se pierde el foco
                draggable                  // Permite arrastrar la notificación
                pauseOnHover
            />
            {isAuthenticated ? (
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                        <div>
                            <label>Estado</label>
                            <input
                                type="text"
                                name="estado"
                                value={formData.estado}
                                onChange={handleChange}
                                className="w-full rounded-[5px] shadow-xl"
                            />
                        </div>

                        <div>
                            <label>Fecha Inicio</label>
                            <input
                                type="datetime-local"
                                name="tiempoInicio"
                                value={formData.tiempoInicio}
                                onChange={handleChange}
                                className="w-full rounded-[5px] shadow-xl"
                            />
                        </div>
                        <div>
                            <label>Fecha Fin</label>
                            <input
                                type="datetime-local"
                                name="tiempoFin"
                                value={formData.tiempoFin}
                                onChange={handleChange}
                                className="w-full rounded-[5px] shadow-xl"
                            />
                        </div>
                        <div>
                            <label>Municipio</label>
                            <select
                                name="municipio"
                                value={formData.municipio}
                                onChange={handleChange}
                                className="w-full rounded-[5px] text-black shadow-xl"
                                id="id_municipio"
                            >
                                <option value="">Seleccione un municipio</option>
                                {municipios.map((municipio) => (
                                    <option key={municipio.idMunicipio} value={municipio.idMunicipio}>
                                        {municipio.nombreMunicipio}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Tipo Desplazamiento</label>
                            <select
                                name="desplazamiento"
                                value={formData.desplazamiento}
                                onChange={handleChange}
                                className="w-full rounded-[5px] text-black shadow-xl"
                                id="id_desplazamiento"
                            >
                                <option value="">Seleccione un tipo de desplazamiento</option>
                                {desplazamientos.map((desplazamiento) => (
                                    <option key={desplazamiento.idDesplazamiento} value={desplazamiento.idDesplazamiento}>
                                        {desplazamiento.descripcion}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Creador</label>
                            <select
                                name="usuarioCrea"
                                value={formData.usuarioCrea}
                                onChange={handleChange}
                                className="w-full rounded-[5px] text-black shadow-xl"
                                id="idusuario"
                            >
                                <option value="">Seleccione un creador</option>
                                {creadores.map((creador) => (
                                    <option key={creador.idusuario} value={creador.idusuario}>
                                        {creador.nombreUsuario}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Vehículo</label>
                            <select
                                name="vehiculo"
                                value={formData.vehiculo}
                                onChange={handleChange}
                                className="w-full rounded-[5px] text-black shadow-xl"
                                id="id_vehiculo"
                            >
                                <option value="">Seleccione un vehículo</option>
                                {vehiculos.map((vehiculo) => (
                                    <option key={vehiculo.idVehiculo} value={vehiculo.idVehiculo}>
                                        {vehiculo.placa}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label>Misión</label>
                            <select
                                name="misiones"
                                value={formData.misiones}
                                onChange={handleChange}
                                className="w-full rounded-[5px] text-black shadow-xl"
                                id="numero_mision"
                            >
                                <option value="">Seleccione una misión</option>
                                {misiones.map((mision) => (
                                    <option key={mision.numeroMision} value={mision.numeroMision}>
                                        {mision.nombreMision}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="sm:col-span-4 lg:col-span-3 flex justify-center mt-6">
                            <button
                                type="submit"
                                className={`bg-kingBlue text-white w-full max-w-xs py-2.5 rounded-lg shadow-md hover:bg-blue-600 focus:bg-blue-700 transition duration-200 flex items-center justify-center ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                disabled={!isAuthenticated}
                            >
                                <FaRegCheckCircle className="mr-2" />
                                Guardar
                            </button>
                        </div>
                    </div>
                </form>
            ) : null}
        </>
    );
};

export default Admin;
