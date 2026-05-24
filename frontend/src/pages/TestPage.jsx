import { useForm } from "react-hook-form"

import Seccion1DatosPrincipales from "../components/formulario/Seccion1DatosPrincipales"

function TestPage() {

  const {
    register,
    formState: { errors }
  } = useForm()

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-6">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-6">

        <Seccion1DatosPrincipales
          register={register}
          errors={errors}
        />

      </div>

    </div>
  )
}

export default TestPage