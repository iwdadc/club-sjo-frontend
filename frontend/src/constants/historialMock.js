// historialMock.js

export const HISTORIAL_MOCK = [
    {
        id: 1,
        clase:    "Natación",
        profesor: "Ricardo Sosa",
        fecha:    "04/06/2026",
        presentes: 4,
        ausentes:  1,
        total:     5,
        detalle: [
            { nombre: "Lucas Rodríguez",  presente: true  },
            { nombre: "Martina García",   presente: false },
            { nombre: "Tomás Méndez",     presente: true  },
            { nombre: "Valentina Paz",    presente: true  },
            { nombre: "Nicolás Torres",   presente: true  },
        ]
    },
    {
        id: 2,
        clase:    "Folklore",
        profesor: "Virginia López",
        fecha:    "04/06/2026",
        presentes: 3,
        ausentes:  0,
        total:     3,
        detalle: [
            { nombre: "Sofía Farías",    presente: true },
            { nombre: "Ramiro Castillo", presente: true },
            { nombre: "Camila Ríos",     presente: true },
        ]
    },
    {
        id: 3,
        clase:    "Natación",
        profesor: "Ricardo Sosa",
        fecha:    "02/06/2026",
        presentes: 3,
        ausentes:  2,
        total:     5,
        detalle: [
            { nombre: "Lucas Rodríguez",  presente: true  },
            { nombre: "Martina García",   presente: true  },
            { nombre: "Tomás Méndez",     presente: false },
            { nombre: "Valentina Paz",    presente: false },
            { nombre: "Nicolás Torres",   presente: true  },
        ]
    },
    {
        id: 4,
        clase:    "Taekwondo",
        profesor: "Ayelen Martínez",
        fecha:    "03/06/2026",
        presentes: 2,
        ausentes:  0,
        total:     2,
        detalle: [
            { nombre: "Nicolás Torres",  presente: true },
            { nombre: "Lucas Rodríguez", presente: true },
        ]
    },
]