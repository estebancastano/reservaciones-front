import { createContext, useContext, useState } from 'react';

// Contexto de autenticación
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación

    const login = () => setIsAuthenticated(true);  // Función para iniciar sesión
    const logout = () => setIsAuthenticated(false); // Función para cerrar sesión

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);
