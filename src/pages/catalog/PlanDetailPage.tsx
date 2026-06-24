import { useRef, useState, useEffect } from "react"
import { useParams, NavLink } from "react-router-dom"
import { ShoppingCart, LockSimple, Check } from "@phosphor-icons/react"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"
import { PublicNavbar } from "@/components/common/PublicNavbar"
import { getSubjectConfig } from "@/constants/subjects"
import { useCart } from "@/context/CartContext"
import { usePlanificacion } from "@/hooks/usePlanificaciones"
import { Footer } from "@/components/Footer"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
).toString()

// ── PDF Preview con overlay ───────────────────────────────────────────────────
const PdfPreview = ({ file }: { file: string }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [pageWidth, setPageWidth] = useState(0)

    useEffect(() => {
        if (!containerRef.current) return
        const observer = new ResizeObserver(([entry]) => {
            setPageWidth(entry.contentRect.width)
        })
        observer.observe(containerRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={containerRef}
            className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm"
        >
            {pageWidth > 0 && (
                <Document
                    file={file}
                    loading={
                        <div className="flex items-center justify-center h-96 text-slate-400 text-sm">
                            Cargando preview...
                        </div>
                    }
                    error={
                        <div className="flex items-center justify-center h-96 text-slate-400 text-sm">
                            No se pudo cargar el PDF.
                        </div>
                    }
                >
                    <Page pageNumber={1} width={pageWidth} />
                    <Page pageNumber={2} width={pageWidth} />
                </Document>
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-x-0 bottom-0 h-[55%] bg-linear-to-b from-transparent via-white/70 to-white" />

            {/* CTA en el overlay */}
            <div className="absolute inset-x-0 bottom-0 h-[35%] flex flex-col items-center justify-center gap-3 px-6">
                <div className="w-10 h-10 rounded-full bg-[#1A6B4A]/10 flex items-center justify-center">
                    <LockSimple size={20} weight="fill" className="text-[#1A6B4A]" />
                </div>
                <p className="text-slate-700 font-semibold text-sm text-center">
                    Comprá para ver el contenido completo
                </p>
            </div>
        </div>
    )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export const PlanDetailPage = () => {
    const { id } = useParams() //para sacar la id que viene en la url
    const { addItem, isInCart, openCart } = useCart()
    const { data: plan, isLoading } = usePlanificacion(Number(id)) //sacamos la info de la planificacion usando el id que sacamos de la url

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

                    {/* ── PDF Preview ───────────────────────────── */}
                    <PdfPreview file={plan.url} />

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
