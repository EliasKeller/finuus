"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {

    const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error("Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY");
  }

    return (
      <ClerkProvider publishableKey={publishableKey}>
        <html lang="en">
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <header className="flex justify-end items-center p-4 gap-4 h-16">
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </header>
            <SignedIn>
            {children}
            </SignedIn>
            <SignedOut>
            <div className="flex flex-col justify-center items-center h-screen gap-4">
              <h1 className="text-2xl font-bold">Welcome to the Stock App</h1>
              <p className="text-center max-w-md">
                Please sign in to access your stock portfolio and market data.
              </p>
              <SignInButton>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Sign In
                </button>
              </SignInButton>
            </div>
            </SignedOut>

            <Toaster position="top-right" reverseOrder={false} />

          </body>
        </html>
      </ClerkProvider>
    )
}
