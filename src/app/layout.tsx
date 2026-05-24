import type { Metadata } from "next";
import "./globals.css";
import Preloader from "@/components/Preloader";

export const metadata: Metadata = {
  title: "Continental Group | Premium Luxury Real Estate Developer",
  description:
    "Continental Group premium luxury real estate developer. Explore Continental Heights and Continental Horizon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  );
}