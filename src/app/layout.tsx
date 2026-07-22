import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { SeoSchemas } from "@/components/seo/schema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://nawaz-khan-droid.github.io/NK-Portfolio";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Nawaz Khan | AI & Machine Learning Engineer Portfolio",
  description:
    "Portfolio of Nawaz Khan — AI & Machine Learning Engineer specializing in RAG systems, agentic workflows, voice AI assistants, and automated AI solutions.",
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "RAG",
    "AI Agents",
    "Agentic Workflows",
    "Python Developer",
    "LangChain",
    "FastAPI",
    "Nawaz Khan",
    "Portfolio",
    "Voice AI",
  ],
  authors: [{ name: "Nawaz Khan", url: BASE_URL }],
  creator: "Nawaz Khan",
  publisher: "Nawaz Khan",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Nawaz Khan | AI & Machine Learning Engineer Portfolio",
    description:
      "Portfolio of Nawaz Khan — AI & Machine Learning Engineer specializing in RAG systems, agentic workflows, voice AI assistants, and automated AI solutions.",
    url: BASE_URL,
    siteName: "Nawaz Khan Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Nawaz Khan | AI & Machine Learning Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nawaz Khan | AI & Machine Learning Engineer Portfolio",
    description:
      "Portfolio of Nawaz Khan — AI & Machine Learning Engineer specializing in RAG systems, agentic workflows, voice AI assistants, and automated AI solutions.",
    images: ["/og-image.png"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <SeoSchemas />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

