import { Menu, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";


function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-gray-200/70 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md">
            <Package size={22} />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              Nimbus
            </h1>

            <p className="text-xs text-gray-500">
              Product Management
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-10 text-sm font-medium text-gray-600 lg:flex">
          <a href="#features" className="transition hover:text-indigo-600">
            Features
          </a>

          <a href="#preview" className="transition hover:text-indigo-600">
            Preview
          </a>

          <a href="#why" className="transition hover:text-indigo-600">
            Why Nimbus
          </a>

          <a href="#contact" className="transition hover:text-indigo-600">
            Contact
          </a>
        </nav>

        {/* Right Side */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            to="/login"
            className="font-medium text-gray-700 transition hover:text-indigo-600"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 lg:hidden"
        >
          <Menu size={26} />
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white lg:hidden">
          <div className="flex flex-col gap-5 p-6">
            <a href="#features">Features</a>
            <a href="#preview">Preview</a>
            <a href="#why">Why Nimbus</a>
            <a href="#contact">Contact</a>

            <Link to="/login">Login</Link>

            <Link
              to="/register"
              className="rounded-xl bg-indigo-600 py-3 text-center font-semibold text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;