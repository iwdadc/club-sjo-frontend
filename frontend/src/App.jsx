// App.jsx - Define todas las rutas de la aplicacion
// Se usa React Router para manejar la navegacion como un SPA (Single Page Application)
// Cada ruta corresponde a una vista diferente segun el rol del usuario

import { BrowserRouter, Routes, Route } from "react-router-dom"

import RutaProtegida from "./components/common/RutaProtegida"
import LoginPage from './pages/LoginPage'
import FormularioPage from './pages/FormularioPage'
import AdminPage from './pages/AdminPage'
import ProfesorPage from './pages/ProfesorPage'
import NotFoundPage from './pages/NotFoundPage'


import { IconUser, IconRun, IconHeart } from '@tabler/icons-react'
<IconUser size={16} />
function App() {
  return (
    <BrowserRouter> 
      <Routes>
        {/* Publica - formulario de inscripcion via QR o link*/}
        <Route path="/" element={<FormularioPage />} />

        {/* Autenticacion */}
        <Route path="/login" element={<LoginPage />} />

        {/* Privadas - solo accesibles segun el rol*/}
        <Route path="/admin" element={<RutaProtegida rolRequerido="ADMIN"><AdminPage /></RutaProtegida>} />
        <Route path="/profesor" element={<RutaProtegida rolRequerido="PROFESOR"><ProfesorPage /></RutaProtegida>} />

        {/* Cualquier ruta inexistente */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App