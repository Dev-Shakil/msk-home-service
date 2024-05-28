import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import NextAuthSessionProvider from "./provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "MSK Home Service",
  description: "Bringing All Services at the Home Door",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <NextAuthSessionProvider>
      
        <div className="mx-6 md:mx-16">
        <Header/>
        {children}
        <Toaster/>
        </div>
        
        </NextAuthSessionProvider>
        </body>
    </html>
  );
}
