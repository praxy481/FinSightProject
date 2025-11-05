import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Sidebar from "@/components/sidebar";
import MobileNav from "@/components/mobile-nav";
import NavLinks from "@/components/nav-links"; // <-- IMPORT NavLinks HERE
import React from "react"; // <-- IMPORT React HERE

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FinSight",
  description: "One stop Finance Platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo-1.png" sizes="any" />
        </head>
        <body className={`${inter.className}`}>
          <Sidebar />

          {/* Pass NavLinks (Server) as a child to MobileNav (Client) */}
          <MobileNav>
            <React.Suspense fallback={<p>Loading...</p>}>
              <NavLinks />
            </React.Suspense>
          </MobileNav>

          {/* Add left padding on desktop (md:pl-64) to avoid sidebar overlap */}
          <div className="md:pl-64">
            <main className="min-h-screen pt-20 md:pt-0">{children}</main>
            <Toaster richColors />

            <footer className="border-t py-6">
              {" "}
              {/* Themed footer */}
              <div className="container mx-auto px-4 text-center text-muted-foreground">
                <p>Made by Team FinSight</p>
              </div>
            </footer>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}