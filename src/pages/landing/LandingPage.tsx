import {
    ChalkboardTeacher,
    BookOpen,
    Plant,
    Globe,
    MagnifyingGlass,
    CreditCard,
    CheckCircle,
    Desktop,
    type Icon,
} from "@phosphor-icons/react"
import { Link, NavLink } from "react-router-dom"
import { PublicNavbar } from "@/components/common/PublicNavbar"
import { Footer } from "@/components/Footer"
import { useMaterias } from "@/hooks/useMaterias"
import { useMasVendidas } from "@/hooks"


// ── Estilos por materia (clave = nombre exacto del backend en minúsculas) ──────
type SubjectStyle = { icon: Icon; bg: string; color: string }

const subjectStyles: Record<string, SubjectStyle> = {
    "matemática": { icon: ChalkboardTeacher, bg: "bg-[#E8DAEF]", color: "text-[#5C3D7A]" },
    "lengua y literatura": { icon: BookOpen, bg: "bg-[#FFF7C2]", color: "text-[#7A6200]" },
    "ciencias naturales": { icon: Plant, bg: "bg-[#D1F2EB]", color: "text-[#1A7A4A]" },
    "ciencias sociales": { icon: Globe, bg: "bg-[#D7F0FA]", color: "text-[#1A6B8A]" },
    "tecnología": { icon: Desktop, bg: "bg-[#FFE8D0]", color: "text-[#8B4500]" },
    "inglés": { icon: BookOpen, bg: "bg-[#FFF7C2]", color: "text-[#7A6200]" },
}
const defaultStyle: SubjectStyle = { icon: BookOpen, bg: "bg-slate-100", color: "text-slate-500" }

