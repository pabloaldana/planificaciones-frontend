import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "./AuthContext"
import { getMyCart, addCartItem, removeCartItem, clearCartBackend } from "@/services/cart.service"

export type CartItem = {
    id: number
    title: string
    subject: string
    grade: string
    price: number
}

type CartContextType = {
    items: CartItem[]
    addItem: (item: CartItem) => void
    removeItem: (id: number) => void
    clearCart: () => void
    isInCart: (id: number) => boolean
    total: number
    count: number
    isOpen: boolean
    openCart: () => void
    closeCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth()
    const isLoggedIn = !!user
    const queryClient = useQueryClient()

    // ── Carrito de invitado (localStorage) ───────────────────────────────────
    const [localItems, setLocalItems] = useState<CartItem[]>(() => {
        const stored = localStorage.getItem("cart")
        return stored ? JSON.parse(stored) : []
    })
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(localItems))
    }, [localItems])

    // ── Carrito del backend (usuario logueado) ───────────────────────────────
    const { data: backendCart } = useQuery({
        queryKey: ["cart"],
        queryFn: getMyCart,
        enabled: isLoggedIn,
    })

    const addItemMutation = useMutation({
        mutationFn: (planificacionId: number) => addCartItem(planificacionId),
        onSuccess: (cart) => queryClient.setQueryData(["cart"], cart),
    })
    const removeItemMutation = useMutation({
        mutationFn: (planificacionId: number) => removeCartItem(planificacionId),
        onSuccess: (cart) => queryClient.setQueryData(["cart"], cart),
    })
    const clearCartMutation = useMutation({
        mutationFn: clearCartBackend,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
    })

    // ── Migración: al cambiar de usuario, subimos o descartamos el carrito local ─
    const previousUserId = useRef<string | null>(null)
    useEffect(() => {
        if (!user || previousUserId.current === user.id) return
        previousUserId.current = user.id

        const cartOwner = localStorage.getItem("cartOwner")
        const sameOwner = !cartOwner || cartOwner === user.id

        if (sameOwner && localItems.length > 0) {
            Promise.allSettled(localItems.map((item) => addCartItem(item.id)))
                .then(() => queryClient.invalidateQueries({ queryKey: ["cart"] }))
        }

        localStorage.setItem("cartOwner", user.id)
        setLocalItems([])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const items: CartItem[] = isLoggedIn
        ? (backendCart?.items ?? []).map((item) => ({
              id: item.planificacion.id,
              title: item.planificacion.title,
              subject: item.planificacion.materia.name,
              grade: item.planificacion.grado.name,
              price: Number(item.priceAtAdded),
          }))
        : localItems

    const addItem = (item: CartItem) => {
        if (isLoggedIn) {
            addItemMutation.mutate(item.id)
        } else {
            setLocalItems((prev) => prev.some((i) => i.id === item.id) ? prev : [...prev, item])
        }
    }

    const removeItem = (id: number) => {
        if (isLoggedIn) {
            removeItemMutation.mutate(id)
        } else {
            setLocalItems((prev) => prev.filter((i) => i.id !== id))
        }
    }

    const clearCart = () => {
        if (isLoggedIn) {
            clearCartMutation.mutate()
        } else {
            setLocalItems([])
        }
    }

    const isInCart = (id: number) => items.some((i) => i.id === id)
    const openCart   = () => setIsOpen(true)
    const closeCart  = () => setIsOpen(false)

    const total = items.reduce((acc, item) => acc + item.price, 0)
    const count = items.length

    return (
        <CartContext.Provider value={{
            items, addItem, removeItem, clearCart, isInCart,
            total, count, isOpen, openCart, closeCart,
        }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider")
    return ctx
}