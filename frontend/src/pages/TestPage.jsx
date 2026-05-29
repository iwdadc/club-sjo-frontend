import { useForm } from "react-hook-form"

import Seccion2Actividad from "../components/formulario/Seccion2Actividad"
import Seccion1DatosPrincipales from "../components/formulario/Seccion1DatosPrincipales"
import Seccion3Pastoral from "../components/formulario/Seccion3Pastoral"
import Seccion4Salud from "../components/formulario/Seccion4Salud"
import Seccion5Autorizacion from "../components/formulario/Seccion5Autorizacion"
import Seccion6Imagen from "../components/formulario/Seccion6Imagen"
function TestPage() {

  const {
    register,
    watch,
    formState: { errors }
  } = useForm()

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-6">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-6">
        <Seccion6Imagen
          register={register}
          errors={errors}
          watch={watch}
        />

      </div>

    </div>
  )
}

export default TestPage