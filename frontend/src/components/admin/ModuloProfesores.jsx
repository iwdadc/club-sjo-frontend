// ModuloProfesores.jsx - Modulo CRUD de profesores del panel admin

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { IconSearch, IconEdit, IconTrash, IconX, IconPlus, IconSchool, IconCheck, IconCircleCheck } from "@tabler/icons-react"

import { getProfesores, crearProfesor, editarProfesor, eliminarProfesor } from "../../services/profesorService"

import { ACTIVIDADES } from "../../constants/actividades"
import { SEDES } from "../../constants/actividades"

// CREAR/EDITAR
function ModalProfesor ({profesor, onGuardar, onCerrar}) {
    const esEdicion = !!profesor
    const { register, handleSubmit, formState: {errors } } = useForm({ defaultValues: profesor || {} })

    async function onSubmit(datos) {
        await onGuardar (datos)
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden">
                <div className="bg-[#1E3A8A] px-6 py-4 flex justify-between items-center">
                    <h3 className="text-white font-medium text-sm">
                        {esEdicion ? 'Editar profesor' : 'Nuevo profesor'}
                    </h3>
                    <button onClick={onCerrar} className="text-white/60 hover:text-white">
                        <IconX size={18} />
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 flex flex-col gap-4">

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Nombre y apellido *
                        </label>
                        <input
                        {...register("nombre", { required: "El nombre es obligatorio" })}
                        placeholder="Ej: Ricardo Sosa"
                        className="h-10 border border-gray-200 rounded-lg px-3 text-sm focus:outline-none focus:border-[#1E3A8A] bg-gray-50"
                        />
                        {errors.nombre && <span className="text-xs text-red-500">{errors.nombre.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Email *
                        </label>
                        <input
                        type="email"
                        {...register("email", { required: "El email es obligatorio" })}
                        placeholder="correo@sanjoseobrero.ar"
                        className="h-10 border border-gray-200 rounded-lg px-3 text-sm focus:outline-none focus:border-[#1E3A8A] bg-gray-50"
                        />
                        {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {esEdicion ? 'Nueva contraseña (dejar vacío para no cambiar)' : 'Contraseña *'}
                        </label>
                        <input
                        type="password"
                        {...register("password", {
                            required: esEdicion ? false : "La contraseña es obligatoria",
                            minLength: { value: 6, message: "Mínimo 6 caracteres" }
                        })}
                        placeholder="••••••••"
                        className="h-10 border border-gray-200 rounded-lg px-3 text-sm focus:outline-none focus:border-[#1E3A8A] bg-gray-50"
                        />
                        {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Actividad asignada *
                        </label>
                        <select
                        {...register("actividad", { required: "La actividad es obligatoria" })}
                        className="h-10 border border-gray-200 rounded-lg px-3 text-sm focus:outline-none focus:border-[#1E3A8A] bg-gray-50"
                        >
                        <option value="">Seleccioná una actividad</option>
                        {ACTIVIDADES.map(a => (
                            <option key={a.value} value={a.label}>{a.label}</option>
                        ))}
                        </select>
                        {errors.actividad && <span className="text-xs text-red-500">{errors.actividad.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Sede *
                        </label>
                        <select
                        {...register("sede", { required: "La sede es obligatoria" })}
                        className="h-10 border border-gray-200 rounded-lg px-3 text-sm focus:outline-none focus:border-[#1E3A8A] bg-gray-50"
                        >
                        <option value="">Seleccioná una sede</option>
                        {SEDES.map(s => (
                            <option key={s.value} value={s.label}>{s.label}</option>
                        ))}
                        </select>
                        {errors.sede && <span className="text-xs text-red-500">{errors.sede.message}</span>}
                    </div>

                    <div className="flex gap-3 mt-2">
                        <button
                        type="button"
                        onClick={onCerrar}
                        className="flex-1 border border-gray-200 text-gray-500 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                        >
                        Cancelar
                        </button>
                        <button
                        type="submit"
                        className="flex-1 bg-[#1E3A8A] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#0F1F5C] transition-colors"
                        >
                        {esEdicion ? 'Guardar cambios' : 'Crear profesor'}
                        </button>
                    </div>

                    </form>
            </div>
        </div>
    )

}

// CONFIRMAR/ELIMINAR
function ModalConfirmarEliminar({ profesor, onConfirmar, onCerrar }) {
    return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
        <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl p-6">
            <h3 className="text-base font-semibold text-gray-800 mb-2">¿Eliminar profesor?</h3>
            <p className="text-sm text-gray-500 mb-6">
            Vas a eliminar a <strong>{profesor.nombre}</strong>. Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3">
                <button
                onClick={onCerrar}
                className="flex-1 border border-gray-200 text-gray-500 py-2 rounded-lg text-sm hover:bg-gray-50"
                >
                    Cancelar
                </button>
                <button
                onClick={onConfirmar}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-600"
                >
                    Sí, eliminar
                </button>
            </div>
        </div>
    </div>
    )
}

function ModuloProfesores(){
    const [profesores,      setProfesores]      = useState([])
    const [cargando,        setCargando]        = useState(true)
    const [busqueda,        setBusqueda]        = useState('')
    const [modalCrear,      setModalCrear]      = useState(false)
    const [profesorEditar,  setProfesorEditar]  = useState(null)
    const [profesorEliminar,setProfesorEliminar]= useState(null)
    const [feedbackId,      setFeedbackId]      = useState(null)

    useEffect(() => {
        async function cargar() {
            const data = await getProfesores()
            setProfesores(data)
            setCargando(false)
        }
        cargar()
    }, [])

    const profesoresFiltrados = profesores.filter(p => 
        p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.actividad.toLowerCase().includes(busqueda.toLowerCase())
    )

    // CREAR
    async function handleCrear(datos) {
        const nuevo = await crearProfesor(datos)
        setProfesores(prev => [...prev, nuevo])
        setModalCrear(false)
    } 

    // EDITAR
    async function handleEditar(datos) {
        const actualizado = await editarProfesor(profesorEditar.id, datos)
        setProfesores(prev => prev.map(p => p.id === actualizado.id ? actualizado : p))
        setFeedbackId(actualizado.id)
        setTimeout(() => setFeedbackId(null), 2000)
        setProfesorEditar(null)
    }

    // ELIMINAR
    async function handleEliminar() {
        await eliminarProfesor(profesorEliminar.id)
        setProfesores(prev => prev.filter(p => p.id !== profesorEliminar.id))
        setProfesorEliminar(null)
    }

    if (cargando) return <p className="text-sm text-gray-400">Cargando profesores...</p>

    return (
        <div className="p-6">

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#E6F1FB] flex items-center justify-center flex-shrink-0">
                        <IconSchool size={22} className="text-[#1E3A8A]" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Total profesores</p>
                        <p className="text-2xl font-semibold text-gray-900">{profesores.length}</p>
                        <p className="text-xs text-gray-400">En el club</p>
                    </div>
                    <div className="ml-auto w-1 h-12 bg-[#1E3A8A] rounded-full"></div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                        <IconCircleCheck size={22} className="text-green-500" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Activos</p>
                        <p className="text-2xl font-semibold text-gray-900">{profesores.filter(p => p.activo).length}</p>
                        <p className="text-xs text-gray-400">Con actividad asignada</p>
                    </div>
                    <div className="ml-auto w-1 h-12 bg-green-500 rounded-full"></div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#E6F1FB] flex items-center justify-center flex-shrink-0">
                        <IconSchool size={22} className="text-[#1E3A8A]" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400"> Actividades </p>
                        <p className="text-2xl font-semibold text-gray-900">
                            {new Set(profesores.map(p => p.actividad)).size}
                        </p>
                        <p className="text-xs text-gray-400">Con profesor asignado</p>
                    </div>
                    <div className="ml-auto w-1 h-12 bg-[#1E3A8A] rounded-full"></div>
                </div>
            </div>

            {/* BUSQUEDA/ BOTON NUEVO */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 flex-1">
                    <IconSearch size={14} className="text-gray-400" />
                    <input
                    type="text"
                    placeholder="Buscar por nombre o actividad..."
                    value={busqueda}
                    onChange={e => setBusqueda(e.target.value)}
                    className="bg-transparent text-sm outline-none flex-1 text-gray-700"
                    />
                </div>
                <button
                onClick={() => setModalCrear(true)}
                className="flex items-center justify-center gap-2 bg-[#1E3A8A] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0F1F5C] transition-colors"
                >
                    <IconPlus size={16} /> Nuevo profesor
                </button>
            </div>

            {/* TABLA EN DESKTOP */}
            <div className="hidden md:block bg-white border border-gray-200 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                <thead className="bg-[#F3F2EE] border-b border-[#E2E0DA]">
                    <tr>
                    <th className="text-left px-4 py-3 text-xs text-gray-700 uppercase tracking-wide">Profesor</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-700 uppercase tracking-wide">Actividad</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-700 uppercase tracking-wide">Sede</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-700 uppercase tracking-wide">Estado</th>
                    <th className="px-4 py-3"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {profesoresFiltrados.map(prof => (
                    <tr key={prof.id} className={`hover:bg-gray-50 transition-colors ${feedbackId === prof.id ? 'bg-green-50' : ''}`}>
                        <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-[#E6F1FB] flex items-center justify-center text-xs font-medium text-[#0C447C] flex-shrink-0">
                            {prof.nombre.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()}
                            </div>
                            <div>
                            <p className="font-medium text-gray-900">{prof.nombre}</p>
                            <p className="text-xs text-gray-400">{prof.email}</p>
                            </div>
                        </div>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{prof.actividad}</td>
                        <td className="px-4 py-3 text-gray-500 text-xs">{prof.sede}</td>
                        <td className="px-4 py-3">
                        {feedbackId === prof.id ? (
                            <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                            <IconCheck size={12} /> Guardado
                            </span>
                        ) : (
                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${prof.activo ? 'bg-[#E6F1FB] text-[#0C447C]' : 'bg-gray-100 text-gray-500'}`}>
                            {prof.activo ? 'Activo' : 'Inactivo'}
                            </span>
                        )}
                        </td>
                        <td className="px-4 py-3">
                        <div className="flex gap-3">
                            <button
                            onClick={() => setProfesorEditar(prof)}
                            className="text-gray-400 hover:text-[#1E3A8A] transition-colors"
                            >
                                <IconEdit size={16} />
                            </button>
                            <button
                            onClick={() => setProfesorEliminar(prof)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <IconTrash size={16} />
                            </button>
                        </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
                {profesoresFiltrados.length === 0 && (
                <div className="text-center py-8 text-gray-400 text-sm">
                    No se encontraron profesores
                </div>
                )}
            </div>

            {/* CARDS EN MOVIL */}
            <div className="md:hidden flex flex-col gap-3">
                {profesoresFiltrados.map(prof => (
                <div key={prof.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-[#E6F1FB] flex items-center justify-center text-xs font-medium text-[#0C447C] flex-shrink-0">
                        {prof.nombre.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-700 text-sm truncate">{prof.nombre}</p>
                        <p className="text-xs text-gray-400 truncate">{prof.actividad}</p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${prof.activo ? 'bg-[#E6F1FB] text-[#0C447C]' : 'bg-gray-100 text-gray-500'}`}>
                        {prof.activo ? 'Activo' : 'Inactivo'}
                    </span>
                    </div>
                    <div className="flex gap-2">
                        <button
                        onClick={() => setProfesorEditar(prof)}
                        className="flex-1 flex items-center justify-center gap-1 border border-gray-200 text-gray-500 py-1.5 rounded-lg text-xs hover:bg-gray-50"
                        >
                            <IconEdit size={13} /> Editar
                        </button>
                        <button
                        onClick={() => setProfesorEliminar(prof)}
                        className="flex-1 flex items-center justify-center gap-1 border border-red-200 text-red-500 py-1.5 rounded-lg text-xs hover:bg-red-50"
                        >
                            <IconTrash size={13} /> Eliminar
                        </button>
                    </div>
                </div>
                ))}
            </div>

            {/* MODALES */}
            {modalCrear && (
                <ModalProfesor onGuardar={handleCrear} onCerrar={() => setModalCrear(false)} />
            )}
            {profesorEditar && (
                <ModalProfesor profesor={profesorEditar} onGuardar={handleEditar} onCerrar={() => setProfesorEditar(null)} />
            )}
            {profesorEliminar && (
                <ModalConfirmarEliminar
                profesor={profesorEliminar}
                onConfirmar={handleEliminar}
                onCerrar={() => setProfesorEliminar(null)}
                />
            )}

        </div>
    )


}

export default ModuloProfesores

