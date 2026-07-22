import { Heart } from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import { useFavoritos } from "@/hooks/useFavoritos"
import { PlanCard } from "@/components/common/PlanCard"

export const MisFavoritos = () => {
    const { data: favoritos = [], isLoading } = useFavoritos()

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-card rounded-2xl border border-border h-64 animate-pulse" />
                ))}
            </div>
        )
    }

    if (favoritos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                    <Heart size={32} weight="duotone" className="text-red-300" />
                </div>
                <div>
                    <p className="font-semibold text-foreground">Todavía no tenés favoritos</p>
                    <p className="text-sm text-slate-400 mt-1">
                        Guardá planificaciones que te interesen para encontrarlas fácilmente después.
                    </p>
                </div>
                <Link
                    to="/catalogo"
                    className="mt-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-colors"
                >
                    Explorar catálogo
                </Link>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-xl font-bold text-primary">Mis favoritos</h1>
                <p className="text-muted-foreground text-sm mt-0.5">{favoritos.length} {favoritos.length === 1 ? "planificación guardada" : "planificaciones guardadas"}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoritos.map((fav) => (
                    <PlanCard key={fav.id} plan={fav.planificacion} />
                ))}
            </div>
        </div>
    )
}
