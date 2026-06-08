//AdminPage.jsx - Panel de coordinador (ADMIN)
// // Solo accesible para usuarios con rol ADMIN

import { useState, useEffect } from 'react'
import {useAuth} from '../context/AuthContext'
import {getInscripciones, getStats} from '../services/inscripcionService'

import StatCard from '../components/admin/StatCard'
import TablaInscripciones from '../components/admin/TablaInscripciones'

import SidebarAdmin from '../components/admin/SidebarAdmin'
import HeaderAdmin from '../components/admin/HeaderAdmin'
import BottomNav from '../components/admin/BottomNav'

import { IconFileReport } from '@tabler/icons-react'

import ModuloAlumnos from '../components/admin/ModuloAlumnos'
import ModuloProfesores from '../components/admin/ModuloProfesores'
import ModuloClases from '../components/admin/ModuloClases'
import ModuloAsistencia from '../components/admin/ModuloAsistencia'
import ModuloReportes from '../components/admin/ModuloReportes'

function AdminPage() {
  const {usuario, logout} = useAuth();

  const [inscripciones, setInscripciones] = useState([]);
  const [stats, setStats] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [detalle, setDetalle] = useState(null);
  const [moduloActivo, setModuloActivo] = useState('dashboard')

  useEffect(() => { 
    async function cargarDatos() {
      try {
        setCargando(true);
        const [inscripcionesData, statsData] = await Promise.all([
          getInscripciones(),
          getStats()
        ])
        setInscripciones(inscripcionesData);
        setStats(statsData);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      } finally {
        setCargando(false);
      }
    }
    cargarDatos();
  }, [])
  
  if (cargando) {
    return (
    <div className="min-h-screen bg-[#E6F1FB] flex items-center justify-center">
      <p className="text-sm text-[#1E3A8A]">Cargando...</p>
      </div>
      )
    }

    return (
    <div className="min-h-screen bg-white flex">
      
      <SidebarAdmin moduloActivo={moduloActivo} setModuloActivo={setModuloActivo} />
      
      <main className="flex-1 min-w-0 pb-16 md:pb-0">
        <HeaderAdmin 
        usuario={usuario}
        logout={logout}
        moduloActivo={moduloActivo}
        />
        
        {/* MODULO DASHBOARD */}
        {moduloActivo === 'dashboard' && (
          <div className="px-8 py-6">
            {/* STATS */}
            {stats && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                <StatCard titulo="Alumnos Inscriptos" valor={stats.totalAlumnos}  delta="+ 12 esta semana" />
                <StatCard titulo="Actividades Activas" valor={stats.actividadesActivas}  delta="Sin cambios"/>
                <StatCard titulo="Cupos Disponibles" valor={stats.cuposDisponibles} delta="- 8 menos que ayer" deltaNegativo ={true} />
                <StatCard titulo="Pendientes" valor={stats.pendientes} delta="Revisar" />
              </div>
            )}
            
            {/* TABLA DE INSCRIPCIONES - solo visible en desktop */}
            <div>
              {/* ENCABEZADO DE SECCION */}
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-semibold text-gray-900">Últimas inscripciones</h2>
                <button className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium hover:bg-gray-50">
                  + Nueva
                </button>
              </div>
            
              <TablaInscripciones
              inscripciones={inscripciones}
              onVerDetalle={(ins) => setDetalle(ins)}
              />
            </div>
            {/* Acceso rápido a Reportes */}
            <div className="mt-6">
              <h2 className="text-sm font-semibold text-gray-900 mb-3">Accesos rápidos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                onClick={() => setModuloActivo('reportes')}
                className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-2xl hover:border-[#1E3A8A] hover:bg-[#E6F1FB] transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E6F1FB] flex items-center justify-center flex-shrink-0">
                    <IconFileReport size={20} className="text-[#1E3A8A]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Reportes</p>
                    <p className="text-xs text-gray-400">Ver y descargar reportes por clase y profesor</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* MODULO ALUMNOS */}
        {moduloActivo === 'alumnos' && < ModuloAlumnos /> }
        {/* MODULO CLASES */}
        {moduloActivo === 'clases' && < ModuloClases /> }
        {/* MODULO PROFESORES */}
        {moduloActivo === 'profesores' && < ModuloProfesores /> }
        {/* MODULO ASISTENCIA */}
        {moduloActivo === 'asistencia' && < ModuloAsistencia />}
        {/* MODULO REPORTES */}
        {moduloActivo === 'reportes' && < ModuloReportes />}
      </main>

        {/* Modal de detalle de inscripción */}
        {detalle && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl"> 
              <h3 className="text-base font-semibold text-[#1E3A8A] mb-4">Detalle de Inscripción</h3>
              <div className="flex flex-col gap-2 text-sm text-gray-600">
                <p><span className="font-medium text-gray-700">Alumno:</span> {detalle.nombreAlumno}</p>
                <p><span className="font-medium text-gray-700">DNI:</span> {detalle.dniAlumno}</p>
                <p><span className="font-medium text-gray-700">Actividad:</span> {detalle.actividad}</p>
                <p><span className="font-medium text-gray-700">Sede:</span> {detalle.sede}</p>
                <p><span className="font-medium text-gray-700">Adulto Responsable:</span> {detalle.nombreAdulto}</p>
                <p><span className="font-medium text-gray-700">Teléfono:</span> {detalle.telefonoAdulto}</p>
                <p><span className="font-medium text-gray-700">Fecha de Inscripción:</span> {detalle.fechaInscripcion}</p>
                <p><span className="font-medium text-gray-700">Estado:</span> {detalle.estado}</p>
              </div>
              <button
              onClick={() => setDetalle(null)}
              className="mt-6 w-full bg-[#1E3A8A] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#0F1F5C] transition-colors"
              >
              Cerrar
              </button>
            </div>
          </div>
        )}
        
        <BottomNav
        moduloActivo={moduloActivo}
        setModuloActivo={setModuloActivo}
        />
    </div>
  )
} 
export default AdminPage