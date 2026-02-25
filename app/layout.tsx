import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "./components/nav/NavBar";
import Footer from "./components/footer/Footer";
import CartProvider from "@/providers/CartProvider";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Pure Derma - Botanical Skincare for Radiant Skin",
  description:
    "Discover Pure Derma, your go-to destination for botanical skincare. Our products harness the power of nature to nourish and revitalize your skin, leaving it radiant and healthy. Explore our collection of cleansers, serums, moisturizers, and more, all crafted with care to enhance your natural beauty.",
  icons: {
    icon: "/logo.png", // or .png, .svg
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} antialiased text-slate-170`}
    >
      <body>
        <Toaster
          toastOptions={{
            style: {
              background: "rgb(51 65 85)",
              color: "#fff",
            },
          }}
        />
        <CartProvider>
          {" "}
          <div className="flex flex-col min-h-screen ">
            <NavBar />
            <main className="flex-grow ">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
