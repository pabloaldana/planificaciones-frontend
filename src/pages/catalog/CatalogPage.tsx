import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { MagnifyingGlass, X, Funnel } from "@phosphor-icons/react"
import { PublicNavbar } from "@/components/common/PublicNavbar"
import { Checkbox } from "@/components/ui/checkbox"
import { Pagination } from "@/components/ui/Pagination"
import { PlanCard, subjectConfig, type Planificacion } from "@/components/common/PlanCard"

const PAGE_SIZE = 12

// ── Mock data ─────────────────────────────────────────────────────────────────
const planificaciones: Planificacion[] = [
    { id: 1,  title: "Números Naturales",       subject: "Matematica", grade: "3°", price: 1000, rating: 4.9, sales: 24 },
    { id: 2,  title: "Suma y Resta",            subject: "Matematica", grade: "2°", price: 800,  rating: 4.7, sales: 18 },
    { id: 3,  title: "Multiplicación",          subject: "Matematica", grade: "4°", price: 1000, rating: 4.8, sales: 15 },
    { id: 4,  title: "Comprensión Lectora",     subject: "Lengua",     grade: "5°", price: 1200, rating: 4.8, sales: 19 },
    { id: 5,  title: "El Abecedario",           subject: "Lengua",     grade: "1°", price: 700,  rating: 4.6, sales: 12 },
    { id: 6,  title: "La Oración Simple",       subject: "Lengua",     grade: "3°", price: 900,  rating: 4.5, sales: 10 },
    { id: 7,  title: "Sistema Solar",           subject: "Naturales",  grade: "4°", price: 900,  rating: 4.7, sales: 14 },
    { id: 8,  title: "Ecosistemas",             subject: "Naturales",  grade: "5°", price: 1100, rating: 4.6, sales: 11 },
    { id: 9,  title: "El Agua y sus Estados",   subject: "Naturales",  grade: "3°", price: 800,  rating: 4.8, sales: 20 },
    { id: 10, title: "Mapas y Continentes",     subject: "Sociales",   grade: "6°", price: 1000, rating: 4.7, sales: 16 },
    { id: 11, title: "Provincias de Argentina", subject: "Sociales",   grade: "5°", price: 1200, rating: 4.9, sales: 22 },
    { id: 12, title: "Pueblos Originarios",     subject: "Sociales",   grade: "4°", price: 900,  rating: 4.5, sales: 8  },
    { id: 13, title: "Intro a la Computación",  subject: "Tecnologia", grade: "4°", price: 1100, rating: 4.7, sales: 13 },
    { id: 14, title: "Internet y Redes",        subject: "Tecnologia", grade: "6°", price: 1300, rating: 4.8, sales: 17 },
    { id: 15, title: "Algoritmos Básicos",      subject: "Tecnologia", grade: "5°", price: 1000, rating: 4.6, sales: 9  },
]

// ── Filter config ─────────────────────────────────────────────────────────────
const SUBJECTS = ["Matematica", "Lengua", "Naturales", "Sociales", "Tecnologia"] as const
const GRADES   = ["1°", "2°", "3°", "4°", "5°", "6°", "7°"]

// ── Filters panel (compartido entre sidebar y drawer) ─────────────────────────
interface FiltersPanelProps {
    selectedSubjects: string[]
    selectedGrades: string[]
    onToggleSubject: (s: string) => void
    onToggleGrade: (g: string) => void
    onClear: () => void
    activeCount: number
}

const FiltersPanel = ({
    selectedSubjects, selectedGrades,
    onToggleSubject, onToggleGrade,
    onClear, activeCount,
}: FiltersPanelProps) => (
    <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-700 text-sm">Filtros</span>
            {activeCount > 0 && (
                <button onClick={onClear} className="text-xs text-[#8B3A52] hover:underline">
                    Limpiar todo
                </button>
            )}
        </div>

        {/* Materia */}
        <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Materia</p>
            <div className="flex flex-col gap-2.5">
                {SUBJECTS.map((s) => (
                    <label key={s} className="flex items-center gap-2.5 cursor-pointer group">
                        <Checkbox
                            checked={selectedSubjects.includes(s)}
                            onCheckedChange={() => onToggleSubject(s)}
                            className="border-slate-300 data-[state=checked]:bg-[#8B3A52] data-[state=checked]:border-[#8B3A52]"
                        />
                        <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">
                            {subjectConfig[s].label}
                        </span>
                    </label>
                ))}
            </div>
        </div>

        <div className="border-t border-slate-100" />

        {/* Grado */}
        <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Grado</p>
            <div className="flex flex-col gap-2.5">
                {GRADES.map((g) => (
                    <label key={g} className="flex items-center gap-2.5 cursor-pointer group">
                        <Checkbox
                            checked={selectedGrades.includes(g)}
                            onCheckedChange={() => onToggleGrade(g)}
                            className="border-slate-300 data-[state=checked]:bg-[#8B3A52] data-[state=checked]:border-[#8B3A52]"
                        />
                        <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">
                            {g} grado
                        </span>
                    </label>
                ))}
            </div>
        </div>
    </div>
)

