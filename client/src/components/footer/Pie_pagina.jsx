import { Link } from "react-router-dom";

export default function Pie_pagina() {
  return (
    <footer className="bg-black text-white py-12 md:py-16">
      <div className="container max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Weather App</h3>
          <p className="text-base text-gray-400">
            Get accurate and up-to-date weather information for your location.
          </p>
        </div>
        <nav className="grid gap-4">
          <Link to="/" className="text-base hover:underline">
            Home
          </Link>
          <Link to="/weather" className="text-base hover:underline">
            Weather
          </Link>
          <Link to="/about" className="text-base hover:underline">
            About Us
          </Link>
          <Link to="/contact" className="text-base hover:underline">
            Contact
          </Link>
        </nav>
        <nav className="grid gap-4">
          <Link to="/privacy-policy" className="text-base hover:underline">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="text-base hover:underline">
            Terms of Service
          </Link>
          <Link to="/support" className="text-base hover:underline">
            Support
          </Link>
        </nav>
        <div className="flex items-center justify-start sm:justify-end">
          <p className="text-base text-gray-400">&copy; 2024 Weather App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
