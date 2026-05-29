// Seccion6Imagen.jsx — Componente para la sección de imagen del formulario
// Contiene la autorización al uso de imagen del participante

import {
    IconCamera,
    IconBrandInstagram,
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

function Seccion6Imagen({ register, errors, watch }) {
    const autorizacionImagen = watch("autorizacionImagen")

    return (
        <div className="flex flex-col gap-8">

            {/* TEXTO INFORMATIVO */}
            <div className="flex items-center gap-2 p-3 rounded-xl border border-[#B5D4F4] bg-[#E6F1FB]">
                <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-white">
                    <IconCamera size={14} className="text-[#1E3A8A]" />
                </div>

                <div className="flex flex-col gap-0.5">
                    <h4 className="text-xs sm:text-sm font-semibold text-[#1E3A8A]">
                        Uso de material audiovisual
                    </h4>           
                    <p className="text-[11px] sm:text-xs leading-relaxed text-[#0C447C]">
                        Compartimos material audiovisual de las actividades del club en los grupos de WhatsApp de las familias, en nuestro Instagram y en diferente tipos de plataforma que faciliten la difusión del espacio comunitario
                    </p>
                    <a
                    href="https://www.instagram.com/clubsanjoseobrero/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 mt-1 text-[11px] sm:text-xs text-[#1E3A8A] font-medium hover:underline "
                    > 
                        <IconBrandInstagram size={12} />
                        @clubsanjoseobrero
                    </a>
                </div>
            </div>

            {/* TEXTO LEGAL */}
                <div className="flex items-start gap-2 p-3 rounded-xl border border-gray-200 bg-gray-50"> 
                    <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-white border border-gray-200">
                        <IconUserCheck size={14} className="text-gray-500" />
                    </div>
                    <p className="text-[11px] sm:text-xs leading-relaxed text-gray-600">
                    Yo, siendo el adulto mayor a cargo del menor, autorizo para utilizar el material fotográfico, fílmico y audiovisual producido en las actividades organizadas, incluyendo cualquier forma de difusión, distribución, edición, reproducción, publicación y/o adaptación, por cualquier medio o formato, cediendo de manera gratuita el derecho a divulgar la imagen del participante.
                    </p>
                </div>   

            {/* AUTORIZACIÓN */}
            <div>
                <TituloBloque icono={IconCamera} texto="¿Autorizás el uso de imagen?"/>
                <RadioGroup
                label="Seleccioná una opción"
                name="autorizacionImagen"
                direccion="fila"
                options={[
                    { value: "si", label: "Sí, autorizo" },
                    { value: "no", label: "No autorizo" },
                ]}
                register = {register}
                required = {true}
                errors = {errors.autorizacionImagen}
                />

                {/* Advertencia si elige "No autorizo" */}
                {autorizacionImagen === "no" && (
                    <div className="mt-3 flex items-center gap-2 p-3 rounded-xl border border-red-200 bg-red-50">
                        <p className="text-xs text-red-600">
                            Sin autorización, no es posible completar la inscripción ni participar de las actividades del club.
                            Si tenés dudas o querés más información, podés comunicarte con nosotros a través de nuestras redes sociales o por WhatsApp
                        </p>
                    </div>
                )}

                
            </div>

            {/* FIRMA */}
            <div>
                <TituloBloque icono={IconUserCheck} texto="Datos del que autoriza" />
                <Input
                label="Nombre, apellido y DNI del adulto que autoriza"
                name="firmaImagen"
                placeholder="Ej: María González, DNI 28.441.902"
                register={register}
                required={true}
                error={errors.firmaImagen}
                />
            </div>
        </div>  
    )
}

export default Seccion6Imagen