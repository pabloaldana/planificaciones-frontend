import { useState, useEffect, type ElementType } from "react"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"
import { useSearchParams } from "react-router-dom"
import {
    MagnifyingGlass, X, Funnel, CaretDown, Check,
    Calculator, BookOpen, Leaf, Globe, Desktop, Translate, PaintBrush, Bicycle, MusicNote,
} from "@phosphor-icons/react"
import { PublicNavbar } from "@/components/common/PublicNavbar"
import { Pagination } from "@/components/ui/Pagination"
import { PlanCard } from "@/components/common/PlanCard"
import { usePlanificaciones } from "@/hooks/usePlanificaciones"
import { useMaterias } from "@/hooks/useMaterias"
import { useGrados } from "@/hooks/useGrados"
import { Footer } from "@/components/Footer"
import { getSubjectConfig } from "@/constants/subjects"

const PAGE_SIZE = 12

const SUBJECT_ICONS: Record<string, ElementType> = {
    "matemática": Calculator,
    "lengua y literatura": BookOpen,
    "ciencias naturales": Leaf,
    "ciencias sociales": Globe,
    "tecnología": Desktop,
    "inglés": Translate,
    "educación artística": PaintBrush,
    "educación física": Bicycle,
    "música": MusicNote,
}

// ── FiltersPanel ──────────────────────────────────────────────────────────────
interface FilterOption { id: string; label: string; numero?: number }

interface FiltersPanelProps {
    subjectOptions: FilterOption[]
    gradeOptions: FilterOption[]
    selectedSubjects: string[]
    selectedGrades: string[]
    onToggleSubject: (id: string) => void
    onToggleGrade: (id: string) => void
    onClearSubjects: () => void
    onClearGrades: () => void
}

