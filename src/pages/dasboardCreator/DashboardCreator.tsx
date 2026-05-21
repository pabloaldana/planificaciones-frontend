import {
    TrendUp,
    BookOpen,
    Users,
    CurrencyDollar,
    Star,
} from "@phosphor-icons/react"
import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import { Sidebar } from "../../components/ui/Sidebar"

const statCards = [
    {
        label: "Ventas del mes",
        value: "$84.250",
        icon: <TrendUp size={20} weight="bold" className="text-cyan-600" />,
        iconBg: "bg-cyan-100",
        badge: "+12,4%",
    },
    {
        label: "Planificaciones",
        value: "127",
        icon: <TrendUp size={20} weight="bold" className="text-pink-500" />,
        iconBg: "bg-pink-100",
        badge: "+8 nuevas",
    },
    {
        label: "Clientes activos",
        value: "342",
        icon: <TrendUp size={20} weight="bold" className="text-green-600" />,
        iconBg: "bg-green-100",
        badge: "+24",
    },
    {
        label: "Tasa de conversión",
        value: "4,8%",
        icon: <TrendUp size={20} weight="bold" className="text-violet-500" />,
        iconBg: "bg-violet-100",
        badge: "+0,6%",
    },
]

const topPlanificaciones = [
    { title: "Matemática 4° grado", ventas: "24 ventas", rating: "4.9" },
    { title: "Lengua 6° grado", ventas: "19 ventas", rating: "4.8" },
    { title: "Cs. Naturales 3°", ventas: "14 ventas", rating: "4.7" },
]

export const DashboardCreator = () => {
    return (
        <div className="min-h-screen bg-[#f1f5f9] flex">
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0">
                <Header />

                <main className="flex-1 p-6 overflow-auto">
                    {/* Stat cards */}
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

                                <p className="text-[2rem] font-bold text-[#1e293b] leading-none">
                                    {card.value}
                                </p>

                                <span className="self-start bg-red-100 text-red-400 text-xs font-medium px-2.5 py-1 rounded-full">
                                    {card.badge}
                                </span>
                            </div>
                        ))}
                    </section>

                    {/* Bottom panels */}
                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {/* Ventas recientes */}
                        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm p-6 flex flex-col">
                            <h2 className="text-base font-semibold text-[#1e293b] mb-4">
                                Ventas recientes
                            </h2>
                            <div className="flex-1 flex items-center justify-center min-h-64">
                                <p className="text-slate-400 text-sm">Acá irá el gráfico de ventas</p>
                            </div>
                        </div>

                        {/* Planificaciones top */}
                        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
                            <h2 className="text-base font-semibold text-[#1e293b] mb-4">
                                Planificaciones top
                            </h2>

                            <ul className="space-y-4">
                                {topPlanificaciones.map((item) => (
                                    <li key={item.title} className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                            <BookOpen size={18} weight="duotone" className="text-blue-500" />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-[#1e293b] truncate">
                                                {item.title}
                                            </p>
                                            <p className="text-xs text-slate-400">{item.ventas}</p>
                                        </div>

                                        <span className="bg-red-100 text-red-400 text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 flex items-center gap-1">
                                            <Star size={11} weight="fill" />
                                            {item.rating}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </div>
    )
}
