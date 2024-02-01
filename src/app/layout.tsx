"use client";

import "./globals.css";
import { useUserStore } from "@/store/user";
import React, { useEffect } from "react";
import Header from "./__components/Header";
import Footer from "./__components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUserStore();

  useEffect(() => console.log(user), [user]);

  return (
    <html lang="en">
      <body className="main">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
