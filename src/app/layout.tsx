import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Netsanet Amare | Developer & Creative Thinker",
  description:
    "The personal portfolio of Netsanet Amare, a computer science student exploring web and mobile development.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
