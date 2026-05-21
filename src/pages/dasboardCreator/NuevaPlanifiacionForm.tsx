import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/Select";


import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

//! ESTA DATA TIENE Q VENIR DE LA BASE DE DATOS PERO EL SUBJECT SIN TILDES ESTAS CONSTANTES SON SOLO DE PRUEBA
const subjects = [
    { value: "all", label: "Todas las materias" },
    { value: "matematica", label: "Matemática" },
    { value: "lengua", label: "Lengua" },
    { value: "sociales", label: "Sociales" },
    { value: "naturales", label: "Naturales" },
];

//! NO PUEDEN VENIR ELEMENTOS VACIOS SINO ROMPE LOS COMPONENTES 
const grades = [
    { value: "all", label: "Todos los grados" },
    { value: "1°", label: "Primero" },
    { value: "2°", label: "Segundo" },
    { value: "3°", label: "Tercero" },
    { value: "4°", label: "Cuarto" },
    { value: "5°", label: "Quinto" },
    { value: "6°", label: "Sexto" },
    { value: "7°", label: "Séptimo" },
];

// schema de validaciones
const formSchema = z.object({
    title: z.string().min(3, "Mínimo 3 caracteres"),
    description: z.string().optional(),
    price: z.number().min(0, "El precio debe ser positivo"),
    url: z.string().url("Debe ser una URL válida").optional(),
    idMateria: z.number().min(1, "Selecciona una materia"),
    idGrado: z.number().min(1, "Selecciona un grado"),
    nameFile: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

//componente del formulario
export const NuevaPlanificacionForm = () => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            url: "",
            idMateria: 0,
            idGrado: 0,
            nameFile: "",
        },
    });

    const onSubmit = (values: FormValues) => {
        console.log("Planificación:", values);
        form.reset();
    };

    //! CORREGIR LA LOGICA YA Q TODO ENTRA Y SALE STRING EN EL ONSUBMIT TENDRIA Q CAMBIAR PRICE Y LAS ID DE GRADO Y MATERIA PARA MANDAR A LA BASE DE DATOS

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
                                    <FormLabel>
                                        Titulo
                                    </FormLabel>

                                    <FormControl>
                                        <Input
                                            className="bg-white border-slate-200"
                                            placeholder="Titulo"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="grid gap-2">

                                    <div className="flex items-center">
                                        <FormLabel>
                                            Descripción
                                        </FormLabel>


                                    </div>

                                    <FormControl>
                                        <Textarea placeholder="Ingrese la descripcion..." />


                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <FormLabel>
                                        Precio
                                    </FormLabel>

                                    <FormControl>
                                        <Input
                                            className="bg-white border-slate-200"
                                            placeholder="Precio"
                                            type="number"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="idGrado"
                            render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <FormLabel>
                                        Selecciona el grado
                                    </FormLabel>

                                    <FormControl>
                                        <Select onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Grado" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {grades.map((g) => (
                                                    <SelectItem key={g.value} value={g.value}>
                                                        {g.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>


                                    </FormControl>

                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="idMateria"
                            render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <FormLabel>
                                        Selecciona la materia
                                    </FormLabel>

                                    <FormControl>
                                        <Select onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Materia" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {subjects.map((g) => (
                                                    <SelectItem key={g.value} value={g.value}>
                                                        {g.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>


                                    </FormControl>

                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="nameFile"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Archivo</FormLabel>

                                    <FormControl>
                                        <Input
                                            type="file"
                                            onChange={(e) =>
                                                field.onChange(e.target.files?.[0])
                                            }
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit"
                            className="w-full bg-violet-500 hover:bg-violet-600 text-white"
                        >
                            Crear Planificación
                        </Button>

                    </form>

                </Form>
            </div>
        </>
    )
}


