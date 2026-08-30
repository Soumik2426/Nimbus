import type { InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: ReactNode;
}

function Input({
  label,
  error,
  icon,
  className,
  ...props
}: InputProps) {
  return (
    <div className="space-y-2">

      <label className="block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div className="relative">

        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}

        <input
          {...props}
          className={clsx(
            "w-full rounded-xl border border-slate-300 bg-white py-3 pr-4 transition-all duration-300 outline-none",
            icon ? "pl-11" : "pl-4",
            "focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100",
            error &&
              "border-red-500 focus:border-red-500 focus:ring-red-100",
            className
          )}
        />

      </div>

      {error && (
        <p className="text-sm font-medium text-red-500">
          {error}
        </p>
      )}

    </div>
  );
}

export default Input;