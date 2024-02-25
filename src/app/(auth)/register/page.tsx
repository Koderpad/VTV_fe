"use client";
import Logo from "@/app/components/ui-styled/Logo";
import Register_rightSide from "./components/Register_rightSide";
// import Logo_fix from "@/components/ui-styled/Logo-fix";

function Register() {
  return (
    <div className="flex flex-row bg-[#caf7fa] h-auto">
      <div className="w-1/2 shadow-2xl bg-[url('/BiaPhai_Login.png')] flex justify-center items-center">
        {/* <Logo_fix /> */}
        <Logo />
      </div>
      <div className="w-1/2">
        <Register_rightSide />
      </div>
    </div>
  );
}

export default Register;
