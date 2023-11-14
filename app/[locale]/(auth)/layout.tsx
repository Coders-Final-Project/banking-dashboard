import type { Metadata } from "next";
import { Inter } from "next/font/google";

// import { IntlProvider } from "react-intl";

// async function getMessages(locale: string) {
//   return await import(`../../../lang/${locale}.json`);
// }

type FooterContainerProps = {
  locale: string;
  children: React.ReactNode;
};

import "@/sass/style.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Coders Final Project",
};

import SignNav from "@/shared/SignNav/SignNav";

export default async function RootLayout({
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
        <SignNav />
        {children}
      </body>
    </html>
  );
}
