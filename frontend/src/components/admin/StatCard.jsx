// StatCard.jsx - Componente reutilizable para mostrar una estadística 

function StatCard({titulo, valor, delta, deltaNegativo = false }) {
  return (
    <div className="bg-[#F3F2EE] rounded-2xl p-6 border border-[#E2E0DA]    ">
        <p className="text-sm text-gray-500 mb-1">{titulo}</p>
        <p className="text-4xl font-semibold text-gray-900">{valor}</p>
        {delta && (
            <p className={`text-sm mt-2 ${deltaNegativo ? 'text-orange-600' : 'text-[#1E3A8A]'}`}>
                {delta}
            </p>
        )}
    </div>
    )
}

export default StatCard 
