import { useState, useMemo } from "react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts"
import { CurrencyDollar, ShoppingCart, Trophy, CalendarCheck, MagnifyingGlass } from "@phosphor-icons/react"
import { DataTable, type Column } from "@/components/common/DataTable"
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/Select"
import { useEstadisticas } from "@/hooks/useCreator"
import { usePagination } from "@/hooks/usePagination"
import { getSubjectConfig } from "@/constants/subjects"
import type { PlanificacionVendida } from "@/services/creator.service"

// ─── Colores del gráfico de torta por materia ────────────────────────────────
// Mismos tonos oscuros que ya usa getSubjectConfig para esa materia en badges.
const MATERIA_COLORS: Record<string, string> = {
    "matemática": "#5C3D7A",
    "lengua y literatura": "#7A6200",
    "ciencias naturales": "#1A6B4A",
    "ciencias sociales": "#1A5F7A",
    "tecnología": "#8B4500",
    "inglés": "#7A6200",
}
const FALLBACK_COLORS = ["#94a3b8", "#64748b", "#475569"]

const getMateriaColor = (materia: string, index: number) =>
    MATERIA_COLORS[materia.toLowerCase()] ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length]

// ─── Tooltip personalizado para BarChart ─────────────────────────────────────

const BarTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
    if (!active || !payload?.length) return null
    return (
        <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-sm text-sm">
            <p className="text-muted-foreground mb-0.5">{label}</p>
            <p className="font-semibold text-primary">{payload[0].value} ventas</p>
        </div>
    )
}

// ─── Columnas de la tabla de planificaciones vendidas ────────────────────────

