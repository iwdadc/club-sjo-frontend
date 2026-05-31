//Seccion5Autorizacion.jsx — Contiene el consentimiento informado para la participación del menor en las actividades del club, así como la autorización para el uso de datos personales y la firma del adulto responsable.

import {
  IconShieldCheck,
  IconUserCheck,
} from '@tabler/icons-react'

import RadioGroup from '../common/RadioGroup'
import Input from '../common/Input'

function TituloBloque({ icono: Icono, texto }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icono size={16} className="text-[#1E3A8A]" />
      <h3 className="text-sm font-medium text-[#1E3A8A]">{texto}</h3>
    </div>
  )
}

function Seccion5Autorizacion({ register, errors, watch }) {
    const autorizacion = watch("autorizacionActividad")

    return (
        <div className="flex flex-col gap-8">
            {/* TEXTO LEGAL */}
            <div className="flex items-center gap-2 p-3 rounded-xl border border-[#B5D4F4] bg-[#E6F1FB]">
                <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-white">  
                    <IconShieldCheck size={14} className="text-[#1E3A8A]" />
                </div>
                <div className="flex flex-col gap-0.5">
                    <h4 className="text-xs sm:text-sm font-semibold text-[#1E3A8A]">
                        Autorización de la actividad y uso de datos personales
                    </h4>
                    <p className="text-[11px] sm:text-xs leading-relaxed text-[#0C447C]">
                        Yo, siendo el adulto mayor a cargo del menor, autorizo que sea participe de la actividad del <strong>Club Parroquial San José Obrero</strong>, sabiendo que el lugar es libre y gratuito, teniendo el fin de ofrecer un espacio comunitario, eclesial y preventivo donde busca desarrollar el crecimiento  integral de cada participante en contacto con la familia. 
                    </p>
                </div>
            </div>
            
            {/* AUTORIZACIÓN */}
            <div>
                <TituloBloque icono={IconShieldCheck} texto="¿Autorizás la participación del menor en las actividades del club?" />
                <RadioGroup
                    label="Seleccioná una opción"
                    name="autorizacionActividad"
                    direccion="fila"
                    register={register}
                    required={true}
                    options={[
                        { value: "si", label: "Sí, autorizo" },
                        { value: "no", label: "No autorizo" }
                    ]}
                    error={errors.autorizacionActividad} 
                />  

                {/* Advertencia si elige "No autorizo" */}
                {autorizacion === "no" && (
                    <div className="mt-3 flex items-center gap-2 p-3 rounded-xl border border-red-200 bg-red-50">
                        <p className="text-xs text-red-600">
                            Sin autorización, el menor no es posible completar la inscripción ni participar de las actividades del club.
                            Si tenés dudas o querés más información, podés comunicarte con nosotros a través de nuestras redes sociales o por WhatsApp
                        </p>
                    </div>
                )}
            </div>

            {/* FIRMA DEL ADULTO RESPONSABLE */}
            <div>
                <TituloBloque icono={IconUserCheck} texto="Datos del adulto que autoriza" />
                <Input
                    label="Nombre completo y DNI del adulto responsable"
                    name="firmaAutorizacion"
                    placeholder="Ej: Ana Gómez, DNI 28.441.902"
                    register={register}
                    required={true}
                    error={errors.firmaAutorizacion}
                />
            </div>
        </div>
    )

}

export default Seccion5Autorizacion

