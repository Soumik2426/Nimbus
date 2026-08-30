import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_40%)]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mx-auto flex max-w-6xl flex-col items-center px-6 text-center"
      >
        <span className="rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur-sm">
          Ready to Get Started?
        </span>

        <h2 className="mt-8 max-w-4xl text-5xl font-bold leading-tight text-white">
          Build Better Product Workflows
          <br />
          With Nimbus Product Hub
        </h2>

        <p className="mt-8 max-w-3xl text-lg leading-8 text-indigo-100">
          Secure authentication, role-based access, fast search,
          category filtering, and modern product management —
          everything you need in one place.
        </p>

        <div className="mt-12 flex flex-col gap-5 sm:flex-row">

          <Link
            to="/register"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 font-semibold text-indigo-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            Create Free Account
            <ArrowRight size={18} />
          </Link>

          <Link
            to="/login"
            className="rounded-2xl border border-white/30 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
          >
            Login
          </Link>

        </div>

      </motion.div>
    </section>
  );
}

export default CTA;