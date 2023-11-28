import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GlobalContextProvider } from "@/context/store";
import { Providers } from "@/globalRedux/provider";

import { dir } from "i18next";

import "@/sass/style.scss";

import Sidebar from "@/shared/Sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Coders Final Project",
};

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
        <GlobalContextProvider>
          <Providers>
            <Sidebar lng={lng} />
            {children}
          </Providers>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
