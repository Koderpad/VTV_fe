import Link from "next/link";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import { Dispatch } from "react";
import { useUser } from "@/hooks/useUser";
import { persistor } from "@/redux/store";

const Nav_vendor = () => {
  const user = useUser();
  // const navigate = useNavigate();
  const router = useRouter();

  if (!user) {
    return;
  }

  const handleClick = () => {
    if (user.roles.includes("VENDOR")) {
      // navigate("/vendor");
      router.push("/vendor");
    } else if (user.roles.includes("CUSTOMER")) {
      // navigate("/vendor/register");
      router.push("/vendor/register");
    } else {
      persistor.purge();
      // navigate("/login");
      router.push("/login");
    }
  };

  return (
    <>
      <div className="flex items-center">
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="text-white no-underline text-xl font-medium p-1 outline-none hover:cursor-pointer"
          onClick={handleClick}
        >
          Kênh Người Bán
        </a>
      </div>
    </>
  );
};

export default Nav_vendor;
