import { useEffect, useState } from "react";
import { CycleNav } from "./components/CycleNav"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import axios from "axios";


function App() {
  //! ACA RECUPERO LA DATA DE LOS GRADOS PARA REENDERIZARLOS EN EL NAV, EN REALIDAD ESTO VIENE DEL BACKEND
  const [cycleData, setCycleData] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/grados/cycles")
      .then((res) => setCycleData(res.data));
  }, []);
  return (
    <>
      <div className="min-h-dvh flex flex-col">

        <Header />

        {cycleData && <CycleNav data={cycleData} />}

        {/* aca va el contenido dinamico con react router */}
        <main className="flex-grow bg-[#F2F2F2] p-6">
          Contenido
        </main>

        <Footer />
      </div>

    </>
  )
}

export default App
