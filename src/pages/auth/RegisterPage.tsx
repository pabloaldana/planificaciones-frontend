import { RegisterForm } from "@/components/forms/RegisterForm"
import { AuthLayout } from "@/components/layouts/AuthLayout"

export const RegisterPage = () => (
    <AuthLayout title="Crear cuenta" description="Completá tus datos para registrarte">
        <RegisterForm />
    </AuthLayout>
)
