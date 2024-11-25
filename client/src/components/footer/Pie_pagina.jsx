import { Link } from "react-router-dom";

export default function Pie_pagina() {
  return (
    <footer className="bg-black text-white py-12 md:py-16">
      <div className="container max-w-7xl flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left">
        
        {/* Columna izquierda: Enlaces de políticas */}
        <div className="flex flex-col space-y-4 md:w-1/3">
          <Link href="#" className="text-base hover:underline" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="#" className="text-base hover:underline" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-base hover:underline" prefetch={false}>
            Support
          </Link>
        </div>

        {/* Columna central: Enlaces principales de navegación */}
        <div className="flex flex-col space-y-4 md:w-1/3">
          <Link to="/home" className="text-base hover:underline" prefetch={false}>
            Home
          </Link>
          <Link to="/weather" className="text-base hover:underline" prefetch={false}>
            Weather
          </Link>
          <Link to="/about" className="text-base hover:underline" prefetch={false}>
            About Us
          </Link>
          <Link to="/contacto" className="text-base hover:underline" prefetch={false}>
            Contact
          </Link>
        </div>

        {/* Columna derecha: Enlaces adicionales */}
        <div className="flex flex-col space-y-4 md:w-1/3">
          <Link to="/mapa" className="text-base hover:underline" prefetch={false}>
            Map
          </Link>
          <Link to="/modelo_prediccion" className="text-base hover:underline" prefetch={false}>
            Prediction
          </Link>
          <Link to="/noticias" className="text-base hover:underline" prefetch={false}>
            News
          </Link>
        </div>
      </div>

      {/* Derechos reservados, centrado abajo */}
      <div className="mt-6 flex justify-center">
        <p className="text-base text-gray-400">&copy; 2024 Weather App. All rights reserved.</p>
      </div>

    </footer>
  );
}
