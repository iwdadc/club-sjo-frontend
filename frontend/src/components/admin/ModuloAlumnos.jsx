// ModuloAlumos.jsx - Modulo de gestión de alumnos (Panel del admin)
// Muestra listado de alumnos con filtro por actividad
// Al clickear un alumno muestra su ficha completa

import { useState, useEffect } from 'react'
import { IconSearch, IconEye, IconX, IconUsers, IconCircleCheck, IconClock, IconUsersGroup } from '@tabler/icons-react'
import { getAlumnos } from '../../services/inscripcionService'
import { getAsistenciaAlumno } from '../../services/asistenciaService'
import { IconChartBar } from '@tabler/icons-react'
import BadgeEstado from './BadgeEstado'

function FichaAlumno({ alumno, onCerrar }) {
  const [asistencia, setAsistencia] = useState(null)

  // Carga el porcentaje de asistencia del alumno al abrir la ficha
  useEffect(() => {
    async function cargar() {
      const data = await getAsistenciaAlumno(alumno.id)
      setAsistencia(data)
    }
    cargar()
  }, [alumno.id])

  // Calcula el porcentaje y el color de la barra
  const porcentaje = asistencia
    ? Math.round((asistencia.asistidas / asistencia.totalClases) * 100)
    : null

  function colorAsistencia(pct) {
    if (pct >= 75) return { barra: 'bg-green-500',  texto: 'text-green-600' }
    if (pct >= 50) return { barra: 'bg-amber-500',  texto: 'text-amber-600' }
    return             { barra: 'bg-red-500',    texto: 'text-red-600'   }
  }

  const colores = porcentaje !== null ? colorAsistencia(porcentaje) : null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden">

        {/* Header ficha */}
        <div className="bg-[#1E3A8A] px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-sm font-medium text-white">
              {alumno.nombreApellido.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()}
            </div>
            <div>
              <p className="text-white font-medium text-sm">{alumno.nombreApellido}</p>
              <p className="text-[#B5D4F4] text-xs">DNI {alumno.dni}</p>
            </div>
          </div>
          <button onClick={onCerrar} className="text-white/60 hover:text-white">
            <IconX size={18} />
          </button>
        </div>

        {/* Contenido ficha */}
        <div className="p-6 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">

          {/* Datos personales */}
          <div>
            <p className="text-xs font-semibold text-[#1E3A8A] uppercase tracking-wide mb-2">
              Datos personales
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><p className="text-xs text-gray-400">Fecha de nac.</p><p className="text-gray-700">{alumno.fechaNacimiento}</p></div>
              <div><p className="text-xs text-gray-400">Edad</p><p className="text-gray-700">{alumno.edad} años</p></div>
              <div><p className="text-xs text-gray-400">Género</p><p className="text-gray-700">{alumno.genero}</p></div>
              <div><p className="text-xs text-gray-400">Estado</p><BadgeEstado estado={alumno.estado} /></div>
              <div className="col-span-2"><p className="text-xs text-gray-400">Domicilio</p><p className="text-gray-700">{alumno.domicilio}</p></div>
            </div>
          </div>

          <div className="h-px bg-gray-100" />

          {/* Actividad */}
          <div>
            <p className="text-xs font-semibold text-[#1E3A8A] uppercase tracking-wide mb-2">Actividad</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><p className="text-xs text-gray-400">Actividad</p><p className="text-gray-700">{alumno.actividad}</p></div>
              <div><p className="text-xs text-gray-400">Sede</p><p className="text-gray-700">{alumno.sede}</p></div>
            </div>
          </div>

          <div className="h-px bg-gray-100" />

          {/* ── ASISTENCIA ── */}
          <div>
            <p className="text-xs font-semibold text-[#1E3A8A] uppercase tracking-wide mb-2 flex items-center gap-1">
              <IconChartBar size={13} /> Asistencia
            </p>
            {asistencia === null ? (
              <p className="text-xs text-gray-400">Cargando...</p>
            ) : asistencia === undefined ? (
              <p className="text-xs text-gray-400">Sin registros de asistencia</p>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {asistencia.asistidas} de {asistencia.totalClases} clases asistidas
                  </span>
                  <span className={`text-sm font-semibold ${colores.texto}`}>
                    {porcentaje}%
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${colores.barra}`}
                    style={{ width: `${porcentaje}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400">
                  {porcentaje >= 75
                    ? 'Buena asistencia'
                    : porcentaje >= 50
                    ? 'Asistencia regular'
                    : 'Baja asistencia — revisar'
                  }
                </p>
              </div>
            )}
          </div>

          <div className="h-px bg-gray-100" />

          {/* Adulto responsable */}
          <div>
            <p className="text-xs font-semibold text-[#1E3A8A] uppercase tracking-wide mb-2">Adulto responsable</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="col-span-2"><p className="text-xs text-gray-400">Nombre</p><p className="text-gray-700">{alumno.nombreAdulto}</p></div>
              <div><p className="text-xs text-gray-400">Teléfono</p><p className="text-gray-700">{alumno.telefonoAdulto}</p></div>
            </div>
          </div>

          <div className="h-px bg-gray-100" />

          {/* Salud */}
          <div>
            <p className="text-xs font-semibold text-[#1E3A8A] uppercase tracking-wide mb-2">Salud</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-xs text-gray-400">Obra social</p>
                <p className="text-gray-700">{alumno.obraSocial}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Alergias</p>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${alumno.alergias === 'si' ? 'bg-amber-50 text-amber-700' : 'bg-gray-100 text-gray-500'}`}>
                  {alumno.alergias === 'si' ? 'Sí' : 'No'}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-400">Medicación</p>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${alumno.medicacion === 'si' ? 'bg-amber-50 text-amber-700' : 'bg-gray-100 text-gray-500'}`}>
                  {alumno.medicacion === 'si' ? 'Sí' : 'No'}
                </span>
              </div>
            </div>
          </div>

        </div>

        <div className="px-6 py-4 border-t border-gray-100">
          <button
            onClick={onCerrar}
            className="w-full bg-[#1E3A8A] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#0F1F5C] transition-colors"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  )
}

