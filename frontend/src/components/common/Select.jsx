//Select.jsx — Componente reutilizable para campos de selección (desplegables)

function Select({ label, name, options, register, required = false, error }) {
    return (
        <div className="flex flex-col gap-1">

            {/* Label del campo */}
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            {/* Select */}
            <select
                {...register(name, { required : required ? `${label} es obligatorio` : false })}
                className="h-10 text-sm border border-gray-200 rounded-lg px-3 focus:outline-none focus:border-[#1E3A8A] bg-gray-50"
            >
                <option value="">Seleccione una opción</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {/* Error */}
            {error && (
                <span className="text-xs text-red-500">{error.message}</span>
            )}
        </div>
    )
}

export default Select