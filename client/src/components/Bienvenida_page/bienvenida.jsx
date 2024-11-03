import { Link } from "react-router-dom";
import logoCifor from '../../../src/images/logo-cifor.png'; // Importar la imagen
import '../../stilos/pagina_bienvenida.css';

export default function Welcome() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground inicio">
      <main className="container mx-auto py-12 md:py-24 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-start space-y-4 text-left"> {/* Mantén el texto alineado a la izquierda */}
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl titulo-izquierda">
              Bienvenido a CIFOR
            </h1>

            <p className="max-w-[700px] text-muted-foreground text-justify"> {/* Corregido a text-justify */}
              Aquí encontrarás toda la información meteorológica que necesitas para mantenerte actualizado sobre el
              clima en tu región. Desde pronósticos detallados hasta mapas interactivos, nuestro sitio web te brinda las
              herramientas y datos precisos que necesitas para planificar tus actividades con confianza.
            </p>

            <div className="flex justify-center">
              <Link to="/home" className="btn">Ver más</Link>
            </div>
          </div>
          <img
            src={logoCifor} // Usar la imagen importada
            alt="Logo de CIFOR" // Texto alternativo más descriptivo
          />
        </div>
      </main>
    </div>
  );
}
