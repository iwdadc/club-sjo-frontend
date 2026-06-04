// SidebarAdmin.jsx — Barra lateral de navegación del panel admin

import { IconLayoutDashboard, IconUsers, IconRun, IconClipboardList, IconCalendarCheck, IconReport, IconSettings } from '@tabler/icons-react'
import logoSjo from '../../assets/logo-sjo.png'

const NAV_ITEMS = [
  { icono: IconLayoutDashboard, label: "Dashboard",     activo: true  },
  { icono: IconUsers,           label: "Alumnos",       activo: false },
  { icono: IconRun,             label: "Actividades",   activo: false },
  { icono: IconClipboardList,   label: "Inscripciones", activo: false },
  { icono: IconCalendarCheck,   label: "Asistencia",    activo: false },
  { icono: IconReport,          label: "Reportes",      activo: false },
  { icono: IconSettings,        label: "Configuración", activo: false },
]

function SidebarAdmin() {
  return (
    <aside className="hidden md:flex flex-col w-56 min-h-screen bg-[#0F1F5C] flex-shrink-0">

      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
        <div className="w-10 h-10 rounded-full bg-white p-1 flex-shrink-0">
          <img src={logoSjo} alt="Club San José Obrero" className="w-full h-full object-contain" />
        </div>
        <div>
          <p className="text-sm font-medium text-white leading-tight">San José Obrero</p>
          <p className="text-[10px] text-[#B5D4F4]">Panel de gestión</p>
        </div>
      </div>

      {/* Nav items */} 
      <nav className="flex flex-col py-6 flex-1">
      <p className="px-6 mb-3 text-xs font-semibold tracking-widest text-[#9FC5F8]">PRINCIPAL</p>
       
      {NAV_ITEMS.slice(0, 4).map((item) => (
        <button
        key={item.label}
        className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-all text-left
          ${
            item.activo
            ? 'bg-white/10 text-white border-l-4 border-[#378ADD]'
            : 'text-[#D5E8FF] hover:bg-white/5 border-l-4 border-transparent'
          }`}
        >
      <item.icono size={16} />
      {item.label}
    </button>
  ))}

  <p className="px-6 mt-8 mb-3 text-xs font-semibold tracking-widest text-[#9FC5F8]">
    GESTIÓN
  </p>

  {NAV_ITEMS.slice(4).map((item) => (
    <button
      key={item.label}
      className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#D5E8FF] hover:bg-white/5 border-l-4 border-transparent transition-all text-left"
    >
      <item.icono size={22} />
      {item.label}
    </button>
  ))}
</nav>

    </aside>
  )
}

export default SidebarAdmin