import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit"
});

export const metadata: Metadata = {
  title: "KH1EV. - IT Development & Community Hub",
  description: "Kh1ev Organization is a space focused on IT development and tech projects. Beyond work and code, we are a casual community hub to connect, hang out, and play together.",
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
