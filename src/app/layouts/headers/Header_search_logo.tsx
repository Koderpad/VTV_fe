import Link from "next/link";

function Header_search_logo() {
  return (
    <>
      <a href="#" className="w-[202px] relative top-[-1rem]">
        <div className="flex m-2">
          <Link href="/">
            <img src="Logo.png" className="w-[62px] h-[50px] " />
          </Link>
          <Link href="/">
            <p className="text-7xl pl-2	pt-3 text-white underline decoration-sky-500/30">
              VTV
            </p>
          </Link>
        </div>
      </a>
    </>
  );
}

export default Header_search_logo;
