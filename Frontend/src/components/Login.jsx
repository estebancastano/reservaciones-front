import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(null); // null para estado inicial de carga
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', {
                nombre_usuario: username,
                password
            });

            // Guardar el token en localStorage
            localStorage.setItem('token', response.data.token);
            toast.success('Inicio de sesión exitoso');
            
            // Actualizar el estado de autenticación
            setIsAuthenticated(true);
            
            // Redirigir al admin
            navigate('/admin');
        } catch (error) {
            toast.error(`Error en el inicio de sesión: ${error.response ? error.response.data : error.message}`);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Valor del token:', token);
        
        // Verificar si existe el token
        if (token) {
            setIsAuthenticated(true); // Usuario autenticado
            
        } else {
            setIsAuthenticated(false);  // Usuario no autenticado
            navigate('/login');  // Redirige al login si no hay token
        }
    }, [navigate]);
console.log('este es mi estado', isAuthenticated);
    // Mientras se verifica la autenticación
    if (isAuthenticated === null) {
        return <div>Cargando...</div>;
    }
    return (
        <>
            <ToastContainer
                position="bottom-center"  // Esto centra el toast en la parte inferior
                autoClose={2000}          // Cierra automáticamente después de 3 segundos
                hideProgressBar={false}    // Muestra la barra de progreso
                newestOnTop={false}        // Las notificaciones no se apilan con la más nueva arriba
                closeOnClick               // Cierra cuando haces clic en la notificación
                rtl={false}                // No usa el modo RTL (de derecha a izquierda)
                pauseOnFocusLoss           // Pausa cuando se pierde el foco
                draggable                  // Permite arrastrar la notificación
                pauseOnHover
            />
            <div className="bg-gray-100 flex flex-col justify-center sm:py-28 mt-5">
                <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                    <h1 className="font-bold text-center text-2xl mb-10 text-black">Inicio de sesión</h1>
                    <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                        <div className="px-5 py-7">
                            <form onSubmit={handleSubmit}>
                                <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="username">Usuario</label>
                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                    required
                                />
                                <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="password">Contraseña</label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="transition duration-200 bg-kingBlue hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                                >
                                    <span className="inline-block mr-2">Iniciar sesión</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>);
};

export default Login;

