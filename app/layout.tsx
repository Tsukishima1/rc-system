import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import NavigationBar from "@/components/navigation/NavigationBar";

export const metadata: Metadata = {
  title: "TuPin-找工作就上图聘",
  description: "图聘是一个专注于帮助大学生找工作的平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-[#313338]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster position="bottom-center"/>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
