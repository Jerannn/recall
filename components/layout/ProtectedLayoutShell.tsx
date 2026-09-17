"use client";

import { Menu, X } from "lucide-react";
import { ReactNode, Suspense, useState } from "react";
import AppSidebar from "./AppSidebar";

interface ProtectedLayoutShellProps {
  children: ReactNode;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

export default function ProtectedLayoutShell({
  children,
  user,
}: ProtectedLayoutShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-60 md:shrink-0 md:flex-col">
        <Suspense fallback={<div className="w-60 bg-sidebar border-r border-border/60" />}>
          <AppSidebar user={user} />
        </Suspense>
      </div>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative flex w-64 max-w-[80%] flex-col bg-background shadow-xl">
            <div className="absolute top-3 right-3 z-10">
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <Suspense fallback={<div className="w-64 bg-background" />}>
              <AppSidebar
                user={user}
                onNavigate={() => setMobileOpen(false)}
              />
            </Suspense>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Header Bar */}
        <div className="flex h-12 items-center justify-between border-b border-border/60 bg-background px-4 md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
          <span className="text-xs font-semibold uppercase tracking-wider">
            Recall
          </span>
          <div className="w-8" />
        </div>

        {/* Page Content Scroll Container */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
