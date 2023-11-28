"use client";

import Link from "next/link";

import "@/sass/layout/_signNav.scss";

import MainLogo from "@/components/MainLogo/MainLogo";

import { usePathname } from "next/navigation";

import { useTranslation } from "@/i18n/client";

const SignNav = ({ lng }: { lng: string }) => {
  const pathname = usePathname();

  const { t } = useTranslation(lng);

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
