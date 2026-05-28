//Seccion2Actividad.jsx Segunda sección del formulario de inscripción
//Contiene los campos relacionados a la actividad a la que se inscribe el menor, como sede, actividad, antigüedad, etc.

import {
  IconRun,
  IconMapPin,
  IconBrandWhatsapp,
  IconCalendar,
  IconWalk,
} from '@tabler/icons-react'

import RadioGroup from '../common/RadioGroup'
import Select     from '../common/Select'
import Input      from '../common/Input'
import Checkbox   from '../common/Checkbox'

import { SEDES, ACTIVIDADES, ANIOS_PARTICIPACION } from '../../constants/actividades'
import { RETIRO_MENOR }                             from '../../constants/opciones'


function TituloBloque({ icono: Icono, texto }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icono size={16} className="text-[#1E3A8A]" />
      <h3 className="text-sm font-medium text-[#1E3A8A]">{texto}</h3>
    </div>
  )
}

function Seccion2Actividad({ register, errors, watch }) {
  // watch nos permite observar el valor actual de un campo
  // Lo usamos para mostrar el campo "quién lo busca" solo si eligió que no se retira solo

  const retiro = watch("retiroMenor")

  return (  
    <div className="flex flex-col gap-8">

      {/* SEDE */}
      <div>
        <TituloBloque icono={IconMapPin} texto="Sede del club" />
        <Checkbox
          label="¿En qué sede realizará la actividad?"
          name="sede"
          options={SEDES}
          register={register}
          required={true}
          error={errors.sede}
        />
      </div>

      {/* ACTIVIDADES */}
      <div>
        <TituloBloque icono={IconWalk} texto="Actividad"/>
        <Checkbox
          label="Actividad/es a la/s que se inscribe"
          name="actividades"
          options={ACTIVIDADES}
          register={register}
          required={true}
          error={errors.actividades}
        />
      </div>

      {/* ANTIGÜEDAD */}
      <div>
        <TituloBloque icono={IconCalendar} texto="Antigüedad en el club" />
        <Select
          label="¿Desde cuando participa de las actividades del club?"
          name="antiguedad"
          options={ANIOS_PARTICIPACION}
          register={register}
          required={true}
          error={errors.antiguedad}
        />
      </div>

      {/* WHATSAPP */}
      <div>
        <TituloBloque icono={IconBrandWhatsapp} texto="WhatsApp del grupo" />
        <div className="flex items-center gap-2 p-3 rounded-xl border border-[#B5D4F4] bg-[#E6F1FB] mb-3">
          <div className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-[#25D366] text-white">
            <IconBrandWhatsapp size={14} />
          </div>
          <div className="flex flex-col gap-0.5">
            <h4 className="text-xs sm:text-sm font-semibold text-[#1E3A8A]" >
              Medio de comunicación oficial
            </h4>
            <p className="text-[11px] sm:text-xs leading-relaxed text-[#0C447C]">
              Con este número te agregaremos al grupo de WhatsApp de la actividad, donde compartiremos avisos e información importante.
            </p>
          </div>
        </div>
        <Input
          label="N° de celular, nombre y parentesco"
          name="whatsapp"
          placeholder="Ej: 11xxxxx Mamá Cintia"
          register={register}
          required={true}
          error={errors.whatsapp}
        />
      </div>
      {/* RETIRO MENOR */}
      <div>
        <TituloBloque icono={IconRun} texto="Retiro del menor" />
        <RadioGroup
          label="¿Cómo se retirará el menor de la actividad ?"
          name="retiroMenor"
          options={RETIRO_MENOR}
          register={register}
          required={true}
          error={errors.retiroMenor}
        />
      </div>
      
      {/* QUIÉN LO BUSCA */}
      {retiro === "buscan" && (
        <div className="mt-3">
          <TituloBloque icono={IconBrandWhatsapp} texto="Quién lo busca" />
          <Input
            label="¿Quién lo va a buscar y cuál es su número de contacto?"
            name="quienBusca"
            placeholder="Ej: Papá Roberto — 11xxxxx"
            register={register}
            required={true}
            error={errors.quienBusca}
          />
        </div>
      )}

    </div>
  )
}

export default Seccion2Actividad