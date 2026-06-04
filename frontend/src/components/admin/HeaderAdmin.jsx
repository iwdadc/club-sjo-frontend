// HeaderAdmin.jsx — Topbar del panel admin


import { IconBell } from '@tabler/icons-react'
import logoSjo from '../../assets/logo-sjo.png'

function HeaderAdmin({ usuario, logout }) {
  return (
    <header className="bg-white border-b border-gray-100 px-6 py-3 flex justify-between items-center">

      {/* Logo - solo visible en mobile porque en desktop está en el sidebar */}
      <div className="flex items-center gap-2 md:hidden">
        <div className="w-7 h-7 rounded-full bg-[#E6F1FB] p-0.5">
          <img src={logoSjo} alt="Club San José Obrero" className="w-full h-full object-contain" />
        </div>
        <span className="text-sm font-medium text-[#1E3A8A]">San José Obrero</span>
      </div>

      {/* Título - solo visible en desktop */}
      <h2 className="hidden md:block text-lg font-medium text-gray-800">Inscripciones recientes</h2>

      {/* Derecha */}
      <div className="flex items-center gap-3">
        <button className="text-gray-400 hover:text-[#1E3A8A] transition-colors">
          <IconBell size={18} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#E6F1FB] flex items-center justify-center text-xs font-medium text-[#0C447C]">
            {usuario?.nombre?.charAt(0)}
          </div>
          <span className="text-xs text-gray-500 hidden sm:inline">{usuario?.nombre}</span>
        </div>
        <button
          onClick={logout}
          className="text-xs text-gray-400 hover:text-[#1E3A8A] border border-gray-200 rounded-lg px-3 py-1.5 transition-colors"
        >
          Salir
        </button>
      </div>

    </header>
  )
}

export default HeaderAdmin