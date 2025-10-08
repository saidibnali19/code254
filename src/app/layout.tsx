import type { Metadata } from "next";

import "./globals.css";

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
            <body>{children}</body>
        </html>
    );
}
