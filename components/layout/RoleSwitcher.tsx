"use client";

import { BriefcaseBusiness, ShieldCheck, UserRound } from "lucide-react";

import { useRole } from "@/components/layout/RoleProvider";
import type { UserRole } from "@/types";

const roleOptions: Array<{
  value: UserRole;
  label: string;
}> = [
  {
    value: "preparer",
    label: "CPA / Preparer",
  },
  {
    value: "reviewer",
    label: "Reviewer",
  },
  {
    value: "client",
    label: "Client",
  },
];

const roleIcons = {
  preparer: BriefcaseBusiness,
  reviewer: ShieldCheck,
  client: UserRound,
};

export function RoleSwitcher() {
  const { role, setRole } = useRole();
  const Icon = roleIcons[role];

  return (
    <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2">
      <Icon className="size-4 text-muted-foreground" />

      <label htmlFor="role-switcher" className="sr-only">
        Change demo role
      </label>

      <select
        id="role-switcher"
        value={role}
        onChange={(event) => setRole(event.target.value as UserRole)}
        className="min-w-32 bg-transparent text-sm font-medium outline-none"
      >
        {roleOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}