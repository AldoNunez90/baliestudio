import { Inter } from "next/font/google";
import "./globals.css";
import "./styles/homeStyles.css"
import "./styles/conocebaliStyles.css"
import "./styles/reservasStyles.css"
import NavBarHome from "./components/navbarHome";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBarHome />
        {children}
        <Footer />
        </body>
    </html>
  );
}
