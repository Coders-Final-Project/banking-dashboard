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

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <GlobalContextProvider>
          <Providers>
            <Sidebar
              params={{
                locale,
              }}
            />
            {children}
          </Providers>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
