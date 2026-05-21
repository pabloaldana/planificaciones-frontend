import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginForm } from "@/components/forms/LoginForm"

export const LoginCard = () => {
    return (
        <Card className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white shadow-lg">
            <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-[#1e293b]">
                    Iniciar sesión
                </CardTitle>
                <CardDescription className="text-slate-500 text-sm">
                    Ingresá tus datos para continuar
                </CardDescription>
            </CardHeader>

            <CardContent>
                <LoginForm />
            </CardContent>
        </Card>
    )
}
