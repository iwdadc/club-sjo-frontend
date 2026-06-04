// asistenciaService.js - capa de comunicacion para la asistencia

import { ACTIVIDADES_PROFESOR_MOCK, ALUMNOS_MOCK } from "../constants/asistenciaMock";

function simularDelay(ms = 600) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function getActividadesProfesor() {
    await simularDelay()
    return ACTIVIDADES_PROFESOR_MOCK
}

export async function getAlumnosPorActividad(idActividad) {
    await simularDelay(400)
    return ALUMNOS_MOCK.filter((a) => a.idActividad === idActividad)
}

export async function guardarAsistencia(idActividad, fecha, asistencias) {
    await simularDelay(500)
    console.log('Asistencia guardada:', { idActividad, fecha, asistencias })
    return { ok: true }
}