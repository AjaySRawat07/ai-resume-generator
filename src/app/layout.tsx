import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeContext";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resume Master",
  description: "Let's take a step forward towards getting a job.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider>
        <html lang="en">
            <body
              className={`${inter.className}`}
              >
              <ThemeProvider>
                <Header/>
                <Toaster richColors/>
                <main>{children}</main>
              </ThemeProvider>
            </body>
        </html>
    </ClerkProvider>
  );
}
