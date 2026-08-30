import { motion } from "framer-motion";
import {
  CheckCircle2,
  ShieldCheck,
  Search,
  Package,
  Users,
  Zap,
} from "lucide-react";

const highlights = [
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "JWT authentication with role-based authorization keeps your application secure.",
  },
  {
    icon: Package,
    title: "Complete Product Lifecycle",
    description:
      "Create, update, delete and organize products from a single interface.",
  },
  {
    icon: Search,
    title: "Fast Product Discovery",
    description:
      "Search, sort and filter products instantly with a clean user experience.",
  },
  {
    icon: Users,
    title: "Role-Based Experience",
    description:
      "Separate experiences for administrators and users without unnecessary complexity.",
  },
];

function WhyChoose() {
  return (
    <section
      id="why"
      className="bg-gradient-to-b from-slate-50 to-white py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-20 px-6 lg:grid-cols-2">

        {/* Left Side */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
            Why Nimbus
          </span>

          <h2 className="mt-6 text-5xl font-bold leading-tight text-gray-900">
            Designed for
            <span className="text-indigo-600"> productivity, </span>
            built for
            <span className="text-indigo-600"> simplicity.</span>
          </h2>

          <p className="mt-8 text-lg leading-8 text-gray-600">
            Nimbus Product Hub combines a clean interface with powerful
            backend capabilities. From secure authentication to seamless
            product management, every feature is built to make managing your
            inventory simple and efficient.
          </p>

          <div className="mt-10 space-y-5">

            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-emerald-500" />
              <span>Secure JWT Authentication</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-emerald-500" />
              <span>Role-Based Access Control</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-emerald-500" />
              <span>Responsive Dashboard</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-emerald-500" />
              <span>Fast Search & Filtering</span>
            </div>

          </div>
        </motion.div>

        {/* Right Side */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="grid gap-6"
        >
          {highlights.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start gap-5">
                  <div className="rounded-2xl bg-indigo-100 p-4 text-indigo-600">
                    <Icon size={26} />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {item.title}
                    </h3>

                    <p className="mt-2 leading-7 text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="mt-4 flex items-center justify-between rounded-3xl bg-indigo-600 p-7 text-white shadow-xl">

            <div>
              <h3 className="text-4xl font-bold">
                99.9%
              </h3>

              <p className="mt-2 text-indigo-100">
                Reliable experience built on a robust Spring Boot backend.
              </p>
            </div>

            <Zap size={46} />
          </div>

        </motion.div>

      </div>
    </section>
  );
}

export default WhyChoose;