function NotFoundPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#E6F1FB]">

            <h1 className="text-6xl font-bold text-[#1E3A8A]">404</h1>
            <p className="text-2xl text-[#0F1F5C]">Página no encontrada</p>
            <p className="text-sm text-[#3B6FD4]">La dirección que ingresaste no existe.</p>

            <a href="/" className="mt-8 bg-[#1E3A8A] text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-[#0F1F5C] transition-colors">Volver al inicio</a>
        </div>
    )
}

export default NotFoundPage