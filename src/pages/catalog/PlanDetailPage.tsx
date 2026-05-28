import { useRef, useState, useEffect } from "react"
import { useParams, NavLink } from "react-router-dom"
import { Star, ShoppingCart, LockSimple, Check } from "@phosphor-icons/react"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"
import { PublicNavbar } from "@/components/common/PublicNavbar"
import { subjectConfig } from "@/constants/subjects"
import { useCart } from "@/context/CartContext"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
).toString()

// ── Mock data (reemplazar con llamada al backend) ──────────────────────────────
const PLANIFICACIONES = [
    { id: 1,  title: "Números Naturales",       subject: "Matematica", grade: "3°", price: 1000, rating: 4.9, sales: 24 },
    { id: 2,  title: "Suma y Resta",            subject: "Matematica", grade: "2°", price: 800,  rating: 4.7, sales: 18 },
    { id: 3,  title: "Multiplicación",          subject: "Matematica", grade: "4°", price: 1000, rating: 4.8, sales: 15 },
    { id: 4,  title: "Comprensión Lectora",     subject: "Lengua",     grade: "5°", price: 1200, rating: 4.8, sales: 19 },
    { id: 5,  title: "El Abecedario",           subject: "Lengua",     grade: "1°", price: 700,  rating: 4.6, sales: 12 },
    { id: 6,  title: "La Oración Simple",       subject: "Lengua",     grade: "3°", price: 900,  rating: 4.5, sales: 10 },
    { id: 7,  title: "Sistema Solar",           subject: "Naturales",  grade: "4°", price: 900,  rating: 4.7, sales: 14 },
    { id: 8,  title: "Ecosistemas",             subject: "Naturales",  grade: "5°", price: 1100, rating: 4.6, sales: 11 },
    { id: 9,  title: "El Agua y sus Estados",   subject: "Naturales",  grade: "3°", price: 800,  rating: 4.8, sales: 20 },
    { id: 10, title: "Mapas y Continentes",     subject: "Sociales",   grade: "6°", price: 1000, rating: 4.7, sales: 16 },
    { id: 11, title: "Provincias de Argentina", subject: "Sociales",   grade: "5°", price: 1200, rating: 4.9, sales: 22 },
    { id: 12, title: "Pueblos Originarios",     subject: "Sociales",   grade: "4°", price: 900,  rating: 4.5, sales: 8  },
    { id: 13, title: "Intro a la Computación",  subject: "Tecnologia", grade: "4°", price: 1100, rating: 4.7, sales: 13 },
    { id: 14, title: "Internet y Redes",        subject: "Tecnologia", grade: "6°", price: 1300, rating: 4.8, sales: 17 },
    { id: 15, title: "Algoritmos Básicos",      subject: "Tecnologia", grade: "5°", price: 1000, rating: 4.6, sales: 9  },
]

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

            {/* Gradient overlay — cubre la mitad inferior */}
            <div className="absolute inset-x-0 bottom-0 h-[55%] bg-linear-to-b from-transparent via-white/70 to-white" />

            {/* CTA en el overlay */}
            <div className="absolute inset-x-0 bottom-0 h-[35%] flex flex-col items-center justify-center gap-3 px-6">
                <div className="w-10 h-10 rounded-full bg-[#8B3A52]/10 flex items-center justify-center">
                    <LockSimple size={20} weight="fill" className="text-[#8B3A52]" />
                </div>
                <p className="text-slate-700 font-semibold text-sm text-center">
                    Comprá para ver el contenido completo
                </p>
                <NavLink
                    to="#"
                    className="px-5 py-2.5 rounded-xl bg-[#8B3A52] text-white text-sm font-semibold hover:bg-[#6E2D40] transition-colors shadow-md"
                >
                    Comprar ahora
                </NavLink>
            </div>
        </div>
    )
}

// ── Fila de estrellas ─────────────────────────────────────────────────────────
const RatingStars = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
            <Star
                key={i}
                size={14}
                weight={i <= Math.round(rating) ? "fill" : "regular"}
                className={i <= Math.round(rating) ? "text-amber-400" : "text-slate-300"}
            />
        ))}
        <span className="ml-1 text-sm font-semibold text-slate-700">{rating}</span>
    </div>
)

// ── Page ──────────────────────────────────────────────────────────────────────
export const PlanDetailPage = () => {
    const { id }    = useParams()
    const { addItem, isInCart, openCart } = useCart()
    const plan      = PLANIFICACIONES.find((p) => p.id === Number(id))

    if (!plan) {
        return (
            <div className="min-h-screen bg-[#F2F2F2] font-mono">
                <PublicNavbar />
                <div className="max-w-6xl mx-auto px-4 py-20 text-center text-slate-500">
                    Planificación no encontrada.{" "}
                    <NavLink to="/catalogo" className="text-[#8B3A52] hover:underline">
                        Volver al catálogo
                    </NavLink>
                </div>
            </div>
        )
    }

    const subject = subjectConfig[plan.subject]
    const cuotas  = Math.ceil(plan.price / 3)
    const inCart  = isInCart(plan.id)

    const handleAddToCart = () => {
        addItem({ id: plan.id, title: plan.title, subject: plan.subject, grade: plan.grade, price: plan.price })
        openCart()
    }

    return (
        <div className="min-h-screen bg-[#F2F2F2] font-mono">
            <PublicNavbar />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">

                {/* Breadcrumb */}
                <NavLink
                    to="/catalogo"
                    className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#8B3A52] transition-colors mb-6"
                >
                    ← Volver al catálogo
                </NavLink>

                {/* Layout principal */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">

                    {/* ── PDF Preview ───────────────────────────── */}
                    <PdfPreview file="/sample.pdf" />

                    {/* ── Info del producto ─────────────────────── */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col gap-5 lg:sticky lg:top-24">

                        {/* Badge + grado */}
                        <div className="flex items-center justify-between">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${subject.badge}`}>
                                {subject.label}
                            </span>
                            <span className="text-xs text-slate-400 font-medium">
                                {plan.grade} grado
                            </span>
                        </div>

                        {/* Título */}
                        <h1 className="text-2xl font-bold text-[#8B3A52] leading-snug">
                            {plan.title}
                        </h1>

                        {/* Rating + ventas */}
                        <div className="flex items-center gap-3 text-sm text-slate-500">
                            <RatingStars rating={plan.rating} />
                            <span>·</span>
                            <span>{plan.sales} ventas</span>
                        </div>

                        <div className="border-t border-slate-100" />

                        {/* Precio */}
                        <div className="flex flex-col gap-1">
                            <span className="text-3xl font-bold text-[#8B3A52]">
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
                                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#8B3A52] text-white text-sm font-semibold hover:bg-[#6E2D40] transition-colors"
                            >
                                Comprar ahora
                            </button>
                            <button
                                onClick={handleAddToCart}
                                className={[
                                    "w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl border text-sm font-semibold transition-colors",
                                    inCart
                                        ? "border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                                        : "border-[#8B3A52] text-[#8B3A52] hover:bg-[#8B3A52]/5",
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
        </div>
    )
}
