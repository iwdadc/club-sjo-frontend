// BottomNav.jsx - Navegación inferior para mobile
// Reemplaza al sidebar en pantallas chicas

import { IconLayoutDashboard, IconUsers, IconChalkboard, IconSchool, IconCalendarCheck } from '@tabler/icons-react'

const NAV_ITEMS = [
  { icono: IconLayoutDashboard, label: "Inicio",     id: "dashboard"  },
  { icono: IconUsers,           label: "Alumnos",    id: "alumnos"    },
  { icono: IconChalkboard,      label: "Clases",     id: "clases"     },
  { icono: IconSchool,          label: "Profesores", id: "profesores" },
  { icono: IconCalendarCheck,   label: "Asistencia", id: "asistencia" },
]

function BottomNav({ moduloActivo, setModuloActivo }) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex z-40">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={() => setModuloActivo(item.id)}
          className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors
            ${moduloActivo === item.id
              ? 'text-[#1E3A8A]'
              : 'text-gray-400'
            }`}
        >
          <item.icono size={20} />
          <span className="text-[10px] font-medium">{item.label}</span>
        </button>
      ))}
    </nav>
  )
}

export default BottomNav