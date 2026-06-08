// notificacionService.js - Capa de comunicación para notificaciones

import { NOTIFICACIONES_MOCK } from "../constants/notificacionesMock"

let notificaciones = [...NOTIFICACIONES_MOCK]

function simularDelay(ms = 400) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export async function getNotificaciones() {
    await simularDelay()
    return [...notificaciones]
}

export async function marcarLeida(id) {
    await simularDelay(200)
    notificaciones = notificaciones.map(n =>
        n.id === id ? { ...n, leida: true } : n
    )
    return notificaciones.find(n => n.id === id)
}

export async function cambiarEstadoAlumno(notificacionId, nuevoEstado) {
    await simularDelay(400)
    notificaciones = notificaciones.map(n =>
        n.id === notificacionId
        ? { ...n, leida: true, alumno: { ...n.alumno, estado: nuevoEstado } }
        : n
    )
    return notificaciones.find(n => n.id === notificacionId)
}
