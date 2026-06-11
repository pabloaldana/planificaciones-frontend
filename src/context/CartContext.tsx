import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

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
    const [items, setItems] = useState<CartItem[]>(() => {
        const stored = localStorage.getItem("cart")
        return stored ? JSON.parse(stored) : []
    })
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items))
    }, [items])

    const addItem    = (item: CartItem) =>
        setItems((prev) => prev.some((i) => i.id === item.id) ? prev : [...prev, item])

    const removeItem = (id: number) =>
        setItems((prev) => prev.filter((i) => i.id !== id))

    const clearCart  = () => setItems([])
    const isInCart   = (id: number) => items.some((i) => i.id === id)
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
