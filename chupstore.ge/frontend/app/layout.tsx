import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/Header";
import Information from "./components/Information/Information";
import Footer from "./components/Footer/Footer";
import Loading from "./components/Loading/Loading";
import { AuthProvider } from "./components/context/AuthContext";
import '@ant-design/v5-patch-for-react-19';
import { CartProvider } from "./components/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chupstore",
  description: "Chupstore - Online shop",
};
if (typeof window !== 'undefined') {
  console.warn = (msg) => {
    if (!msg?.includes('[antd: compatible]')) console.log(msg);
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <CartProvider>
        <AuthProvider>
        <Information />
        <Header />
        <Loading />
        {children}
        <Footer />
        </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
