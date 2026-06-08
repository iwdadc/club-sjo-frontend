// claseService.js - Capa de comunicación para clases

import { CLASES_MOCK, ALUMNOS_POR_CLASE_MOCK } from '../constants/clasesMock'


let clases = [...CLASES_MOCK]

function simularDelay(ms = 600) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function getClases() {
    await simularDelay()
    return [...clases]
}

export async function editarClase(id, datos) {
    await simularDelay(400)
    clases = clases.map(c => c.id === id ? { ...c, ...datos } : c)
    return clases.find(c => c.id === id)
}

export async function getAlumnosPorClase(idClase) {
  await simularDelay(300)
  return ALUMNOS_POR_CLASE_MOCK[idClase] || []
}