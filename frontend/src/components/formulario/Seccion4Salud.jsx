// Seccion4Salud.jsx  - Cuarta sección del formulario de inscripción
// Contiene obra social, condiciones de salud y síntomas durante el ejercicio

import {
    IconHeart,
    IconHeartRateMonitor,
    IconRun,
    IconEar,
    IconEye,
    IconPill,
    IconNotes,
    IconBuildingHospital,
} from '@tabler/icons-react'

import Input from '../common/Input'
import RadioGroup from '../common/RadioGroup'

import { OBRA_SOCIAL, CONDICIONES_SALUD, SINTOMAS_EJERCICIO } from '../../constants/salud'  

function TituloBloque({ icono: Icono, texto }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icono size={16} className="text-[#1E3A8A]" />
      <h3 className="text-sm font-medium text-[#1E3A8A]">{texto}</h3>
    </div>
  )
}

function FilaCondicion({label, name, register, errors, watch, campoExtra}) {
    const valor = watch(name)

    return (
        <div className="flex flex-col gap-2 py-3 border-b border-gray-100 last:border-0">
            <RadioGroup
                label={label}
                name={name}
                direccion='fila'
                options={[{value: "si", label: "Sí"}, {value: "no", label: "No"}]}
                register={register}
                required={true}
                error={errors[name]}
            />

            {valor === "si" && campoExtra &&(
                <Input
                    label={campoExtra.label}
                    name={campoExtra.name}
                    placeholder={campoExtra.placeholder}
                    register={register}
                    required={true}
                    error={errors[campoExtra.name]}
                />
            )}
        </div>
    )
}

