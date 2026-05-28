//RadioGroup Componentes utilizados para opciones de seleccion unica

function RadioGroup({ label, name, options, register, required = false, error, direccion = "col" }) {
    return (
        <div className="flex flex-col gap-1">

            {/* Label del campo */}
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            {/* Opciones */}
            <div className={` flex gap-3 ${direccion === "fila" ? "flex-row flex-wrap" : "flex-col" } `}>
                {options.map((op)=> (
                    <label key={op.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            value={op.value}
                            {...register(name, { required : required ? `${label} es obligatorio` : false})}
                            className="accent-[#1E3A8A] w-4 h-4"
                        />
                        <span className="text-sm text-gray-700">{op.label}</span>
                    </label>
                ))}
            </div>

            {/* Error */}
            {error && (
                <span className="text-red-500 text-sm">{error.message}</span>
            )}
        </div>
    )
}

export default RadioGroup