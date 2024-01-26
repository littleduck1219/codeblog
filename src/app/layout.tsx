"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/__components/Header";
import Footer from "./__components/Footer";
import AuthSession from "@/app/__components/AuthSession";
import { useUser } from "@/app/__lib/auth";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUser();
  console.log("main", user);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthSession>
          <Header />
          {children}
          <Footer />
        </AuthSession>
      </body>
    </html>
  );
}
