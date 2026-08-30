import { Mail, Package } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-gray-200 bg-white"
    >
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 md:grid-cols-2 lg:grid-cols-5">

        {/* Branding */}

        <div className="lg:col-span-2">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Package />
            </div>

            <div>

              <h3 className="text-2xl font-bold">
                Nimbus
              </h3>

              <p className="text-gray-500">
                Product Hub
              </p>

            </div>

          </div>

          <p className="mt-6 max-w-md leading-7 text-gray-600">
            Nimbus Product Hub is a modern product management
            platform built with React, Spring Boot, JWT authentication,
            and role-based access control.
          </p>

          <div className="mt-8 flex gap-5">

            <FaGithub
                size={22}
                className="cursor-pointer transition duration-300 hover:-translate-y-1 hover:text-indigo-600"
            />

            <FaLinkedin
                size={22}
                className="cursor-pointer transition duration-300 hover:-translate-y-1 hover:text-indigo-600"
            />

            <Mail
              className="cursor-pointer transition hover:text-indigo-600"
            />

          </div>

        </div>

        {/* Product */}

        <div>

          <h4 className="font-semibold text-gray-900">
            Product
          </h4>

          <ul className="mt-6 space-y-3 text-gray-600">

            <li>Features</li>
            <li>Dashboard</li>
            <li>Products</li>
            <li>Security</li>

          </ul>

        </div>

        {/* Resources */}

        <div>

          <h4 className="font-semibold text-gray-900">
            Resources
          </h4>

          <ul className="mt-6 space-y-3 text-gray-600">

            <li>Documentation</li>
            <li>API</li>
            <li>Support</li>
            <li>Help Center</li>

          </ul>

        </div>

        {/* Company */}

        <div>

          <h4 className="font-semibold text-gray-900">
            Company
          </h4>

          <ul className="mt-6 space-y-3 text-gray-600">

            <li>About</li>
            <li>Privacy</li>
            <li>Terms</li>
            <li>Contact</li>

          </ul>

        </div>

      </div>

      <div className="border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        © 2026 Nimbus Product Hub. Built with React, TypeScript & Spring Boot.
      </div>
    </footer>
  );
}

export default Footer;