//Checkbox.jsx - Componente reutilizable para seleccion multiple

function Checkbox({ label, name, options, register, required = false, error }) {
    return (
        <div className="flex flex-col gap-1">

            {/* Label del campo */}
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            {/* Opciones */}
            <div className="flex flex-col gap-2">
                {options.map((op) => (
                    <label key={op.value} className="flex items-center gap-2 cursor-pointer">
                        <input 
                            type="checkbox"
                            value={op.value}
                            {...register(name, { 
                                validate: required 
                                ? (value) => value.length > 0|| `${label} es obligatorio` : undefined
                                }
                            )}
                            className="accent-[#1E3A8A] w-4 h-4 rounded"
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

export default Checkbox
