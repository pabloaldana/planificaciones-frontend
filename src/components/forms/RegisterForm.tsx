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

// ── Schema ────────────────────────────────────────────────────────────────────
const formSchema = z
    .object({
        nombre: z.string().min(2, "Mínimo 2 caracteres"),
        apellido: z.string().min(2, "Mínimo 2 caracteres"),
        email: z.string().email("Email inválido"),
        password: z.string().min(8, "Mínimo 8 caracteres"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    })

type FormValues = z.infer<typeof formSchema>

// ── Component ─────────────────────────────────────────────────────────────────
export const RegisterForm = () => {
    const { register, loginWithGoogle, isLoading, error } = useAuth()
    const navigate = useNavigate()

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombre: "",
            apellido: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    const onSubmit = async (values: FormValues) => {
        try {
            await register(values.nombre, values.apellido, values.email, values.password)
            //como los nuevos usuarios siempre son user navego directamnte a su dashboar
            navigate("/mi-cuenta")
        } catch {
            // el error ya lo maneja AuthContext en `error`
        }
    }

    const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
        if (!credentialResponse.credential) return
        try {
            await loginWithGoogle(credentialResponse.credential)
            navigate("/mi-cuenta")
        } catch {
            // el error ya lo maneja AuthContext en `error`
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
            >
                {/* Nombre + Apellido */}
                <div className="grid grid-cols-2 gap-3">
                    <FormField
                        control={form.control}
                        name="nombre"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input
                                        className="bg-white border-slate-200"
                                        placeholder="Juan"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="apellido"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Apellido</FormLabel>
                                <FormControl>
                                    <Input
                                        className="bg-white border-slate-200"
                                        placeholder="Pérez"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    className="bg-white border-slate-200"
                                    type="email"
                                    placeholder="juan@ejemplo.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />

                {/* Contraseña */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contraseña</FormLabel>
                            <FormControl>
                                <Input
                                    className="bg-white border-slate-200"
                                    type="password"
                                    placeholder="Mínimo 8 caracteres"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />

                {/* Confirmar contraseña */}
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirmar contraseña</FormLabel>
                            <FormControl>
                                <Input
                                    className="bg-white border-slate-200"
                                    type="password"
                                    placeholder="Repetí tu contraseña"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />

                {/* Error del servidor */}
                {error && (
                    <p className="text-xs text-red-500 text-center">{error}</p>
                )}

                {/* Submit */}
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#1A6B4A] hover:bg-[#134F37] text-white mt-2"
                >
                    {isLoading ? "Creando cuenta..." : "Crear cuenta"}
                </Button>

                {/* Divisor */}
                <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-slate-200" />
                    <span className="text-xs text-slate-400">o continuá con</span>
                    <div className="h-px flex-1 bg-slate-200" />
                </div>

                <div className="flex justify-center">
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => { /* el botón de Google ya muestra su propio error visual */ }}
                    />
                </div>

                {/* Link al login */}
                <p className="text-center text-sm text-slate-500">
                    ¿Ya tenés una cuenta?{" "}
                    <NavLink
                        to="/login"
                        className="text-[#1A6B4A] hover:underline font-medium"
                    >
                        Iniciá sesión
                    </NavLink>
                </p>
            </form>
        </Form>
    )
}
