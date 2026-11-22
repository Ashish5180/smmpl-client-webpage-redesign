import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "outline" | "onDark";

interface BaseButtonProps {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-lg text-sm px-5 py-2.5 transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer disabled:pointer-events-none disabled:opacity-50 select-none";

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      "bg-brand-action text-paper hover:bg-brand-dark focus-visible:outline-brand-action",
    outline:
      "border border-line bg-paper text-ink hover:border-brand hover:text-brand focus-visible:outline-brand",
    onDark:
      "border border-white/30 bg-transparent text-paper hover:bg-paper hover:text-ink focus-visible:outline-paper",
  };

  const combinedClassName = cn(baseStyles, variantStyles[variant], className);

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props as ButtonAsLink;
    return (
      <Link href={href} className={combinedClassName} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={combinedClassName}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
