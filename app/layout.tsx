import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import Cursor from "./components/Cursor";
import Loader from "./components/Loader";
import { LanguageProvider } from "./lib/language";

export const metadata: Metadata = {
  title: "Christian Linares — Product Designer",
  description:
    "Selected works, services and writing by Christian Linares — a Product Designer working remotely from Lima, crafting digital products with intent.",
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
