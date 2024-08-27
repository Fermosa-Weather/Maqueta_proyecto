import { Link } from "react-router-dom"

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
          <Link href="#" className="text-base hover:underline" prefetch={false}>
            Home
          </Link>
          <Link href="#" className="text-base hover:underline" prefetch={false}>
            Weather
          </Link>
          <Link href="#" className="text-base hover:underline" prefetch={false}>
            About Us
          </Link>
          <Link href="#" className="text-base hover:underline" prefetch={false}>
            Contact
          </Link>
        </nav>
        <nav className="grid gap-4">
          <Link href="#" className="text-base hover:underline" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="#" className="text-base hover:underline" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-base hover:underline" prefetch={false}>
            Support
          </Link>
        </nav>
        <div className="flex items-center justify-start sm:justify-end">
          <p className="text-base text-gray-400">&copy; 2024 Weather App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}