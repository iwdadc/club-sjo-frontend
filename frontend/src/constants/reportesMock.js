// reportesMock.js
import { IconCalendarCheck, IconUsers, IconChalkboard, IconFileReport } from "@tabler/icons-react"

export const REPORTES = [
    {
        id:          1,
        titulo:      "Asistencia por clase",
        descripcion: "Listado completo de asistencia agrupado por actividad",
        icono:       IconCalendarCheck,
        color:       "bg-[#E6F1FB] text-[#1E3A8A]",
        borde:       "bg-[#1E3A8A]",
    },
    {
        id:          2,
        titulo:      "Asistencia por profesor",
        descripcion: "Porcentaje de asistencia y clases dictadas por profesor",
        icono:       IconUsers,
        color:       "bg-green-50 text-green-600",
        borde:       "bg-green-500",
    },
    {
        id:          3,
        titulo:      "Listado de alumnos",
        descripcion: "Todos los alumnos inscriptos con su información completa",
        icono:       IconChalkboard,
        color:       "bg-amber-50 text-amber-600",
        borde:       "bg-amber-500",
    },
    {
        id:          4,
        titulo:      "Inscripciones por actividad",
        descripcion: "Cantidad de inscriptos y cupos disponibles por actividad",
        icono:       IconFileReport,
        color:       "bg-purple-50 text-purple-600",
        borde:       "bg-purple-500",
    },
]