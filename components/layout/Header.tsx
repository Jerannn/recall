"use client";

import { ReactNode } from "react";

interface HeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

export default function Header({
  title,
  description,
  actions,
  breadcrumbs,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex min-h-14 items-center justify-between border-b border-border/60 bg-background/80 px-6 py-3 backdrop-blur-md">
      <div className="flex flex-col gap-0.5">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            {breadcrumbs.map((crumb, idx) => (
              <span key={idx} className="flex items-center gap-1.5">
                {idx > 0 && <span>/</span>}
                {crumb.href ? (
                  <a
                    href={crumb.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span className="font-medium text-foreground">
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        )}
        <div className="flex flex-col">
          <h1 className="text-base font-semibold tracking-tight text-foreground capitalize">
            {title}
          </h1>
          {description && (
            <span className="hidden text-xs text-muted-foreground sm:inline-block">
              {description}
            </span>
          )}
        </div>
      </div>

      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  );
}
