import Layout from "@/components/Layout/Layout";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import WalletProvider from "@/contexts/WalletContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rather Labs Quizzes",
  description: "Solve your quizzes daily!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WalletProvider>
      <html lang="en">
        <body className={inter.className}>
          <Layout>{children}</Layout>
        </body>
      </html>
    </WalletProvider>
  );
}
