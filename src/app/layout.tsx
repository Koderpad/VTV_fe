import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import GlobalStyled from "@/styles/GlobalStyles";
import ClientRootLayout from "./ClientRootLayout";
import { ReduxProvider } from "../redux/provider";

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
        <ReduxProvider>
          <ClientRootLayout>{children}</ClientRootLayout>
        </ReduxProvider>
        <GlobalStyled />
      </body>
    </html>
  );
}
