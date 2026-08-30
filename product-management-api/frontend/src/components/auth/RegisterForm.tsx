import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Package,
  User,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import { registerUser } from "../../api/authApi";

import {
  registerSchema,
  type RegisterFormData,
} from "../../utils/validators/authSchema";

function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(
    data: RegisterFormData
  ) {
    try {
      const response =
        await registerUser(data);

      toast.success(response.message);

      navigate("/login");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Registration failed."
      );
    }
  }

  return (
    <div className="relative flex w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/30 bg-white/60 shadow-2xl backdrop-blur-2xl">

      {/* Left */}

      <div className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-indigo-700 via-violet-700 to-fuchsia-600 lg:flex">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_45%)]" />

        <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">

          <div>

            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">

              <Package size={34} />

            </div>

            <h1 className="text-5xl font-black leading-tight">

              Create
              <br />
              Account

            </h1>

            <p className="mt-6 max-w-md text-lg leading-8 text-indigo-100">

              Join Nimbus Product Hub and start managing
              products through a beautiful dashboard.

            </p>

          </div>

          <p className="text-sm text-indigo-100">
            Secure • Fast • Modern
          </p>

        </div>

      </div>

      {/* Right */}

      <motion.div
        initial={{
          opacity: 0,
          x: 40,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className="flex flex-1 items-center justify-center bg-white/80 px-8 py-14"
      >

        <div className="w-full max-w-md">

          <h2 className="text-4xl font-black">
            Create Account
          </h2>

          <p className="mt-2 text-slate-500">
            Register to continue.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 space-y-5"
          >

            {/* First Name */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
                First Name
              </label>

              <div className="flex items-center rounded-2xl border border-slate-200 px-4">

                <User
                  size={18}
                  className="text-slate-400"
                />

                <input
                  {...register("firstName")}
                  className="h-14 w-full px-3 outline-none"
                  placeholder="John"
                />

              </div>

              {errors.firstName && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}

            </div>

            {/* Last Name */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Last Name
              </label>

              <div className="flex items-center rounded-2xl border border-slate-200 px-4">

                <User
                  size={18}
                  className="text-slate-400"
                />

                <input
                  {...register("lastName")}
                  className="h-14 w-full px-3 outline-none"
                  placeholder="Doe"
                />

              </div>

              {errors.lastName && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}

            </div>

            {/* Email */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Email
              </label>

              <div className="flex items-center rounded-2xl border border-slate-200 px-4">

                <Mail
                  size={18}
                  className="text-slate-400"
                />

                <input
                  type="email"
                  {...register("email")}
                  className="h-14 w-full px-3 outline-none"
                  placeholder="john@example.com"
                />

              </div>

              {errors.email && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}

            </div>

            {/* Password */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Password
              </label>

              <div className="flex items-center rounded-2xl border border-slate-200 px-4">

                <Lock
                  size={18}
                  className="text-slate-400"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  {...register("password")}
                  className="h-14 w-full px-3 outline-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

              {errors.password && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}

            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-14 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 font-semibold text-white transition hover:scale-[1.02]"
            >
              {isSubmitting
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          <p className="mt-8 text-center text-slate-600">

            Already have an account?{" "}

            <Link
              to="/login"
              className="font-semibold text-indigo-600"
            >
              Sign In
            </Link>

          </p>

        </div>

      </motion.div>

    </div>
  );
}

export default RegisterForm;