import clsx from "clsx";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

function Card({
  children,
  className,
}: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl",
        className
      )}
    >
      {children}
    </div>
  );
}

export default Card;