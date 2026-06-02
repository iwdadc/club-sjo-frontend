// AuthContext.jsx  - Manejo global del estado de autenticación

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider ({ children }) {
    const [usuario, setUsuario] = useState(null)
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        const sesionGuardada = localStorage.getItem('sesion-sjo')
        if (sesionGuardada) {
        setUsuario(JSON.parse(sesionGuardada))
        }
        setCargando(false)
    },[])

function login(datosUsuario) {
    setUsuario(datosUsuario)
    localStorage.setItem('sesion-sjo', JSON.stringify(datosUsuario))
    }

function logout() {
    setUsuario(null)
    localStorage.removeItem('sesion-sjo')
    }

const valor = {
    usuario,
    cargando,
    login,
    logout,
    estaLogueado: !!usuario,
    esAdmin: usuario?.rol === 'ADMIN',
    esProfesor: usuario?.rol === 'PROFESOR'
    }

    return (
        <AuthContext.Provider value={valor}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}   