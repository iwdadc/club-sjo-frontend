// Seccion3Pastoral.jsx - Tercera sección del formulario de inscripción
// Contiene las preguntas relacionadas a la pastoral del club.
// Contiene sacramentos, razon por la que falta/n algu/nos sacramento/s y grupos pastorales

import {
    IconStar,
    IconQuestionMark,
    IconUsersGroup,
    IconInfoCircle,
} from '@tabler/icons-react'

import RadioGroup from '../common/RadioGroup'
import Checkbox   from '../common/Checkbox'
import Input from '../common/Input'

import { SACRAMENTOS, RAZON_SACRAMENTO, GRUPOS_PASTORALES } from '../../constants/opciones'

function TituloBloque({ icono: Icono, texto }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icono size={16} className="text-[#1E3A8A]" />
      <h3 className="text-sm font-medium text-[#1E3A8A]">{texto}</h3>
    </div>
  )
}

function Seccion3Pastoral({ register, errors, watch }) {
    const otrosGrupos = watch("gruposPastorales")

  return (
    <div className="flex flex-col gap-8">

        {/* NOTA INFORMATIVA */}
        <div className="flex items-center gap-2 p-3 rounded-xl border border-[#B5D4F4] bg-[#E6F1FB]">
            <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-white">
                <IconInfoCircle size={14} className="text-[#1E3A8A]" />
            </div>
            <div className="flex flex-col gap-0.5">
                <h4 className="text-xs sm:text-sm font-semibold text-[#1E3A8A]">
                    Comunidad de fe católica
                </h4>           
                <p className="text-[11px] sm:text-xs leading-relaxed text-[#0C447C]">
                    Nuestro club es parroquial. Este año queremos ofrecer catequesis a los chicos que no tengan algunos sacramentos, para todos y sin restricción de edad. <strong>No es excluyente.</strong>
                </p>
            </div>
        </div>
        
        {/* SACRAMENTOS */}
        <div>
            <TituloBloque icono={IconStar} texto="Sacramentos recibidos" />
        
            <Checkbox
            label="¿Cuáles de los siguientes sacramentos ha recibido el participante?"
            name="sacramentos"
            options={SACRAMENTOS}
            register={register}
            error={errors.sacramentos}
            />
        </div>

        {/* RAZÓN FALTA SACRAMENTO */}
        <div>
            <TituloBloque icono={IconQuestionMark} texto="Sobre los sacramentos" />

            <RadioGroup
            label="Si le falta algún sacramento recibir. . . ¿Por qué razón no lo ha recibido?"
            name="razonSacramento"
            options={RAZON_SACRAMENTO}
            register={register}
            required={true}
            error={errors.razonSacramento}
            />
        </div>

        {/* GRUPOS PASTORALES */}
        <div>
            <TituloBloque icono={IconUsersGroup} texto="Grupos pastorales y/o barriales" />

            <Checkbox
            label="¿A qué grupo pastoral pertenece el participante?"
            name="gruposPastorales"
            options={GRUPOS_PASTORALES}
            register={register}
            error={errors.gruposPastorales}
            />
            {Array.isArray(otrosGrupos) && otrosGrupos.includes("otros") && (
                <div className="mt-3">  
                    <Input
                        label="¿Cuáles son los otros grupos pastorales?"
                        name="otrosGruposPastorales"
                        placeholder="Ej: Grupo Juvenil San José, , Pastoral Scout..."
                        register={register}
                        required={true}
                        error={errors.otrosGruposPastorales}
                    />
                </div>
            )}
        </div>
    </div>
  )
}

export default Seccion3Pastoral
