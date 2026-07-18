"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  ClipboardList,
  FileCheck2,
  FileText,
  FolderOpen,
  LayoutDashboard,
  ListTodo,
  MessageSquareText,
  ReceiptText,
  Sparkles,
} from "lucide-react";

import { useRole } from "@/components/layout/RoleProvider";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types";

interface NavigationItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const roleNavigation: Record<UserRole, NavigationItem[]> = {
  preparer: [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Tax Returns",
      href: "/returns",
      icon: ReceiptText,
    },
    {
      label: "Documents",
      href: "/documents",
      icon: FolderOpen,
    },
    {
      label: "Client Requests",
      href: "/requests",
      icon: MessageSquareText,
    },
  ],
  reviewer: [
    {
      label: "Review Dashboard",
      href: "/dashboard",
      icon: BarChart3,
    },
    {
      label: "Ready for Review",
      href: "/returns",
      icon: FileCheck2,
    },
    {
      label: "Documents",
      href: "/documents",
      icon: FileText,
    },
    {
      label: "Open Issues",
      href: "/requests",
      icon: ClipboardList,
    },
  ],
  client: [
    {
      label: "Home",
      href: "/client",
      icon: LayoutDashboard,
    },
    {
      label: "My Tasks",
      href: "/client/tasks",
      icon: ListTodo,
    },
    {
      label: "My Documents",
      href: "/documents",
      icon: FolderOpen,
    },
    {
      label: "Messages",
      href: "/requests",
      icon: MessageSquareText,
    },
    {
      label: "Return Progress",
      href: "/client/progress",
      icon: BarChart3,
    },
  ],
};

interface AppSidebarProps {
  className?: string;
  onNavigate?: () => void;
}

export function AppSidebar({
  className,
  onNavigate,
}: AppSidebarProps) {
  const pathname = usePathname();
  const { role } = useRole();

  const navigation = roleNavigation[role];

  function isActive(href: string) {
    if (href === "/dashboard" || href === "/client") {
      return pathname === href;
    }

    return pathname.startsWith(href);
  }

  return (
    <aside
      className={cn(
        "flex h-full w-64 flex-col border-r bg-card",
        className,
      )}
    >
      <div className="flex h-16 items-center border-b px-5">
        <Link
          href={role === "client" ? "/client" : "/dashboard"}
          className="flex items-center gap-3"
          onClick={onNavigate}
        >
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Sparkles className="size-4" />
          </div>

          <div>
            <p className="font-semibold leading-none">TaxFlow AI</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Intelligent tax review
            </p>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-5">
        <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Workspace
        </p>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="space-y-1 border-t p-3">

        <div className="mt-3 rounded-lg border bg-muted/60 p-3">
  <div className="flex items-center gap-2">
    <Sparkles className="size-3.5 text-muted-foreground" />

    <p className="text-xs font-medium">Prototype mode</p>
  </div>

  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
    AI results, OCR, confidence scores, tax calculations, and user data
    are simulated for this case study.
  </p>
</div>
      </div>
    </aside>
  );
}