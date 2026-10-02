import { Lora, Mulish } from "next/font/google";
import "./globals.css";
import "./pages.css";

const head = Lora({ subsets: ["latin"], variable: "--font-head" });
const body = Mulish({ subsets: ["latin"], variable: "--font-body" });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${head.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
