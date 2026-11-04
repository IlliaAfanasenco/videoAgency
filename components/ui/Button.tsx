import type { ComponentProps } from "react";
export function Button({
  children,
  className = "",
  ...props
}: ComponentProps<"a">) {
  return (
    <a
      {...props}
      className={`group inline-flex min-h-11 items-center justify-center gap-7 rounded-full border border-white/30 px-6 py-3 text-xs transition duration-300 hover:border-white/70 hover:bg-white/10 ${className}`}
    >
      {children}
      <span
        aria-hidden="true"
        className="text-lg leading-none transition-transform group-hover:translate-x-1"
      >
        →
      </span>
    </a>
  );
}
