import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { GSAPProvider } from "@/app/(frontend)/provider/gsap-provider";
import { Header } from "@/app/(frontend)/components/header";
import { Footer } from "@/app/(frontend)/components/footer";
import DialogImageProvider from "./provider/dialog-provider";

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s – Analis Architects",
    default: "Analis Architect – Architecture Meets Artistry",
  },
  description:
    "Analis Studio excels in seamlessly blending modern innovation with timeless aesthetics, crafting spaces that are not only visually stunning, but also deeply connected to their environment. Our unique approach ensures that each project is a reflection of its environment, tailored to enhance the lives of those who inhabit it.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Analis Architects" />
        <link
          rel="preconnect"
          href="https://tfslhhlj4cdsasg9.public.blob.vercel-storage.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <GSAPProvider>
          <DialogImageProvider>
            <div className="min-h-screen h-full flex flex-col">{children}</div>
          </DialogImageProvider>
          <Footer />
        </GSAPProvider>
      </body>
    </html>
  );
}
