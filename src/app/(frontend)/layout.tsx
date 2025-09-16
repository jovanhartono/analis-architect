import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { GSAPProvider } from "@/app/(frontend)/provider/gsap-provider";

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Analis Architect – Step Into a World Where Architecture Meets Artistry",
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
      </head>
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <GSAPProvider>{children}</GSAPProvider>
      </body>
    </html>
  );
}
