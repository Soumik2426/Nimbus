import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Package,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import { loginUser } from "../../api/authApi";
import { useAuth } from "../../hooks/useAuth";

import {
  loginSchema,
  type LoginFormData,
} from "../../utils/validators/authSchema";

export default function LoginForm() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (
    data: LoginFormData
  ) => {
    try {
      const response =
        await loginUser(data);

      login(
        response.data.token,
        response.data.user
      );

      toast.success(response.message);

      navigate("/dashboard");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Login failed."
      );
    }
  };

  return (
    <div className="relative flex w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/30 bg-white/60 shadow-2xl backdrop-blur-2xl">

      {/* Left Section */}

      <div className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-indigo-700 via-violet-700 to-fuchsia-600 lg:flex">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_45%)]" />

        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-pink-500/20 blur-3xl" />

        <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">

          <div>

            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-xl">

              <Package size={34} />

            </div>

            <h1 className="text-5xl font-black leading-tight">

              Product
              <br />
              Management

            </h1>

            <p className="mt-6 max-w-md text-lg leading-8 text-indigo-100">

              Manage your inventory with a secure,
              scalable and modern dashboard built for
              businesses of every size.

            </p>

          </div>

          <div>

            <p className="text-indigo-100">

              Secure Authentication

            </p>

            <p className="mt-2 text-sm text-indigo-200">

              JWT Authentication • Role Based Access •
              REST API • React + Spring Boot

            </p>

          </div>

        </div>

      </div>

      {/* Right Section */}

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
          duration: 0.5,
        }}
        className="flex flex-1 items-center justify-center bg-white/80 px-8 py-14 backdrop-blur-xl"
      >

        <div className="w-full max-w-md">

          <h2 className="text-4xl font-black text-slate-900">

            Welcome Back

          </h2>

          <p className="mt-2 text-slate-500">

            Sign in to continue.

          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-10 space-y-6"
          >

            {/* Email */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">

                Email

              </label>

              <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-4">

                <Mail
                  size={20}
                  className="text-slate-400"
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                  className="h-14 w-full bg-transparent px-3 outline-none"
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

              <label className="mb-2 block text-sm font-semibold text-slate-700">

                Password

              </label>

              <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-4">

                <Lock
                  size={20}
                  className="text-slate-400"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  {...register("password")}
                  className="h-14 w-full bg-transparent px-3 outline-none"
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
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

              {errors.password && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}

            </div>

            <div className="flex items-center justify-between">

              <label className="flex items-center gap-2 text-sm text-slate-600">

                <input
                  type="checkbox"
                  className="rounded"
                />

                Remember me

              </label>

              <button
                type="button"
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
              >

                Forgot Password?

              </button>

            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-14 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting
                ? "Signing In..."
                : "Sign In"}
            </button>

          </form>

          <p className="mt-8 text-center text-slate-600">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Create Account
            </Link>

          </p>

        </div>

      </motion.div>

    </div>
  );
}