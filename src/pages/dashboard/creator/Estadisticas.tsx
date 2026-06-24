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
import { CurrencyDollar, ShoppingCart, Trophy, CalendarCheck, Star } from "@phosphor-icons/react"

// ─── Data ────────────────────────────────────────────────────────────────────

const ventasPorMes = [
    { mes: "Ene", ventas: 3 },
    { mes: "Feb", ventas: 5 },
    { mes: "Mar", ventas: 7 },
    { mes: "Abr", ventas: 12 },
    { mes: "May", ventas: 9 },
]

const ventasPorMateria = [
    { name: "Matemática", value: 18, color: "#a855f7" },
    { name: "Lengua",     value: 10, color: "#f59e0b" },
    { name: "Naturales",  value: 5,  color: "#22c55e" },
    { name: "Sociales",   value: 3,  color: "#3b82f6" },
]

const vendidas = [
    { title: "Números Naturales",   subject: "Matematica", grade: "3°", ventas: 24, ingresos: "$24.000", rating: "4.9" },
    { title: "Comprensión Lectora", subject: "Lengua",     grade: "5°", ventas: 19, ingresos: "$22.800", rating: "4.8" },
    { title: "Sistema Solar",       subject: "Naturales",  grade: "4°", ventas: 8,  ingresos: "$7.200",  rating: "4.7" },
    { title: "La Oración",          subject: "Lengua",     grade: "3°", ventas: 5,  ingresos: "$6.000",  rating: "4.5" },
]

// ─── Badges ──────────────────────────────────────────────────────────────────

const subjectBadge: Record<string, string> = {
    Matematica: "bg-[#E8DAEF] text-[#5C3D7A] border border-[#D4BAE8]",
    Lengua:     "bg-[#FFF7C2] text-[#7A6200] border border-[#E8D870]",
    Naturales:  "bg-[#D1F2EB] text-[#1A6B4A] border border-[#A8DDD0]",
    Sociales:   "bg-[#D7F0FA] text-[#1A5F7A] border border-[#A8D8EE]",
}

const SubjectBadge = ({ subject }: { subject: string }) => (
    <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${subjectBadge[subject] ?? "bg-slate-100 text-slate-600 border border-slate-200"}`}
    >
        {subject}
    </span>
)

// ─── Stat cards data ─────────────────────────────────────────────────────────

const statCards = [
    {
        label:   "Ingresos totales",
        value:   "$36.000",
        icon:    <CurrencyDollar size={20} weight="bold" className="text-[#1A7A4A]" />,
        iconBg:  "bg-[#D1F2EB]",
        badge:   "+8% este mes",
    },
    {
        label:   "Total vendidas",
        value:   "36 ventas",
        icon:    <ShoppingCart size={20} weight="bold" className="text-[#1A6B8A]" />,
        iconBg:  "bg-[#D7F0FA]",
        badge:   "+5 esta semana",
    },
    {
        label:   "Más vendida",
        value:   "Núm. Naturales",
        icon:    <Trophy size={20} weight="bold" className="text-[#7A6200]" />,
        iconBg:  "bg-[#FFF7C2]",
        badge:   "24 ventas",
    },
    {
        label:   "Mejor mes",
        value:   "Abril 2026",
        icon:    <CalendarCheck size={20} weight="bold" className="text-[#5C3D7A]" />,
        iconBg:  "bg-[#E8DAEF]",
        badge:   "$14.000",
    },
]

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
                        <p className="text-[1.75rem] font-bold text-[#1A6B4A] leading-none">{card.value}</p>
                        <span className="self-start bg-[#D1F2EB] text-[#1A6B4A] text-xs font-medium px-2.5 py-1 rounded-full">
                            {card.badge}
                        </span>
                    </div>
                ))}
            </section>

            {/* Sección 2 — Gráficos */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                {/* Ventas por mes — ocupa 2/3 */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm p-6">
                    <h2 className="text-base font-semibold text-[#1A6B4A] mb-5">Ventas por mes</h2>
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
                </div>

                {/* Ventas por materia — ocupa 1/3 */}
                <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
                    <h2 className="text-base font-semibold text-[#1A6B4A] mb-5">Por materia</h2>
                    <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                            <Pie
                                data={ventasPorMateria}
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={85}
                                dataKey="value"
                                strokeWidth={0}
                            >
                                {ventasPorMateria.map((entry) => (
                                    <Cell key={entry.name} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Leyenda */}
                    <ul className="mt-2 space-y-2">
                        {ventasPorMateria.map((item) => (
                            <li key={item.name} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <span
                                        className="w-3 h-3 rounded-sm shrink-0"
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <span className="text-slate-600">{item.name}</span>
                                </div>
                                <span className="font-semibold text-[#1A6B4A]">{item.value}</span>
                            </li>
                        ))}
                    </ul>
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
                                <th className="text-left px-6 py-3 text-slate-500 font-medium">Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vendidas.map((row, i) => (
                                <tr
                                    key={row.title}
                                    className={i < vendidas.length - 1 ? "border-b border-slate-100" : ""}
                                >
                                    <td className="px-6 py-4 font-medium text-[#1A6B4A]">{row.title}</td>
                                    <td className="px-6 py-4">
                                        <SubjectBadge subject={row.subject} />
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{row.grade}</td>
                                    <td className="px-6 py-4">
                                        <span className="font-bold text-[#1A6B4A]">{row.ventas}</span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{row.ingresos}</td>
                                    <td className="px-6 py-4">
                                        <span className="flex items-center gap-1 text-slate-700">
                                            <Star size={14} weight="fill" className="text-amber-400" />
                                            {row.rating}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}
