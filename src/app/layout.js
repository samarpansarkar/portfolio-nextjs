import Navbar from "@/components/Navbar";
import StoreProvider from "@/redux/StoreProvider";
import { Plus_Jakarta_Sans, Press_Start_2P, VT323, Pixelify_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import BackToTop from "@/components/BackToTop";
import { siteMetadata } from "@/database/layout";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-terminal",
  display: "swap",
});

const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-retro",
  display: "swap",
});

export const metadata = siteMetadata;

export default function RootLayout({ children }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <meta
          name='google-site-verification'
          content='Rjh6mIo-MO-Fc1RFDKc3zUHyyFGxQcUAj-lwahFJ3Kw'
        />
      </head>
      <body
        className={`${jakarta.variable} ${pressStart.variable} ${vt323.variable} ${pixelifySans.variable} antialiased min-h-screen flex flex-col relative starfield`}>
        <StoreProvider>
          <Toaster position='bottom-center' reverseOrder={false} />
          <Analytics />
          <SpeedInsights />
          <Navbar />
          <main className='grow pt-20 px-4 md:px-8 max-w-7xl mx-auto w-full'>
            {children}
          </main>
          <BackToTop />
        </StoreProvider>
      </body>
    </html>
  );
}
