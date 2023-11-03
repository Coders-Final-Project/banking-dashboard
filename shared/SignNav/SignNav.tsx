"use client";

import Link from "next/link";

import "@/sass/layout/_signNav.scss";

import MainLogo from "@/components/MainLogo/MainLogo";

import { usePathname } from "next/navigation";

const SignNav = () => {
  const pathname = usePathname();

  return (
    <nav className="sign__nav">
      <MainLogo />
      <select className="sign__nav__langOptions">
        <option value="Azerbaijani">AZ</option>
        <option value="English(United States)">EN</option>
      </select>
      <Link
        href={pathname === "/signup" ? "/signin" : "signup"}
        className="sign__nav__loginBtn"
      >
        {pathname === "/signup" ? "Sing In" : "Sign Up"}
      </Link>
    </nav>
  );
};

export default SignNav;