function ModuloAlumnos() {
  const [alumnos,       setAlumnos]       = useState([])
  const [cargando,      setCargando]      = useState(true)
  const [busqueda,      setBusqueda]      = useState('')
  const [filtroAct,     setFiltroAct]     = useState('TODAS')
  const [alumnoDetalle, setAlumnoDetalle] = useState(null)
  


  useEffect(() => {
    async function cargar() {
      const data = await getAlumnos()
      setAlumnos(data)
      setCargando(false)
    }
    cargar()
  }, [])
  
  // Lista de actividades únicas para el filtro
  const actividades = ['TODAS', ...new Set(alumnos.map(a => a.actividad))]

  const alumnosFiltrados = alumnos.filter(a => {
    const coincideBusqueda = a.nombreApellido.toLowerCase().includes(busqueda.toLowerCase()) || a.dni.includes(busqueda)
    const coincideAct = filtroAct === 'TODAS' || a.actividad === filtroAct
    return coincideBusqueda && coincideAct
  })

  //
  const totalAlumnos = alumnos.length
  const confirmados = alumnos.filter( a => a.estado === 'CONFIRMADO' ).length
  const pendientes = alumnos.filter( a => a.estado === 'PENDIENTE' ).length

  if (cargando) return <p className="text-sm text-gray-400">Cargando alumnos...</p>
  

  return (
    <div className="p-6">
        {/* Stats del módulo */}
        <div className="mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#E6F1FB] flex items-center justify-center flex-shrink-0">
                        <IconUsers size={22} className="text-[#1E3A8A]" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Total alumnos</p>
                        <p className="text-2xl font-semibold text-gray-900">{totalAlumnos}</p>
                        <p className="text-xs text-gray-400">Inscriptos en el club</p>
                    </div>
                    <div className="ml-auto w-1 h-12 bg-[#1E3A8A] rounded-full">
                    </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                        <IconCircleCheck size={22} className="text-green-500" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Confirmados</p>
                        <p className="text-2xl font-semibold text-gray-900">{confirmados}</p>
                        <p className="text-xs text-gray-400">Alumnos confirmados</p>
                    </div>
                    <div className="ml-auto w-1 h-12 bg-green-500 rounded-full"></div>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                        <IconClock size={22} className="text-amber-500" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Pendientes</p>
                        <p className="text-2xl font-semibold text-gray-900">{pendientes}</p>
                        <p className="text-xs text-gray-400">En proceso de confirmación</p>
                    </div>
                    <div className="ml-auto w-1 h-12 bg-amber-500 rounded-full"></div>
                </div>
            </div>
        </div>

      {/* Barra de búsqueda y filtro */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 flex-1">
          <IconSearch size={14} className="text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o DNI..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="bg-transparent text-sm outline-none flex-1 text-gray-700"
          />
        </div>
        <select
          value={filtroAct}
          onChange={e => setFiltroAct(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white focus:outline-none focus:border-[#1E3A8A]"
        >
          {actividades.map(a => (
            <option key={a} value={a}>{a === 'TODAS' ? 'Todas las actividades' : a}</option>
          ))}
        </select>
      </div>

      {/* Contador */}
      <p className="text-xs text-gray-400 mb-3">
        {alumnosFiltrados.length} alumno{alumnosFiltrados.length !== 1 ? 's' : ''}
      </p>

      {/* Tabla desktop */}
      <div className="hidden md:block bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#F3F2EE] border-b border-[#E2E0DA]">
            <tr>
              <th className="text-left px-4 py-3 text-xs text-gray-700 uppercase tracking-wide">Alumno</th>
              <th className="text-left px-4 py-3 text-xs text-gray-700 uppercase tracking-wide">Actividad</th>
              <th className="text-left px-4 py-3 text-xs text-gray-700 uppercase tracking-wide">Sede</th>
              <th className="text-left px-4 py-3 text-xs text-gray-700 uppercase tracking-wide">Estado</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {alumnosFiltrados.map(alumno => (
              <tr key={alumno.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#E6F1FB] flex items-center justify-center text-xs font-medium text-[#0C447C] flex-shrink-0">
                      {alumno.nombreApellido.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{alumno.nombreApellido}</p>
                      <p className="text-xs text-gray-400">DNI {alumno.dni}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">{alumno.actividad}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{alumno.sede}</td>
                <td className="px-4 py-3"><BadgeEstado estado={alumno.estado} /></td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => setAlumnoDetalle(alumno)}
                    className="text-gray-400 hover:text-[#1E3A8A] transition-colors"
                  >
                    <IconEye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {alumnosFiltrados.length === 0 && (
          <div className="text-center py-8 text-gray-400 text-sm">
            No se encontraron alumnos
          </div>
        )}
      </div>

      {/* Cards mobile */}
      <div className="md:hidden flex flex-col gap-3">
        {alumnosFiltrados.map(alumno => (
          <div
            key={alumno.id}
            className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-3 shadow-sm"
          >
            <div className="w-9 h-9 rounded-full bg-[#E6F1FB] flex items-center justify-center text-xs font-medium text-[#0C447C] flex-shrink-0">
              {alumno.nombreApellido.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-700 text-sm truncate">{alumno.nombreApellido}</p>
              <p className="text-xs text-gray-400 truncate">{alumno.actividad} · DNI {alumno.dni}</p>
            </div>
            <div className="flex items-center gap-2">
              <BadgeEstado estado={alumno.estado} />
              <button
                onClick={() => setAlumnoDetalle(alumno)}
                className="text-gray-400 hover:text-[#1E3A8A]"
              >
                <IconEye size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Ficha detalle */}
      {alumnoDetalle && (
        <FichaAlumno
          alumno={alumnoDetalle}
          onCerrar={() => setAlumnoDetalle(null)}
        />
      )}

    </div>
  )
}

export default ModuloAlumnos