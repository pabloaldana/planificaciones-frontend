import { LoginCard } from "@/components/auth/LoginCard";

export const LoginPage = () => {
    return (
        <div className="min-h-screen bg-slate-100 flex flex-col">


            <div className="grid min-h-screen lg:grid-cols-2">

                {/* Imagen */}
                <div className="hidden lg:flex items-center justify-center bg-zinc-900 text-white">
                    Imagen
                </div>

                {/* Login */}
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-100 via-sky-50 to-pink-100">
                    <LoginCard />
                </div>
            </div>
        </div>
    );
};