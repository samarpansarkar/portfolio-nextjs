import Navbar from "@/components/Navbar";
import StoreProvider from "@/redux/StoreProvider";
import { Plus_Jakarta_Sans, Press_Start_2P, VT323 } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import BackToTop from "@/components/BackToTop";

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

export const metadata = {
  title: {
    default: "Samarpan Sarkar | Full Stack Developer",
    template: "%s | Samarpan Sarkar",
  },
  description:
    "Portfolio of Samarpan Sarkar, a seasoned Full Stack Developer with 9+ years of experience. Specializing in React, Next.js, Node.js, and modern web technologies. Step into a retro gaming-inspired experience showcasing professional expertise.",
  keywords: [
    "Samarpan Sarkar",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Web Developer",
    "Frontend Engineer",
    "JavaScript Developer",
    "Portfolio",
    "samarpansarkar",
  ],
  authors: [{ name: "Samarpan Sarkar" }],
  creator: "Samarpan Sarkar",
  publisher: "Samarpan Sarkar",
  icons: {
    icon: "/icons/picofme.png",
    shortcut: "/icons/picofme.png",
    apple: "/icons/picofme.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-nextjs-pi-tawny.vercel.app/",
    title: "Samarpan Sarkar | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, and modern web technologies. View my projects and get in touch!",
    siteName: "Samarpan Sarkar Portfolio",
    images: [
      {
        url: "/icons/picofme.png",
        width: 1200,
        height: 630,
        alt: "Samarpan Sarkar - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Samarpan Sarkar | Full Stack Developer",
    description:
      "Full Stack Developer building innovative web solutions with React, Next.js, and modern technologies.",
    creator: "@Samarpan_209",
    images: ["/icons/picofme.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

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
        className={`${jakarta.variable} ${pressStart.variable} ${vt323.variable} antialiased min-h-screen flex flex-col relative starfield`}>
        <StoreProvider>
          <Toaster position='bottom-center' reverseOrder={false} />
          <Analytics />
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
