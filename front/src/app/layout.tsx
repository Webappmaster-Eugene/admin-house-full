import { Inter } from "next/font/google";

import Header from "@/bwidgets/Header/Header";
import Footer from "@/bwidgets/Footer/Footer";
import {YMetrika} from "@/shared/YMetrika/YMetrika";

import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin house",
  description: "App for building houses",
  icons: {
    icon: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico"/>
        <meta name="yandex-verification" content="cd2158a63c257605"/>
        <meta
            name="google-site-verification"
            content="YjNMY_H6UeEa7TOw48sffDoksjAxLJ5na09PfZFfgWg"
        />
        <link rel="icon" href="/favicon.ico"/>
        <title></title>
      </head>

      {/* <YMetrika /> */}
      <body className={inter.className}>
      <Header/>
      {children}
      <Footer />
      </body>
      {/* <YMetrika /> */}
      </html>
  );
}
