import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
  variant?: "primary" | "secondary" | "danger" | "outline";
  fullWidth?: boolean;
}

function Button({
  children,
  loading = false,
  variant = "primary",
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyle =
    "inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:cursor-not-allowed disabled:opacity-70";

  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-0.5 shadow-md hover:shadow-lg",

    secondary:
      "bg-slate-100 text-slate-800 hover:bg-slate-200",

    outline:
      "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50",

    danger:
      "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={clsx(
        baseStyle,
        variants[variant],
        fullWidth && "w-full",
        className
      )}
    >
      {loading ? (
        <>
          <Loader2
            size={18}
            className="mr-2 animate-spin"
          />

          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;