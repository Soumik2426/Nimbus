import { motion } from "framer-motion";
import {
  UserPlus,
  LogIn,
  LayoutDashboard,
  Package,
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Account",
    description:
      "Register securely with your personal details and start using Nimbus within seconds.",
  },
  {
    icon: LogIn,
    title: "Login Securely",
    description:
      "Authenticate using JWT-based login with role-based authorization.",
  },
  {
    icon: LayoutDashboard,
    title: "Access Dashboard",
    description:
      "View products, search instantly, filter categories and monitor everything from one place.",
  },
  {
    icon: Package,
    title: "Manage Products",
    description:
      "Create, update, delete and organize products with a modern and intuitive interface.",
  },
];

function HowItWorks() {
  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
            Workflow
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Get Started In Four Simple Steps
          </h2>

          <p className="mt-5 text-lg text-gray-600">
            Nimbus keeps product management simple while providing enterprise-grade security.
          </p>

        </motion.div>

        <div className="mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {steps.map((step, index) => {

            const Icon = step.icon;

            return (

              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >

                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">

                  <Icon size={28} />

                </div>

                <span className="absolute right-6 top-6 text-5xl font-black text-gray-100">
                  0{index + 1}
                </span>

                <h3 className="text-xl font-semibold">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {step.description}
                </p>

              </motion.div>

            );

          })}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;