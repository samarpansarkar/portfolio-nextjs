import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/contexts/ThemeContext";
import StoreProvider from "@/redux/StoreProvider";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Samarpan Sarkar || ReactJS developer",
  description:
    "Portfolio of Samarpan Sarkar, a Frontend Engineer specializing in React, Tailwind CSS, and modern web technologies.",
  keywords:
    "Samarpan Sarkar, Frontend Engineer, React Developer, Web Developer, Portfolio",
  icons: {
    icon: "/icons/picofme.png",
    shortcut: "/icons/picofme.png",
    apple: "/icons/picofme.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <ThemeProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col relative`}>
          <StoreProvider>
            <Toaster position='bottom-center' reverseOrder={false} />
            <Analytics />
            <Navbar />
            <main className='grow pt-20 px-4 md:px-8 max-w-7xl mx-auto w-full'>
              {children}
            </main>
          </StoreProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
