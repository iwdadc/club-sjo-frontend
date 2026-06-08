// RutaProtegida.jsx - Componente para proteger rutas que requieren autenticación

import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function RutaProtegida({ children, rolRequerido }) {
  const { usuario, cargando } = useAuth();
  console.log("usuario:", usuario);
  console.log("cargando:", cargando);

    if (cargando) {
        return (
            <div className="min-h-screen bg-[#E6F1FB] flex items-center justify-center">
                <p className="text-sm text-[#1E3A8A]">Cargando...</p>
            </div>
        ) 
    }
    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    if (usuario.rol !== rolRequerido) {
        return <Navigate to="/login" replace />
    }

    return children;
}   

export default RutaProtegida