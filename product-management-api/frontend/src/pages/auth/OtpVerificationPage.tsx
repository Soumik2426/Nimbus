import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, ShieldCheck, KeyRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

import { sendOtp, verifyOtp } from "../../api/authApi";

const otpSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  otp: z.string().regex(/^\d{6}$/, "OTP must be a 6-digit number"),
});

type OtpFormData = z.infer<typeof otpSchema>;

function OtpVerificationPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const registeredEmail = searchParams.get("email") ?? "";
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      email: registeredEmail,
      otp: "",
    },
  });

  const handleSendOtp = async () => {
    const email = getValues("email");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email before sending OTP.");
      return;
    }

    setIsSending(true);

    try {
      await sendOtp({ email });
      setOtpSent(true);
      toast.success("OTP has been sent to your email.");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Could not send OTP.");
    } finally {
      setIsSending(false);
    }
  };

  const onSubmit = async (data: OtpFormData) => {
    setIsVerifying(true);

    try {
      await verifyOtp(data);
      toast.success("OTP verified successfully.");
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "OTP verification failed.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="relative flex w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/30 bg-white/60 shadow-2xl backdrop-blur-2xl">
      <div className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-indigo-700 via-violet-700 to-fuchsia-600 lg:flex">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_40%)]" />
        <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
          <div>
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-xl">
              <ShieldCheck size={34} />
            </div>
            <h1 className="text-5xl font-black leading-tight">Secure<br />Verification</h1>
            <p className="mt-6 max-w-md text-lg leading-8 text-indigo-100">
              We've sent a one-time password to your email. Verify it to activate your Nimbus account.
            </p>
          </div>
          <p className="text-sm text-indigo-100">Redis protected • Email delivery • 5 minute validity</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-1 items-center justify-center bg-white/80 px-8 py-14 backdrop-blur-xl"
      >
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-black text-slate-900">Verify OTP</h2>
          <p className="mt-2 text-slate-500">Enter the 6-digit code sent to your email to activate your account.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
              <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-4">
                <Mail size={20} className="text-slate-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                  readOnly={Boolean(registeredEmail)}
                  className="h-14 w-full bg-transparent px-3 outline-none"
                />
              </div>
              {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-700">OTP</label>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={isSending}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSending ? "Sending..." : otpSent || registeredEmail ? "Resend code" : "Send code"}
                </button>
              </div>

              <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-4">
                <KeyRound size={20} className="text-slate-400" />
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="Enter 6-digit OTP"
                  {...register("otp")}
                  className="h-14 w-full bg-transparent px-3 outline-none tracking-[0.35em]"
                />
              </div>
              {errors.otp && <p className="mt-2 text-sm text-red-500">{errors.otp.message}</p>}
            </div>

            {otpSent && (
              <p className="text-sm text-emerald-600">
                A fresh verification code was sent. Check your inbox and spam folder.
              </p>
            )}

            <button
              type="submit"
              disabled={isVerifying}
              className="h-14 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isVerifying ? "Verifying..." : "Verify OTP"}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-600">
            Remember your password?{" "}
            <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
              Back to Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default OtpVerificationPage;
