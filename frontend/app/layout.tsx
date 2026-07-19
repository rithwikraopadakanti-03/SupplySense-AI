import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "SupplySense - AI Supply Chain",
  description: "Enterprise grade AI supply chain platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans bg-[#0A0F1E] text-white antialiased selection:bg-blue-500/30`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
