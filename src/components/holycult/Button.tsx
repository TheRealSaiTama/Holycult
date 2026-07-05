import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "neon" | "danger";
type Size = "sm" | "md";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

export function Button({ variant = "outline", size = "md", className = "", children, ...rest }: Props) {
  return (
    <button
      className={`cta cta-${variant}${size === "sm" ? " label-xs px-5 py-2" : ""} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
