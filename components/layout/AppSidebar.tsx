"use client";

import { SIDEBAR_LINKS } from "@/utils/constant";
import { BrainCircuit } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import UserDropdown from "./UserDropdown";

interface AppSidebarProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
  onNavigate?: () => void;
}

function SidebarNavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <ul className="space-y-0.5">
      {SIDEBAR_LINKS.map((link) => {
        const Icon = link.icon;
        const isActive =
          pathname === link.href ||
          (link.href !== "/dashboard" && pathname.startsWith(link.href));

        return (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onNavigate}
              className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-xs font-medium transition-colors ${
                isActive
                  ? "bg-secondary font-semibold text-foreground shadow-xs"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`}
            >
              <Icon
                className={`h-4 w-4 shrink-0 ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              />
              <span>{link.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function AppSidebar({ user, onNavigate }: AppSidebarProps) {
  return (
    <aside className="flex h-full flex-col justify-between border-r border-border/60 bg-sidebar px-3 py-4">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-2.5 px-2.5 py-1">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-background shadow-xs">
            <BrainCircuit className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-foreground">
              Recall
            </span>
            <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
              Second Brain
            </span>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="space-y-1">
          <p className="px-2.5 pb-1.5 text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
            Workspace
          </p>
          <Suspense
            fallback={
              <ul className="space-y-1">
                {SIDEBAR_LINKS.map((l) => (
                  <li
                    key={l.href}
                    className="h-8 animate-pulse rounded-md bg-muted/20"
                  />
                ))}
              </ul>
            }
          >
            <SidebarNavLinks onNavigate={onNavigate} />
          </Suspense>
        </nav>
      </div>

      {/* User Section */}
      <div className="border-t border-border/60 pt-3">
        <Suspense
          fallback={
            <div className="h-10 animate-pulse rounded-md bg-muted/20" />
          }
        >
          <UserDropdown user={user} />
        </Suspense>
      </div>
    </aside>
  );
}
