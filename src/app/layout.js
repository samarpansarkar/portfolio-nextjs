import StoreProvider from "@/redux/StoreProvider";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    "Hi, I'm Samarpan Sarkar. I am a Frontend engineer experience in Reactjs, tailwindCSS, Redux, HTML, CSS, JavaScript.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col relative`}
      >
        <StoreProvider>
          <main className="grow pt-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
            {children}
          </main>
        </StoreProvider>
      </body>
    </html>
  );
}
