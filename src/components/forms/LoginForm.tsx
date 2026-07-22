import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { NavLink, useNavigate } from "react-router-dom"
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google"

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
import type { User } from "@/context/AuthContext"

// ── Schema ────────────────────────────────────────────────────────────────────
const formSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(2, "Contraseña requerida"),
})

type FormValues = z.infer<typeof formSchema>

// ── Component ─────────────────────────────────────────────────────────────────
export const LoginForm = () => {
    const { login, loginWithGoogle, isLoading, error } = useAuth()
    const navigate = useNavigate()

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { email: "", password: "" },
    })

    // Login normal y con Google terminan en el mismo lugar según el rol
    const redirectByRole = (loggedUser: User) => {
        if (loggedUser.roles.includes("super-admin")) {
            navigate("/admin")
        } else if (loggedUser.roles.includes("admin")) {
            navigate("/dashboard")
        } else {
            navigate("/mi-cuenta")
        }
    }

    const onSubmit = async (values: FormValues) => {
        try {
            const loggedUser = await login(values.email, values.password)
            redirectByRole(loggedUser)
        } catch {
            // el error ya lo maneja AuthContext en `error`
        }
    }

    const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
        if (!credentialResponse.credential) return
        try {
            const loggedUser = await loginWithGoogle(credentialResponse.credential)
            redirectByRole(loggedUser)
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
                                    className="bg-card border-border"
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
                                    className="ml-auto text-sm hover:underline text-muted-foreground hover:text-primary"
                                >
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>
                            <FormControl>
                                <Input
                                    className="bg-card border-border"
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
                    className="w-full bg-primary text-primary-foreground hover:opacity-90"
                >
                    {isLoading ? "Ingresando..." : "Iniciar sesión"}
                </Button>

                {/* Divisor */}
                <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-xs text-muted-foreground">o continuá con</span>
                    <div className="h-px flex-1 bg-border" />
                </div>

                <div className="flex justify-center">
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => { /* el botón de Google ya muestra su propio error visual */ }}
                    />
                </div>

                <p className="text-center text-sm text-muted-foreground">
                    ¿No estás registrado?{" "}
                    <NavLink to="/registro" className="text-primary hover:underline font-medium">
                        Registrarse
                    </NavLink>
                </p>

            </form>
        </Form>
    )
}