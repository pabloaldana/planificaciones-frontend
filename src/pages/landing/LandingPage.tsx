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
import { useDocumentMeta } from "@/hooks/useDocumentMeta"


type SubjectStyle = { icon: Icon; tone: string }

const subjectStyles: Record<string, SubjectStyle> = {
    "matemática": { icon: ChalkboardTeacher, tone: "bg-accent" },
    "lengua y literatura": { icon: BookOpen, tone: "bg-secondary" },
    "ciencias naturales": { icon: Plant, tone: "bg-muted" },
    "ciencias sociales": { icon: Globe, tone: "bg-secondary" },
    "tecnología": { icon: Desktop, tone: "bg-accent" },
    "inglés": { icon: BookOpen, tone: "bg-secondary" },
}
const defaultStyle: SubjectStyle = { icon: BookOpen, tone: "bg-muted" }

export const LandingPage = () => {
    useDocumentMeta({
        title: "Planificaciones educativas para docentes",
        description: "Encontrá planificaciones educativas listas para usar en el aula. Organizadas por materia y grado, creadas por docentes para docentes.",
    })

    const { data: materias = [], isLoading: materiasLoading } = useMaterias()
    const { data: masVendidas = [], isLoading: masVendidasLoading } = useMasVendidas()

    const top4Materias = [...materias]
        .sort((a, b) => b.planificacionesCount - a.planificacionesCount)
        .slice(0, 4)

    return (
        <div className="min-h-screen bg-background text-foreground">
            <PublicNavbar />

            {/* ===== HERO ===== */}
            <section className="bg-secondary/60">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
                    <span className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-card shadow-sm text-primary text-xs font-medium">
                        📚 Planificaciones para docentes
                    </span>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary leading-tight mb-6">
                        Planificaciones educativas listas para usar en el aula
                    </h1>

                    <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
                        Ahorrá tiempo con planificaciones de calidad, organizadas por materia y grado. Creadas por docente, para docentes.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            to="/catalogo"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity text-sm font-semibold shadow-sm"
                        >
                            Ver planificaciones →
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===== CATEGORÍAS ===== */}
            <section className="border-t border-border bg-background py-16 sm:py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-primary text-center mb-12">
                        Explorá por materia
                    </h2>

                    {materiasLoading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="bg-muted rounded-2xl p-6 h-36 animate-pulse border border-border" />
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
                                        className={`${style.tone} rounded-2xl p-6 flex flex-col items-center gap-4 transition-transform hover:-translate-y-1`}
                                    >
                                        <div className="w-14 h-14 rounded-full bg-card shadow-sm flex items-center justify-center">
                                            <MateriaIcon size={28} weight="duotone" className="text-primary" />
                                        </div>
                                        <div className="text-center">
                                            <p className="font-semibold text-foreground text-sm capitalize">{materia.name}</p>
                                            <p className="text-xs text-muted-foreground mt-1">
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
            <section className="border-t border-border bg-secondary/40 py-16 sm:py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3">
                            Planificaciones más vendidas
                        </h2>
                        <p className="text-muted-foreground text-sm">Las más elegidas por docentes de todo el país</p>
                    </div>

                    {masVendidasLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="rounded-2xl border border-border p-6 h-48 animate-pulse bg-card" />
                            ))}
                        </div>
                    ) : masVendidas.length === 0 ? (
                        <p className="text-center text-muted-foreground text-sm">Todavía no hay ventas registradas.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {masVendidas.map((plan) => {
                                return (
                                    <article key={plan.id} className="flex flex-col rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border gap-4">
                                        <div className="flex items-start justify-between">
                                            <span className="inline-flex w-fit rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground capitalize">
                                                {plan.materia}
                                            </span>
                                            <span className="text-xs text-muted-foreground">{plan.grado}</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-foreground text-base capitalize">{plan.title}</h3>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            {plan.ventas} {plan.ventas === 1 ? "venta" : "ventas"}
                                        </p>
                                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
                                            <span className="text-xl font-bold text-primary">${plan.price.toLocaleString("es-AR")}</span>
                                            <Link
                                                to={`/catalogo/${plan.id}`}
                                                className="text-xs px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                                            >
                                                Ver planificación
                                            </Link>
                                        </div>
                                    </article>
                                )
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* ===== CÓMO FUNCIONA ===== */}
            <section className="border-t border-border bg-background py-16 sm:py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-primary text-center mb-12">
                        ¿Cómo funciona?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center shadow-sm">
                                <MagnifyingGlass size={28} weight="duotone" className="text-primary" />
                            </div>
                            <h3 className="font-bold text-foreground text-base">Elegís</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                                Explorá el catálogo y filtrá por materia, grado o palabras clave
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center shadow-sm">
                                <CreditCard size={28} weight="duotone" className="text-primary" />
                            </div>
                            <h3 className="font-bold text-foreground text-base">Comprás</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                                Pagá de forma segura y recibís acceso inmediato al material
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center shadow-sm">
                                <CheckCircle size={28} weight="duotone" className="text-primary" />
                            </div>
                            <h3 className="font-bold text-foreground text-base">Usás en clase</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                                Descargá la planificación y llevala lista al aula
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
