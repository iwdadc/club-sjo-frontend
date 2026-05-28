import { useForm } from "react-hook-form"

import Seccion2Actividad from "../components/formulario/Seccion2Actividad"
import Seccion1DatosPrincipales from "../components/formulario/Seccion1DatosPrincipales"
function TestPage() {

  const {
    register,
    watch,
    formState: { errors }
  } = useForm()

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-6">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-6">

        <Seccion2Actividad
          register={register}
          errors={errors}
          watch={watch} // Pasamos la función watch para observar los valores de los campos
        />

      </div>

    </div>
  )
}

export default TestPage