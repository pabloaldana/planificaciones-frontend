import { useEffect, useState } from "react"
import DOMPurify from "dompurify"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FilePdf, UploadSimple, X, ArrowLeft, Eye, Image } from "@phosphor-icons/react"
import { RichTextEditor } from "@/components/ui/RichTextEditor"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form, FormField, FormItem, FormLabel, FormControl, FormMessage,
} from "@/components/ui/form"
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/Select"
import { useMaterias, useGrados, usePlanificacion, useUpdatePlanificacion, useDownloadPlanificacion, useDeletePlanificacionImagen } from "@/hooks/index"
import { uploadPlanificacionImage } from "@/services/planificaciones.service"
import { useQueryClient } from "@tanstack/react-query"

// ── Schema ────────────────────────────────────────────────────────────────────
// A diferencia de "crear", el PDF es opcional: solo se valida si se elige uno nuevo.

const ARCHIVOS_PERMITIDOS = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]

const formSchema = z.object({
    title: z.string().min(3, "Mínimo 3 caracteres"),
    description: z.string().min(10, "Mínimo 10 caracteres"),
    price: z.coerce.number({ error: "Ingresá un precio válido" })
        .positive("El precio debe ser mayor a 0"),
    materiaId: z.string().min(1, "Seleccioná una materia"),
    gradoId: z.string().min(1, "Seleccioná un grado"),
    pdf: z.custom<FileList>()
        .refine(files => !files || files.length === 0 || ARCHIVOS_PERMITIDOS.includes(files[0]?.type), "Solo se aceptan archivos PDF o Word")
        .refine(files => !files || files.length === 0 || files[0]?.size <= 10 * 1024 * 1024, "El archivo no puede superar 10MB")
        .optional(),
})

// Mismo motivo que en CrearPlanificacion.tsx: z.coerce.number() tiene un tipo de
// entrada (Input) distinto al de salida (Output), y useForm necesita los dos.
type FormInput = z.input<typeof formSchema>
type FormValues = z.output<typeof formSchema>

// ── Page ──────────────────────────────────────────────────────────────────────