const FiltersPanel = ({
    subjectOptions, gradeOptions,
    selectedSubjects, selectedGrades,
    onToggleSubject, onToggleGrade,
    onClearSubjects, onClearGrades,
}: FiltersPanelProps) => (
    <div className="space-y-8">
        {subjectOptions.length > 0 && (
            <div>
                <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Materia
                    </h3>
                    {selectedSubjects.length > 0 && (
                        <button onClick={onClearSubjects} className="text-xs font-medium text-primary hover:underline">
                            Limpiar
                        </button>
                    )}
                </div>
                <div className="space-y-1">
                    {subjectOptions.map((s) => {
                        const active = selectedSubjects.includes(s.id)
                        const cfg = getSubjectConfig(s.label)
                        const Icon = SUBJECT_ICONS[s.label.toLowerCase()] ?? BookOpen
                        return (
                            <button
                                key={s.id}
                                onClick={() => onToggleSubject(s.id)}
                                className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm transition-colors ${active
                                        ? "bg-primary/10 font-semibold text-foreground"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    }`}
                            >
                                <span className={`grid size-7 shrink-0 place-items-center rounded-xl ${cfg.badge}`}>
                                    <Icon size={14} />
                                </span>
                                <span className="flex-1 truncate">{s.label}</span>
                                {active && <Check size={14} className="text-primary" />}
                            </button>
                        )
                    })}
                </div>
            </div>
        )}

        {subjectOptions.length > 0 && gradeOptions.length > 0 && (
            <div className="border-t border-border" />
        )}

        {gradeOptions.length > 0 && (
            <div>
                <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Grado
                    </h3>
                    {selectedGrades.length > 0 && (
                        <button onClick={onClearGrades} className="text-xs font-medium text-primary hover:underline">
                            Limpiar
                        </button>
                    )}
                </div>
                <div className="flex flex-wrap gap-2">
                    {gradeOptions.map((g) => {
                        const active = selectedGrades.includes(g.id)
                        return (
                            <button
                                key={g.id}
                                onClick={() => onToggleGrade(g.id)}
                                className={`rounded-full border px-3.5 py-1.5 text-sm transition-all ${active
                                        ? "border-primary bg-primary text-primary-foreground shadow-sm"
                                        : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                                    }`}
                            >
                                {g.label}
                            </button>
                        )
                    })}
                </div>
            </div>
        )}
    </div>
)

// ── Page ──────────────────────────────────────────────────────────────────────
export const CatalogPage = () => {
    useDocumentMeta({
        title: "Catálogo de planificaciones",
        description: "Explorá nuestro catálogo de planificaciones educativas. Filtrá por materia y grado para encontrar exactamente lo que necesitás.",
    })

    const [searchParams] = useSearchParams()
    const [filtersOpen, setFiltersOpen] = useState(false)
    const [search, setSearch] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")
    const [sortBy, setSortBy] = useState("featured")

    const [selectedSubjects, setSelectedSubjects] = useState<string[]>(() => {
        const materia = searchParams.get("materia")
        return materia ? [materia] : []
    })
    const [selectedGrades, setSelectedGrades] = useState<string[]>([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 400)
        return () => clearTimeout(timer)
    }, [search])

    useEffect(() => { setPage(1) }, [selectedSubjects, selectedGrades, debouncedSearch, sortBy])

    const { data, isLoading, error } = usePlanificaciones({
        search: debouncedSearch || undefined,
        page,
        limit: PAGE_SIZE,
        materiaIds: selectedSubjects.length ? selectedSubjects.join(",") : undefined,
        gradoIds: selectedGrades.length ? selectedGrades.join(",") : undefined,
        sortBy: sortBy !== "featured" ? sortBy : undefined,
    })

    const planificaciones = data?.data ?? []
    const totalPages = data?.totalPages ?? 1
    const total = data?.total ?? 0

    const { data: materias = [] } = useMaterias()
    const { data: grados = [] } = useGrados()

    const subjectOptions = materias
        .map(m => ({ id: String(m.id), label: m.name }))
        .sort((a, b) => a.label.localeCompare(b.label, "es"))

    const gradeOptions = grados
        .map(g => ({ id: String(g.id), label: g.name, numero: (g as any).numero }))
        .sort((a, b) => (a.numero ?? 0) - (b.numero ?? 0))

    const toggleSubject = (id: string) =>
        setSelectedSubjects(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

    const toggleGrade = (id: string) =>
        setSelectedGrades(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

    const activeSubjectTags = selectedSubjects.map(id => ({
        id, label: subjectOptions.find(s => s.id === id)?.label ?? id, type: "subject" as const,
    }))
    const activeGradeTags = selectedGrades.map(id => ({
        id, label: gradeOptions.find(g => g.id === id)?.label ?? id, type: "grade" as const,
    }))
    const activeTags = [...activeSubjectTags, ...activeGradeTags]
    const activeCount = activeTags.length

    const clearAll = () => { setSelectedSubjects([]); setSelectedGrades([]) }

    const filtersPanel = (
        <FiltersPanel
            subjectOptions={subjectOptions}
            gradeOptions={gradeOptions}
            selectedSubjects={selectedSubjects}
            selectedGrades={selectedGrades}
            onToggleSubject={toggleSubject}
            onToggleGrade={toggleGrade}
            onClearSubjects={() => setSelectedSubjects([])}
            onClearGrades={() => setSelectedGrades([])}
        />
    )

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <PublicNavbar />

            {/* ── Search bar ──────────────────────────────────────────────── */}
            <section className="bg-secondary/30 border-b border-border/60">
                <div className="mx-auto max-w-6xl px-5 py-6">
                    <div className="mx-auto flex max-w-2xl items-center gap-2 rounded-full border border-border bg-card p-2 shadow-sm">
                        <MagnifyingGlass size={20} className="ml-3 shrink-0 text-muted-foreground" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Buscar planificaciones, temas, palabras clave…"
                            className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                aria-label="Limpiar búsqueda"
                                className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-muted transition-colors"
                            >
                                <X size={16} />
                            </button>
                        )}
                        <span className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground sm:inline-flex">
                            Buscar
                        </span>
                    </div>
                </div>
            </section>

            {/* ── Main ────────────────────────────────────────────────────── */}
            <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 lg:flex lg:gap-10">

                {/* ── Sidebar desktop ──────────────────────────────────────── */}
                <aside className="hidden w-64 shrink-0 lg:block">
                    <div className="sticky top-24 rounded-3xl border border-border bg-card p-6 shadow-sm">
                        <div className="mb-6 flex items-center gap-2">
                            <Funnel size={16} className="text-primary" />
                            <h2 className="text-base font-semibold">Filtros</h2>
                        </div>
                        {filtersPanel}
                    </div>
                </aside>

                {/* ── Content ──────────────────────────────────────────────── */}
                <div className="min-w-0 flex-1">

                    {/* Toolbar */}
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                        <p className="text-sm text-muted-foreground">
                            {isLoading ? "Cargando..." : (
                                <>
                                    <span className="text-lg font-semibold text-foreground">{total}</span>
                                    {" "}planificaciones encontradas
                                    {totalPages > 1 && (
                                        <span className="text-xs"> · página {page} de {totalPages}</span>
                                    )}
                                </>
                            )}
                        </p>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setFiltersOpen(true)}
                                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm lg:hidden"
                            >
                                <Funnel size={16} />
                                Filtros
                                {activeCount > 0 && (
                                    <span className="grid size-5 place-items-center rounded-full bg-primary text-[11px] text-primary-foreground">
                                        {activeCount}
                                    </span>
                                )}
                            </button>

                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="appearance-none cursor-pointer rounded-full border border-border bg-card py-2 pl-4 pr-10 text-sm font-medium shadow-sm outline-none"
                                >
                                    <option value="featured">Destacados</option>
                                    <option value="price_asc">Menor precio</option>
                                    <option value="price_desc">Mayor precio</option>
                                </select>
                                <CaretDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            </div>
                        </div>
                    </div>

                    {/* Active filter chips */}
                    {activeTags.length > 0 && (
                        <div className="mb-6 flex flex-wrap items-center gap-2">
                            {activeTags.map((tag) => (
                                <button
                                    key={`${tag.type}-${tag.id}`}
                                    onClick={() => tag.type === "subject" ? toggleSubject(tag.id) : toggleGrade(tag.id)}
                                    className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                                >
                                    {tag.label}
                                    <X size={12} />
                                </button>
                            ))}
                            <button onClick={clearAll} className="text-xs font-medium text-primary hover:underline">
                                Limpiar todo
                            </button>
                        </div>
                    )}

                    {/* Grid / states */}
                    {isLoading ? (
                        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="animate-pulse overflow-hidden rounded-3xl border border-border bg-card">
                                    <div className="aspect-[4/3] bg-muted" />
                                    <div className="space-y-3 p-5">
                                        <div className="h-4 w-24 rounded-full bg-muted" />
                                        <div className="h-4 w-full rounded bg-muted" />
                                        <div className="h-4 w-3/4 rounded bg-muted" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="rounded-3xl border border-dashed border-border bg-card/60 px-6 py-16 text-center">
                            <p className="text-sm text-muted-foreground">Error al cargar las planificaciones.</p>
                        </div>
                    ) : planificaciones.length > 0 ? (
                        <>
                            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                                {planificaciones.map((p) => <PlanCard key={p.id} plan={p} />)}
                            </div>
                            {totalPages > 1 && (
                                <div className="mt-8">
                                    <Pagination page={page} totalPages={totalPages} setPage={setPage} />
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="rounded-3xl border border-dashed border-border bg-card/60 px-6 py-16 text-center">
                            <span className="mx-auto mb-4 grid size-14 place-items-center rounded-2xl bg-secondary">
                                <MagnifyingGlass size={24} className="text-muted-foreground" />
                            </span>
                            <h3 className="text-lg font-semibold">No encontramos resultados</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Probá con otras palabras o quitá algunos filtros.
                            </p>
                            {activeCount > 0 && (
                                <button onClick={clearAll} className="mt-4 text-sm text-primary hover:underline">
                                    Limpiar filtros
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </main>

            {/* ── Mobile bottom-sheet ─────────────────────────────────────── */}
            {filtersOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <button
                        aria-label="Cerrar filtros"
                        onClick={() => setFiltersOpen(false)}
                        className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
                    />
                    <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-card p-6 shadow-xl">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-base font-semibold">Filtros</h2>
                            <button
                                onClick={() => setFiltersOpen(false)}
                                aria-label="Cerrar"
                                className="grid size-9 place-items-center rounded-full border border-border"
                            >
                                <X size={16} />
                            </button>
                        </div>
                        {filtersPanel}
                        <button
                            onClick={() => setFiltersOpen(false)}
                            className="mt-8 w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground"
                        >
                            Ver {total} resultados
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    )
}
