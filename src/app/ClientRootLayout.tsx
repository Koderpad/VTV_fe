"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/hooks/useUser";

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useUser();

  const roles: string[] = user?.roles || [];

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else {
      const isAuthorized = checkAuth(pathname, roles);
      if (!isAuthorized) {
        router.push("/login");
      }
    }
  }, [router, roles, user, pathname]);

  return children;
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