function Seccion4Salud({ register, errors, watch }) {

  return (
    <div className="flex flex-col gap-8">

        {/* OBRA SOCIAL */}
        <div>
            <TituloBloque icono={IconBuildingHospital} texto="Obra social" />
            <div className="flex flex-col gap-3">
            <RadioGroup
                label="¿Posee obra social?"
                name="obraSocial"
                direccion='fila'
                options={OBRA_SOCIAL}
                register={register}
                required={true}
                error={errors.obraSocial}
            />

            {watch("obraSocial") === "si" && (
                <Input
                    label="Nombre de la obra social y N° de afiliado"
                    name="detalleObraSocial"
                    placeholder="Ej: OSDE - 12345678"
                    register={register}
                    required={true}
                    error={errors.detalleObraSocial}
                />
            )}
            </div>
        </div>

        {/* CONDICIONES DE SALUD */}
        <div>
            <TituloBloque icono={IconHeart} texto="Condiciones de salud" />
            <div className="text-xs text-gray-400 mb-2">
                Completa marcando Sí o No según corresponda.
            </div>
            <div className="border border-gray-100 rounded-xl px-4">
                <FilaCondicion
                label="Asma o broncoespasmos a repetición"
                name="asma"
                register={register}
                errors={errors}
                watch={watch}
                />    
                <FilaCondicion
                label="Diabetes"
                name="diabetes"
                register={register}
                errors={errors}
                watch={watch}
                />
                <FilaCondicion
                label="Hipertensión (presión arterial alta)"
                name="hipertension"
                register={register}
                errors={errors}
                watch={watch}
                />
                <FilaCondicion
                label="Hipotensión (presión arterial baja)"
                name="hipotension"
                register={register}
                errors={errors}
                watch={watch}
                />
                <FilaCondicion
                label="Problemas o condiciones cardíacas"
                name="problemasCardiacos"   
                register={register}
                errors={errors}
                watch={watch}
                />
                <FilaCondicion
                label="Celiaquía"
                name="celiaquia"
                register={register}
                errors={errors}
                watch={watch}
                />
                <FilaCondicion
                label="Alergias"
                name="alergias"
                register={register}
                errors={errors}
                watch={watch}
                    campoExtra={{
                        label: "Detalle de alergias",
                        name: "detalleAlergias",
                        placeholder: "Ej: Alergia a frutos secos, alergia a penicilina, etc."
                    }}
                />
                <FilaCondicion
                label="Epilepsia"
                name="epilepsia"
                register={register}
                errors={errors}
                watch={watch}
                />
                <FilaCondicion
                label="Problemas de cintura, columna o extremidades"
                name="problemasColumna"
                register={register}
                errors={errors}
                watch={watch}
                    campoExtra={{
                        label: "Indicar cual es el problema específico de cintura, columna o extremidades",
                        name: "detalleProblemasColumna",
                        placeholder: "Ej: Hernia discal, escoliosis, etc."
                    }}
                />
                <FilaCondicion
                label="Problemas de huesos o articulaciones"
                name="problemasHuesos"
                register={register}
                errors={errors}
                watch={watch}
                />
                <FilaCondicion
                label="Convulsiones"
                name="convulsiones"
                register={register}
                errors={errors}
                watch={watch}
                />
                <FilaCondicion
                label="Condición alimentaria específica"
                name="condicionAlimentaria"
                register={register}
                errors={errors}
                watch={watch}
                    campoExtra={{
                        label: "Indicar cual es la condición alimentaria específica",
                        name: "detalleCondicionAlimentaria",
                        placeholder: "Ej: Vegetariano, vegano, intolerancia a la lactosa, etc."
                    }}
                />   
            </div>
        </div>  

        {/* SÍNTOMAS DURANTE EL EJERCICIO */}
        <div>
            <TituloBloque icono={IconRun} texto="Síntomas durante el ejercicio" />
            <p className="text-xs text-gray-400 mb-3">  
                ¿Ha padecido alguna vez durante o después del ejercicio?     
            </p>
            <div className="border border-gray-100 rounded-xl px-4">
                <FilaCondicion
                    label="Desmayos"
                    name="sintomaDesmayos"
                    register={register}
                    errors={errors}
                    watch={watch}
                />
                <FilaCondicion
                    label="Mareos"
                    name="sintomaMareos"
                    register={register}
                    errors={errors}
                    watch={watch}
                />
                <FilaCondicion
                    label="Palpitaciones"
                    name="sintomaPalpitaciones"
                    register={register}
                    errors={errors}
                    watch={watch}
                />
                <FilaCondicion
                    label="Dolor de pecho"
                    name="sintomaDolorPecho"
                    register={register}
                    errors={errors}
                    watch={watch}
                />
                <FilaCondicion
                    label="Mayor cansancio de lo habitual"
                    name="sintomaMayorCansancio"
                    register={register}
                    errors={errors}
                    watch={watch}
                />
                <FilaCondicion
                    label="Dificultad para respirar"
                    name="sintomaDificultadRespirar"
                    register={register}
                    errors={errors}
                    watch={watch}
                />
                <FilaCondicion
                    label="Disminución de la audición"
                    name="sintomaDisminucionAudicion"
                    register={register}
                    errors={errors}
                    watch={watch}
                        campoExtra={{
                            label: "Especificar diagnóstico de problemática auditiva",
                            name: "detalleSintomaDisminucionAudicion",
                            placeholder: "Ej: Disminución de la audición en oído derecho, causada por otitis media a los 5 años, etc."
                        }}
                />
                <FilaCondicion
                    label="Problemas de visión"
                    name="sintomaProblemasVision"
                    register={register}
                    errors={errors}
                    watch={watch}
                        campoExtra={{
                            label: "Especificar diagnóstico de problemática visual",        
                            name: "detalleSintomaProblemasVision",
                            placeholder: "Ej: Miopía en ambos ojos, con corrección óptica mediante uso de anteojos, etc."
                        }}
                />         
            </div>
        </div>  

        {/* OTRAS CONSIDERACIONES DE SALUD */}
        <div>
            <TituloBloque icono={IconHeartRateMonitor} texto="Otros" />

            <div className="border border-gray-100 rounded-xl px-4">
                <FilaCondicion
                    label="¿Recibe de manera habitual algún tipo de medicación?"
                    name="recibeMedicamentoHabitual"
                    register={register}
                    errors={errors}
                    watch={watch}
                        campoExtra={{
                            label: "Especificar medicación habitual",
                            name: "detalleRecibeMedicamentoHabitual",
                            placeholder: "Ej: Recibe 10 mg de Loratadina una vez al día, etc."
                        }}
                />
                <FilaCondicion
                    label="¿Tuvo alguna operación?"
                    name="tuvoOperacion"
                    register={register}
                    errors={errors}
                    watch={watch}
                        campoExtra={{
                            label: "Especificar operación",
                            name: "detalleTuvoOperacion",
                            placeholder: "Ej: Operación de apendicitis, etc."
                        }}
                />
            </div>
        </div>

        {/* INFORMACIÓN ADICIONAL DE SALUD */}
        <div>
            <TituloBloque icono={IconNotes} texto="Información adicional de salud" />
            <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Indicar alguna otra condición de salud que considere importante
                </label>
                <textarea
                    {...register("informacionAdicionalSalud")}
                    placeholder="Opcional — cualquier información adicional que consideres relevante"
                    rows={3}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1E3A8A] bg-gray-50 resize-none"
                />
        </div>

        </div>
    </div>  
    )
}

export default Seccion4Salud