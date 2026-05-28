// Seccion1DatosPrincipales.jsx — Primera sección del formulario de inscripción
// Contiene los datos del participante, adulto responsable, escolaridad y DNI

import {
  IconUser,
  IconId,
  IconSchool,
  IconUsers,
  IconHeart,
  IconHome,
  IconUpload,
} from '@tabler/icons-react'

import Input      from '../common/Input'
import Select     from '../common/Select'
import RadioGroup from '../common/RadioGroup'

import { GENEROS, PARENTESCOS, TURNOS } from '../../constants/opciones'

// Componente interno reutilizable para los títulos de cada bloque
function TituloBloque({ icono: Icono, texto, opcional = false }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icono size={16} className="text-[#1E3A8A]" />
      <h3 className="text-sm font-medium text-[#1E3A8A]">
        {texto}
        {opcional && (
          <span className="text-gray-400 font-normal ml-1">(opcional)</span>
        )}
      </h3>
    </div>
  )
}

function Seccion1DatosPrincipales({ register, errors }) {
  return (
    <div className="flex flex-col gap-8">

      {/* ── DATOS DEL PARTICIPANTE ── */}
      <div>
        <TituloBloque icono={IconUser} texto="Datos del participante" />

        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              label="Nombre y Apellido"
              name="nombreApellido"
              placeholder="Ej: Juan Pérez"
              register={register}
              required={true}
              error={errors.nombreApellido}
            />
            <Input
              label="DNI del participante"
              name="dniParticipante"
              placeholder="Ej: 45.123.456"
              register={register}
              required={true}
              error={errors.dniParticipante}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Select
              label="Género"
              name="genero"
              options={GENEROS}
              register={register}
              required={true}
              error={errors.genero}
            />
            <Input
              label="Fecha de nacimiento"
              name="fechaNacimiento"
              type="date"
              register={register}
              required={true}
              error={errors.fechaNacimiento}
            />
          </div>

          <Input
            label="Domicilio"
            name="domicilio"
            placeholder="Calle, número, barrio"
            register={register}
            required={true}
            error={errors.domicilio}
          />
        </div>
      </div>

      {/* ESCOLARIDAD */}
      <div>
        <TituloBloque icono={IconSchool} texto="Escolaridad" />

        <div className="flex flex-col gap-3">
          <RadioGroup
            label="¿Está yendo al colegio?"
            name="escolaridad"
            direccion="col"
            options={[
              { value: "si",       label: "Sí" },
              { value: "no_yendo", label: "No está yendo" },
              { value: "termino",  label: "No, ya terminó el secundario" },
            ]}
            register={register}
            required={true}
            error={errors.escolaridad}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input
              label="Escuela"
              name="escuela"
              placeholder="Nombre del colegio"
              register={register}
            />
            <Input
              label="Grado y división"
              name="gradoDivision"
              placeholder="Ej: 3° B"
              register={register}
            />
            <Select
              label="Turno"
              name="turno"
              options={TURNOS}
              register={register}
            />
          </div>

          <Input
            label="Ocupación u oficio (solo si es mayor de edad)"
            name="ocupacion"
            placeholder="Opcional"
            register={register}
          />
        </div>
      </div>

      {/* ADULTO RESPONSABLE */}
      <div>
        <TituloBloque icono={IconUsers} texto="Adulto responsable" />

        <div className="flex flex-col gap-3">
          <Input
            label="Nombre y Apellido del adulto responsable"
            name="nombreAdulto"
            placeholder="Nombre completo"
            register={register}
            required={true}
            error={errors.nombreAdulto}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              label="DNI del adulto responsable"
              name="dniAdulto"
              placeholder="Ej: 28.441.902"
              register={register}
              required={true}
              error={errors.dniAdulto}
            />
            <Select
              label="Parentesco"
              name="parentesco"
              options={PARENTESCOS}
              register={register}
              required={true}
              error={errors.parentesco}
            />
          </div>

          <Input
            label="Teléfono de contacto"
            name="telefonoAdulto"
            placeholder="Ej: 11 3456-7890"
            register={register}
            required={true}
            error={errors.telefonoAdulto}
          />  
        </div>
      </div>

      {/* PADRE Y MADRE */}
      <div>
        <TituloBloque icono={IconHeart} texto="Padre / Madre" opcional={true} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            label="Nombre y Apellido del padre"
            name="nombrePadre"
            placeholder="Opcional"
            register={register}
          />
          <Input
            label="DNI del padre"
            name="dniPadre"
            placeholder="Opcional"
            register={register}
          />
          <Input
            label="Nombre y Apellido de la madre"
            name="nombreMadre"
            placeholder="Opcional"
            register={register}
          />
          <Input
            label="DNI de la madre"
            name="dniMadre"
            placeholder="Opcional"
            register={register}
          />
        </div>
      </div>

      {/* CONVIVENCIA */}
      <div>
        <TituloBloque icono={IconHome} texto="Convivencia" />

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            ¿Con quiénes convive? Indicar nombres y parentesco{' '}
            <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("convivencia", { required: "Este campo es obligatorio" })}
            placeholder="Ej: Mamá Ana, Papá Rodrigo, Hermano Lucas..."
            rows={3}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1E3A8A] bg-gray-50 resize-none"
          />
          {errors.convivencia && (
            <span className="text-xs text-red-500">{errors.convivencia.message}</span>
          )}
        </div>
      </div>

      {/* FOTOS DNI */}
      <div>
        <TituloBloque icono={IconId} texto="Fotos del DNI del participante" />

        <div className="flex items-center gap-2 bg-[#E6F1FB] border border-[#B5D4F4] rounded-lg px-3 py-2 mb-3">
          <IconUpload size={14} className="text-[#1E3A8A]" />
          <p className="text-xs text-[#0C447C]">
            PDF, imagen o documento. Máx. 10 MB por archivo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Frente del DNI <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              {...register("dniFrenteFile", { required: "La foto del frente del DNI es obligatoria" })}
              className="text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#E6F1FB] file:text-[#1E3A8A] file:font-medium hover:file:bg-[#B5D4F4] cursor-pointer"
            />
            {errors.dniFrenteFile && (
              <span className="text-xs text-red-500">{errors.dniFrenteFile.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Dorso del DNI <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              {...register("dniDorsoFile", { required: "La foto del dorso del DNI es obligatoria" })}
              className="text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#E6F1FB] file:text-[#1E3A8A] file:font-medium hover:file:bg-[#B5D4F4] cursor-pointer"
            />
            {errors.dniDorsoFile && (
              <span className="text-xs text-red-500">{errors.dniDorsoFile.message}</span>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Seccion1DatosPrincipales