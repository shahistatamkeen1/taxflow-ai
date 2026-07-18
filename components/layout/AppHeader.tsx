"use client";

import { Menu, Search } from "lucide-react";

import { RoleSwitcher } from "@/components/layout/RoleSwitcher";
import { useRole } from "@/components/layout/RoleProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AppHeaderProps {
  onOpenMobileMenu: () => void;
}

const userDetails = {
  preparer: {
    name: "Maya Chen",
    initials: "MC",
    title: "Tax Preparer",
  },
  reviewer: {
    name: "Daniel Brooks",
    initials: "DB",
    title: "Senior Reviewer",
  },
  client: {
    name: "Jordan Miller",
    initials: "JM",
    title: "Client",
  },
};

export function AppHeader({
  onOpenMobileMenu,
}: AppHeaderProps) {
  const { role } = useRole();
  const user = userDetails[role];

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background/95 px-4 backdrop-blur lg:px-6">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="mr-2 lg:hidden"
        onClick={onOpenMobileMenu}
        aria-label="Open navigation menu"
      >
        <Menu className="size-5" />
      </Button>

      <div className="hidden max-w-md flex-1 md:block">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search clients, returns, documents..."
            className="pl-9"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <RoleSwitcher />

        <div className="hidden items-center gap-3 border-l pl-3 xl:flex">
          <div className="flex size-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
            {user.initials}
          </div>

          <div>
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {user.title}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}