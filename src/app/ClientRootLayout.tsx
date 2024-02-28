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

  const guestAllowedPaths = ["/", "/about", "/contact", "/services"]; // Thêm các đường dẫn cho phép tại đây

  useEffect(() => {
    if (!user) {
      if (!guestAllowedPaths.includes(pathname)) {
        router.push("/login");
      }
      // router.push("/");
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
  console.log("path name: ", pathname);
  const routePermissions: { [role: string]: string[] } = {
    admin: ["/admin"],
    vendor: ["/vendor"],
    customer: ["/"],
    guest: [""],
  };

  const roles_lowercase = roles.map((role) => role.toLowerCase());
  console.log("Roles: ", roles_lowercase);

  return roles_lowercase.some((role) => {
    if (routePermissions[role] && routePermissions[role].includes(pathname)) {
      console.log("Authorized role: ", role);
      return true;
    }
  });

  // return result;
}
