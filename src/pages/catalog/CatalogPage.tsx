import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { MagnifyingGlass, X, Funnel } from "@phosphor-icons/react"
import { PublicNavbar } from "@/components/common/PublicNavbar"
import { Checkbox } from "@/components/ui/checkbox"
import { Pagination } from "@/components/ui/Pagination"
import { PlanCard } from "@/components/common/PlanCard"
import { usePlanificaciones } from "@/hooks/usePlanificaciones"

import { Footer } from "@/components/Footer"

const PAGE_SIZE = 12

// ── Tipos para filtros dinámicos ──────────────────────────────────────────────
interface FilterOption {
    id: string
    label: string
    numero?: number
}

interface FiltersPanelProps {
    subjectOptions: FilterOption[]
    gradeOptions: FilterOption[]
    selectedSubjects: string[]
    selectedGrades: string[]
    onToggleSubject: (id: string) => void
    onToggleGrade: (id: string) => void
    onClear: () => void
    activeCount: number
}

// ── Filters panel ─────────────────────────────────────────────────────────────
const FiltersPanel = ({
    subjectOptions, gradeOptions,
    selectedSubjects, selectedGrades,
    onToggleSubject, onToggleGrade,
    onClear, activeCount,
}: FiltersPanelProps) => (
    <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-700 text-sm">Filtros</span>
            {activeCount > 0 && (
                <button onClick={onClear} className="text-xs text-[#1A6B4A] hover:underline">
                    Limpiar todo
                </button>
            )}
        </div>

        {subjectOptions.length > 0 && (
            <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Materia</p>
                <div className="flex flex-col gap-2.5">
                    {subjectOptions.map((s) => (
                        <label key={s.id} className="flex items-center gap-2.5 cursor-pointer group">
                            <Checkbox
                                checked={selectedSubjects.includes(s.id)}
                                onCheckedChange={() => onToggleSubject(s.id)}
                                className="border-slate-300 data-[state=checked]:bg-[#1A6B4A] data-[state=checked]:border-[#1A6B4A]"
                            />
                            <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">
                                {s.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        )}

        {subjectOptions.length > 0 && gradeOptions.length > 0 && (
            <div className="border-t border-slate-100" />
        )}

        {gradeOptions.length > 0 && (
            <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Grado</p>
                <div className="flex flex-col gap-2.5">
                    {gradeOptions.map((g) => (
                        <label key={g.id} className="flex items-center gap-2.5 cursor-pointer group">
                            <Checkbox
                                checked={selectedGrades.includes(g.id)}
                                onCheckedChange={() => onToggleGrade(g.id)}
                                className="border-slate-300 data-[state=checked]:bg-[#1A6B4A] data-[state=checked]:border-[#1A6B4A]"
                            />
                            <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">
                                {g.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        )}
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

    const { data: planificaciones = [], isLoading, error } = usePlanificaciones()

    const toggleSubject = (id: string) =>
        setSelectedSubjects((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])

    const toggleGrade = (id: string) =>
        setSelectedGrades((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])

    const clearFilters = () => { setSelectedSubjects([]); setSelectedGrades([]) }

    useEffect(() => { setPage(1) }, [selectedSubjects, selectedGrades, search])

    // Materias únicas del backend, ordenadas alfabéticamente
    const subjectOptions = useMemo(() => {
        const seen = new Set<number>()
        return planificaciones
            .filter(p => { if (seen.has(p.materia.id)) return false; seen.add(p.materia.id); return true })
            .map(p => ({ id: String(p.materia.id), label: p.materia.name }))
            .sort((a, b) => a.label.localeCompare(b.label, "es"))
    }, [planificaciones])

    // Grados únicos del backend, ordenados por número
    const gradeOptions = useMemo(() => {
        const seen = new Set<number>()
        return planificaciones
            .filter(p => { if (seen.has(p.grado.id)) return false; seen.add(p.grado.id); return true })
            .map(p => ({ id: String(p.grado.id), label: p.grado.name, numero: p.grado.numero }))
            .sort((a, b) => (a.numero ?? 0) - (b.numero ?? 0))
    }, [planificaciones])

    const activeCount = selectedSubjects.length + selectedGrades.length

    const filtered = useMemo(() => {
        let result = planificaciones.filter(p => {
            if (!p.is_active) return false
            const matchSubject = selectedSubjects.length === 0 || selectedSubjects.includes(String(p.materia.id))
            const matchGrade = selectedGrades.length === 0 || selectedGrades.includes(String(p.grado.id))
            const matchSearch = p.title.toLowerCase().includes(search.toLowerCase())
            return matchSubject && matchGrade && matchSearch
        })
        if (sortBy === "price_asc") result = [...result].sort((a, b) => a.price - b.price)
        if (sortBy === "price_desc") result = [...result].sort((a, b) => b.price - a.price)
        return result
    }, [planificaciones, selectedSubjects, selectedGrades, search, sortBy])

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

    return (
        <div className="min-h-screen bg-[#F2F2F2]">

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
                        className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#1A6B4A] transition-colors shadow-sm"
                    />
                </div>

                {/* ── Toolbar ─────────────────────────────────────────────── */}
                <div className="flex items-center justify-between mb-5 gap-3">
                    <p className="text-sm text-slate-500">
                        {isLoading ? (
                            <span className="text-slate-400">Cargando...</span>
                        ) : (
                            <>
                                <span className="font-semibold text-slate-700">{filtered.length}</span> planificaciones
                                {filtered.length > PAGE_SIZE && (
                                    <span> · página {page} de {totalPages}</span>
                                )}
                            </>
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
                                <span className="ml-0.5 w-4 h-4 rounded-full bg-[#1A6B4A] text-white text-[10px] flex items-center justify-center">
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
                            <option value="price_asc">Precio: menor a mayor</option>
                            <option value="price_desc">Precio: mayor a menor</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-6 items-start">

                    {/* ── Sidebar desktop ──────────────────────────────────── */}
                    <aside className="hidden lg:block w-56 shrink-0 bg-white rounded-xl border border-slate-100 shadow-sm p-5 sticky top-24">``
                        <FiltersPanel
                            subjectOptions={subjectOptions}
                            gradeOptions={gradeOptions}
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
                        {isLoading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-col gap-3 animate-pulse">
                                        <div className="h-5 bg-slate-100 rounded-full w-24" />
                                        <div className="h-4 bg-slate-100 rounded w-full" />
                                        <div className="h-4 bg-slate-100 rounded w-3/4" />
                                        <div className="h-8 bg-slate-100 rounded-xl mt-2" />
                                    </div>
                                ))}
                            </div>
                        ) : error ? (
                            <div className="py-20 text-center text-slate-400 text-sm">
                                Error al cargar las planificaciones.
                            </div>
                        ) : paginated.length > 0 ? (
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
                                <button onClick={clearFilters} className="text-sm text-[#1A6B4A] hover:underline">
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
                        subjectOptions={subjectOptions}
                        gradeOptions={gradeOptions}
                        selectedSubjects={selectedSubjects}
                        selectedGrades={selectedGrades}
                        onToggleSubject={toggleSubject}
                        onToggleGrade={toggleGrade}
                        onClear={clearFilters}
                        activeCount={activeCount}
                    />
                </div>
            </aside>

            <Footer />
        </div>
    )
}