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
import { CurrencyDollar, ShoppingCart, Trophy, CalendarCheck } from "@phosphor-icons/react"
import { useEstadisticas } from "@/hooks/useCreator"
import { getSubjectConfig } from "@/constants/subjects"

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
        <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-sm text-sm">
            <p className="text-slate-500 mb-0.5">{label}</p>
            <p className="font-semibold text-[#1A6B4A]">{payload[0].value} ventas</p>
        </div>
    )
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Estadisticas = () => {
    const { data, isLoading } = useEstadisticas()

    if (isLoading || !data) {
        return (
            <div className="flex items-center justify-center h-64 text-slate-400 text-sm">
                Cargando estadísticas...
            </div>
        )
    }

    const { ingresosTotales, totalVentas, masVendida, mejorMes, ventasPorMes, ventasPorMateria, planificacionesVendidas } = data

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
                        className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 flex flex-col gap-3"
                    >
                        <div className="flex items-start justify-between">
                            <p className="text-slate-500 text-sm">{card.label}</p>
                            <div className={`w-9 h-9 rounded-full ${card.iconBg} flex items-center justify-center shrink-0`}>
                                {card.icon}
                            </div>
                        </div>
                        <p className="text-[1.75rem] font-bold text-[#1A6B4A] leading-none truncate">{card.value}</p>
                        {card.badge && (
                            <span className="self-start bg-[#D1F2EB] text-[#1A6B4A] text-xs font-medium px-2.5 py-1 rounded-full">
                                {card.badge}
                            </span>
                        )}
                    </div>
                ))}
            </section>

            {/* Sección 2 — Gráficos */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                {/* Ventas por mes — ocupa 2/3 */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm p-6">
                    <h2 className="text-base font-semibold text-[#1A6B4A] mb-5">Ventas por mes</h2>
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
                <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
                    <h2 className="text-base font-semibold text-[#1A6B4A] mb-5">Por materia</h2>
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
                                            <span className="text-slate-600 capitalize">{item.materia}</span>
                                        </div>
                                        <span className="font-semibold text-[#1A6B4A]">{item.ventas}</span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </section>

            {/* Sección 3 — Tabla de planificaciones vendidas */}
            <section className="bg-white rounded-xl border border-slate-100 shadow-sm">
                {/* Header */}
                <div className="px-6 py-5 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-[#1A6B4A]">Planificaciones vendidas</h2>
                    <p className="text-slate-500 text-sm mt-0.5">
                        Solo las que registran al menos una venta
                    </p>
                </div>

                {/* Tabla */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-100">
                                <th className="text-left px-6 py-3 text-slate-500 font-medium">Planificación</th>
                                <th className="text-left px-6 py-3 text-slate-500 font-medium">Materia</th>
                                <th className="text-left px-6 py-3 text-slate-500 font-medium">Grado</th>
                                <th className="text-left px-6 py-3 text-slate-500 font-medium">Ventas</th>
                                <th className="text-left px-6 py-3 text-slate-500 font-medium">Ingresos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {planificacionesVendidas.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                                        Todavía no vendiste ninguna planificación.
                                    </td>
                                </tr>
                            ) : (
                                planificacionesVendidas.map((row, i) => {
                                    const subject = getSubjectConfig(row.materia)
                                    return (
                                        <tr
                                            key={row.title}
                                            className={i < planificacionesVendidas.length - 1 ? "border-b border-slate-100" : ""}
                                        >
                                            <td className="px-6 py-4 font-medium text-[#1A6B4A]">{row.title}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${subject.badge}`}>
                                                    {subject.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600">{row.grado}</td>
                                            <td className="px-6 py-4">
                                                <span className="font-bold text-[#1A6B4A]">{row.ventas}</span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600">
                                                ${row.ingresos.toLocaleString("es-AR")}
                                            </td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}
