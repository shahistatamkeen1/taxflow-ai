import type { User } from "@/types";

export const users: User[] = [
  {
    id: "user-maya",
    name: "Maya Chen",
    email: "maya.chen@taxflow.demo",
    role: "preparer",
  },
  {
    id: "user-daniel",
    name: "Daniel Brooks",
    email: "daniel.brooks@taxflow.demo",
    role: "reviewer",
  },
  {
    id: "user-jordan",
    name: "Jordan Miller",
    email: "jordan.miller@example.com",
    role: "client",
  },
];

export const currentUser = users[0];