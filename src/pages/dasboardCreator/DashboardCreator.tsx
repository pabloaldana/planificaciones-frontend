import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Planifiaciones } from "./Planifiaciones";
import { Sidebar } from "../../components/ui/Sidebar";


const seccionesSidebar = [
    { icon: "📊", label: "Dashboard", path: "/dashboard" },
    { icon: "📄", label: "Planificaciones", path: "/planificaciones" },
    { icon: "📈", label: "Estadísticas", path: "/estadisticas" },
    { icon: "⚙️", label: "Configuración", path: "/configuracion" },
];

export const DashboardCreator = () => {


    return (
        <div className="min-h-screen bg-slate-100 flex flex-col">
            {/* Header */}
            <Header />


            {/* Contenido principal */}
            <div className="flex flex-1">
                {/* Sidebar */}
                <Sidebar title="Panel" items={seccionesSidebar} />

                {/* Main */}
                <main className="flex-1 p-6">
                    {/* Bienvenida */}
                    <section className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Hola Pablo 👋
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Gestioná tus planificaciones fácilmente.
                        </p>
                    </section>

                    {/* Cards */}
                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

                        <div className="bg-white rounded-2xl shadow p-5">
                            <p className="text-gray-500">Publicadas</p>
                            <h3 className="text-3xl font-bold text-green-600">20</h3>
                        </div>

                        <div className="bg-white rounded-2xl shadow p-5">
                            <p className="text-gray-500">Vendidas</p>
                            <h3 className="text-3xl font-bold text-yellow-500">6</h3>
                        </div>

                    </section>


                    {/* Tabla */}
                    <Planifiaciones />
                </main>
            </div>
            {/* Footer */}
            <Footer />
        </div>
    );
}
