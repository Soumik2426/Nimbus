import { motion } from "framer-motion";
import {
  ShieldCheck,
  Package,
  Search,
  Filter,
  Users,
  LayoutDashboard,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure Authentication",
    description:
      "JWT-based authentication with role-based authorization for ADMIN and USER.",
  },
  {
    icon: Package,
    title: "Product Management",
    description:
      "Create, update, delete and manage products through a clean interface.",
  },
  {
    icon: Search,
    title: "Powerful Search",
    description:
      "Instantly search products by keyword with an intuitive experience.",
  },
  {
    icon: Filter,
    title: "Smart Filtering",
    description:
      "Browse products efficiently using category filters and sorting options.",
  },
  {
    icon: Users,
    title: "Role-Based Access",
    description:
      "Separate capabilities for administrators and normal users.",
  },
  {
    icon: LayoutDashboard,
    title: "Modern Dashboard",
    description:
      "Monitor and manage products from a clean, responsive dashboard.",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
            Features
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Everything You Need To Manage Products
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Nimbus Product Hub combines security, simplicity and performance
            into one modern product management platform.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: .5,
                  delay: index * .1,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                }}
                className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-xl"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 transition-all group-hover:bg-indigo-600 group-hover:text-white">
                  <Icon size={26} />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {feature.description}
                </p>

              </motion.div>

            );

          })}

        </div>

      </div>
    </section>
  );
}

export default Features;