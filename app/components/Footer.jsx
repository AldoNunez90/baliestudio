"use client";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="footerContainer">
      <div className="footerLogo footerItems">
      <Link href={"/"}>
        <Image
          src="/baliLogoWhite.png"
          alt="logo"
          className="footerLogoImg"
          width={503}
          height={142}
          />
          </Link>
          <div className="socialNav socialFooter" style={{display: 'none'}}>
        <a href="https://www.instagram.com/baliestudio/" target="_blank">
          <Image
            src="/instagram_icon.png"
            alt="instagram"
            width={30}
            height={30}
            className="socialImg"
          />
        </a>
        <a
          href="https://wa.me/+5491154171668?text=Hola! Tengo una consulta sobre el estudio"
          target="_blank"
        >
          <Image
            src="/whatsapp_icon.png"
            alt="wp"
            width={30}
            height={30}
            className="socialImg"
          />
        </a>
        <a
          href="https://www.linkedin.com/company/bali-estudio/"
          target="_blank"
        >
          <Image
            src="/linkln_icon.png"
            alt="linkedin"
            width={30}
            height={30}
            className="socialImg"
          />
        </a>
      </div>
      </div>
      <div className="footerLinks footerItems">
        <ul className="footerList footerText" >
            <li className="footerListItem"><Link href={"/conocebali"} className="footerRoutes" >Conoce Bali</Link></li>
            <div className="footerListLine"></div>
            <li className="footerListItem"><Link href={"/estudio"} className="footerRoutes">Estudio</Link></li>
            <div className="footerListLine"></div>
            <li className="footerListItem"><Link href={"/reservas"} className="footerRoutes">Reservas</Link></li>
            <div className="footerListLine"></div>
            <li className="footerListItem"><Link href={"/contacto"} className="footerRoutes">Contacto</Link></li>
            <div className="footerListLine"></div>
            <li className="footerListItem"><Link href={"/privacidad"} className="footerRoutes">Políticas de privacidad</Link></li>
            <div className="footerListLine"></div>
        </ul>
        <div className="footerSocialMedia footerText">
          <p className="footerTxtFirma">Página diseñada y desarrollada por <Image src={"/logoKranding.png"} alt="Kranding" width={78} height={12} className="logoKranding"/></p>
            </div>
      </div>
    </div>
  );
}
