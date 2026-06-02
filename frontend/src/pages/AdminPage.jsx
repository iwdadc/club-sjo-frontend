//AdminPage.jsx - Panel de coordinador (ADMIN)
// Solo accesible para usuarios con rol ADMIN

import {useAuth} from '../context/AuthContext';

function AdminPage() {
  const {usuario, logout} = useAuth();
  return (
    <div className="min-h-screen bg-[#E6F1FB]">

      <div className="bg-[#1E3A8A] px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#1E3A8A] mb-4">Panel de Coordinador</h1>
          <p className="text-sm text-gray-600 mb-6">Club San José Obreroc</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[#B5D4F4] text-xs">Usuario: {usuario?.nombre}</span>
          <button 
          onClick={logout} 
          className="bg-white text-[#1E3A8A] text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-[#E6F1FB] transition-colors"
          >
          Cerrar sesión
          </button>
        </div>
    </div>

    <div className="flex items-center justify-center h-[calc(100vh-64px)]"> 
      <p className="text-[#1E3A8A] font-medium">Panel Admin — en construcción</p>
    </div>
  </div>
  )
}
export default AdminPage