export const LandingPage = () => {
    const { data: materias = [], isLoading: materiasLoading } = useMaterias()
    const { data: masVendidas = [], isLoading: masVendidasLoading } = useMasVendidas()


    console.log({ masVendidas })
    const top4Materias = [...materias]
        .sort((a, b) => b.planificacionesCount - a.planificacionesCount)
        .slice(0, 4)

    return (
        <div className="min-h-screen bg-white">
            <PublicNavbar />

            {/* ===== HERO ===== */}
            <section className="bg-gradient-to-b from-white to-slate-50 py-20 sm:py-28">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
                    {/* Badge */}
                    <span className="inline-block mb-6 px-3 py-1 rounded-full bg-[#D1F2EB] text-[#1A6B4A] text-xs font-semibold tracking-wide">
                        📚 Planificaciones para docentes
                    </span>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A6B4A] leading-tight mb-6">
                        Planificaciones educativas listas para usar en el aula
                    </h1>

                    <p className="text-slate-500 text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
                        Ahorrá tiempo con planificaciones de calidad, organizadas por materia y grado. Creadas por docente, para docentes.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            to="/catalogo"

                            className="px-6 py-3 rounded-xl bg-[#1A6B4A] text-white hover:bg-[#134F37] transition-colors text-sm font-semibold"
                        >
                            Ver planificaciones →
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===== CATEGORÍAS ===== */}
            <section className="bg-[#F2F2F2] py-16 sm:py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#1A6B4A] text-center mb-12">
                        Explorá por materia
                    </h2>

                    {materiasLoading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="bg-white rounded-2xl p-6 h-36 animate-pulse border border-slate-100" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            {top4Materias.map((materia) => {
                                const style = subjectStyles[materia.name.toLowerCase()] ?? defaultStyle
                                const MateriaIcon = style.icon
                                return (
                                    <NavLink
                                        key={materia.id}
                                        to={`/catalogo?materia=${materia.id}`}
                                        className="bg-white rounded-2xl p-6 flex flex-col items-center gap-4 shadow-sm hover:shadow-md transition-shadow border border-slate-100"
                                    >
                                        <div className={`w-14 h-14 rounded-full ${style.bg} flex items-center justify-center`}>
                                            <MateriaIcon size={28} weight="duotone" className={style.color} />
                                        </div>
                                        <div className="text-center">
                                            <p className="font-semibold text-[#1A6B4A] text-sm capitalize">{materia.name}</p>
                                            <p className="text-xs text-slate-400 mt-1">
                                                {materia.planificacionesCount} {materia.planificacionesCount === 1 ? "planificación" : "planificaciones"}
                                            </p>
                                        </div>
                                    </NavLink>
                                )
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* ===== PLANIFICACIONES DESTACADAS ===== */}
            <section className="bg-white py-16 sm:py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#1A6B4A] mb-3">
                            Planificaciones más vendidas
                        </h2>
                        <p className="text-slate-400 text-sm">Las más elegidas por docentes de todo el país</p>
                    </div>

                    {masVendidasLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="rounded-2xl border border-slate-100 p-6 h-48 animate-pulse bg-slate-50" />
                            ))}
                        </div>
                    ) : masVendidas.length === 0 ? (
                        <p className="text-center text-slate-400 text-sm">Todavía no hay ventas registradas.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {masVendidas.map((plan) => {
                                const style = subjectStyles[plan.materia.toLowerCase()] ?? defaultStyle
                                return (
                                    <div key={plan.id} className="rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col gap-4">
                                        <div className="flex items-start justify-between">
                                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold capitalize ${style.bg} ${style.color}`}>
                                                {plan.materia}
                                            </span>
                                            <span className="text-xs text-slate-400">{plan.grado}</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-[#1A6B4A] text-base capitalize">{plan.title}</h3>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs">
                                            <span className="text-slate-400">{plan.ventas} {plan.ventas === 1 ? "venta" : "ventas"}</span>
                                        </div>
                                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                                            <span className="text-xl font-bold text-[#1A6B4A]">${plan.price.toLocaleString("es-AR")}</span>
                                            <Link
                                                to={`/catalogo/${plan.id}`}
                                                className="text-xs px-4 py-2 rounded-xl bg-[#1A6B4A] text-white hover:bg-[#134F37] transition-colors"
                                            >
                                                Ver planificación
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* ===== CÓMO FUNCIONA ===== */}
            <section className="bg-[#F2F2F2] py-16 sm:py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#1A6B4A] text-center mb-12">
                        ¿Cómo funciona?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Paso 1 */}
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-full bg-[#1A6B4A] flex items-center justify-center">
                                    <MagnifyingGlass size={28} weight="duotone" className="text-white" />
                                </div>
                                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-[#1A6B4A] text-[#1A6B4A] text-xs font-bold flex items-center justify-center">
                                    1
                                </span>
                            </div>
                            <h3 className="font-bold text-[#1A6B4A] text-base">Elegís</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Explorá el catálogo y filtrá por materia, grado o palabras clave
                            </p>
                        </div>

                        {/* Paso 2 */}
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-full bg-[#1A6B4A] flex items-center justify-center">
                                    <CreditCard size={28} weight="duotone" className="text-white" />
                                </div>
                                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-[#1A6B4A] text-[#1A6B4A] text-xs font-bold flex items-center justify-center">
                                    2
                                </span>
                            </div>
                            <h3 className="font-bold text-[#1A6B4A] text-base">Comprás</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Pagá de forma segura y recibís acceso inmediato al material
                            </p>
                        </div>

                        {/* Paso 3 */}
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-full bg-[#1A6B4A] flex items-center justify-center">
                                    <CheckCircle size={28} weight="duotone" className="text-white" />
                                </div>
                                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-[#1A6B4A] text-[#1A6B4A] text-xs font-bold flex items-center justify-center">
                                    3
                                </span>
                            </div>
                            <h3 className="font-bold text-[#1A6B4A] text-base">Usás en clase</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Descargá la planificación y llevala lista al aula
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== CTA FINAL ===== */}
            <section className="bg-[#1A6B4A] py-16 sm:py-20">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                        ¿Sos docente y querés ahorrar tiempo?
                    </h2>
                    <p className="text-slate-400 text-sm sm:text-base mb-8">
                        Encontrá la planificación perfecta para tu clase hoy.
                    </p>
                    <a
                        href="#"
                        className="inline-block px-8 py-3 rounded-xl bg-white text-[#1A6B4A] font-semibold text-sm hover:bg-slate-100 transition-colors"
                    >
                        Ver todas las planificaciones
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    )
}
