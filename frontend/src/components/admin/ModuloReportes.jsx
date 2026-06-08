// ModuloReportes.jsx 

import { useState } from "react"

import { IconDownload } from "@tabler/icons-react"

import { REPORTES } from "../../constants/reportesMock"

function ModuloReportes() {
    const [descargando, setDescargando] = useState(null)
    const [descargado,  setDescargado]  = useState(null)

    // Simula la descarga de un reporte
    async function handleDescargar(reporte) {
        setDescargando(reporte.id)
        await new Promise(r => setTimeout(r, 1500))

        // Genera un CSV simple como ejemplo
        const csv = `Reporte: ${reporte.titulo}\nFecha: ${new Date().toLocaleDateString('es-AR')}\nGenerado por: Club San José Obrero\n\nEste reporte estará disponible cuando el backend esté conectado.`
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const url  = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href     = url
        link.download = `${reporte.titulo.replace(/ /g, '_')}.csv`
        link.click()
        URL.revokeObjectURL(url)

        setDescargando(null)
        setDescargado(reporte.id)
        setTimeout(() => setDescargado(null), 3000)
    }
    
    return (
    <div className="p-6">
        {/* Header */}
        <div className="mb-6">
            <h2 className="text-base font-semibold text-gray-900">Reportes disponibles</h2>
            <p className="text-xs text-gray-400 mt-1">
                Descargá los reportes en formato CSV. Cuando el backend esté conectado estarán disponibles en PDF también.
            </p>
        </div>

        {/* Cards de reportes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {REPORTES.map(reporte => (
                <div
                key={reporte.id}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-start gap-4"
                >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${reporte.color}`}>
                    <reporte.icono size={22} />
                </div>
                
                <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm">{reporte.titulo}</p>
                    <p className="text-xs text-gray-400 mt-0.5 mb-3">{reporte.descripcion}</p>

                    <button
                    onClick={() => handleDescargar(reporte)}
                    disabled={descargando === reporte.id}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-colors
                        ${descargado === reporte.id
                            ? 'bg-green-500 text-white'
                            : 'bg-[#1E3A8A] text-white hover:bg-[#0F1F5C]'
                        } disabled:opacity-60`}
                    >
                        <IconDownload size={13} />
                        {descargando === reporte.id
                        ? 'Generando...'
                        : descargado === reporte.id
                        ? '¡Descargado!'
                        : 'Descargar CSV'
                        }       
                    </button>
                </div>

                <div className={`w-1 h-12 rounded-full flex-shrink-0 ${reporte.borde}`}></div>
            </div>
            ))}
        </div>
    </div>
  )
}

export default ModuloReportes