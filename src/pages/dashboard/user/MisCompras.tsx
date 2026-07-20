import { DownloadSimple, ShoppingBag } from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import { getSubjectConfig } from "@/constants/subjects"
import { Pagination } from "@/components/ui/Pagination"
import { useCompras, useDownloadPlanificacion, usePagination } from "@/hooks"

export const MisCompras = () => {
    const { data: compras = [], isLoading } = useCompras()
    const { mutate: getDownloadLink } = useDownloadPlanificacion()
    const { rows, page, setPage, totalPages } = usePagination(compras, 10)

    // El link vence en 10 minutos — lo pedimos recién en el momento del click, nunca antes.
    // const handleVer = (id: number) => {
    //     getDownloadLink(id, {
    //         onSuccess: (data) => window.open(data.url, "_blank", "noopener,noreferrer"),
    //     })
    // }

    const handleDescargar = (id: number) => {
        getDownloadLink(id, {
            onSuccess: (data) => {
                if (!data.url.startsWith("https://")) return
                const a = document.createElement("a")
                a.href = data.url
                a.download = ""
                a.click()
            },
        })
    }

    if (isLoading) {
        return (
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-100 dark:border-gray-700 divide-y divide-slate-100 dark:divide-gray-700">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4 px-6 py-4 animate-pulse">
                        <div className="flex-1 space-y-2">
                            <div className="h-3 bg-slate-100 rounded w-24" />
                            <div className="h-4 bg-slate-100 rounded w-48" />
                        </div>
                        <div className="h-4 bg-slate-100 rounded w-16" />
                    </div>
                ))}
            </section>
        )
    }

    if (compras.length === 0) {
        return (
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-100 dark:border-gray-700 p-12 text-center flex flex-col items-center gap-4">
                <p className="text-slate-400 text-sm">Todavía no compraste ninguna planificación.</p>
                <Link
                    to="/catalogo"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1A6B4A] text-white text-sm font-semibold hover:bg-[#134F37] transition-colors"
                >
                    <ShoppingBag size={16} weight="duotone" />
                    Ir al catálogo
                </Link>
            </section>
        )
    }

    return (
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-100 dark:border-gray-700">

            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-6 py-5 border-b border-slate-100 dark:border-gray-700">
                <div>
                    <h2 className="text-xl font-bold text-[#1A6B4A] dark:text-emerald-400">Mis compras</h2>
                    <p className="text-slate-500 text-sm mt-0.5">
                        {compras.length} {compras.length === 1 ? "planificación comprada" : "planificaciones compradas"}
                    </p>
                </div>
                <Link
                    to="/catalogo"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#1A6B4A] dark:border-emerald-400 text-[#1A6B4A] dark:text-emerald-400 text-sm font-semibold hover:bg-[#1A6B4A]/5 dark:hover:bg-emerald-400/5 transition-colors shrink-0"
                >
                    <ShoppingBag size={16} weight="duotone" />
                    Seguir comprando
                </Link>
            </div>

            {/* Lista */}
            <div className="divide-y divide-slate-100 dark:divide-gray-700">
                {rows.map((compra) => {
                    const { planificacion } = compra
                    const subject = getSubjectConfig(planificacion.materia.name)
                    return (
                        <div key={compra.id} className="flex items-center gap-4 px-6 py-4">

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${subject.badge}`}>
                                        {subject.label}
                                    </span>
                                    <span className="text-xs text-slate-400">{planificacion.grado.name}</span>
                                </div>
                                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{planificacion.title}</p>
                                <p className="text-xs text-slate-400 mt-1">
                                    Comprada el {new Date(compra.createdAt).toLocaleDateString("es-AR")}
                                </p>
                            </div>

                            {/* Precio */}
                            <span className="text-sm font-bold text-[#1A6B4A] dark:text-emerald-400 shrink-0">
                                ${Number(compra.priceAtPurchase).toLocaleString("es-AR")}
                            </span>

                            {/* Acciones */}
                            <div className="flex items-center gap-2 shrink-0">
                                <button
                                    onClick={() => handleDescargar(planificacion.id)}
                                    title="Descargar"
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A6B4A] text-white text-xs font-medium hover:bg-[#134F37] transition-colors"
                                >
                                    <DownloadSimple size={14} />
                                    Descargar
                                </button>
                            </div>

                        </div>
                    )
                })}
            </div>

            {totalPages > 1 && (
                <div className="px-6 py-4">
                    <Pagination page={page} totalPages={totalPages} setPage={setPage} />
                </div>
            )}

        </section>
    )
}