export const EditarPlanificacion = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { id } = useParams()
    const planificacionId = Number(id)

    const { data: plan, isLoading: isLoadingPlan } = usePlanificacion(planificacionId)
    const { data: materias = [] } = useMaterias()
    const { data: grados = [] } = useGrados()
    const { mutate: editarPlanificacion, isPending } = useUpdatePlanificacion()
    const { mutate: getDownloadLink } = useDownloadPlanificacion()
    const { mutate: eliminarImagen } = useDeletePlanificacionImagen()
    const [fileName, setFileName] = useState<string | null>(null)
    const [imageFiles, setImageFiles] = useState<{ file: File; preview: string }[]>([])
    const [imageError, setImageError] = useState<string | null>(null)
    const [isUploadingImages, setIsUploadingImages] = useState(false)
    const [removedImageIds, setRemovedImageIds] = useState<number[]>([])
    const [deletingImageId, setDeletingImageId] = useState<number | null>(null)
    const [richContent, setRichContent] = useState("")

    // Imágenes ya persistidas (vienen del plan cargado), sin las que se borraron en esta sesión.
    const existingImages = (plan?.imagenes ?? []).filter(img => !removedImageIds.includes(img.id))
    const totalImageCount = existingImages.length + imageFiles.length

    const handleVerPdfActual = () => {
        getDownloadLink(planificacionId, {
            onSuccess: (data) => window.open(data.url, "_blank", "noopener,noreferrer"),
        })
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = Array.from(e.target.files ?? [])
        const invalid = selected.filter(f => !f.type.startsWith("image/"))
        if (invalid.length) { setImageError("Solo se aceptan archivos de imagen"); return }
        const oversized = selected.filter(f => f.size > 5 * 1024 * 1024)
        if (oversized.length) { setImageError("Cada imagen no puede superar 5MB"); return }
        setImageError(null)
        const remaining = 3 - totalImageCount
        const toAdd = selected.slice(0, remaining).map(f => ({ file: f, preview: URL.createObjectURL(f) }))
        setImageFiles(prev => [...prev, ...toAdd])
        e.target.value = ""
    }

    const removeImage = (index: number) => {
        setImageFiles(prev => {
            URL.revokeObjectURL(prev[index].preview)
            return prev.filter((_, i) => i !== index)
        })
    }

    const removeExistingImage = (imagenId: number) => {
        setImageError(null)
        setDeletingImageId(imagenId)
        eliminarImagen(
            { id: planificacionId, imagenId },
            {
                onSuccess: () => setRemovedImageIds(prev => [...prev, imagenId]),
                onError: () => setImageError("No se pudo borrar la imagen. Probá de nuevo."),
                onSettled: () => setDeletingImageId(null),
            }
        )
    }

    const form = useForm<FormInput, any, FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            price: undefined,
            materiaId: "",
            gradoId: "",
        },
    })

    // El plan llega async (useQuery) — recién cuando está disponible podemos precargar el form.
    // Esperamos también a materias/grados: el <select> nativo oculto que usa Radix Select
    // dispara un onValueChange("") espontáneo si sus <option> aparecen DESPUÉS de fijar el
    // value, pisando el materiaId/gradoId ya seteado.
    useEffect(() => {
        if (!plan || materias.length === 0 || grados.length === 0) return
        form.reset({
            title: plan.title,
            description: plan.description,
            price: plan.price,
            materiaId: String(plan.materia.id),
            gradoId: String(plan.grado.id),
        })
        setRichContent(plan.content ?? "")
    }, [plan, form, materias.length, grados.length])

    const onSubmit = (values: FormValues) => {
        editarPlanificacion(
            {
                id: planificacionId,
                payload: {
                    title: values.title,
                    description: values.description,
                    price: values.price,
                    materiaId: Number(values.materiaId),
                    gradoId: Number(values.gradoId),
                    file: values.pdf?.[0],
                    content: richContent ? DOMPurify.sanitize(richContent) : undefined,
                },
            },
            {
                onSuccess: async () => {
                    if (imageFiles.length) {
                        setIsUploadingImages(true)
                        for (const imageFile of imageFiles) {
                            await uploadPlanificacionImage(planificacionId, imageFile.file)
                        }
                        setIsUploadingImages(false)
                    }
                    queryClient.invalidateQueries({ queryKey: ["planificaciones"] })
                    queryClient.invalidateQueries({ queryKey: ["planificaciones-admin"] })
                    navigate("/dashboard/planificaciones")
                },
            }
        )
    }

    if (isLoadingPlan || !plan) {
        return (
            <div className="max-w-2xl mx-auto text-center text-slate-400 text-sm py-20">
                Cargando planificación...
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto">

            {/* Breadcrumb */}
            <button
                onClick={() => navigate("/dashboard/planificaciones")}
                className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#1A6B4A] transition-colors mb-6"
            >
                <ArrowLeft size={15} />
                Volver a planificaciones
            </button>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 sm:p-8">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-[#1A6B4A]">Editar planificación</h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Modificá los datos que quieras cambiar.
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">

                        {/* Título */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Título</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ej: Números naturales — 3° grado"
                                            className="bg-slate-50 border-slate-200 focus:border-[#1A6B4A]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Descripción */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descripción</FormLabel>
                                    <FormControl>
                                        <textarea
                                            placeholder="Describí el contenido y los objetivos del material..."
                                            rows={4}
                                            className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#1A6B4A] transition-colors resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Materia + Grado */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="materiaId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Materia</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="bg-slate-50 border-slate-200">
                                                    <SelectValue placeholder="Seleccioná una materia" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {materias.map(m => (
                                                    <SelectItem key={m.id} value={String(m.id)}>
                                                        {m.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="gradoId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Grado</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="bg-slate-50 border-slate-200">
                                                    <SelectValue placeholder="Seleccioná un grado" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {grados.map(g => (
                                                    <SelectItem key={g.id} value={String(g.id)}>
                                                        {g.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Precio */}
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem className="sm:max-w-[200px]">
                                    <FormLabel>Precio (ARS)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Ej: 1500"
                                            className="bg-slate-50 border-slate-200 focus:border-[#1A6B4A]"
                                            {...field}
                                            value={(field.value as number | string | undefined) ?? ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Contenido enriquecido */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-slate-700">
                                Detalle del contenido <span className="text-slate-400 font-normal">(opcional)</span>
                            </label>
                            <p className="text-xs text-slate-400">
                                Explicá qué incluye la planificación: objetivos, actividades, secciones, etc.
                            </p>
                            <RichTextEditor
                                value={richContent}
                                onChange={setRichContent}
                                placeholder="Escribí el detalle de lo que incluye esta planificación..."
                            />
                        </div>

                        {/* PDF Upload */}
                        <FormField
                            control={form.control}
                            name="pdf"
                            render={({ field: { onChange, ref } }) => (
                                <FormItem>
                                    <FormLabel>Archivo PDF o Word</FormLabel>

                                    <button
                                        type="button"
                                        onClick={handleVerPdfActual}
                                        className="inline-flex items-center gap-1.5 text-xs text-[#1A6B4A] hover:underline mb-2"
                                    >
                                        <Eye size={13} />
                                        Ver el archivo actual
                                    </button>

                                    <FormControl>
                                        <label
                                            htmlFor="pdf-upload"
                                            className={[
                                                "flex flex-col items-center justify-center w-full rounded-xl border-2 border-dashed cursor-pointer transition-colors p-8 gap-3",
                                                fileName
                                                    ? "border-[#1A6B4A]/40 bg-[#1A6B4A]/5"
                                                    : "border-slate-200 bg-slate-50 hover:border-[#1A6B4A]/40 hover:bg-[#1A6B4A]/5",
                                            ].join(" ")}
                                        >
                                            {fileName ? (
                                                <>
                                                    <FilePdf size={36} weight="fill" className="text-[#1A6B4A]" />
                                                    <div className="flex items-center gap-2 text-sm font-medium text-[#1A6B4A]">
                                                        <span className="max-w-xs truncate">{fileName}</span>
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.preventDefault()
                                                                setFileName(null)
                                                                onChange(undefined)
                                                            }}
                                                            className="p-0.5 rounded hover:bg-[#1A6B4A]/10 transition-colors"
                                                            aria-label="Quitar archivo"
                                                        >
                                                            <X size={14} />
                                                        </button>
                                                    </div>
                                                    <span className="text-xs text-slate-400">
                                                        Clic para reemplazar
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <UploadSimple size={36} className="text-slate-300" />
                                                    <div className="text-center">
                                                        <p className="text-sm font-medium text-slate-600">
                                                            Arrastrá un archivo nuevo o <span className="text-[#1A6B4A]">buscá en tu equipo</span>
                                                        </p>
                                                        <p className="text-xs text-slate-400 mt-1">
                                                            Opcional · dejalo vacío para mantener el actual · Máximo 10MB
                                                        </p>
                                                    </div>
                                                </>
                                            )}
                                            <input
                                                id="pdf-upload"
                                                type="file"
                                                accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf,.doc,.docx"
                                                className="sr-only"
                                                ref={ref}
                                                onChange={(e) => {
                                                    const files = e.target.files
                                                    onChange(files)
                                                    setFileName(files?.[0]?.name ?? null)
                                                }}
                                            />
                                        </label>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Imágenes del catálogo */}
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm font-medium text-slate-700">
                                    Imágenes del catálogo <span className="text-slate-400 font-normal">(opcional · hasta 3)</span>
                                </p>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    Se muestran en la card del catálogo y la página de detalle.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {existingImages.map((img) => (
                                    <div key={img.id} className="relative w-24 h-24 rounded-lg overflow-hidden border border-slate-200 group">
                                        <img src={img.url} alt="" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeExistingImage(img.id)}
                                            disabled={deletingImageId === img.id}
                                            className="absolute top-1 right-1 bg-white/80 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-60"
                                            aria-label="Quitar imagen"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}

                                {imageFiles.map((img, i) => (
                                    <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden border border-slate-200 group">
                                        <img src={img.preview} alt="" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(i)}
                                            className="absolute top-1 right-1 bg-white/80 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                            aria-label="Quitar imagen"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}

                                {totalImageCount < 3 && (
                                    <label
                                        htmlFor="image-upload"
                                        className="w-24 h-24 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-[#1A6B4A]/40 hover:bg-[#1A6B4A]/5 transition-colors"
                                    >
                                        <Image size={20} className="text-slate-300" />
                                        <span className="text-xs text-slate-400">Agregar</span>
                                        <input
                                            id="image-upload"
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            className="sr-only"
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                )}
                            </div>

                            {imageError && <p className="text-xs text-red-500">{imageError}</p>}
                        </div>

                        {/* Acciones */}
                        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2 border-t border-slate-100">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate("/dashboard/planificaciones")}
                                className="border-slate-200 text-slate-600 hover:bg-slate-50"
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                disabled={isPending || isUploadingImages}
                                className="bg-[#1A6B4A] hover:bg-[#134F37] text-white disabled:opacity-60"
                            >
                                {isPending || isUploadingImages ? "Guardando..." : "Guardar cambios"}
                            </Button>
                        </div>

                    </form>
                </Form>
            </div>
        </div>
    )
}