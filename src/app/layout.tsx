"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import GlobalStyled from "@/styles/GlobalStyles";
import ClientRootLayout from "./ClientRootLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VTV - Ecom",
  description: "VTV - San thuong mai dien tu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientRootLayout>{children}</ClientRootLayout>
        <GlobalStyled />
      </body>
    </html>
  );
}
