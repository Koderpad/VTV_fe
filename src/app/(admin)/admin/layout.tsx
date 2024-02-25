"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { logOut } from "../../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { persistor } from "../../../redux/store";
import { Sidebar } from "./sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedTitle, setSelectedTitle] = useState<string>("");

  const dispatch = useDispatch();
  const pathname = usePathname();

  const router = useRouter();

  useEffect(() => {
    // Lấy phần cuối cùng của đường dẫn làm title
    const currentPath = pathname.split("/").pop();
    if (currentPath === undefined) return;

    if (currentPath === "customers") {
      setSelectedTitle("Quanlynguoidung");
    }
    if (currentPath === "vouchers") {
      setSelectedTitle("Quanlyvouchers");
    }
    if (currentPath === "products") {
      setSelectedTitle("Quanlysanpham");
    }
    if (currentPath === "categories") {
      setSelectedTitle("Quanlycate");
    }

    console.log(currentPath);

    // Cập nhật trạng thái selectedTitle
    // setSelectedTitle(currentPath);
  }, [location.pathname]);

  const handleTitleClick = (title: string) => {
    setSelectedTitle(title);
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    window.location.reload();

    dispatch(logOut());

    // navigate("/login");
    router.push("/login");

    await persistor.purge();
  };
  return (
    <div className="justify-center h-screen bg-gray-100">
      <div className="grid grid-cols-2 h-full sm:grid-cols-6">
        <Sidebar
          selectedTitle={selectedTitle}
          handleTitleClick={handleTitleClick}
          handleLogout={handleLogout}
        />

        <div className="w-auto m-4 col-start-2 col-end-7  p-8 bg-white rounded-xl flex ">
          <p className="font-medium text-gray-600">
            {/* <Outlet /> */}
            {children}
          </p>
        </div>
      </div>
    </div>
  );
}
