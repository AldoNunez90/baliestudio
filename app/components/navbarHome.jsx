"use client";

import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function NavBarHome() {
  const [openMenu, setOpenMenu] = useState(false);

  const NavItem = ({ href, children }) => {
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
      <Link href={href}>
        <p className={classNames("nav-item", { active: isActive })}>
          {children}
        </p>
      </Link>
    );
  };
  console.log(openMenu)

  return (
    <nav className="navBarHomeHero">
      <div className="navBarContainer">
        <Link onClick={() => handleSelect("home")} href={"/"}>
          <Image
            src="/baliLogo.png"
            alt="logo Bali"
            width={150}
            height={42.5}
            className="navBarLogo"
          />
        </Link>
      </div>
     
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
        className="navBtnList"
        onClick={()=>setOpenMenu(!openMenu)}
        >
        <path
        fillRule="evenodd"
        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
        />
      </svg>
       


      <ul className={`navList ${openMenu ? 'visible' : ''}`}>
        <NavItem href="/" className="liNav">
          Home
        </NavItem>
        <NavItem href="/conocebali" className="liNav">
          Conoce Bali
        </NavItem>
        <NavItem href="/estudio" className="liNav">
          Estudio
        </NavItem>
        <NavItem href="/reservas" className="liNav">
          Reservas
        </NavItem>
        <NavItem href="/produccion" className="liNav">
          Producción
        </NavItem>
        <NavItem href="/contacto" className="liNav">
          Contacto
        </NavItem>
      </ul>

      <div className="socialNav">
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
    </nav>
  );
}
