import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { headers } from "next/headers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Organic Waste Fems",
  description: "Carbon credit MarketPlace ",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const cookie = headersList.get("cookie") || "";

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers cookie={cookie}>
          {children}
        </Providers>
      </body>
    </html>
  );
}