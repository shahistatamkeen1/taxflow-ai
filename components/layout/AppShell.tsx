"use client";

import { useState, type ReactNode } from "react";

import { AppHeader } from "@/components/layout/AppHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { RoleProvider } from "@/components/layout/RoleProvider";

export function AppShell({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <RoleProvider>
      <div className="min-h-screen bg-muted/20">
        <AppSidebar className="fixed inset-y-0 left-0 z-40 hidden lg:flex" />

        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              aria-label="Close navigation menu"
              className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
              onClick={() => setMobileMenuOpen(false)}
            />

            <AppSidebar
              className="relative z-10 h-full w-72 shadow-xl"
              onNavigate={() => setMobileMenuOpen(false)}
            />
          </div>
        )}

        <div className="flex min-h-screen flex-col lg:pl-64">
          <AppHeader
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
          />

          <main className="flex-1">{children}</main>
        </div>
      </div>
    </RoleProvider>
  );
}