// ── Page ──────────────────────────────────────────────────────────────────────
export const CatalogPage = () => {
    const [searchParams] = useSearchParams()
    const [filtersOpen, setFiltersOpen] = useState(false)
    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState("featured")

    const [selectedSubjects, setSelectedSubjects] = useState<string[]>(() => {
        const materia = searchParams.get("materia")
        return materia ? [materia] : []
    })
    const [selectedGrades, setSelectedGrades] = useState<string[]>([])
    const [page, setPage] = useState(1)

    const toggleSubject = (s: string) =>
        setSelectedSubjects((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s])

    const toggleGrade = (g: string) =>
        setSelectedGrades((prev) => prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g])

    const clearFilters = () => { setSelectedSubjects([]); setSelectedGrades([]) }

    // Vuelve a página 1 cuando cambian los filtros o la búsqueda
    useEffect(() => { setPage(1) }, [selectedSubjects, selectedGrades, search])

    const activeCount = selectedSubjects.length + selectedGrades.length

    const filtered = useMemo(() => {
        let result = planificaciones.filter((p) => {
            const matchSubject = selectedSubjects.length === 0 || selectedSubjects.includes(p.subject)
            const matchGrade   = selectedGrades.length === 0   || selectedGrades.includes(p.grade)
            const matchSearch  = p.title.toLowerCase().includes(search.toLowerCase())
            return matchSubject && matchGrade && matchSearch
        })
        if (sortBy === "price_asc")  result = [...result].sort((a, b) => a.price - b.price)
        if (sortBy === "price_desc") result = [...result].sort((a, b) => b.price - a.price)
        if (sortBy === "rating")     result = [...result].sort((a, b) => b.rating - a.rating)
        if (sortBy === "sales")      result = [...result].sort((a, b) => b.sales - a.sales)
        return result
    }, [selectedSubjects, selectedGrades, search, sortBy])

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

    return (
        <div className="min-h-screen bg-[#F2F2F2] font-mono">

            <PublicNavbar />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

                {/* ── Search ──────────────────────────────────────────────── */}
                <div className="relative mb-6">
                    <MagnifyingGlass
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                    <input
                        type="text"
                        placeholder="Buscar planificaciones..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#8B3A52] transition-colors shadow-sm"
                    />
                </div>

                {/* ── Toolbar ─────────────────────────────────────────────── */}
                <div className="flex items-center justify-between mb-5 gap-3">
                    <p className="text-sm text-slate-500">
                        <span className="font-semibold text-slate-700">{filtered.length}</span> planificaciones
                        {filtered.length > PAGE_SIZE && (
                            <span> · página {page} de {totalPages}</span>
                        )}
                    </p>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setFiltersOpen(true)}
                            className="lg:hidden flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                            <Funnel size={15} />
                            Filtros
                            {activeCount > 0 && (
                                <span className="ml-0.5 w-4 h-4 rounded-full bg-[#8B3A52] text-white text-[10px] flex items-center justify-center">
                                    {activeCount}
                                </span>
                            )}
                        </button>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-600 focus:outline-none focus:border-slate-400 cursor-pointer"
                        >
                            <option value="featured">Destacados</option>
                            <option value="sales">Más vendidos</option>
                            <option value="rating">Mejor valorados</option>
                            <option value="price_asc">Precio: menor a mayor</option>
                            <option value="price_desc">Precio: mayor a menor</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-6 items-start">

                    {/* ── Sidebar desktop ──────────────────────────────────── */}
                    <aside className="hidden lg:block w-56 shrink-0 bg-white rounded-xl border border-slate-100 shadow-sm p-5 sticky top-24">
                        <FiltersPanel
                            selectedSubjects={selectedSubjects}
                            selectedGrades={selectedGrades}
                            onToggleSubject={toggleSubject}
                            onToggleGrade={toggleGrade}
                            onClear={clearFilters}
                            activeCount={activeCount}
                        />
                    </aside>

                    {/* ── Grid ─────────────────────────────────────────────── */}
                    <div className="flex-1">
                        {paginated.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                    {paginated.map((p) => <PlanCard key={p.id} plan={p} />)}
                                </div>
                                {totalPages > 1 && (
                                    <Pagination page={page} totalPages={totalPages} setPage={setPage} />
                                )}
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
                                <p className="text-slate-400 text-sm">
                                    No hay planificaciones con los filtros seleccionados.
                                </p>
                                <button onClick={clearFilters} className="text-sm text-[#8B3A52] hover:underline">
                                    Limpiar filtros
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Mobile filters drawer ───────────────────────────────────── */}
            <div
                className={[
                    "fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-300",
                    filtersOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
                ].join(" ")}
                onClick={() => setFiltersOpen(false)}
            />
            <aside
                className={[
                    "fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl lg:hidden",
                    "transition-transform duration-300 ease-in-out",
                    filtersOpen ? "translate-x-0" : "-translate-x-full",
                ].join(" ")}
            >
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                    <span className="font-semibold text-slate-700">Filtros</span>
                    <button
                        onClick={() => setFiltersOpen(false)}
                        className="p-2 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>
                <div className="p-5 overflow-y-auto h-full pb-20">
                    <FiltersPanel
                        selectedSubjects={selectedSubjects}
                        selectedGrades={selectedGrades}
                        onToggleSubject={toggleSubject}
                        onToggleGrade={toggleGrade}
                        onClear={clearFilters}
                        activeCount={activeCount}
                    />
                </div>
            </aside>

        </div>
    )
}
