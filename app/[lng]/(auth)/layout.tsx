import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { dir } from "i18next";

import "@/sass/style.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Coders Final Project",
};

import SignNav from "@/shared/SignNav/SignNav";

export default async function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={inter.className}>
        <SignNav />
        {children}
      </body>
    </html>
  );
}
