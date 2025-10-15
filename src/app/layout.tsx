import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Code254",
  description:
    "Code254 is a developer community + blog platform focused on Kenyan and African devs, featuring articles, user contributions, and discussions.",
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
          <main>
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
            {children}
          </main>
        </body>
      </AuthProvider>
    </html>
  );
}
