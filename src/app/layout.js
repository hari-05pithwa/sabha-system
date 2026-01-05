import "./globals.css";
import { Inter } from "next/font/google"; // Fixed import
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';
import AuthProvider from "@/components/AuthProvider"; // We will create this below

// Initialize the Inter font
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Balak Sabha System",
  description: "Management system for Bal Mandal",
};

// src/app/layout.js

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader 
          color="#6366f1" 
          showSpinner={false} 
          shadow="0 0 10px #6366f1,0 0 5px #6366f1" 
        />
        
        <Toaster position="bottom-right" richColors closeButton />
        
        <AuthProvider>
          {/* Changed pt-4 to pt-0 and updated background to your new modern theme color */}
          <main className="min-h-screen bg-[#F8F8F7] pt-0">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}