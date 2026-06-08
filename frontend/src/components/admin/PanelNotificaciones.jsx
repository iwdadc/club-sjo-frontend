// PanelNotificaciones.jsx - Panel lateral de notificaciones del admin

import { useState, useEffect } from 'react'

import { IconX, IconCheck, IconClock, IconUser, IconRun, IconMapPin, IconPhone, IconAlertCircle } from '@tabler/icons-react'

import { getNotificaciones, marcarLeida, cambiarEstadoAlumno } from '../../services/notificacionService'

import BadgeEstado from './BadgeEstado'

// Ficha resumida del alumno dentro de la notificación
function FichaResumida({ alumno }) {
    return (
    <div className="bg-white border border-gray-200 rounded-xl p-3 flex flex-col gap-2 text-xs">
        <div className="flex items-center gap-2">
            <IconUser size={12} className="text-gray-400 flex-shrink-0" />
            <span className="text-gray-600">DNI {alumno.dni} · {alumno.edad} años · {alumno.genero}</span>
        </div>
        <div className="flex items-center gap-2">
            <IconRun size={12} className="text-gray-400 flex-shrink-0" />
            <span className="text-gray-600">{alumno.actividad}</span>
        </div>
        <div className="flex items-center gap-2">
            <IconMapPin size={12} className="text-gray-400 flex-shrink-0" />
            <span className="text-gray-600">{alumno.sede}</span>
        </div>
        <div className="flex items-center gap-2">
            <IconPhone size={12} className="text-gray-400 flex-shrink-0" />
            <span className="text-gray-600">{alumno.nombreAdulto} · {alumno.telefonoAdulto}</span>
        </div>
        {alumno.alergias === 'si' && (
            <div className="flex items-center gap-2 text-amber-600">
                <IconAlertCircle size={12} className="flex-shrink-0" />
                <span>Tiene alergias</span>
            </div>
        )}
        {alumno.medicacion === 'si' && (
            <div className="flex items-center gap-2 text-amber-600">
            <IconAlertCircle size={12} className="flex-shrink-0" />
            <span>Toma medicación</span>
            </div>
        )}
        </div>
    )
    }
    
    function PanelNotificaciones({ onCerrar, onActualizarContador }) {
    const [notificaciones, setNotificaciones] = useState([])
    const [cargando,       setCargando]       = useState(true)
    const [expandidoId,    setExpandidoId]    = useState(null)
    const [procesando,     setProcesando]     = useState(null)

    useEffect(() => {
        async function cargar() {
        const data = await getNotificaciones()
        setNotificaciones(data)
        setCargando(false)
        }
        cargar()
    }, [])

    // Expande una notificación y la marca como leída
    async function handleExpandir(notif) {
        if (expandidoId === notif.id) {
        setExpandidoId(null)
        return
        }
        setExpandidoId(notif.id)
        if (!notif.leida) {
        await marcarLeida(notif.id)
        setNotificaciones(prev =>
            prev.map(n => n.id === notif.id ? { ...n, leida: true } : n)
        )
        onActualizarContador()
        }
    }

    // Confirmar o poner en pendiente
    async function handleCambiarEstado(notifId, estado) {
        setProcesando(notifId)
        const actualizada = await cambiarEstadoAlumno(notifId, estado)
        setNotificaciones(prev =>
        prev.map(n => n.id === notifId ? actualizada : n)
        )
        setProcesando(null)
    }

    const noLeidas = notificaciones.filter(n => !n.leida).length

    return (
        <div className="fixed inset-0 z-50 flex justify-end">

        {/* Overlay */}
        <div
            className="flex-1 bg-black/30"
            onClick={onCerrar}
        />

        {/* Panel */}
        <div className="w-full max-w-md bg-white shadow-2xl border-l border-gray-200 flex flex-col h-full overflow-hidden">

            {/* Header */}
            <div className="bg-gradient-to-r from-[#1E3A8A] to-[#476892] px-5 py-4 flex justify-between items-center flex-shrink-0">
            <div>
                <h3 className="text-white font-medium text-sm">Notificaciones</h3>
                <div className="flex items-center gap-2 mt-1">
                    <div className={`w-2 h-2 rounded-full ${
                        noLeidas > 0 ? 'bg-amber-400' : 'bg-green-400'
                        }`} />
                        <p className="text-[#B5D4F4] text-xs">
                            {noLeidas > 0 ? `${noLeidas} sin revisar` : 'Todo al día'}
                        </p>
                    </div>
                </div>
            <button onClick={onCerrar} className="text-white/60 hover:text-white">
                <IconX size={18} />
            </button>
            </div>

            {/* Lista */}
            <div className="flex-1 overflow-y-auto">
            {cargando && (
                <p className="text-sm text-gray-400 text-center py-8">Cargando...</p>
            )}

            {!cargando && notificaciones.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-8">
                No hay notificaciones
                </p>
            )}

            {!cargando && notificaciones.map(notif => (
                <div
                key={notif.id}
                className={`border-b border-gray-100 ${!notif.leida ? 'bg-[#F0F6FF]' : 'bg-white'}`}
                >
                {/* Fila principal */}
                <button
                    onClick={() => handleExpandir(notif)}
                    className="w-full flex items-start gap-3 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                >
                    {/* Punto no leída */}
                    <div className="mt-1 flex-shrink-0">
                    {!notif.leida
                        ? <div className="w-2 h-2 rounded-full bg-[#1E3A8A]"></div>
                        : <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                    }
                    </div>

                    <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                        <p className={`text-sm truncate ${!notif.leida ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                        {notif.alumno.nombreApellido}
                        </p>
                        <BadgeEstado estado={notif.alumno.estado} />
                    </div>
                    <p className="text-xs text-gray-400">
                        Nueva inscripción · {notif.fecha}
                    </p>
                    </div>
                </button>

                {/* Detalle expandido */}
                {expandidoId === notif.id && (
                    <div className="px-5 pb-4 flex flex-col gap-3">
                    <FichaResumida alumno={notif.alumno} />

                    {/* Botones de acción — solo si no está confirmado */}
                    {notif.alumno.estado !== 'CONFIRMADO' && (
                        <div className="flex gap-2">
                        <button
                            onClick={() => handleCambiarEstado(notif.id, 'CONFIRMADO')}
                            disabled={procesando === notif.id}
                            className="flex-1 flex items-center justify-center gap-1.5 bg-[#1E3A8A] text-white py-2 rounded-lg text-xs font-medium hover:bg-[#0F1F5C] transition-colors disabled:opacity-60"
                        >
                            <IconCheck size={13} />
                            Confirmar
                        </button>
                        <button
                            onClick={() => handleCambiarEstado(notif.id, 'PENDIENTE')}
                            disabled={procesando === notif.id}
                            className="flex-1 flex items-center justify-center gap-1.5 border border-amber-300 text-amber-600 py-2 rounded-lg text-xs font-medium hover:bg-amber-50 transition-colors disabled:opacity-60"
                        >
                            <IconClock size={13} />
                            Pendiente
                        </button>
                        </div>
                    )}

                    {/* Ya confirmado */}
                    {notif.alumno.estado === 'CONFIRMADO' && (
                        <div className="flex items-center justify-center gap-2 py-2 bg-green-50 rounded-lg">
                        <IconCheck size={13} className="text-green-500" />
                        <span className="text-xs text-green-600 font-medium">Inscripción confirmada</span>
                        </div>
                    )}
                    </div>
                )}
                </div>
            ))}
            </div>

        </div>
        </div>
    )
}

export default PanelNotificaciones