import { useCreator } from "@/hooks/useCreator"
import { TrendUp, BookOpen, ShoppingCart } from "@phosphor-icons/react"

export const DashboardHome = () => {
    const { data, isLoading } = useCreator()

    if (isLoading || !data) {
        return (
            <div className="flex items-center justify-center h-64 text-slate-400 text-sm">
                Cargando dashboard...
            </div>
        )
    }

    const { totalPlanificaciones, totalRevenue, topPlanificaciones, ventasRecientes, usuariosActivos } = data

    const statCards = [
        {
            label: "Ganancias totales",
            value: `$${totalRevenue.toLocaleString("es-AR")}`,
            icon: <TrendUp size={20} weight="bold" className="text-[#1A6B8A]" />,
            iconBg: "bg-[#D7F0FA]",
        },
        {
            label: "Planificaciones",
            value: String(totalPlanificaciones),
            icon: <BookOpen size={20} weight="bold" className="text-primary" />,
            iconBg: "bg-primary/10",
        },
        {
            label: "Clientes activos",
            value: String(usuariosActivos),
            icon: <TrendUp size={20} weight="bold" className="text-primary" />,
            iconBg: "bg-primary/10",
        },
    ]

    return (
        <>
            {/* Stat cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {statCards.map((card) => (
                    <div
                        key={card.label}
                        className="bg-card rounded-xl border border-border shadow-sm p-5 flex flex-col gap-3"
                    >
                        <div className="flex items-start justify-between">
                            <p className="text-muted-foreground text-sm">{card.label}</p>
                            <div className={`w-9 h-9 rounded-full ${card.iconBg} flex items-center justify-center shrink-0`}>
                                {card.icon}
                            </div>
                        </div>

                        <p className="text-[2rem] font-bold text-primary leading-none">
                            {card.value}
                        </p>
                    </div>
                ))}
            </section>

            {/* Bottom panels */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Ventas recientes */}
                <div className="lg:col-span-2 bg-card rounded-xl border border-border shadow-sm p-6 flex flex-col">
                    <h2 className="text-base font-semibold text-primary mb-4">
                        Ventas recientes
                    </h2>
                    {ventasRecientes.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center min-h-64">
                            <p className="text-muted-foreground text-sm">Todavía no tenés ventas.</p>
                        </div>
                    ) : (
                        <ul className="divide-y divide-border">
                            {ventasRecientes.map((venta) => (
                                <li key={venta.id} className="flex items-center gap-3 py-3">
                                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <ShoppingCart size={16} weight="duotone" className="text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-primary truncate">
                                            {venta.planificacion.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {new Date(venta.createdAt).toLocaleDateString("es-AR")}
                                        </p>
                                    </div>
                                    <span className="text-sm font-bold text-primary shrink-0">
                                        ${Number(venta.priceAtPurchase).toLocaleString("es-AR")}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Planificaciones top */}
                <div className="bg-card rounded-xl border border-border shadow-sm p-6">
                    <h2 className="text-base font-semibold text-primary mb-4">
                        Planificaciones top
                    </h2>

                    <ul className="space-y-4">
                        {topPlanificaciones.map((item) => (
                            <li key={item.title} className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-[#D7F0FA] flex items-center justify-center shrink-0">
                                    <BookOpen size={18} weight="duotone" className="text-[#1A6B8A]" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-primary truncate">
                                        {item.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground">{item.ventas}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    )
}
