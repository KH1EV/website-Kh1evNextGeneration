import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kh1ev.my.id"),
  title: "KH1EV. - IT Development & Community Hub",
  description: "Kh1ev Organization is a space focused on IT development and tech projects. Beyond work and code, we are a casual community hub to connect, hang out, and play together.",
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "KH1EV. - IT Development & Community Hub",
    description: "Kh1ev Organization is a space focused on IT development and tech projects.",
    url: "https://www.kh1ev.my.id",
    siteName: "KH1EV",
    images: [
      {
        url: "/images/banner.png",
        width: 1280,
        height: 720,
        alt: "KH1EV Organization Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KH1EV. - IT Development & Community Hub",
    description: "Kh1ev Organization is a space focused on IT development and tech projects.",
    images: ["/images/banner.png"],
  },
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
