import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { LoginForm } from "@/components/forms/LoginForm";

export const LoginCard = () => {
    return (
        <Card className="w-full max-w-md rounded-3xl border-0 bg-white/80 backdrop-blur shadow-2xl">

            <CardHeader className="space-y-2 pb-6">
                <CardTitle>
                    Iniciar sesión
                </CardTitle>

                <CardDescription>
                    Ingresá tus datos para continuar
                </CardDescription>
            </CardHeader>

            <CardContent>
                <LoginForm />
            </CardContent>

            <CardFooter className="flex-col gap-2">
                <Button className="w-full">
                    Login con Google
                </Button>
            </CardFooter>

        </Card>
    );
};