import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BEET — Create, Share & Grow",
  description: "Posters, marketing videos and jobs in one platform",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
