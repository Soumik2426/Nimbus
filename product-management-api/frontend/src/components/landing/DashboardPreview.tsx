import { motion } from "framer-motion";
import {
  Package,
  TrendingUp,
  Boxes,
  ShoppingBag,
  Search,
} from "lucide-react";

const products = [
  {
    name: "MacBook Pro",
    category: "Laptop",
    price: "$2,499",
    stock: 32,
  },
  {
    name: "Mechanical Keyboard",
    category: "Accessories",
    price: "$149",
    stock: 84,
  },
  {
    name: "Gaming Mouse",
    category: "Accessories",
    price: "$79",
    stock: 126,
  },
  {
    name: "Samsung Monitor",
    category: "Monitor",
    price: "$399",
    stock: 18,
  },
];

function DashboardPreview() {
  return (
    <section
      id="preview"
      className="bg-slate-50 py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
            Dashboard Preview
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Beautiful.
            Powerful.
            Productive.
          </h2>

          <p className="mt-5 text-lg text-gray-600">
            A modern dashboard built for managing products efficiently with
            search, filtering and role-based access.
          </p>
        </motion.div>

        {/* Dashboard */}

        <motion.div
          initial={{ opacity: 0, scale: .96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: .5 }}
          className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl"
        >

          {/* Top Bar */}

          <div className="flex items-center justify-between border-b border-gray-200 px-8 py-5">

            <h3 className="text-lg font-semibold">
              Nimbus Dashboard
            </h3>

            <div className="relative">

              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search products..."
                className="rounded-xl border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 outline-none"
              />

            </div>

          </div>

          {/* Statistics */}

          <div className="grid gap-6 p-8 md:grid-cols-4">

            <StatCard
              icon={<Package />}
              title="Products"
              value="240"
            />

            <StatCard
              icon={<Boxes />}
              title="Categories"
              value="12"
            />

            <StatCard
              icon={<TrendingUp />}
              title="Growth"
              value="+18%"
            />

            <StatCard
              icon={<ShoppingBag />}
              title="In Stock"
              value="98%"
            />

          </div>

          {/* Table */}

          <div className="px-8 pb-8">

            <table className="w-full border-collapse overflow-hidden rounded-2xl">

              <thead>

                <tr className="bg-slate-100">

                  <th className="px-5 py-4 text-left">
                    Product
                  </th>

                  <th className="px-5 py-4 text-left">
                    Category
                  </th>

                  <th className="px-5 py-4 text-left">
                    Price
                  </th>

                  <th className="px-5 py-4 text-left">
                    Stock
                  </th>

                </tr>

              </thead>

              <tbody>

                {products.map((product) => (

                  <tr
                    key={product.name}
                    className="border-b border-gray-100 transition hover:bg-gray-50"
                  >

                    <td className="px-5 py-4">
                      {product.name}
                    </td>

                    <td className="px-5 py-4">
                      {product.category}
                    </td>

                    <td className="px-5 py-4">
                      {product.price}
                    </td>

                    <td className="px-5 py-4">

                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">

                        {product.stock}

                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </motion.div>

      </div>
    </section>
  );
}

function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
        {icon}
      </div>

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h3 className="mt-2 text-3xl font-bold text-gray-900">
        {value}
      </h3>
    </div>
  );
}

export default DashboardPreview;