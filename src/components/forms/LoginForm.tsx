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
const formSchema = z.object({
    nameUser: z.string().min(3, "Mínimo 3 caracteres"),
    password: z.string().min(2, "Password requerida"),
})

type FormValues = z.infer<typeof formSchema>

// ── Component ─────────────────────────────────────────────────────────────────
export const LoginForm = () => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nameUser: "",
            password: "",
        },
    })

    const onSubmit = (values: FormValues) => {
        console.log("Login:", values)
        form.reset()
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
            >
                <FormField
                    control={form.control}
                    name="nameUser"
                    render={({ field }) => (
                        <FormItem className="grid gap-2">
                            <FormLabel>Usuario</FormLabel>
                            <FormControl>
                                <Input
                                    className="bg-white border-slate-200"
                                    placeholder="Usuario"
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
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit */}
                <Button
                    type="submit"
                    className="w-full bg-[#8B3A52] hover:bg-[#6E2D40] text-white"
                >
                    Iniciar sesión
                </Button>

                {/* Link al registro */}
                <p className="text-center text-sm text-slate-500">
                    ¿No estás registrado?{" "}
                    <NavLink
                        to="/registro"
                        className="text-[#8B3A52] hover:underline font-medium"
                    >
                        Registrarse
                    </NavLink>
                </p>
            </form>
        </Form>
    )
}
