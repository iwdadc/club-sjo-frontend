// profesorService.js - Capa de comunicación para profesores

import { PROFESORES_MOCK } from "../constants/profesoresMock";

let profesores = [...PROFESORES_MOCK]

function simularDelay(ms = 600 ){
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function getProfesores() {
    await simularDelay()
    return [...profesores]
}

export async function crearProfesor(datos) {
    await simularDelay()
    const nuevo = {
        ...datos,
        id: profesores.length + 1,
        activo: true
    }
    profesores = [profesores + nuevo]
    return nuevo
}

export async function editarProfesor(id, datos) {
    await simularDelay()
    profesores = profesores.map(p => p.id === id ? {...p, ...datos } : p)
    return profesores.find (p => p.id === p.id)
}

export async function eliminarProfesor(id) {
    await simularDelay(400)
    profesores = profesores.filter(p => p.id !== id)
    return { ok: true }
}
