// FormularioPage.jsx — Página principal del formulario público de inscripción
// Orquesta las 6 secciones, maneja el stepper, progreso y el submit final


import { useState } from 'react'
import { useForm  } from 'react-hook-form'

import logoSjo from '../assets/logo-sjo.png'

import Seccion1DatosPrincipales from '../components/formulario/Seccion1DatosPrincipales'
import Seccion2Actividad        from '../components/formulario/Seccion2Actividad'
import Seccion3Pastoral         from '../components/formulario/Seccion3Pastoral'
import Seccion4Salud            from '../components/formulario/Seccion4Salud'
import Seccion5Autorizacion     from '../components/formulario/Seccion5Autorizacion'
import Seccion6Imagen           from '../components/formulario/Seccion6Imagen'


const PASOS = [
  { numero: 1, titulo: "Datos principales",   subtitulo: "Participante y responsable"  },
  { numero: 2, titulo: "Actividad",            subtitulo: "Sede y actividad"            },
  { numero: 3, titulo: "Pastoral",             subtitulo: "Sacramentos y grupos"        },
  { numero: 4, titulo: "Salud",                subtitulo: "Condiciones y medicación"    },
  { numero: 5, titulo: "Autorización",         subtitulo: "Autorización a la actividad" },
  { numero: 6, titulo: "Imagen",               subtitulo: "Uso de imagen"               },
]

function FormularioPage() {
  // Estado que controla en qué sección estamos (arranca en 1)
  const [pasoActual, setPasoActual] = useState(1)

  // Estado que controla si el formulario fue enviado con éxito
  const [enviado, setEnviado] = useState(false)

  // react-hook-form — un solo formulario para todas las secciones
  const { register, handleSubmit, watch, formState: { errors } } = useForm()

  // Porcentaje de progreso para la barra
  const progreso = Math.round((pasoActual / PASOS.length) * 100)

  // Avanzar al siguiente paso
  function siguientePaso() {
    if (pasoActual < PASOS.length) setPasoActual(pasoActual + 1)
  }

  // Volver al paso anterior
  function pasoAnterior() {
    if (pasoActual > 1) setPasoActual(pasoActual - 1)
  }

  // Submit final — se ejecuta cuando el usuario completa la sección 6
  function onSubmit(datos) {
    console.log("Datos del formulario:", datos)
    setEnviado(true)
  }

  // PANTALLA DE CONFIRMACIÓN 
  // Se muestra después del submit exitoso
  if (enviado) {
    return (
      <div className="min-h-screen bg-[#E6F1FB] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow p-8 max-w-md w-full text-center">

          <img
            src={logoSjo}
            alt="Club San José Obrero"
            className="w-20 h-20 mx-auto mb-4 object-contain"
          />

          <h2 className="text-xl font-semibold text-[#1E3A8A] mb-3">
            ¡GRACIAS por la paciencia y por completar los datos!
          </h2>

          <p className="text-sm text-[#0C447C] leading-relaxed mb-4">
            Vamos a verificar tus datos y si sos nuevo, comunicarnos con vos.
            Si ya venías a la actividad, verificar que estés en el grupo y
            tener tus datos actualizados.
          </p>

          <p className="text-sm font-semibold text-[#1E3A8A] mb-4">
            GRACIAS por ser parte y por compartir juntos un 2026 JUNTOS 💙
          </p>

          <a
            href="https://www.instagram.com/clubsanjoseobrero/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[#1E3A8A] font-medium hover:underline"
          >
            Seguinos en Instagram @clubsanjoseobrero
          </a>

        </div>
      </div>
    )
  }

  // FORMULARIO PRINCIPAL
  return (
    <div className="min-h-screen bg-[#E6F1FB] py-6 px-4">
      <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="bg-[#1E3A8A] rounded-t-2xl px-6 py-4 flex items-center gap-4">
          <div className="flex-shrink-0 w-14 h-14 rounded-full bg-white p-1.5 flex items-center justify-center shadow">
            <img
            src={logoSjo}
            alt="Club San José Obrero"
            className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-base font-semibold text-white">
              Club San José Obrero
            </h1>
            <p className="text-xs text-[#B5D4F4]">
              Inscripciones 2026 — Formulario oficial
            </p>
          </div>
        </div>

        {/* BARRA DE PROGRESO */}
        <div className="bg-white px-6 pt-4 pb-2">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Sección {pasoActual} de {PASOS.length} — {PASOS[pasoActual - 1].titulo}</span>
            <span className="text-[#1E3A8A] font-medium">{progreso}%</span>
          </div>
          <div className="h-1.5 bg-[#B5D4F4] rounded-full">
            <div
              className="h-full bg-[#1E3A8A] rounded-full transition-all duration-300"
              style={{ width: `${progreso}%` }}
            />
          </div>
        </div>

        {/* STEPPER */}
        <div className="bg-white px-6 pb-4 flex items-center gap-1 flex-wrap">
          {PASOS.map((paso) => (
            <div key={paso.numero} className="flex items-center gap-1 px-5">
              <div className={`
                flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium
                ${pasoActual === paso.numero
                  ? 'bg-[#1E3A8A] text-white ring-2 ring-[#B5D4F4]'
                  : pasoActual > paso.numero
                  ? 'bg-[#1E3A8A] text-white'
                  : 'bg-gray-100 text-gray-400'}
              `}>
                {pasoActual > paso.numero ? '✓' : paso.numero}
              </div>
              <span className={`
                text-[10px] hidden sm:inline
                ${pasoActual === paso.numero ? 'text-[#1E3A8A] font-medium' : 'text-gray-400'}
              `}>
                {paso.titulo}
              </span>
              {paso.numero < PASOS.length && (
                <div className="w-4 h-px bg-gray-200 mx-1" />
              )}
            </div>
          ))}
        </div>

        {/* CONTENIDO DE LA SECCIÓN ACTUAL */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white px-6 py-6 border-t border-gray-100">
            {pasoActual === 1 && <Seccion1DatosPrincipales register={register} errors={errors} />}
            {pasoActual === 2 && <Seccion2Actividad        register={register} errors={errors} watch={watch} />}
            {pasoActual === 3 && <Seccion3Pastoral         register={register} errors={errors} watch={watch} />}
            {pasoActual === 4 && <Seccion4Salud            register={register} errors={errors} watch={watch} />}
            {pasoActual === 5 && <Seccion5Autorizacion     register={register} errors={errors} watch={watch} />}
            {pasoActual === 6 && <Seccion6Imagen           register={register} errors={errors} watch={watch} />}
          </div>

          {/* FOOTER — botones de navegación */}
          <div className="bg-white rounded-b-2xl px-6 py-4 border-t border-gray-100 flex justify-between items-center">
            <button
              type="button"
              onClick={pasoAnterior}
              disabled={pasoActual === 1}
              className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← Anterior
            </button>

            <span className="text-xs text-gray-400">* campos obligatorios</span>

            {/* En la última sección el botón envía, en las demás avanza */}
            {pasoActual < PASOS.length ? (
              <button
                type="button"
                onClick={siguientePaso}
                className="px-4 py-2 text-sm bg-[#1E3A8A] text-white rounded-lg font-medium hover:bg-[#0F1F5C] transition-colors"
              >
                Siguiente →
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-[#1E3A8A] text-white rounded-lg font-medium hover:bg-[#0F1F5C] transition-colors"
              >
                Enviar inscripción ✓
              </button>
            )}
          </div>
        </form>

      </div>
    </div>
  )
}

export default FormularioPage