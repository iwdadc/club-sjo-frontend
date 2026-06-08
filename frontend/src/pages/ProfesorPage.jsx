  // ProfesorPage.jsx - Página del profesor
  // Solo accesible para usuarios con rol "PROFESOR"

  import { useState, useEffect } from "react";
  import { useAuth } from "../context/AuthContext"
  import { getAlumnosPorActividad, getActividadesProfesor, guardarAsistencia } from "../services/asistenciaService";

  import { IconClipboardCheck, IconDeviceFloppy, IconCalendar   } from "@tabler/icons-react";
  import logoSjo from "../assets/logo-sjo.png"
  import FilaAlumno from "../components/profesor/FilaAlumno";

  function fechaHoy(){
    return new Date().toLocaleDateString( )
  }

  function ProfesorPage() {
    const { usuario, logout } = useAuth();

    const [actividades,    setActividades]    = useState([])
    const [actividadActual, setActividadActual] = useState(null)
    const [alumnos,        setAlumnos]        = useState([])
    const [asistencias,    setAsistencias]    = useState({})
    const [cargando, setCargando] = useState(true)
    const [guardando, setGuardando] = useState(false)
    const [guardado, setGuardado] = useState(false)

    useEffect(() => {
      async function cargar() {
        const data = await getActividadesProfesor()
        setActividades(data)
        if (data.length > 0) setActividadActual(data[0])
        setCargando(false)
      }
       cargar()
      }, [])

    useEffect(() => {
      if (!actividadActual) return
      async function cargarAlumnos() {
        setCargando(true)
        const data = await getAlumnosPorActividad(actividadActual.id)
        setAlumnos(data)
        // Inicializa todas las asistencias como null (sin marcar)
        const init = {}
        data.forEach(a => { init[a.id] = null })
        setAsistencias(init)
        setCargando(false)
      }
      cargarAlumnos()
    }, [actividadActual])

    function toggleAsistencia(idAlumno, valor) {
      setAsistencias(prev => ({
        ...prev,
        // Si ya tenía ese valor lo deselecciona, si no lo marca
        [idAlumno]: prev[idAlumno] === valor ? null : valor
      }))
      setGuardado(false)
    }

    async function handleGuardar() {
      try {
        setGuardando(true)
        await guardarAsistencia(actividadActual.id, fechaHoy(), asistencias)
        setGuardado(true)
      } finally {
        setGuardando(false)
      } 
    }

    //Contadores
    const presentes = Object.values(asistencias).filter(v => v === true).length
    const ausentes  = Object.values(asistencias).filter(v => v === false).length

    if (cargando){
      return (
        <div className="min-h-screen bg-[#E6F1FB] flex items-center justify-center">
          <p className="text-sm text-[#1E3A8A]">Cargando...</p>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-[#E6F1FB]">

        <div className="bg-[#1E3A8A] px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3" >
            <div className="w-9 h-9 rounded-full bg-white p-1">
              <img src={logoSjo} alt="Club San José Obrero" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-white font-semibold text-sm flex items-center gap-2">
                <IconClipboardCheck size={16} /> Asistencia
              </h1>
              <p className="text-[#B5D4F4] text-xs">Prof. {usuario?.nombre}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-[#B5D4F4] text-xs">
                <IconCalendar size={13} /> {fechaHoy()}
              </div>
              <button
              onClick={logout}
              className="text-xs text-[#B5D4F4] border border-white/20 rounded-lg px-3 py-1.5 hover:bg-white/10 transition-colors"
              >
                Salir
              </button> 
          </div>
        </div>

        {/*TABS DE ACTIVIDADES */}
        <div className="bg-white border-b border-gray-100 flex">
          {actividades.map((act) => (
            <button
            key={act.id}
            onClick={() => setActividadActual(act)}
            className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors
              ${actividadActual?.id === act.id
                ? 'text-[#1E3A8A] border-[#1E3A8A]'
                : 'text-gray-400 border-transparent hover:text-gray-600'
              }`}
            >
              {act.nombre}
            </button>
          ))}
        </div>

        <div className="max-w-2xl mx-auto px-4 py-6">

          {/*INFO DE ACTIVIDAD */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">

            {/* TOOLBAR */}
            <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center flex-wrap gap-3">
              <div className="flex items-center gap-3 text-sm">
                <span className="text-gray-500">{alumnos.length} alumnos</span>
                <div className="flex gap-2">
                  <span className="bg-[#E6F1FB] text-[#0C447C] text-xs px-2 py-0.5 rounded-full font-medium">
                    ✓ {presentes} presentes
                  </span>
                  <span className="bg-red-50 text-red-600 text-xs px-2 py-0.5 rounded-full font-medium">
                    ✗ {ausentes} ausentes
                  </span>
                </div>
              </div>
              <button
              onClick={handleGuardar}
              disabled={guardando}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-colors
                ${guardado
                  ? 'bg-green-500 text-white'
                  : 'bg-[#1E3A8A] text-white hover:bg-[#0F1F5C]'
                } disabled:opacity-60`}
              >
                <IconDeviceFloppy size={14}/> {guardando ? 'Guardando...' : guardado ? '¡Guardado!' : 'Guardar'}
              </button>
            </div>

            {/* LISTA ALUMNOS */}
            <div>
              {alumnos.map((alumno, index) => (
                <FilaAlumno
                key={alumno.id}
                numero={index + 1}
                alumno={alumno}
                presente={asistencias[alumno.id]}
                onToggle={toggleAsistencia}
                onObservacion={(id) => console.log('Observación alumno:', id)}
                />
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-gray-100 flex justify-end">
              <button
              onClick={handleGuardar}
              disabled={guardando}
              className="flex items-center gap-2 px-4 py-2 bg-[#1E3A8A] text-white rounded-lg text-xs font-medium hover:bg-[#0F1F5C] transition-colors disabled:opacity-60"
              >
                <IconDeviceFloppy size={14} />
                {guardando ? 'Guardando...' : 'Guardar asistencia del día'}
              </button>
            </div>
          </div>

        </div>
      </div>
    )
  }
  export default ProfesorPage