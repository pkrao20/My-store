// 'use client';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/containers/NavigationBar";
import { ThemeProvider } from "@/context/themeContext";
import { CartProvider } from "@/context/cartContext";
import { Suspense } from "react";
// import { Suspense } from 'react';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'MiniStore - Your E-commerce Destination',
  description: 'Discover amazing products from our curated collection',
  keywords: ['ecommerce', 'shopping', 'products', 'online store'],
  authors: [{ name: 'MiniStore Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <CartProvider>


           
            <Suspense fallback={<div>Loading...</div>}>
              <Navbar />
              {children}
           </Suspense>
          </CartProvider>
        </ThemeProvider>

      </body>
    </html>
  );
}
