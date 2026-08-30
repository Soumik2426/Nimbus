import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "outline";
  fullWidth?: boolean;
}

function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60",
        {
          "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl":
            variant === "primary",

          "bg-slate-100 text-slate-700 hover:bg-slate-200":
            variant === "secondary",

          "bg-red-600 text-white hover:bg-red-700":
            variant === "danger",

          "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100":
            variant === "outline",

          "w-full": fullWidth,
        },
        className
      )}
    >
      {children}
    </button>
  );
}

export default Button;