const columns: Column<PlanificacionVendida>[] = [
    {
        key: "title",
        label: "Planificación",
        render: (row) => <span className="font-medium text-primary">{row.title}</span>,
    },
    {
        key: "materia",
        label: "Materia",
        render: (row) => {
            const subject = getSubjectConfig(row.materia)
            return (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${subject.badge}`}>
                    {subject.label}
                </span>
            )
        },
    },
    { key: "grado", label: "Grado", render: (row) => <span className="text-foreground">{row.grado}</span> },
    { key: "ventas", label: "Ventas", render: (row) => <span className="font-bold text-primary">{row.ventas}</span> },
    {
        key: "ingresos",
        label: "Ingresos",
        render: (row) => <span className="text-foreground">${row.ingresos.toLocaleString("es-AR")}</span>,
    },
]

// ─── Component ────────────────────────────────────────────────────────────────

export const Estadisticas = () => {
    const { data, isLoading } = useEstadisticas()
    const [search, setSearch] = useState("")
    const [materiaFilter, setMateriaFilter] = useState("all")
    const [gradoFilter, setGradoFilter] = useState("all")

    const planificacionesVendidas = data?.planificacionesVendidas ?? []

    // Materias/grados únicos presentes en las ventas, para los selects de filtro
    const materiaOptions = useMemo(() => {
        const seen = new Set<string>()
        return planificacionesVendidas
            .filter(p => { if (seen.has(p.materia)) return false; seen.add(p.materia); return true })
            .map(p => p.materia)
            .sort((a, b) => a.localeCompare(b, "es"))
    }, [planificacionesVendidas])

    const gradoOptions = useMemo(() => {
        const seen = new Set<string>()
        return planificacionesVendidas
            .filter(p => { if (seen.has(p.grado)) return false; seen.add(p.grado); return true })
            .map(p => p.grado)
    }, [planificacionesVendidas])

    const filtered = useMemo(() => {
        return planificacionesVendidas.filter(p => {
            const matchSearch = p.title.toLowerCase().includes(search.toLowerCase())
            const matchMateria = materiaFilter === "all" || p.materia === materiaFilter
            const matchGrado = gradoFilter === "all" || p.grado === gradoFilter
            return matchSearch && matchMateria && matchGrado
        })
    }, [planificacionesVendidas, search, materiaFilter, gradoFilter])

    const { rows, page, setPage, totalPages } = usePagination(filtered)

    if (isLoading || !data) {
        return (
            <div className="flex items-center justify-center h-64 text-slate-400 text-sm">
                Cargando estadísticas...
            </div>
        )
    }

    const { ingresosTotales, totalVentas, masVendida, mejorMes, ventasPorMes, ventasPorMateria } = data

    const statCards = [
        {
            label: "Ingresos totales",
            value: `$${ingresosTotales.toLocaleString("es-AR")}`,
            icon: <CurrencyDollar size={20} weight="bold" className="text-[#1A7A4A]" />,
            iconBg: "bg-[#D1F2EB]",
            badge: null,
        },
        {
            label: "Total vendidas",
            value: `${totalVentas} ventas`,
            icon: <ShoppingCart size={20} weight="bold" className="text-[#1A6B8A]" />,
            iconBg: "bg-[#D7F0FA]",
            badge: null,
        },
        {
            label: "Más vendida",
            value: masVendida ? masVendida.title : "-",
            icon: <Trophy size={20} weight="bold" className="text-[#7A6200]" />,
            iconBg: "bg-[#FFF7C2]",
            badge: masVendida ? `${masVendida.ventas} ventas` : null,
        },
        {
            label: "Mejor mes",
            value: mejorMes ? mejorMes.mes : "-",
            icon: <CalendarCheck size={20} weight="bold" className="text-[#5C3D7A]" />,
            iconBg: "bg-[#E8DAEF]",
            badge: mejorMes ? `$${mejorMes.monto.toLocaleString("es-AR")}` : null,
        },
    ]

    return (
        <>
            {/* Sección 1 — Stat cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {statCards.map((card) => (
                    <div
                        key={card.label}
                        className="min-w-0 bg-card rounded-xl border border-border shadow-sm p-5 flex flex-col gap-3"
                    >
                        <div className="flex items-start justify-between">
                            <p className="text-slate-500 text-sm">{card.label}</p>
                            <div className={`w-9 h-9 rounded-full ${card.iconBg} flex items-center justify-center shrink-0`}>
                                {card.icon}
                            </div>
                        </div>
                        <p
                            title={card.value}
                            className="min-w-0 text-[1.75rem] font-bold text-primary leading-none truncate"
                        >
                            {card.value}
                        </p>
                        {card.badge && (
                            <span className="self-start bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full">
                                {card.badge}
                            </span>
                        )}
                    </div>
                ))}
            </section>

            {/* Sección 2 — Gráficos */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                {/* Ventas por mes — ocupa 2/3 */}
                <div className="lg:col-span-2 bg-card rounded-xl border border-border shadow-sm p-6">
                    <h2 className="text-base font-semibold text-primary mb-5">Ventas por mes</h2>
                    {ventasPorMes.length === 0 ? (
                        <div className="flex items-center justify-center h-55 text-slate-400 text-sm">
                            Todavía no hay ventas registradas.
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart data={ventasPorMes} barSize={36}>
                                <XAxis
                                    dataKey="mes"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                                    width={24}
                                />
                                <Tooltip content={<BarTooltip />} cursor={{ fill: "#F2F2F2" }} />
                                <Bar dataKey="ventas" fill="#1A6B4A" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>

                {/* Ventas por materia — ocupa 1/3 */}
                <div className="bg-card rounded-xl border border-border shadow-sm p-6">
                    <h2 className="text-base font-semibold text-primary mb-5">Por materia</h2>
                    {ventasPorMateria.length === 0 ? (
                        <div className="flex items-center justify-center h-55 text-slate-400 text-sm">
                            Sin datos todavía.
                        </div>
                    ) : (
                        <>
                            <ResponsiveContainer width="100%" height={220}>
                                <PieChart>
                                    <Pie
                                        data={ventasPorMateria}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={55}
                                        outerRadius={85}
                                        dataKey="ventas"
                                        strokeWidth={0}
                                    >
                                        {ventasPorMateria.map((entry, i) => (
                                            <Cell key={entry.materia} fill={getMateriaColor(entry.materia, i)} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>

                            {/* Leyenda */}
                            <ul className="mt-2 space-y-2">
                                {ventasPorMateria.map((item, i) => (
                                    <li key={item.materia} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className="w-3 h-3 rounded-sm shrink-0"
                                                style={{ backgroundColor: getMateriaColor(item.materia, i) }}
                                            />
                                            <span className="text-foreground capitalize">{item.materia}</span>
                                        </div>
                                        <span className="font-semibold text-primary">{item.ventas}</span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </section>

            {/* Sección 3 — Tabla de planificaciones vendidas */}
            <section className="bg-card rounded-xl border border-border shadow-sm">
                {/* Header */}
                <div className="px-6 py-5 border-b border-border">
                    <h2 className="text-xl font-bold text-primary">Planificaciones vendidas</h2>
                    <p className="text-muted-foreground text-sm mt-0.5">
                        Solo las que registran al menos una venta
                    </p>
                </div>

                {/* Filtros */}
                <div className="flex flex-wrap items-center gap-3 px-6 py-4 border-b border-border">
                    <div className="relative flex-1 min-w-40 sm:min-w-52">
                        <MagnifyingGlass
                            size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                        />
                        <input
                            type="text"
                            placeholder="Buscar por título..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full border border-border bg-muted rounded-lg pl-8 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>

                    <Select value={gradoFilter} onValueChange={setGradoFilter}>
                        <SelectTrigger className="w-full sm:w-44">
                            <SelectValue placeholder="Todos los grados" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos los grados</SelectItem>
                            {gradoOptions.map((g) => (
                                <SelectItem key={g} value={g}>{g}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={materiaFilter} onValueChange={setMateriaFilter}>
                        <SelectTrigger className="w-full sm:w-44">
                            <SelectValue placeholder="Todas las materias" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas las materias</SelectItem>
                            {materiaOptions.map((m) => (
                                <SelectItem key={m} value={m}>{getSubjectConfig(m).label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Tabla */}
                <div className="px-6 py-2 overflow-x-auto">
                    <DataTable columns={columns} data={rows} />
                </div>

                {/* Footer: count + paginado */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 border-t border-border">
                    <p className="text-slate-400 text-sm">
                        Mostrando {rows.length} de {filtered.length} resultados
                    </p>

                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            className="px-3 py-1.5 text-sm rounded-md border border-border text-foreground hover:bg-muted disabled:opacity-40 disabled:pointer-events-none transition-colors"
                        >
                            &lt; Previous
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={[
                                    "w-8 h-8 text-sm rounded-md border transition-colors",
                                    p === page
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "border-border text-foreground hover:bg-muted",
                                ].join(" ")}
                            >
                                {p}
                            </button>
                        ))}

                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={page === totalPages}
                            className="px-3 py-1.5 text-sm rounded-md border border-border text-foreground hover:bg-muted disabled:opacity-40 disabled:pointer-events-none transition-colors"
                        >
                            Next &gt;
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}
