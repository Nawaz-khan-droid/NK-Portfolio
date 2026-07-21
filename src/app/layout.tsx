import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nawaz Khan — AI & Machine Learning Engineer",
  description:
    "Portfolio of Nawaz Khan — a final-year BCA student building AI-powered applications with a focus on RAG systems, agentic workflows, and practical automation solutions.",
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "RAG",
    "AI Agents",
    "Python",
    "LangChain",
    "Nawaz Khan",
    "Portfolio",
  ],
  authors: [{ name: "Nawaz Khan" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Nawaz Khan — AI & Machine Learning Engineer",
    description:
      "Building AI-powered applications with a focus on RAG systems, agentic workflows, and practical automation solutions.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nawaz Khan — AI & ML Engineer",
    description:
      "Building AI-powered applications with a focus on RAG systems, agentic workflows, and practical automation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
