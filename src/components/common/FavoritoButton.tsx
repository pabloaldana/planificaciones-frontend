import { Heart } from "@phosphor-icons/react"
import { useAuth } from "@/context/AuthContext"
import { useFavoritos, useToggleFavorito } from "@/hooks/useFavoritos"

type Props = {
    planificacionId: number
    size?: number
}

export const FavoritoButton = ({ planificacionId, size = 16 }: Props) => {
    const { isAuthenticated } = useAuth()
    const { data: favoritos = [] } = useFavoritos()
    const { add, remove } = useToggleFavorito(planificacionId)

    if (!isAuthenticated) return null

    const isFav = favoritos.some((f) => f.planificacion.id === planificacionId)
    const isPending = add.isPending || remove.isPending

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (isPending) return
        isFav ? remove.mutate() : add.mutate()
    }

    return (
        <button
            onClick={handleClick}
            disabled={isPending}
            title={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
            className={[
                "p-2 rounded-xl border transition-colors disabled:opacity-40",
                isFav
                    ? "border-red-200 text-red-500 bg-red-50 hover:bg-red-100"
                    : "border-slate-200 text-slate-400 hover:border-red-200 hover:text-red-400 hover:bg-red-50",
            ].join(" ")}
        >
            <Heart size={size} weight={isFav ? "fill" : "regular"} />
        </button>
    )
}
