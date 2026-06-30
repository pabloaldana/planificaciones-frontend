import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FilePdf, UploadSimple, X, ArrowLeft } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form, FormField, FormItem, FormLabel, FormControl, FormMessage,
} from "@/components/ui/form"
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/Select"
import { useMaterias, useGrados, useCreatePlanificacion } from "@/hooks/index"

// ── Schema ────────────────────────────────────────────────────────────────────

const formSchema = z.object({
    title: z.string().min(3, "Mínimo 3 caracteres"),
    description: z.string().min(10, "Mínimo 10 caracteres"),
    price: z.coerce.number({ error: "Ingresá un precio válido" })
        .positive("El precio debe ser mayor a 0"),
    materiaId: z.string().min(1, "Seleccioná una materia"),
    gradoId: z.string().min(1, "Seleccioná un grado"),
    pdf: z.custom<FileList>()
        .refine(files => files?.length > 0, "El archivo PDF es requerido")
        .refine(files => files?.[0]?.type === "application/pdf", "Solo se aceptan archivos PDF")
        .refine(files => files?.[0]?.size <= 10 * 1024 * 1024, "El archivo no puede superar 10MB"),
})

// z.coerce.number() acepta cualquier cosa como entrada (Input) y devuelve number recién
// después de validar (Output) — react-hook-form necesita los dos tipos por separado,
// si no, el resolver de Zod no calza con lo que useForm espera.
type FormInput = z.input<typeof formSchema>
type FormValues = z.output<typeof formSchema>

// ── Page ──────────────────────────────────────────────────────────────────────

export const CrearPlanificacion = () => {
    const navigate = useNavigate()
    const { data: materias = [] } = useMaterias()
    const { data: grados = [] } = useGrados()
    const { mutate: crearPlanificacion, isPending } = useCreatePlanificacion()
    const [fileName, setFileName] = useState<string | null>(null)

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

    const onSubmit = (values: FormValues) => {
        crearPlanificacion(
            {
                title: values.title,
                description: values.description,
                price: values.price,
                materiaId: Number(values.materiaId),
                gradoId: Number(values.gradoId),
                file: values.pdf[0],
            },
            {
                onSuccess: () => navigate("/dashboard/planificaciones"),
            }
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
                    <h1 className="text-2xl font-bold text-[#1A6B4A]">Nueva planificación</h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Completá los datos y subí el archivo PDF del material.
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

                        {/* PDF Upload */}
                        <FormField
                            control={form.control}
                            name="pdf"
                            render={({ field: { onChange, ref } }) => (
                                <FormItem>
                                    <FormLabel>Archivo PDF</FormLabel>
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
                                                            Arrastrá el PDF o <span className="text-[#1A6B4A]">buscá en tu equipo</span>
                                                        </p>
                                                        <p className="text-xs text-slate-400 mt-1">
                                                            Solo PDF · Máximo 10MB
                                                        </p>
                                                    </div>
                                                </>
                                            )}
                                            <input
                                                id="pdf-upload"
                                                type="file"
                                                accept="application/pdf"
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
                                disabled={isPending}
                                className="bg-[#1A6B4A] hover:bg-[#134F37] text-white disabled:opacity-60"
                            >
                                {isPending ? "Creando..." : "Crear planificación"}
                            </Button>
                        </div>

                    </form>
                </Form>
            </div>
        </div>
    )
}
