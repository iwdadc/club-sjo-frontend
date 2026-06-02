// LoginPage.jsx - Página de login
// Permite el acceso al panel admin y profesor según el rol (RBAC)

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useAuth } from '../context/AuthContext';
import { loginService } from '../services/authService';

import logoSjo from '../assets/logo-sjo.png';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();
  
  async function onSubmit({email, password}) {
    console.log('Email:', email);
    console.log('Password:', password);
    try {
      setCargando(true);
      setError(null);

      const usuario = await loginService({ email, password });
      login(usuario)

      if (usuario.rol === 'ADMIN') {
        navigate('/admin');
      } else if (usuario.rol === 'PROFESOR') {
        navigate('/profesor');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  }

  return(
    <div className="min-h-screen bg-[#E6F1FB] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow p-8 w-full max-w-sm">

        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-white border border-[#B5D4F4] p-1.5 shadow mb-3">
            <img 
            src={logoSjo} 
            alt="Club San José Obrero" 
            className="w-full h-full object-contain" />
          </div>
          <h1 className="text-lg font-semibold text-[#1E3A8A]">Club San José Obrero</h1>
          <p className="text-xs text-gray-400">Panel de gestión</p>
        </div>
        
        {/* Formulario de login */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</label>
            <input
             type="email"
              placeholder="correo@ejemplo.com"
              {...register('email', { required: 'El email es obligatorio' })}
              className= "h-10 border border-gray-200 rounded-lg px-3 text-sm focus:outline-none focus:border-[#1E3A8A] bg-gray-50"
            />
            {errors.email &&  (
              <span className="text-xs text-red-500">{errors.email.message}</span>
              )}
              </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Contraseña</label>
              <input
                type="password"
                placeholder="••••••••"
                {...register('password', { required: 'La contraseña es obligatoria' })}
                className= "h-10 border border-gray-200 rounded-lg px-3 text-sm focus:outline-none focus:border-[#1E3A8A] bg-gray-50"
              />
              {errors.password &&  (
              <span className="text-xs text-red-500">{errors.password.message}</span>
              )}
            </div>
              
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  <p className="text-xs text-red-600">{error}</p>
                </div>
              )}
              
              <button
              type="submit"
                disabled={cargando}
                className="w-full bg-[#1E3A8A] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#0F1F5C] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {cargando ? 'Ingresando...' : 'Ingresar'}
              </button>

            </form>
          
            

          {/* Credenciales de prueba */}
          <div className="mt-6 border-t border-gray-100 pt-4">
            <p className="text-xs text-gray-400 mb-2 text-center">Credenciales de prueba</p>
            <div className="flex flex-col gap-1 text-xs text-gray-500">
              <span>👤 admin@sanjoseobrero.ar / admin123</span>
              <span>👤 profesor@sanjoseobrero.ar / profesor123</span>
            </div>
          </div>

    </div>
  </div>
  )
}
export default LoginPage