import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "dun",
  description: "| your notes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
