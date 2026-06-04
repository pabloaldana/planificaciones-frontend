import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { NavLink, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form"
import { useAuth } from "@/context/AuthContext"

// ── Schema ────────────────────────────────────────────────────────────────────
const formSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(2, "Contraseña requerida"),
})

type FormValues = z.infer<typeof formSchema>

// ── Component ─────────────────────────────────────────────────────────────────
export const LoginForm = () => {
    const { login, isLoading, error } = useAuth()
    const navigate = useNavigate()

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { email: "", password: "" },
    })

    const onSubmit = async (values: FormValues) => {
        try {
            const loggedUser = await login(values.email, values.password)
            if (loggedUser.roles.includes("super-admin")) {
                navigate("/admin")
            } else if (loggedUser.roles.includes("admin")) {
                navigate("/dashboard")
            } else {
                navigate("/mi-cuenta")
            }
        } catch {
            // el error ya lo maneja AuthContext en `error`
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">

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

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="grid gap-2">
                            <div className="flex items-center">
                                <FormLabel>Contraseña</FormLabel>
                                <a
                                    href="#"
                                    className="ml-auto text-sm hover:underline text-slate-500 hover:text-[#8B3A52]"
                                >
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>
                            <FormControl>
                                <Input
                                    className="bg-white border-slate-200"
                                    type="password"
                                    placeholder="Contraseña"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />

                {/* Error del servidor */}
                {error && (
                    <p className="text-xs text-red-500 text-center -mt-2">{error}</p>
                )}

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#8B3A52] hover:bg-[#6E2D40] text-white"
                >
                    {isLoading ? "Ingresando..." : "Iniciar sesión"}
                </Button>

                <p className="text-center text-sm text-slate-500">
                    ¿No estás registrado?{" "}
                    <NavLink to="/registro" className="text-[#8B3A52] hover:underline font-medium">
                        Registrarse
                    </NavLink>
                </p>

            </form>
        </Form>
    )
}