// clasesMock.js — Datos falsos para simular clases del sistema

export const CLASES_MOCK = [
    {
        id: 1,
        nombre:     "Natación",
        horario:    "Lunes y Miércoles 9:00 h",
        sede:       "Capilla San José Obrero",
        profesor:   "Ricardo Sosa",
        cupoMax:    15,
        inscriptos: 5,
    },
    {
        id: 2,
        nombre:     "Fútbol juvenil masculino",
        horario:    "Martes y Jueves 17:00 h",
        sede:       "Cancha de Manco",
        profesor:   "Joshua Pérez / Ramón García",
        cupoMax:    20,
        inscriptos: 8,
    },
    {
        id: 3,
        nombre:     "Folklore",
        horario:    "Sábados 10:00 h",
        sede:       "Capilla San José Obrero",
        profesor:   "Virginia López",
        cupoMax:    20,
        inscriptos: 3,
    },
    {
        id: 4,
        nombre:     "Hockey mixto",
        horario:    "Lunes y Viernes 18:00 h",
        sede:       "Capilla San José Obrero",
        profesor:   "Natalia Rodríguez",
        cupoMax:    16,
        inscriptos: 4,
    },
    {
        id: 5,
        nombre:     "Taekwondo",
        horario:    "Miércoles 16:00 h",
        sede:       "Capilla San José Obrero",
        profesor:   "Ayelen Martínez",
        cupoMax:    12,
        inscriptos: 2,
    },
    {
        id: 6,
        nombre:     "Patín",
        horario:    "Sábados 9:00 h",
        sede:       "Capilla San José Obrero",
        profesor:   "Nerina Castillo",
        cupoMax:    10,
        inscriptos: 10,
    },
]

export const ALUMNOS_POR_CLASE_MOCK = {
  1: [
    { id: 1, nombre: "Lucas Rodríguez",  dni: "48.220.101", estado: "CONFIRMADO" },
    { id: 2, nombre: "Martina García",   dni: "49.103.882", estado: "CONFIRMADO" },
    { id: 3, nombre: "Tomás Méndez",     dni: "50.008.441", estado: "CONFIRMADO" },
    { id: 4, nombre: "Valentina Paz",    dni: "51.440.229", estado: "REVISION"   },
    { id: 5, nombre: "Nicolás Torres",   dni: "52.001.334", estado: "CONFIRMADO" },
  ],
  2: [
    { id: 3, nombre: "Tomás Méndez",    dni: "50.008.441", estado: "CONFIRMADO" },
    { id: 7, nombre: "Agustín Herrera", dni: "53.441.002", estado: "PENDIENTE"  },
  ],
  3: [
    { id: 6, nombre: "Sofía Farías",    dni: "49.103.883", estado: "CONFIRMADO" },
    { id: 8, nombre: "Lucía Romero",    dni: "54.002.113", estado: "PENDIENTE"  },
  ],
  4: [
    { id: 2, nombre: "Martina García",  dni: "49.103.882", estado: "CONFIRMADO" },
    { id: 4, nombre: "Valentina Paz",   dni: "51.440.229", estado: "REVISION"   },
  ],
  5: [
    { id: 5, nombre: "Nicolás Torres",  dni: "52.001.334", estado: "CONFIRMADO" },
    { id: 9, nombre: "Mateo Suárez",    dni: "52.334.009", estado: "CONFIRMADO" },
  ],
  6: [
    { id: 1, nombre: "Lucas Rodríguez", dni: "48.220.101", estado: "CONFIRMADO" },
  ],
}