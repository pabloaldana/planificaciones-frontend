import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";

// schema de validaciones
const formSchema = z.object({
    nameUser: z.string().min(3, "Mínimo 3 caracteres"),
    password: z.string().min(2, "Password requerida"),
});

type FormValues = z.infer<typeof formSchema>;

export const LoginForm = () => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nameUser: "",
            password: "",

        },
    });

    const onSubmit = (values: FormValues) => {
        console.log("Planificación:", values);
        form.reset();
    };

    return (
        <>  {/* 🔥 SHADCN FORM ABAJO */}
            <div>
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
                                    <FormLabel>
                                        Usuario
                                    </FormLabel>

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
                                        <FormLabel>
                                            Contraseña
                                        </FormLabel>

                                        <a
                                            href="#"
                                            className="ml-auto text-sm hover:underline text-violet-600 hover:text-violet-700"
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

                        <Button type="submit"
                            className="w-full bg-violet-500 hover:bg-violet-600 text-white"
                        >
                            Iniciar sesión
                        </Button>

                    </form>

                </Form>
            </div>
        </>
    )
}


