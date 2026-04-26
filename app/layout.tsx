import type { Metadata } from "next";
import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Auth0Provider } from "@auth0/nextjs-auth0/client";
import { auth0 } from "@/lib/auth0";
import AuthLayout from "./layout/AuthLayout";
import GuestLayout from "./layout/GuestLayout";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Subscription Tracker",
  description:
    "Track recurring subscriptions, monitor monthly SaaS spend, and avoid surprise charges.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth0.getSession();
  const isAuthenticated = Boolean(session?.user);
  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col'>
        <Auth0Provider user={session?.user}>
          {isAuthenticated ? (
            <AuthLayout user={session?.user}>{children}</AuthLayout>
          ) : (
            <GuestLayout>{children}</GuestLayout>
          )}
        </Auth0Provider>
      </body>
    </html>
  );
}
