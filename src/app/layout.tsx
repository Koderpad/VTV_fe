import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { ReduxProvider } from "../redux/provider";
import GlobalStyled from "@/styles/GlobalStyles";

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
        <ReduxProvider>{children}</ReduxProvider>
        <GlobalStyled />
      </body>
    </html>
  );
}
