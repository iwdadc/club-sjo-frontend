// authService.js capa de comunicación con el backend para la autenticación

import {USUARIOS_MOCK} from '../constants/usuariosMock';

function simularDelay(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function loginService({email, password}) {
  await simularDelay(); // Simula un retraso en la respuesta del servidor
    const usuario = USUARIOS_MOCK.find(u => u.email === email && u.password === password);
    console.log(usuario);
    if (!usuario) {
        throw new Error("Email o contraseña incorrectos");
    }

    const {password: _, ...usuarioSinPassword} = usuario; // Elimina la contraseña del objeto de usuario
    return usuarioSinPassword; // Devuelve el usuario sin la contraseña
}

export async function logout() {
    await simularDelay(); // Simula un retraso en la respuesta del servidor
    return true; // Simula un logout exitoso
}

