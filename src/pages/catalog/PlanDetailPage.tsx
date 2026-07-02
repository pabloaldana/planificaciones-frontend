import { useState } from "react"
import { useParams, NavLink } from "react-router-dom"
import { ShoppingCart, Check, FileText, CaretLeft, CaretRight } from "@phosphor-icons/react"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"
import { PublicNavbar } from "@/components/common/PublicNavbar"
import { getSubjectConfig } from "@/constants/subjects"
import { useCart } from "@/context/CartContext"
import { usePlanificacion } from "@/hooks/usePlanificaciones"
import { Footer } from "@/components/Footer"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

// ── Galería de imágenes de referencia ─────────────────────────────────────────

const PlanGallery = ({ images, badgeClass }: { images: string[]; badgeClass: string }) => {
    const [active, setActive] = useState(0)
    const [lightboxOpen, setLightboxOpen] = useState(false)

    if (images.length === 0) {
        return (
            <div className={`rounded-2xl border border-slate-200 shadow-sm aspect-square lg:aspect-4/3 flex items-center justify-center ${badgeClass}`}>
                <FileText size={64} weight="duotone" className="opacity-40" />
            </div>
        )
    }

    const goPrev = () => setActive((i) => (i - 1 + images.length) % images.length)
    const goNext = () => setActive((i) => (i + 1) % images.length)

    return (
        <div className="flex flex-col gap-3">
            <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm aspect-square lg:aspect-4/3 cursor-zoom-in"
            >
                <img src={images[active]} alt="" className="w-full h-full object-cover" />
            </button>

            {images.length > 1 && (
                <div className="flex gap-2">
                    {images.map((img, i) => (
                        <button
                            key={img}
                            type="button"
                            onClick={() => setActive(i)}
                            className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${i === active ? "border-[#1A6B4A]" : "border-transparent"}`}
                        >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}

            <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
                <DialogContent className="max-w-4xl w-[92vw] bg-transparent border-none shadow-none p-2">
                    <DialogTitle className="sr-only">Imagen ampliada</DialogTitle>
                    <div className="relative flex items-center justify-center">
                        {images.length > 1 && (
                            <button
                                type="button"
                                onClick={goPrev}
                                aria-label="Imagen anterior"
                                className="absolute left-2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition-colors"
                            >
                                <CaretLeft size={20} />
                            </button>
                        )}

                        <img src={images[active]} alt="" className="max-h-[75vh] max-w-full rounded-xl object-contain" />

                        {images.length > 1 && (
                            <button
                                type="button"
                                onClick={goNext}
                                aria-label="Imagen siguiente"
                                className="absolute right-2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition-colors"
                            >
                                <CaretRight size={20} />
                            </button>
                        )}
                    </div>

                    {images.length > 1 && (
                        <div className="flex justify-center gap-2 mt-3">
                            {images.map((img, i) => (
                                <button
                                    key={img}
                                    type="button"
                                    onClick={() => setActive(i)}
                                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-colors ${i === active ? "border-[#1A6B4A]" : "border-white/60"}`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export const PlanDetailPage = () => {
    const { id } = useParams()
    const { addItem, isInCart, openCart } = useCart()
    const { data: plan, isLoading } = usePlanificacion(Number(id))

    useDocumentMeta({
        title: plan?.title ?? "Planificación",
        description: plan
            ? `${plan.materia.name} · ${plan.grado.name} — Descargá esta planificación educativa lista para usar en el aula.`
            : undefined,
        ogImage: plan?.imagenes?.[0]?.url,
    })

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#F2F2F2]">
                <PublicNavbar />
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 animate-pulse">
                        <div className="h-[600px] bg-white rounded-2xl" />
                        <div className="bg-white rounded-2xl p-6 flex flex-col gap-4">
                            <div className="h-5 bg-slate-100 rounded-full w-24" />
                            <div className="h-8 bg-slate-100 rounded w-3/4" />
                            <div className="h-4 bg-slate-100 rounded w-full" />
                            <div className="h-10 bg-slate-100 rounded-xl mt-4" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!plan) {
        return (
            <div className="min-h-screen bg-[#F2F2F2]">
                <PublicNavbar />
                <div className="max-w-6xl mx-auto px-4 py-20 text-center text-slate-500">
                    Planificación no encontrada.{" "}
                    <NavLink to="/catalogo" className="text-[#1A6B4A] hover:underline">
                        Volver al catálogo
                    </NavLink>
                </div>
            </div>
        )
    }

    const subjectCfg = getSubjectConfig(plan.materia.name)
    const cuotas = Math.ceil(plan.price / 3)
    const inCart = isInCart(plan.id)

    const handleAddToCart = () => {
        addItem({ id: plan.id, title: plan.title, subject: plan.materia.name, grade: plan.grado.name, price: plan.price })
        openCart()
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#F2F2F2]">
            <PublicNavbar />

            <div className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6">

                {/* Breadcrumb */}
                <NavLink
                    to="/catalogo"
                    className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#1A6B4A] transition-colors mb-6"
                >
                    ← Volver al catálogo
                </NavLink>

                {/* Layout principal */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">

                    {/* ── Galería de imágenes ───────────────────── */}
                    <PlanGallery
                        images={plan.imagenes?.map((img) => img.url) ?? []}
                        badgeClass={subjectCfg.badge}
                    />

                    {/* ── Info del producto ─────────────────────── */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col gap-5 lg:sticky lg:top-24">

                        {/* Badge + grado */}
                        <div className="flex items-center justify-between">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${subjectCfg.badge}`}>
                                {subjectCfg.label}
                            </span>
                            <span className="text-xs text-slate-400 font-medium">
                                {plan.grado.name}
                            </span>
                        </div>

                        {/* Título */}
                        <h1 className="text-2xl font-bold text-[#1A6B4A] leading-snug">
                            {plan.title}
                        </h1>

                        {/* Descripción */}
                        {plan.description && (
                            <p className="text-sm text-slate-500 leading-relaxed">
                                {plan.description}
                            </p>
                        )}

                        <div className="border-t border-slate-100" />

                        {/* Precio */}
                        <div className="flex flex-col gap-1">
                            <span className="text-3xl font-bold text-[#1A6B4A]">
                                ${plan.price.toLocaleString("es-AR")}
                            </span>
                            <span className="text-sm text-slate-500">
                                3 cuotas sin interés de{" "}
                                <span className="font-semibold text-slate-700">
                                    ${cuotas.toLocaleString("es-AR")}
                                </span>
                            </span>
                        </div>

                        {/* Métodos de pago */}
                        <div className="flex flex-col gap-2">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                Métodos de pago
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1.5 rounded-lg bg-[#009EE3]/10 text-[#009EE3] text-xs font-semibold border border-[#009EE3]/20">
                                    MercadoPago
                                </span>
                                <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold border border-slate-200">
                                    Transferencia
                                </span>
                                <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold border border-slate-200">
                                    Tarjeta de crédito
                                </span>
                            </div>
                        </div>

                        <div className="border-t border-slate-100" />

                        {/* Botones */}
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleAddToCart}
                                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1A6B4A] text-white text-sm font-semibold hover:bg-[#134F37] transition-colors"
                            >
                                Comprar ahora
                            </button>
                            <button
                                onClick={handleAddToCart}
                                className={[
                                    "w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl border text-sm font-semibold transition-colors",
                                    inCart
                                        ? "border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                                        : "border-[#1A6B4A] text-[#1A6B4A] hover:bg-[#1A6B4A]/5",
                                ].join(" ")}
                            >
                                {inCart ? (
                                    <><Check size={16} weight="bold" /> Ver carrito</>
                                ) : (
                                    <><ShoppingCart size={16} /> Agregar al carrito</>
                                )}
                            </button>
                        </div>

                        {/* Garantía */}
                        <p className="text-xs text-slate-400 text-center">
                            Acceso inmediato al material tras la compra
                        </p>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}
