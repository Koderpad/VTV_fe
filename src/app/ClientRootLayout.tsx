// This is ClientRootLayout.tsx - Client Component
"use client";

import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { ReduxProvider } from "../redux/provider";
import { RootState } from "@/redux/store";

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useSelector((state: RootState) => state.auth); // Assuming user and roles are stored in Redux
  const { roles }: any = user;
  useEffect(() => {
    const isAuthorized = checkAuth(pathname, roles || []);
    if (!isAuthorized) {
      router.push("/login"); // Or any other page you want to navigate to when unauthorized
    }
  }, [router, roles]);

  return <ReduxProvider>{children}</ReduxProvider>;
}

// Function to check access permissions
function checkAuth(pathname: string, roles: string[]): boolean {
  const routePermissions: any = {
    "/admin": ["admin"],
    "/vendor": ["vendor", "admin"],
    // Add more as needed
  };

  const requiredRoles = routePermissions[pathname] || [];
  return roles.some((role) => requiredRoles.includes(role));
}
