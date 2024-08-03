import { Raleway } from "next/font/google";
import "./globals.css";
import "./styles/conocebaliStyles.css"
import "./styles/reservasStyles.css"
import "./styles/estudioStyles.css"
import "./styles/homeStyles.css"
import NavBar from "./components/navbarHome";
import Footer from "./components/Footer";


const raleway = Raleway({ subsets: ["latin"] });

export const metadata = {
  title: "BALI Estudios",
  description: "Estudios profesionales",
  
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="es">
      <body className={raleway.className}>
        <NavBar />
        {children}
        <Footer />
        </body>
    </html>
  );
}
