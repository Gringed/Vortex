import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./src/theme/ThemeProvider";
import clsx from "clsx";
import { Header } from "./src/features/layout/Header";
import { Footer } from "./src/features/layout/Footer";
import { Sidebar } from "./src/features/layout/Sidebar";
import Utils from "./(home)/Utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

type LayoutProps = {
  children: React.ReactNode;
  modal?: React.ReactNode;
};

export default function RootLayout({ children, modal }: LayoutProps) {
  return (
    <html lang="en" className="h-full">
      <body className={clsx(inter.className, "bg-background h-full")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col h-full">
            <Header />
            <div className="flex h-full mt-14 pt-4">
              <div className="flex w-full flex-wrap gap-7">
                <Sidebar />
                {children}
              </div>
            </div>
            <Footer />
          </div>
          {modal}
        </ThemeProvider>
      </body>
    </html>
  );
}
