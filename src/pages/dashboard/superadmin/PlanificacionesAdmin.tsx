import { useState, useEffect } from "react"
import { MagnifyingGlass, Eye } from "@phosphor-icons/react"
import { getSubjectConfig } from "@/constants/subjects"
import { usePlanificacionesAdmin } from "@/hooks/usePlanificaciones"
import { Pagination } from "@/components/ui/Pagination"

const PAGE_SIZE = 10

export const PlanificacionesAdmin = () => {
    const [search, setSearch] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")
    const [page, setPage] = useState(1)

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 400)
        return () => clearTimeout(timer)
    }, [search])

    useEffect(() => { setPage(1) }, [debouncedSearch])

    const { data, isLoading } = usePlanificacionesAdmin({
        search: debouncedSearch || undefined,
        page,
        limit: PAGE_SIZE,
    })

    const planificaciones = data?.data ?? []
    const totalPages = data?.totalPages ?? 1


    return (
        <section className="bg-card rounded-xl shadow-sm border border-border">

            {/* Header */}
            <div className="px-6 py-5 border-b border-border">
                <h2 className="text-xl font-bold text-primary">Planificaciones</h2>
                <p className="text-muted-foreground text-sm mt-0.5">Consultá el contenido publicado en la plataforma.</p>
            </div>

            {/* Search */}
            <div className="px-6 py-4 border-b border-border">
                <div className="relative max-w-sm">
                    <MagnifyingGlass size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Buscar por título..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border border-border bg-muted rounded-lg pl-8 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border">
                            {["Título", "Materia", "Grado", "Precio", "Acciones"].map((h) => (
                                <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-3">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {isLoading ? (
                            [...Array(5)].map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    {[...Array(5)].map((_, j) => (
                                        <td key={j} className="px-6 py-4">
                                            <div className="h-4 bg-muted rounded w-24" />
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            planificaciones.map((p) => {
                                const subjectCfg = getSubjectConfig(p.materia.name)
                                return (
                                    <tr key={p.id} className="hover:bg-muted/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-foreground">{p.title}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${subjectCfg.badge}`}>
                                                {subjectCfg.label}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">{p.grado.name}</td>
                                        <td className="px-6 py-4 font-semibold text-primary">
                                            ${p.price.toLocaleString("es-AR")}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1">
                                                <button title="Ver" className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                                                    <Eye size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>

            <div className="px-6 py-4 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-slate-400 text-sm">{data?.total ?? 0} planificaciones</p>
                {totalPages > 1 && (
                    <Pagination page={page} totalPages={totalPages} setPage={setPage} />
                )}
            </div>

        </section>
    )
}
