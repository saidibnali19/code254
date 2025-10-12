import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Code254",
  description: "Code254 is a blog on Kenyan tech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body>
          <Navbar />
          <main>{children}</main>
        </body>
      </AuthProvider>
    </html>
  );
}
