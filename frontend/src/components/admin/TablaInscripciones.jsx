// TablaInscripciones.jsx - Componente para mostrar la tabla de inscripciones en el panel de admin
// Tiene logica de filtrado y busqueda

import { useState } from 'react'

import {
    IconSearch, IconEye
}
from '@tabler/icons-react'

import BadgeEstado from './BadgeEstado'

function TablaInscripciones({ inscripciones, onVerDetalle }) {
    const [busqueda, setBusqueda] = useState('')
    const [filtroEstado, setFiltroEstado] = useState('TODOS')
    
    const inscripcionesFiltradas = inscripciones.filter((ins) => {
        const texto = `${ins.nombreAlumno} ${ins.nombreAdulto} ${ins.actividad}`.toLowerCase();
        const coincideBusqueda = texto.includes(busqueda.toLowerCase());
        const coincideEstado = filtroEstado === 'TODOS' || ins.estado === filtroEstado;
        return coincideBusqueda && coincideEstado;
    });

return (
    <div>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 flex-1">
                <IconSearch size={14} className="text-gray-400" />
                <input
                    type="text"
                    placeholder="Buscar por alumno o actividad..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="bg-transparent focus:outline-none text-sm flex-1 text-gray-700"
                />
            </div>

            <select 
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-gray-50 focus:outline-none focus:border-[#1E3A8A]"
            >
                <option value="TODOS">Todos los estados</option>
                <option value="CONFIRMADO">Confirmado</option>
                <option value="PENDIENTE">Pendiente</option>
                <option value="REVISION">En revisión</option>
            </select>
        </div>


        {/* Tabla para desktop */}
        <div className="hidden md:block bg-white border border-gray-200 rounded-3xl overflow-hidden">
            <table className="w-full text-sm">
                <thead className="bg-[#F3F2EE] border-b border-[#E2E0DA]">
                    <tr>
                        <th className="text-left px-4 py-3 text-xs text-gray-700 uppercase tracking-wide">Alumno</th>
                        <th className="text-left px-4 py-3 text-xs text-gray-700 uppercase tracking-wide">Actividad</th>
                        <th className="text-left px-4 py-3 text-xs text-gray-700 uppercase tracking-wide">Adulto responsable</th>
                        <th className="text-left px-4 py-3 text-xs text-gray-700 uppercase tracking-wide">Fecha</th>
                        <th className="text-left px-4 py-3 text-xs text-gray-700 uppercase tracking-wide">Estado</th>
                        <th className="px-4 py-3"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {inscripcionesFiltradas.map((ins) => (
                        <tr key={ins.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-full bg-[#E6F1FB] flex items-center justify-center text-xs font-medium text-[#0C447C] flex-shrink-0">
                                        {ins.nombreAlumno.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                    </div>
                                    <span className="font-medium text-gray-900 text-base">{ins.nombreAlumno}</span>
                                </div>
                            </td>
                            <td className="px-5 py-5 text-gray-800">{ins.actividad}</td>
                            <td className="px-5 py-5 text-gray-500">{ins.nombreAdulto}</td>
                            <td className="px-5 py-5 text-gray-700 text-sm">{ins.fechaInscripcion}</td>    
                            <td className="px-5 py-5"><BadgeEstado estado={ins.estado} /></td>
                            <td className="px-5 py-5">
                                <div className="flex gap-2">
                                <button 
                                onClick={() => onVerDetalle(ins)}
                                className="text-gray-400 hover:text-[#1E3A8A] transition-colors"
                                >
                                    <IconEye size={20} />
                                </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {inscripcionesFiltradas.length === 0 && (
                <div className="text-center py-8 text-gray-400 text-sm">
                    No se encontraron inscripciones que coincidan con la búsqueda o el filtro.
                </div>
            )}
        </div>
            {/* Tabla para mobile */}
            <div className="md:hidden flex flex-col gap-3">
                {inscripcionesFiltradas.map((ins) => (
                    <div key={ins.id} className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-3 shadow-sm">
                        <div className="w-9 h-9 rounded-full bg-[#E6F1FB] flex items-center justify-center text-xs font-medium text-[#0C447C] flex-shrink-0">
                            {ins.nombreAlumno.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-700 text-sm truncate">{ins.nombreAlumno}</p>
                            <p className="text-xs text-gray-400 truncate">{ins.actividad} · {ins.fechaInscripcion}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <BadgeEstado estado={ins.estado} />
                            <button
                                onClick={() => onVerDetalle(ins)}
                                className="text-gray-400 hover:text-[#1E3A8A] transition-colors"
                            >
                                <IconEye size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
    </div>
)
}

export default TablaInscripciones