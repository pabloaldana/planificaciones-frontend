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
    title: z.string().min(3, "Mínimo 3 caracteres"),
    subject: z.string().min(2, "Materia requerida"),
    date: z.string().min(1, "Fecha requerida"),
});

type FormValues = z.infer<typeof formSchema>;

export const EditPlanificacionForm = () => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            subject: "",

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
                            name="title"
                            render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <FormLabel>Título</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ej: Examen de matemática" {...field} className="bg-white border-slate-200" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <FormLabel>Materia</FormLabel>
                                    <FormControl>
                                        <Input className="bg-white border-slate-200" placeholder="Ej: Matemática" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <FormLabel>Fecha</FormLabel>
                                    <FormControl>
                                        <Input className="bg-white border-slate-200" type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full">
                            Actualizar planificación
                        </Button>

                    </form>
                </Form>
            </div>
        </>
    )
}



