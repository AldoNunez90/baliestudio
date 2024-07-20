"use client";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="footerContainer">
      <div className="footerLogo footerItems">
        <Image
          src="/BALIgrande.png"
          alt="logo"
          className="footerLogoImg"
          width={400}
          height={400}
        />
      </div>
      <div className="footerLinks footerItems">
        <ul className="footerList footerText" >
            <li className="footerListItem">Conoce Bali</li>
            <div className="footerListLine"></div>
            <li className="footerListItem">Estudio</li>
            <div className="footerListLine"></div>
            <li className="footerListItem">Reservas</li>
            <div className="footerListLine"></div>
            <li className="footerListItem">Contacto</li>
            <div className="footerListLine"></div>
        </ul>
        <div className="footerSocialMedia footerText">
                <Image src={"/social-media-logo-facebook.avif"} alt="Facebook" width={30} height={30} />
                <Image src={"/social-media-logo-facebook.avif"} alt="Linkedin" width={30} height={30} />
                <Image src={"/social-media-logo-facebook.avif"} alt="Instagram" width={30} height={30} />
            </div>
      </div>
    </div>
  );
}
