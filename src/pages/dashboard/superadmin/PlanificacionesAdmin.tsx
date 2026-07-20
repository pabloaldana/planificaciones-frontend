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
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-100 dark:border-gray-700">

            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 dark:border-gray-700">
                <h2 className="text-xl font-bold text-[#1A6B4A] dark:text-emerald-400">Planificaciones</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Consultá el contenido publicado en la plataforma.</p>
            </div>

            {/* Search */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-gray-700">
                <div className="relative max-w-sm">
                    <MagnifyingGlass size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Buscar por título..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border border-slate-200 dark:border-gray-600 dark:bg-gray-700 dark:text-slate-200 dark:placeholder:text-slate-500 rounded-lg pl-8 pr-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 dark:focus:border-emerald-400 transition-colors"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-slate-100 dark:border-gray-700">
                            {["Título", "Materia", "Grado", "Precio", "Acciones"].map((h) => (
                                <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-3">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-gray-700">
                        {isLoading ? (
                            [...Array(5)].map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    {[...Array(5)].map((_, j) => (
                                        <td key={j} className="px-6 py-4">
                                            <div className="h-4 bg-slate-100 dark:bg-gray-700 rounded w-24" />
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            planificaciones.map((p) => {
                                const subjectCfg = getSubjectConfig(p.materia.name)
                                return (
                                    <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-gray-700/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-200">{p.title}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${subjectCfg.badge}`}>
                                                {subjectCfg.label}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{p.grado.name}</td>
                                        <td className="px-6 py-4 font-semibold text-[#1A6B4A] dark:text-emerald-400">
                                            ${p.price.toLocaleString("es-AR")}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1">
                                                <button title="Ver" className="p-1.5 rounded-md text-slate-400 hover:text-[#1A5F7A] hover:bg-[#D7F0FA] transition-colors">
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

            <div className="px-6 py-4 border-t border-slate-100 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-slate-400 text-sm">{data?.total ?? 0} planificaciones</p>
                {totalPages > 1 && (
                    <Pagination page={page} totalPages={totalPages} setPage={setPage} />
                )}
            </div>

        </section>
    )
}
