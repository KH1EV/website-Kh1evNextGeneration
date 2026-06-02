import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kh1ev.my.id"),
  title: "KH1EV - IT Development & Community Hub",
  description: "KH1EV Organization is a professional IT development collective and community hub. We specialize in crafting innovative digital solutions while fostering a vibrant space for creators to connect, collaborate, and thrive.",
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "KH1EV - IT Development & Community Hub",
    description: "KH1EV Organization is a professional IT development collective and community hub. We specialize in crafting innovative digital solutions while fostering a vibrant space for creators to connect, collaborate, and thrive.",
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
    title: "KH1EV - IT Development & Community Hub",
    description: "KH1EV Organization is a professional IT development collective and community hub. We specialize in crafting innovative digital solutions while fostering a vibrant space for creators to connect, collaborate, and thrive.",
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
