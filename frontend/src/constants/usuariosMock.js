// usuariosMock.js - usuarios falsos simular BFF mientras no esta conectado con el backend

export const USUARIOS_MOCK = [
    {
        id: 1,
        nombre: 'Admin',
        email: 'admin@sanjoseobrero.ar', 
        password: 'admin123',
        rol: 'ADMIN'
    },

    {
        id: 2,
        nombre: 'Profesor',
        email: 'profesor@sanjoseobrero.ar',
        password: 'profesor123',
        rol: 'PROFESOR'
    },  
]

