import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import emailjs from "@emailjs/browser"
import { CheckCircle, PaperPlaneTilt, Warning } from "@phosphor-icons/react"

import { PublicNavbar } from "@/components/common/PublicNavbar"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form"

// ── Schema ────────────────────────────────────────────────────────────────────
const formSchema = z.object({
    nombre: z.string().min(2, "El nombre es requerido"),
    email: z.string().email("Email inválido"),
    asunto: z.string().min(3, "El asunto es requerido"),
    mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
})

type FormValues = z.infer<typeof formSchema>

type Status = "idle" | "sending" | "success" | "error"

// ── Component ─────────────────────────────────────────────────────────────────
export const ContactPage = () => {
    const [status, setStatus] = useState<Status>("idle")

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { nombre: "", email: "", asunto: "", mensaje: "" },
    })

    const onSubmit = async (values: FormValues) => {
        setStatus("sending")
        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    name: values.nombre,
                    from_name: values.nombre,
                    from_email: values.email,
                    title: values.asunto,
                    message: values.mensaje,
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
            )
            setStatus("success")
            form.reset()
        } catch {
            setStatus("error")
        }
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <PublicNavbar />

            <main className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 bg-gradient-to-b from-white to-slate-50">
                <div className="w-full max-w-lg">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <span className="inline-block mb-4 px-3 py-1 rounded-full bg-[#D1F2EB] text-[#1A6B4A] text-xs font-semibold tracking-wide">
                            Contacto
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#1A6B4A] mb-2">
                            ¿Tenés alguna consulta?
                        </h1>
                        <p className="text-slate-500 text-sm">
                            Completá el formulario y te respondemos a la brevedad.
                        </p>
                    </div>

                    {/* Card */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">

                        {status === "success" ? (
                            <div className="flex flex-col items-center gap-4 py-8 text-center">
                                <CheckCircle size={52} weight="duotone" className="text-[#1A6B4A]" />
                                <h2 className="text-lg font-bold text-slate-700">¡Mensaje enviado!</h2>
                                <p className="text-slate-500 text-sm">
                                    Gracias por escribirnos. Te respondemos en las próximas 24 horas.
                                </p>
                                <Button
                                    variant="outline"
                                    className="mt-2 border-[#1A6B4A] text-[#1A6B4A] hover:bg-[#D1F2EB]"
                                    onClick={() => setStatus("idle")}
                                >
                                    Enviar otra consulta
                                </Button>
                            </div>
                        ) : (
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <FormField
                                            control={form.control}
                                            name="nombre"
                                            render={({ field }) => (
                                                <FormItem className="grid gap-2">
                                                    <FormLabel>Nombre</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="bg-white border-slate-200"
                                                            placeholder="Tu nombre"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-xs" />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem className="grid gap-2">
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="bg-white border-slate-200"
                                                            placeholder="tucorreo@ejemplo.com"
                                                            type="email"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-xs" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="asunto"
                                        render={({ field }) => (
                                            <FormItem className="grid gap-2">
                                                <FormLabel>Asunto</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="bg-white border-slate-200"
                                                        placeholder="¿Sobre qué querés consultar?"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-xs" />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="mensaje"
                                        render={({ field }) => (
                                            <FormItem className="grid gap-2">
                                                <FormLabel>Mensaje</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        className="bg-white border-slate-200 min-h-[140px] resize-none"
                                                        placeholder="Escribí tu consulta acá..."
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-xs" />
                                            </FormItem>
                                        )}
                                    />

                                    {status === "error" && (
                                        <div className="flex items-center gap-2 text-red-500 text-sm">
                                            <Warning size={16} />
                                            <span>Hubo un error al enviar. Intentá de nuevo.</span>
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        disabled={status === "sending"}
                                        className="w-full bg-[#1A6B4A] hover:bg-[#134F37] text-white gap-2"
                                    >
                                        <PaperPlaneTilt size={16} weight="duotone" />
                                        {status === "sending" ? "Enviando..." : "Enviar consulta"}
                                    </Button>

                                </form>
                            </Form>
                        )}

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
