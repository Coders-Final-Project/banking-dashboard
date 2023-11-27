import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GlobalContextProvider } from "@/context/store";
import { Providers } from "@/globalRedux/provider";

import "@/sass/style.scss";

import Sidebar from "@/shared/Sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Coders Final Project",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalContextProvider>
          <Providers>
            <Sidebar />
            {children}
          </Providers>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
