import clsx from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

function Card({
  children,
  className,
  ...props
}: CardProps) {
  return (
    <div
      {...props}
      className={clsx(
        "rounded-3xl border border-slate-200 bg-white shadow-lg transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}

export default Card;