import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground font-sans">
        <ThemeProvider>
          <div className="relative">
            <div className="fixed top-0 left-0 right-0 z-50 bg-background">
              <Navigation />
            </div>
            <div className="pt-16">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
