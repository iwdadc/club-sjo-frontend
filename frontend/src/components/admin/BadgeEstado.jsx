// BadgeEstado.jsx - Componente reutilizable para mostrar el estado de una inscripción

const ESTILOS = {
    CONFIRMADO: "bg-[#E6F1FB] text-[#0C447C]",
    PENDIENTE:  "bg-amber-50 text-amber-700",
    REVISION: "bg-gray-100 text-gray-500",
}

const ETIQUETAS = {
    CONFIRMADO: "Confirmado",
    PENDIENTE: "Pendiente",
    REVISION: "En revisión",
}
    
function BadgeEstado({ estado }) {
    return (
        <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${ESTILOS[estado] || ESTILOS.REVISION}`}>
            {ETIQUETAS[estado] || estado}
        </span>
    )
}

export default BadgeEstado