// ModuloAsistencia.jsx - Módulo de visualización de asistencia del panel admin

import { useState } from "react"

import { IconCalendarCheck, IconChalkboard, IconCheck, IconX, IconChevronDown } from "@tabler/icons-react"

import { HISTORIAL_MOCK } from "../../constants/historialMock"

function FilaAsistencia({ registro }) {
    const [expandido, setExpandido] = useState(false)
    const porcentaje = Math.round((registro.presentes / registro.total) * 100)
    
    return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-3">
        {/* Header fila */}
        <button
        onClick={() => setExpandido(!expandido)}
        className="w-full flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors text-left"
        >
            <div className="w-9 h-9 rounded-full bg-[#E6F1FB] flex items-center justify-center flex-shrink-0">
                <IconCalendarCheck size={18} className="text-[#1E3A8A]" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm">{registro.clase}</p>
                <p className="text-xs text-gray-400">{registro.profesor} · {registro.fecha}</p>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-semibold text-gray-900">{porcentaje}%</p>
                    <p className="text-xs text-gray-400">asistencia</p>
                </div>
                <div className="flex gap-2">
                    <span className="flex items-center gap-1 text-xs bg-[#E6F1FB] text-[#0C447C] px-2 py-0.5 rounded-full font-medium">
                        <IconCheck size={10} /> {registro.presentes}
                    </span>
                    <span className="flex items-center gap-1 text-xs bg-red-50 text-red-500 px-2 py-0.5 rounded-full font-medium">
                        <IconX size={10} /> {registro.ausentes}
                    </span>
                </div>
                <IconChevronDown
                size={16}
                className={`text-gray-400 transition-transform ${expandido ? 'rotate-180' : ''}`}
                />
            </div>
        </button>

        {/* Detalle expandible */}
        {expandido && (
            <div className="border-t border-gray-100 px-5 py-3">
            <div className="flex flex-col gap-2">
                {registro.detalle.map((alumno, i) => (
                <div key={i} className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">{alumno.nombre}</p>
                    {alumno.presente
                    ? <span className="flex items-center gap-1 text-xs text-green-600 font-medium"><IconCheck size={12} /> Presente</span>
                    : <span className="flex items-center gap-1 text-xs text-red-500 font-medium"><IconX size={12} /> Ausente</span>
                    }
                </div>
                ))}
            </div>
            </div>
        )}

        </div>
    )
}

function ModuloAsistencia() {
  const [filtroClase, setFiltroClase] = useState('TODAS')

  const clases = ['TODAS', ...new Set(HISTORIAL_MOCK.map(r => r.clase))]

  const registrosFiltrados = HISTORIAL_MOCK.filter(r =>
    filtroClase === 'TODAS' || r.clase === filtroClase
  )

  // Stats generales
  const totalPresentes = HISTORIAL_MOCK.reduce((acc, r) => acc + r.presentes, 0)
  const totalAusentes  = HISTORIAL_MOCK.reduce((acc, r) => acc + r.ausentes,  0)
  const totalClases    = HISTORIAL_MOCK.length

  return (
    <div className="p-6">

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#E6F1FB] flex items-center justify-center flex-shrink-0">
            <IconChalkboard size={22} className="text-[#1E3A8A]" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Clases registradas</p>
            <p className="text-2xl font-semibold text-gray-900">{totalClases}</p>
            <p className="text-xs text-gray-400">En el historial</p>
          </div>
          <div className="ml-auto w-1 h-12 bg-[#1E3A8A] rounded-full"></div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
            <IconCheck size={22} className="text-green-500" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Total presentes</p>
            <p className="text-2xl font-semibold text-gray-900">{totalPresentes}</p>
            <p className="text-xs text-gray-400">En todas las clases</p>
          </div>
          <div className="ml-auto w-1 h-12 bg-green-500 rounded-full"></div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
            <IconX size={22} className="text-red-500" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Total ausentes</p>
            <p className="text-2xl font-semibold text-gray-900">{totalAusentes}</p>
            <p className="text-xs text-gray-400">En todas las clases</p>
          </div>
          <div className="ml-auto w-1 h-12 bg-red-500 rounded-full"></div>
        </div>
      </div>

      {/* Filtro */}
      <div className="flex items-center gap-3 mb-5">
        <select
          value={filtroClase}
          onChange={e => setFiltroClase(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white focus:outline-none focus:border-[#1E3A8A]"
        >
          {clases.map(c => (
            <option key={c} value={c}>{c === 'TODAS' ? 'Todas las clases' : c}</option>
          ))}
        </select>
        <p className="text-xs text-gray-400">{registrosFiltrados.length} registros</p>
      </div>

      {/* Lista de registros */}
      <div>
        {registrosFiltrados.map(registro => (
          <FilaAsistencia key={registro.id} registro={registro} />
        ))}
        {registrosFiltrados.length === 0 && (
          <div className="text-center py-8 text-gray-400 text-sm">
            No hay registros de asistencia
          </div>
        )}
      </div>

    </div>
  )
}

export default ModuloAsistencia
