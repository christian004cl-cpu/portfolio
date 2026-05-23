import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import Cursor from "./components/Cursor";
import Loader from "./components/Loader";
import { LanguageProvider } from "./lib/language";

export const metadata: Metadata = {
  metadataBase: new URL("https://christianlinares-h.com"),
  title: "Christian Linares — Product Designer",
  description:
    "Selected works, services and writing by Christian Linares — a Product Designer working remotely from Lima, crafting digital products with intent.",
  icons: {
    icon: "/icono-clh.png",
    shortcut: "/icono-clh.png",
    apple: "/icono-clh.png",
  },
  openGraph: {
    title: "Christian Linares — Product Designer",
    description:
      "Product Designer working remotely from Lima. Selected works in fintech, on-demand delivery and SaaS.",
    url: "https://christianlinares-h.com",
    siteName: "Christian Linares",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Christian Linares — Product Designer",
    description:
      "Product Designer working remotely from Lima. Selected works in fintech, on-demand delivery and SaaS.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="grain">
        <LanguageProvider>
          <Loader />
          <Cursor />
          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
