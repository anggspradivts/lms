import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";
// import { ToastProvider } from "@/components/providers/toaster-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Navbar />
          <main className="p-4">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
