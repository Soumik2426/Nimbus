import { ArrowRight, ShieldCheck, Package, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white pt-36 pb-24">
      {/* Background Blur */}
      <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-100 blur-3xl opacity-60" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 text-center lg:px-8">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700"
        >
          <ShieldCheck size={16} />
          Secure • Fast • Modern
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl text-5xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-7xl"
        >
          Modern Product Management
          <span className="block text-indigo-600">
            Built for Simplicity.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 max-w-3xl text-lg leading-8 text-gray-600"
        >
          Nimbus Product Hub helps teams manage products with secure
          authentication, role-based access, powerful search, category
          filtering, pagination, and an elegant dashboard experience.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Link
            to="/register"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-700"
          >
            Get Started
            <ArrowRight size={18} />
          </Link>

          <Link
            to="/login"
            className="rounded-xl border border-gray-300 bg-white px-7 py-4 text-base font-semibold text-gray-700 transition hover:border-indigo-600 hover:text-indigo-600"
          >
            Login
          </Link>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <div className="flex items-center gap-2 rounded-full bg-white px-5 py-3 shadow-sm">
            <Package size={18} className="text-indigo-600" />
            <span className="text-sm font-medium text-gray-700">
              Product CRUD
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-white px-5 py-3 shadow-sm">
            <Search size={18} className="text-indigo-600" />
            <span className="text-sm font-medium text-gray-700">
              Smart Search
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-white px-5 py-3 shadow-sm">
            <Filter size={18} className="text-indigo-600" />
            <span className="text-sm font-medium text-gray-700">
              Category Filter
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;