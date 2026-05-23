import {
    GraduationCap,
    ChalkboardTeacher,
    BookOpen,
    Plant,
    Globe,
    Star,
    MagnifyingGlass,
    CreditCard,
    CheckCircle,
} from "@phosphor-icons/react"

export const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white font-mono">
            {/* ===== NAVBAR ===== */}
            <header className="sticky top-0 z-50 bg-white border-b border-slate-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
                    {/* Logo */}
                    <a href="#" className="flex items-center gap-2 text-[#1e293b] font-bold text-lg">
                        <GraduationCap size={28} weight="duotone" />
                        <span>Aula</span>
                    </a>

                    {/* Nav links — hidden on mobile */}
                    <nav className="hidden md:flex items-center gap-8 text-sm text-slate-600">
                        <a href="#" className="hover:text-[#1e293b] transition-colors">Inicio</a>
                        <a href="#" className="hover:text-[#1e293b] transition-colors">Planificaciones</a>
                        <a href="#" className="hover:text-[#1e293b] transition-colors">Sobre nosotros</a>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <a
                            href="#"
                            className="hidden sm:inline-flex text-sm px-4 py-2 rounded-xl border border-slate-200 text-[#1e293b] hover:bg-slate-50 transition-colors"
                        >
                            Iniciar sesión
                        </a>
                        <a
                            href="#"
                            className="text-sm px-4 py-2 rounded-xl bg-[#1e293b] text-white hover:bg-[#0f172a] transition-colors"
                        >
                            Registrarse
                        </a>
                    </div>
                </div>
            </header>

            {/* ===== HERO ===== */}
            <section className="bg-gradient-to-b from-white to-slate-50 py-20 sm:py-28">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
                    {/* Badge */}
                    <span className="inline-block mb-6 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold tracking-wide">
                        📚 Planificaciones para docentes
                    </span>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1e293b] leading-tight mb-6">
                        Planificaciones educativas listas para usar en el aula
                    </h1>

                    <p className="text-slate-500 text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
                        Ahorrá tiempo con planificaciones de calidad, organizadas por materia y grado. Creadas por docentes, para docentes.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                            href="#"
                            className="px-6 py-3 rounded-xl bg-[#1e293b] text-white hover:bg-[#0f172a] transition-colors text-sm font-semibold"
                        >
                            Ver planificaciones →
                        </a>
                        <a
                            href="#"
                            className="px-6 py-3 rounded-xl border border-slate-200 text-[#1e293b] hover:bg-slate-50 transition-colors text-sm font-semibold"
                        >
                            Saber más
                        </a>
                    </div>
                </div>
            </section>

            {/* ===== CATEGORÍAS ===== */}
            <section className="bg-[#f1f5f9] py-16 sm:py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#1e293b] text-center mb-12">
                        Explorá por materia
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                        {/* Matemática */}
                        <div className="bg-white rounded-2xl p-6 flex flex-col items-center gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-slate-100">
                            <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
                                <ChalkboardTeacher size={28} weight="duotone" className="text-purple-600" />
                            </div>
                            <div className="text-center">
                                <p className="font-semibold text-[#1e293b] text-sm">Matemática</p>
                                <p className="text-xs text-slate-400 mt-1">12 planificaciones disponibles</p>
                            </div>
                        </div>

                        {/* Lengua */}
                        <div className="bg-white rounded-2xl p-6 flex flex-col items-center gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-slate-100">
                            <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center">
                                <BookOpen size={28} weight="duotone" className="text-amber-600" />
                            </div>
                            <div className="text-center">
                                <p className="font-semibold text-[#1e293b] text-sm">Lengua</p>
                                <p className="text-xs text-slate-400 mt-1">9 planificaciones disponibles</p>
                            </div>
                        </div>

                        {/* Naturales */}
                        <div className="bg-white rounded-2xl p-6 flex flex-col items-center gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-slate-100">
                            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                                <Plant size={28} weight="duotone" className="text-green-600" />
                            </div>
                            <div className="text-center">
                                <p className="font-semibold text-[#1e293b] text-sm">Ciencias Naturales</p>
                                <p className="text-xs text-slate-400 mt-1">7 planificaciones disponibles</p>
                            </div>
                        </div>

                        {/* Sociales */}
                        <div className="bg-white rounded-2xl p-6 flex flex-col items-center gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-slate-100">
                            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                                <Globe size={28} weight="duotone" className="text-blue-600" />
                            </div>
                            <div className="text-center">
                                <p className="font-semibold text-[#1e293b] text-sm">Ciencias Sociales</p>
                                <p className="text-xs text-slate-400 mt-1">8 planificaciones disponibles</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== PLANIFICACIONES DESTACADAS ===== */}
            <section className="bg-white py-16 sm:py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#1e293b] mb-3">
                            Planificaciones más vendidas
                        </h2>
                        <p className="text-slate-400 text-sm">Las más elegidas por docentes de todo el país</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Card 1 — Matemática */}
                        <div className="rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col gap-4">
                            <div className="flex items-start justify-between">
                                <span className="inline-block px-2 py-1 rounded-full bg-purple-100 text-purple-600 text-xs font-semibold">
                                    Matemática
                                </span>
                                <span className="text-xs text-slate-400">3° grado</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-[#1e293b] text-base">Números Naturales</h3>
                            </div>
                            <div className="flex items-center gap-1 text-amber-400 text-xs">
                                <Star size={14} weight="fill" />
                                <span className="font-semibold text-slate-600">4.9</span>
                                <span className="text-slate-400 ml-1">· 24 ventas</span>
                            </div>
                            <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                                <span className="text-xl font-bold text-[#1e293b]">$1.000</span>
                                <a
                                    href="#"
                                    className="text-xs px-4 py-2 rounded-xl bg-[#1e293b] text-white hover:bg-[#0f172a] transition-colors"
                                >
                                    Ver planificación
                                </a>
                            </div>
                        </div>

                        {/* Card 2 — Lengua */}
                        <div className="rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col gap-4">
                            <div className="flex items-start justify-between">
                                <span className="inline-block px-2 py-1 rounded-full bg-amber-100 text-amber-600 text-xs font-semibold">
                                    Lengua
                                </span>
                                <span className="text-xs text-slate-400">5° grado</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-[#1e293b] text-base">Comprensión Lectora</h3>
                            </div>
                            <div className="flex items-center gap-1 text-amber-400 text-xs">
                                <Star size={14} weight="fill" />
                                <span className="font-semibold text-slate-600">4.8</span>
                                <span className="text-slate-400 ml-1">· 19 ventas</span>
                            </div>
                            <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                                <span className="text-xl font-bold text-[#1e293b]">$1.200</span>
                                <a
                                    href="#"
                                    className="text-xs px-4 py-2 rounded-xl bg-[#1e293b] text-white hover:bg-[#0f172a] transition-colors"
                                >
                                    Ver planificación
                                </a>
                            </div>
                        </div>

                        {/* Card 3 — Naturales */}
                        <div className="rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col gap-4">
                            <div className="flex items-start justify-between">
                                <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold">
                                    Naturales
                                </span>
                                <span className="text-xs text-slate-400">4° grado</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-[#1e293b] text-base">Sistema Solar</h3>
                            </div>
                            <div className="flex items-center gap-1 text-amber-400 text-xs">
                                <Star size={14} weight="fill" />
                                <span className="font-semibold text-slate-600">4.7</span>
                                <span className="text-slate-400 ml-1">· 14 ventas</span>
                            </div>
                            <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                                <span className="text-xl font-bold text-[#1e293b]">$900</span>
                                <a
                                    href="#"
                                    className="text-xs px-4 py-2 rounded-xl bg-[#1e293b] text-white hover:bg-[#0f172a] transition-colors"
                                >
                                    Ver planificación
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== CÓMO FUNCIONA ===== */}
            <section className="bg-[#f1f5f9] py-16 sm:py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#1e293b] text-center mb-12">
                        ¿Cómo funciona?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Paso 1 */}
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-full bg-[#1e293b] flex items-center justify-center">
                                    <MagnifyingGlass size={28} weight="duotone" className="text-white" />
                                </div>
                                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-[#1e293b] text-[#1e293b] text-xs font-bold flex items-center justify-center">
                                    1
                                </span>
                            </div>
                            <h3 className="font-bold text-[#1e293b] text-base">Elegís</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Explorá el catálogo y filtrá por materia, grado o palabras clave
                            </p>
                        </div>

                        {/* Paso 2 */}
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-full bg-[#1e293b] flex items-center justify-center">
                                    <CreditCard size={28} weight="duotone" className="text-white" />
                                </div>
                                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-[#1e293b] text-[#1e293b] text-xs font-bold flex items-center justify-center">
                                    2
                                </span>
                            </div>
                            <h3 className="font-bold text-[#1e293b] text-base">Comprás</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Pagá de forma segura y recibís acceso inmediato al material
                            </p>
                        </div>

                        {/* Paso 3 */}
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-full bg-[#1e293b] flex items-center justify-center">
                                    <CheckCircle size={28} weight="duotone" className="text-white" />
                                </div>
                                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-[#1e293b] text-[#1e293b] text-xs font-bold flex items-center justify-center">
                                    3
                                </span>
                            </div>
                            <h3 className="font-bold text-[#1e293b] text-base">Usás en clase</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Descargá la planificación y llevala lista al aula
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== TESTIMONIOS ===== */}
            <section className="bg-white py-16 sm:py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#1e293b] text-center mb-12">
                        Lo que dicen los docentes
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Testimonio 1 */}
                        <div className="rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#1e293b] text-white flex items-center justify-center font-bold text-sm">
                                    M
                                </div>
                                <div>
                                    <p className="font-semibold text-[#1e293b] text-sm">María G.</p>
                                    <div className="flex items-center gap-0.5 text-amber-400">
                                        <Star size={12} weight="fill" />
                                        <Star size={12} weight="fill" />
                                        <Star size={12} weight="fill" />
                                        <Star size={12} weight="fill" />
                                        <Star size={12} weight="fill" />
                                    </div>
                                </div>
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                "Excelente material, muy completo y fácil de adaptar. Me ahorró horas de trabajo."
                            </p>
                        </div>

                        {/* Testimonio 2 */}
                        <div className="rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#1e293b] text-white flex items-center justify-center font-bold text-sm">
                                    L
                                </div>
                                <div>
                                    <p className="font-semibold text-[#1e293b] text-sm">Lucas P.</p>
                                    <div className="flex items-center gap-0.5 text-amber-400">
                                        <Star size={12} weight="fill" />
                                        <Star size={12} weight="fill" />
                                        <Star size={12} weight="fill" />
                                        <Star size={12} weight="fill" />
                                        <Star size={12} weight="fill" />
                                    </div>
                                </div>
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                "Las planificaciones están muy bien organizadas. Las uso en todos mis grados."
                            </p>
                        </div>

                        {/* Testimonio 3 */}
                        <div className="rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#1e293b] text-white flex items-center justify-center font-bold text-sm">
                                    S
                                </div>
                                <div>
                                    <p className="font-semibold text-[#1e293b] text-sm">Sofía R.</p>
                                    <div className="flex items-center gap-0.5 text-amber-400">
                                        <Star size={12} weight="fill" />
                                        <Star size={12} weight="fill" />
                                        <Star size={12} weight="fill" />
                                        <Star size={12} weight="fill" />
                                        <Star size={12} weight="regular" />
                                    </div>
                                </div>
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                "Muy buen contenido, se nota que está hecho por alguien que conoce el aula."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== CTA FINAL ===== */}
            <section className="bg-[#1e293b] py-16 sm:py-20">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                        ¿Sos docente y querés ahorrar tiempo?
                    </h2>
                    <p className="text-slate-400 text-sm sm:text-base mb-8">
                        Encontrá la planificación perfecta para tu clase hoy.
                    </p>
                    <a
                        href="#"
                        className="inline-block px-8 py-3 rounded-xl bg-white text-[#1e293b] font-semibold text-sm hover:bg-slate-100 transition-colors"
                    >
                        Ver todas las planificaciones
                    </a>
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer className="bg-[#1e293b] border-t border-slate-700 py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Logo */}
                    <a href="#" className="flex items-center gap-2 text-white font-bold text-base">
                        <GraduationCap size={22} weight="duotone" />
                        <span>Aula</span>
                    </a>

                    {/* Links */}
                    <nav className="flex items-center gap-6 text-sm text-slate-400">
                        <a href="#" className="hover:text-white transition-colors">Inicio</a>
                        <a href="#" className="hover:text-white transition-colors">Planificaciones</a>
                        <a href="#" className="hover:text-white transition-colors">Contacto</a>
                    </nav>

                    {/* Copyright */}
                    <p className="text-slate-400 text-xs">
                        © 2026 Aula. Todos los derechos reservados.
                    </p>
                </div>
            </footer>
        </div>
    )
}
