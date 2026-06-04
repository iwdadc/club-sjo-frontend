// inscripcionService.js - capa de comunicación con el backend para las inscripciones

import { INSCRIPCIONES_MOCK, STATS_MOCK } from '../constants/inscripcionesMock';

function simularDelay(ms = 600) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getInscripciones() {
    await simularDelay();
    return INSCRIPCIONES_MOCK;
}

export async function getStats() {
    await simularDelay();
    return STATS_MOCK;
}

export async function actualizarEstado(id, nuevoEstado) {
    await simularDelay(400)
    return { id, estado: nuevoEstado }
}