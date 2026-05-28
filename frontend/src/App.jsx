// App.jsx - Define todas las rutas de la aplicacion
// Se usa React Router para manejar la navegacion como un SPA (Single Page Application)
// Cada ruta corresponde a una vista diferente segun el rol del usuario

import { BrowserRouter, Routes, Route } from "react-router-dom"

import LoginPage from './pages/LoginPage'
import FormularioPage from './pages/FormularioPage'
import AdminPage from './pages/AdminPage'
import ProfesorPage from './pages/ProfesorPage'
import NotFoundPage from './pages/NotFoundPage'
import TestPage from './pages/TestPage'

import { IconUser, IconRun, IconHeart } from '@tabler/icons-react'
<IconUser size={16} />
function App() {
  return (
    <BrowserRouter> 
      <Routes>
        {/* Publica - formulario de inscripcion via QR o link*/}
        <Route path="/" element={<TestPage />} />

        {/* Autenticacion */}
        <Route path="/login" element={<LoginPage />} />

        {/* Privadas - solo accesibles segun el rol*/}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/profesor" element={<ProfesorPage />} />

        <Route path="/testPage" element={<TestPage />} />

        {/* Cualquier ruta inexistente */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App