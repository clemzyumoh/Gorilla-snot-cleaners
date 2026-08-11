import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
