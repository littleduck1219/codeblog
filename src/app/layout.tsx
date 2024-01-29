"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/__components/Header";
import Footer from "./__components/Footer";
import AuthSession from "@/app/__components/AuthSession";
import { useUserStore } from "./store/user";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const user = useUserStore();

    useEffect(() => console.log(user), [user]);

    return (
        <html lang='en'>
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
