import { Raleway } from "next/font/google";
import "./styles/conocebaliStyles.css"
import "./styles/reservasStyles.css"
import "./styles/estudioStyles.css"
import "./styles/homeStyles.css"
import "./styles/formContact.css"
import "./globals.css";
import "./styles/queries/queries599.css"
import "./styles/queries/queries600.css"
import "./styles/queries/queries769.css"
import "./styles/queries/queries992.css"
import "./styles/queries/queries1024.css"
import "./styles/queries/queries1200.css"
import "./styles/queries/queries1441.css"
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
