import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import AuthInitializer from "@/components/AuthInitializer";
import ToastContainer from "@/components/ToastContainer";
export const metadata = {
  title: "Gorilla Snot Cleaners | Party Supplies",
  description:
    "Party hats, plates, napkins and more from Gorilla Snot Cleaners. Bold party supplies for every occasion.",
  icons: {
    icon: '/icon.png',                    // or '/my-icon.png'              // optional
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-body flex min-h-screen flex-col">
        <Header />
        <ToastContainer/>
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <AuthInitializer/>
      </body>
    </html>
  );
}
