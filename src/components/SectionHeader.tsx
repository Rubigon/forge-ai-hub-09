import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function SectionHeader({
  title,
  subtitle,
  linkTo,
  linkLabel,
  children,
}: {
  title: string;
  subtitle?: string;
  linkTo?: string;
  linkLabel?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="font-display text-2xl font-extrabold tracking-tight">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        {children}
      </div>
      {linkTo && (
        <Link to={linkTo} className="label-mono border-b border-primary pb-1 hover:opacity-70">
          {linkLabel ?? "VER TODO"}
        </Link>
      )}
    </div>
  );
}
