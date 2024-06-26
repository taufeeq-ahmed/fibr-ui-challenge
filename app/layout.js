import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { Providers } from './providers'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fibr Ui Challenge",
  description: "Fibr UI Challenge",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Sidebar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
