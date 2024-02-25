import { ReactNode } from "react";

export default function NavbarLayout({ children }: { children: ReactNode }) {
  return <header className="bg-red-50">{children}</header>;
}
