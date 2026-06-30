import { LoginForm } from "@/components/forms/LoginForm"
import { AuthLayout } from "@/components/layouts/AuthLayout"

export const LoginPage = () => (
    <AuthLayout title="Iniciar sesión" description="Ingresá tus datos para continuar">
        <LoginForm />
    </AuthLayout>
)
