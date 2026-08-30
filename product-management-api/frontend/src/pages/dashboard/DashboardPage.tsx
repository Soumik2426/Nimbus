import { motion } from "framer-motion";

import {
  ArrowRight,
  Box,
  Package,
  Settings,
  ShieldCheck,
  ShoppingBag,
  UserCircle2,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

function DashboardPage() {
  const { user } = useAuth();

  const cards = [
    {
      title: "Products",
      value: "--",
      icon: Package,
      color: "from-indigo-500 to-blue-500",
    },
    {
      title: "Role",
      value: user?.role,
      icon: ShieldCheck,
      color: "from-violet-500 to-fuchsia-500",
    },
    {
      title: "Status",
      value: "Active",
      icon: ShoppingBag,
      color: "from-emerald-500 to-green-500",
    },
    {
      title: "Account",
      value: "Verified",
      icon: Box,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Hero */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 p-10 text-white shadow-2xl"
      >
        <h1 className="text-4xl font-black">
          Welcome back,
          {" "}
          {user?.firstName}
          👋
        </h1>

        <p className="mt-4 max-w-2xl text-indigo-100 text-lg">
          Manage your products, profile and settings
          through a clean, secure and scalable dashboard.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">

          <Link
            to="/products"
            className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-indigo-700 transition hover:scale-105"
          >
            View Products

            <ArrowRight size={18} />
          </Link>

          {user?.role === "ADMIN" && (
            <Link
              to="/products/create"
              className="rounded-xl border border-white/30 px-6 py-3 font-semibold transition hover:bg-white/10"
            >
              Add Product
            </Link>
          )}

        </div>
      </motion.div>

      {/* Stats */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {cards.map((card, index) => {

          const Icon = card.icon;

          return (

            <motion.div
              key={card.title}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.1,
              }}
              className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${card.color} text-white`}
              >
                <Icon size={24} />
              </div>

              <p className="mt-6 text-sm text-gray-500">
                {card.title}
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                {card.value}
              </h2>

            </motion.div>

          );

        })}

      </div>

      {/* Profile */}

      <div className="grid gap-6 lg:grid-cols-3">

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.5,
          }}
          className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm lg:col-span-2"
        >

          <h2 className="mb-8 text-2xl font-bold">
            Account Information
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <p className="text-sm text-gray-500">
                Full Name
              </p>

              <h3 className="mt-2 text-lg font-semibold">
                {user?.firstName} {user?.lastName}
              </h3>

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Email
              </p>

              <h3 className="mt-2 text-lg font-semibold">
                {user?.email}
              </h3>

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Role
              </p>

              <span className="mt-2 inline-flex rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
                {user?.role}
              </span>

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Authentication
              </p>

              <span className="mt-2 inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                Authenticated
              </span>

            </div>

          </div>

        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.6,
          }}
          className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm"
        >

          <UserCircle2
            size={70}
            className="text-indigo-600"
          />

          <h2 className="mt-5 text-2xl font-bold">
            Quick Actions
          </h2>

          <div className="mt-8 space-y-3">

            <Link
              to="/profile"
              className="block rounded-xl bg-gray-50 px-5 py-3 transition hover:bg-indigo-50"
            >
              View Profile
            </Link>

            <Link
              to="/settings"
              className="flex items-center gap-3 rounded-xl bg-gray-50 px-5 py-3 transition hover:bg-indigo-50"
            >
              <Settings size={18} />

              Settings
            </Link>

            <Link
              to="/products"
              className="block rounded-xl bg-gray-50 px-5 py-3 transition hover:bg-indigo-50"
            >
              Browse Products
            </Link>

          </div>

        </motion.div>

      </div>

    </div>
  );
}

export default DashboardPage;