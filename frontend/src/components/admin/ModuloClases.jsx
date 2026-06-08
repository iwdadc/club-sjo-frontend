import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IconChalkboard, IconUsers, IconEdit, IconX, IconCheck, IconSearch, IconAlertTriangle, } from "@tabler/icons-react";
import { getClases, editarClase, getAlumnosPorClase,} from "../../services/claseService";
import { getProfesores } from "../../services/profesorService";
import BadgeEstado from "./BadgeEstado";
// EDITAR CLASE
function ModalEditarClase({ clase, profesores, onGuardar, onCerrar }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: clase,
  });
  
  return (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
    <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden">
        <div className="bg-[#1E3A8A] px-6 py-4 flex justify-between items-center">
            <h3 className="text-white font-medium text-sm">Editar clase — {clase.nombre}</h3>
            <button onClick={onCerrar} className="text-white/60 hover:text-white">
                <IconX size={18} />
            </button>
        </div>

        <form
        onSubmit={handleSubmit(onGuardar)}
        className="p-6 flex flex-col gap-4"
        >
            <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide"> Horario * </label>
                <input
                {...register("horario", {
                required: "El horario es obligatorio",
                })}
                placeholder="Ej: Lunes y Miércoles 9:00 h"
                className="h-10 border border-gray-200 rounded-lg px-3 text-sm focus:outline-none focus:border-[#1E3A8A] bg-gray-50"
                />
                {errors.horario && (
                <span className="text-xs text-red-500"> {errors.horario.message} </span>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide"> Profesor asignado * </label>
                <select
                {...register("profesor", {
                required: "El profesor es obligatorio",
                })}
                className="h-10 border border-gray-200 rounded-lg px-3 text-sm focus:outline-none focus:border-[#1E3A8A] bg-gray-50"
                >
                    <option value="">Seleccioná un profesor</option>
                        {profesores.map((p) => (
                    <option key={p.id} value={p.nombre}>
                        {p.nombre}
                    </option>
                ))}
                </select>
                {errors.profesor && (
                    <span className="text-xs text-red-500"> {errors.profesor.message} </span>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide"> Cupo máximo * </label>
                <input
                type="number"
                {...register("cupoMax", {
                    required: "El cupo es obligatorio",
                    min: 1,
                })}
                className="h-10 border border-gray-200 rounded-lg px-3 text-sm focus:outline-none focus:border-[#1E3A8A] bg-gray-50"
                />
                {errors.cupoMax && (
                <span className="text-xs text-red-500"> {errors.cupoMax.message} </span>
                )}
            </div>

            <div className="flex gap-3 mt-2">
                <button
                type="button"
                onClick={onCerrar}
                className="flex-1 border border-gray-200 text-gray-500 py-2 rounded-lg text-sm hover:bg-gray-50"
                >
                    Cancelar
                </button>
                <button
                type="submit"
                className="flex-1 bg-[#1E3A8A] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#0F1F5C] transition-colors"
                >
                    Guardar cambios
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}

// Modal que muestra los alumnos inscriptos en una clase
function ModalAlumnosClase({ clase, onCerrar }) {
    const [alumnos, setAlumnos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        async function cargar() {
        const data = await getAlumnosPorClase(clase.id);
        setAlumnos(data);
        setCargando(false);
        }
        cargar();
    }, [clase.id]);

    const confirmados = alumnos.filter((a) => a.estado === "CONFIRMADO").length;
    const pendientes = alumnos.filter((a) => a.estado !== "CONFIRMADO").length;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-[#1E3A8A] px-6 py-4 flex justify-between items-center">
                    <div>
                        <p className="text-white font-medium text-sm">{clase.nombre}</p>
                        <p className="text-[#B5D4F4] text-xs">
                            {clase.horario} · {clase.profesor}
                        </p>
                    </div>
                    <button onClick={onCerrar} className="text-white/60 hover:text-white">
                        <IconX size={18} />
                    </button>
                </div>

                {/* Stats rápidas */}
                <div className="flex border-b border-gray-100">
                    <div className="flex-1 px-4 py-3 text-center">
                        <p className="text-lg font-semibold text-gray-900">
                            {alumnos.length}
                        </p>
                        <p className="text-xs text-gray-400">Total</p>
                    </div>
                    <div className="flex-1 px-4 py-3 text-center border-x border-gray-100">
                        <p className="text-lg font-semibold text-green-600">
                            {confirmados}
                        </p>
                        <p className="text-xs text-gray-400">Confirmados</p>
                    </div>
                    <div className="flex-1 px-4 py-3 text-center">
                        <p className="text-lg font-semibold text-amber-500">{pendientes}</p>
                        <p className="text-xs text-gray-400">Pendientes</p>
                    </div>
                </div>

                {/* Lista alumnos */}
                <div className="max-h-72 overflow-y-auto">
                    {cargando && (
                        <p className="text-sm text-gray-400 text-center py-6">
                            Cargando...
                    </p>
                    )}
                    {!cargando && alumnos.length === 0 && (
                        <p className="text-sm text-gray-400 text-center py-6">
                            No hay alumnos inscriptos
                        </p>
                    )}
                    {!cargando &&
                    alumnos.map((alumno) => (
                        <div
                        key={alumno.id}
                        className="flex items-center gap-3 px-5 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50"
                        >
                            <div className="w-7 h-7 rounded-full bg-[#E6F1FB] flex items-center justify-center text-xs font-medium text-[#0C447C] flex-shrink-0">
                                {alumno.nombre
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)
                                .toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-700 truncate">
                                    {alumno.nombre}
                                </p>
                                <p className="text-xs text-gray-400">DNI {alumno.dni}</p>
                            </div>
                            <BadgeEstado estado={alumno.estado} />
                        </div>
                    ))}
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
    );
}

// MODULO CLASES
function ModuloClases() {
    const [clases, setClases] = useState([]);
    const [profesores, setProfesores] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [busqueda, setBusqueda] = useState("");
    const [claseEditar, setClaseEditar] = useState(null);
    const [feedbackId, setFeedbackId] = useState(null);
    const [claseAlumnos, setClaseAlumnos] = useState(null);

    useEffect(() => {
        async function cargar() {
            const [dataClases, dataProfesores] = await Promise.all([
                getClases(),
                getProfesores(),
            ]);
            setClases(dataClases);
            setProfesores(dataProfesores);
            setCargando(false);
        }
        cargar();
    }, []);

    const clasesFiltradas = clases.filter(
        (c) =>
        c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        c.profesor.toLowerCase().includes(busqueda.toLowerCase()),
    );

    async function handleEditar(datos) {
        const actualizada = await editarClase(claseEditar.id, datos);
        setClases((prev) =>
            prev.map((c) => (c.id === actualizada.id ? actualizada : c)),
        );
        setFeedbackId(actualizada.id);
        setTimeout(() => setFeedbackId(null), 2000);
        setClaseEditar(null);
    }

    // Barra de color según cupos
    function colorOcupacion(inscriptos, cupoMax) {
        const pct = inscriptos / cupoMax;
        if (pct >= 1) return "bg-red-500";
        if (pct >= 0.8) return "bg-amber-500";
        return "bg-green-500";
    }

    if (cargando)
        return <p className="text-sm text-gray-400">Cargando clases...</p>;

    return (
    <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#E6F1FB] flex items-center justify-center flex-shrink-0">
                    <IconChalkboard size={22} className="text-[#1E3A8A]" />
                </div>
                <div>
                    <p className="text-xs text-gray-400">Total clases</p>
                    <p className="text-2xl font-semibold text-gray-900">
                        {clases.length}
                    </p>
                    <p className="text-xs text-gray-400">Actividades activas</p>
                </div>
                <div className="ml-auto w-1 h-12 bg-[#1E3A8A] rounded-full"></div>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                        <IconUsers size={22} className="text-green-500" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Total inscriptos</p>
                        <p className="text-2xl font-semibold text-gray-900">
                            {clases.reduce((acc, c) => acc + c.inscriptos, 0)}
                        </p>
                        <p className="text-xs text-gray-400">En todas las clases</p>
                    </div>
                    <div className="ml-auto w-1 h-12 bg-green-500 rounded-full"></div>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                        <IconAlertTriangle size={22} className="text-amber-500" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Clases llenas</p>
                        <p className="text-2xl font-semibold text-gray-900">
                            {clases.filter((c) => c.inscriptos >= c.cupoMax).length}
                        </p>
                        <p className="text-xs text-gray-400">Sin cupos disponibles</p>
                    </div>
                    <div className="ml-auto w-1 h-12 bg-amber-500 rounded-full"></div>
                </div>
            </div>

        {/* Búsqueda */}
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 mb-5">
            <IconSearch size={14} className="text-gray-400" />
            <input
            type="text"
            placeholder="Buscar por clase o profesor..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="bg-transparent text-sm outline-none flex-1 text-gray-700"
            />
        </div>

        {/* Cards de clases */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clasesFiltradas.map((clase) => {
            const cuposLibres = clase.cupoMax - clase.inscriptos;
            const llena = cuposLibres <= 0;

            return (
                <div
                key={clase.id}
                className={`bg-white border rounded-2xl p-5 shadow-sm transition-all
                            ${feedbackId === clase.id ? "border-green-300 bg-green-50" : "border-gray-200"}
                        `}
                >
                {/* Header card */}
                <div className="flex justify-between items-start mb-3">
                    <div>
                    <h3 className="font-semibold text-gray-900 text-sm"> {clase.nombre}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                        {clase.horario}
                    </p>
                    </div>
                    {/* Header card — reemplazá el div de botones */}
                    <div className="flex items-center gap-2">
                    {feedbackId === clase.id && (
                        <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                        <IconCheck size={12} /> Guardado
                        </span>
                    )}
                    <button
                        onClick={() => setClaseAlumnos(clase)}
                        className="text-gray-400 hover:text-[#1E3A8A] transition-colors"
                        title="Ver alumnos"
                    >
                        <IconUsers size={16} />
                    </button>
                    <button
                        onClick={() => setClaseEditar(clase)}
                        className="text-gray-400 hover:text-[#1E3A8A] transition-colors"
                        title="Editar clase"
                    >
                        <IconEdit size={16} />
                    </button>
                    </div>
                </div>

                {/* Profesor */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-[#E6F1FB] flex items-center justify-center text-[10px] font-medium text-[#0C447C]">
                    {clase.profesor.charAt(0)}
                    </div>
                    <p className="text-xs text-gray-600">{clase.profesor}</p>
                </div>

                {/* Sede */}
                <p className="text-xs text-gray-400 mb-3">{clase.sede}</p>

                {/* Barra de ocupación */}
                <div>
                    <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">
                        {clase.inscriptos} / {clase.cupoMax} inscriptos
                    </span>
                    <span
                        className={
                        llena ? "text-red-500 font-medium" : "text-gray-400"
                        }
                    >
                        {llena
                        ? "Sin cupos"
                        : `${cuposLibres} libre${cuposLibres !== 1 ? "s" : ""}`}
                    </span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all ${colorOcupacion(clase.inscriptos, clase.cupoMax)}`}
                        style={{
                        width: `${Math.min((clase.inscriptos / clase.cupoMax) * 100, 100)}%`,
                        }}
                    />
                    </div>
                </div>
                </div>
            );
            })}
        </div>

        {/* Modal editar */}
        {claseEditar && (
            <ModalEditarClase
            clase={claseEditar}
            profesores={profesores}
            onGuardar={handleEditar}
            onCerrar={() => setClaseEditar(null)}
            />
        )}

        {claseAlumnos && (
            <ModalAlumnosClase
            clase={claseAlumnos}
            onCerrar={() => setClaseAlumnos(null)}
            />
        )}
        </div>
    );
}

export default ModuloClases;
