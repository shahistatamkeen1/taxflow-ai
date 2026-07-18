"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { UserRole } from "@/types";

interface RoleContextValue {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const RoleContext = createContext<RoleContextValue | undefined>(
  undefined,
);

export function RoleProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [role, setRoleState] = useState<UserRole>("preparer");

  function setRole(nextRole: UserRole) {
    setRoleState(nextRole);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "taxflow-demo-role",
        nextRole,
      );
    }
  }

  const value = useMemo(
    () => ({
      role,
      setRole,
    }),
    [role],
  );

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);

  if (!context) {
    throw new Error(
      "useRole must be used inside RoleProvider.",
    );
  }

  return context;
}