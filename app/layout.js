import { Lora, Mulish } from "next/font/google";
import "./globals.css";
import "./pages.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShopProvider from "@/components/ShopProvider";

const head = Lora({ subsets: ["latin"], variable: "--font-head" });
const body = Mulish({ subsets: ["latin"], variable: "--font-body" });

export const metadata = {
  title: "Sree Sivani Jewellers (SSJ) | Jewellery Showroom (Demo)",
  description: "Demo presentation website for Sree Sivani Jewellers jewellery.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${head.variable} ${body.variable}`}>
      <body>
        <ShopProvider>
          <Header />
          {children}
          <Footer />
        </ShopProvider>
      </body>
    </html>
  );
}
