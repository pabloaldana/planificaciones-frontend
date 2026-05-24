import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { NavLink } from "react-router-dom"

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

// ── Schema ────────────────────────────────────────────────────────────────────
const formSchema = z
    .object({
        nombre: z.string().min(2, "Mínimo 2 caracteres"),
        apellido: z.string().min(2, "Mínimo 2 caracteres"),
        email: z.string().email("Email inválido"),
        username: z
            .string()
            .min(3, "Mínimo 3 caracteres")
            .max(20, "Máximo 20 caracteres")
            .regex(/^[a-zA-Z0-9_]+$/, "Solo letras, números y guión bajo"),
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
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombre: "",
            apellido: "",
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
        },
    })

    const onSubmit = (values: FormValues) => {
        console.log("Registro:", values)
        form.reset()
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

                {/* Username */}
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre de usuario</FormLabel>
                            <FormControl>
                                <Input
                                    className="bg-white border-slate-200"
                                    placeholder="juan_perez"
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

                {/* Submit */}
                <Button
                    type="submit"
                    className="w-full bg-[#8B3A52] hover:bg-[#6E2D40] text-white mt-2"
                >
                    Crear cuenta
                </Button>

                {/* Link al login */}
                <p className="text-center text-sm text-slate-500">
                    ¿Ya tenés una cuenta?{" "}
                    <NavLink
                        to="/login"
                        className="text-[#8B3A52] hover:underline font-medium"
                    >
                        Iniciá sesión
                    </NavLink>
                </p>
            </form>
        </Form>
    )
}
