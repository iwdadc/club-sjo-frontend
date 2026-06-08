// FilaAlumno.jsx - Fila de un alumno en la lista de asistencia

import { IconCheck, IconX, IconNotes } from "@tabler/icons-react";

function FilaAlumno ({numero, alumno, presente, onToggle, onObservacion}){
    return(
        <div className="flex flex-col py-3 px-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors gap-2">
            <div className="flex items-center gap-3">
            {/* NUMERO */}
            <span className="text-xs text-gray-400 w-5 text-right flex-shrink-0">
                {numero}
            </span>

            {/* INICIALES */}
            <div className="w-8 h-8 rounded-full bg-[#E6F1FB] flex items-center justify-center text-xs font-medium text-[#0C447C] flex-shrink-0">
                {alumno.nombre.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()}
            </div>

            {/* NOMBRE Y DNI */}
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 truncate">{alumno.nombre}</p>
                <p className="text-xs text-gray-400">DNI {alumno.dni}</p>
            </div>
           

            {/* OBSERVACIONES */}
            <button
            onClick={() => onObservacion(alumno.id)}
            className="text-gray-300 hover:text-[#1E3A8A] transition-colors flex-shrink-0"
            >
                <IconNotes size={16} />
            </button>
            </div>
            <div className="flex gap-2 sm:pl-16">
                {/* BOTONES PRESENTE Y AUSENTE */}
                <div className=" flex gap-2 flex-shrink-0">
                    <button
                    onClick={() => onToggle(alumno.id, true)}
                    className={`flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors
                        ${presente === true
                            ? 'bg-[#1E3A8A] text-white border-[#0C447C]'
                            : 'bg-transparent text-gray-400 border-gray-200 hover:border-[#1E3A8A]'
                        }`
                    }
                    >
                        <IconCheck size={12} /> Presente
                    </button>
                    <button
                    onClick={() => onToggle(alumno.id, false)}
                    className={`flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors
                        ${presente === false
                            ? 'bg-red-500 text-white border-red-600'
                            : 'bg-transparent text-gray-400 border-gray-200 hover:border-red-400'
                        }`  
                    }
                >
                    <IconX size={12}/> Ausente
                </button>
            </div>
            </div>
        </div>
    )
}

export default FilaAlumno