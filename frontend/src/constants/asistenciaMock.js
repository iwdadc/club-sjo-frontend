// asistenciaMock.js - Datos falsos par asimular la vist del profesor

export const ACTIVIDADES_PROFESOR_MOCK = [
    { id: 1, nombre: "Natación", horario: "Lunes / Miércoles 9:00 h" },
    { id: 2, nombre: "Folklore", horario: "Sábados 10:00 h" },
]

export const ALUMNOS_MOCK = [
    { id: 1, nombre: "Lucas Rodríguez",  dni: "48.220.101", idActividad: 1 },
    { id: 2, nombre: "Martina García",   dni: "49.103.882", idActividad: 1 },
    { id: 3, nombre: "Tomás Méndez",     dni: "50.008.441", idActividad: 1 },
    { id: 4, nombre: "Valentina Paz",    dni: "51.440.229", idActividad: 1 },
    { id: 5, nombre: "Nicolás Torres",   dni: "52.001.334", idActividad: 1 },
    { id: 6, nombre: "Sofía Farías",     dni: "49.103.883", idActividad: 2 },
    { id: 7, nombre: "Ramiro Castillo",  dni: "53.220.445", idActividad: 2 },
    { id: 8, nombre: "Camila Ríos",      dni: "50.334.112", idActividad: 2 },
]

export const ASISTENCIA_POR_ALUMNO_MOCK = [
    { idAlumno: 1, totalClases: 8, asistidas: 7 },
    { idAlumno: 2, totalClases: 8, asistidas: 4 },
    { idAlumno: 3, totalClases: 6, asistidas: 6 },
    { idAlumno: 4, totalClases: 6, asistidas: 2 },
    { idAlumno: 5, totalClases: 5, asistidas: 5 },
    { idAlumno: 6, totalClases: 4, asistidas: 3 },
]