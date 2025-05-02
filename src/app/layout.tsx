import type { Metadata } from "next";
import { Montserrat, Lora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TestimonialsProvider } from "@/contexts/TestimonialsContext";
import { AuthProvider } from "@/contexts/AuthContext";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CVS Central Cluster",
  description: "Manage CVS's projects, testimonials, blogs, and more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${lora.variable} antialiased`}>
        <ThemeProvider defaultTheme="system">
          <TestimonialsProvider>
            <AuthProvider>{children}</AuthProvider>
          </TestimonialsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
