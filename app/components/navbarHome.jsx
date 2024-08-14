'use client'

import Image from "next/image";
import Link from "next/link";
import classNames from 'classnames';
import { usePathname } from "next/navigation";


export default function NavBarHome() {

  
  
  const NavItem = ({ href, children }) => {
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
      <Link href={href}>
        <p className={classNames('nav-item', { 'active': isActive })}>
          {children}
        </p>
      </Link>
    );
  };
  
  
  
  return (
    <nav className="navBarHomeHero">
      <div className="navBarContainer">
        <Link onClick={()=>handleSelect('home')}  href={"/"}>
        <Image src="/baliLogo.png" alt="logo Bali" width={150} height={42.5} className="navBarLogo" />
        </Link>
      </div>

      <ul className="navList">
      <NavItem href="/" className="liNav">Home</NavItem>
      <NavItem href="/conocebali" className="liNav">Conoce Bali</NavItem>
      <NavItem href="/estudio" className="liNav">Estudio</NavItem>
      <NavItem href="/reservas" className="liNav">Reservas</NavItem>
      <NavItem href="/produccion" className="liNav">Producción</NavItem>
      <NavItem href="/contacto" className="liNav">Contacto</NavItem>
      </ul>

      <div className="socialNav">
      <a href="https://www.instagram.com/baliestudio/" target="_blank">
        <Image src="/instagram_icon.png" alt="instagram" width={30} height={30} className="socialImg"/>
        </a>  
      <a href="https://wa.me/+5491154171668?text=Hola! Tengo una consulta sobre el estudio" target="_blank">
        <Image src="/whatsapp_icon.png" alt="wp" width={30} height={30} className="socialImg"/>
        </a>  
      <a href="https://www.linkedin.com/company/bali-estudio/" target="_blank">
      <Image src="/linkln_icon.png" alt="linkedin" width={30} height={30} className="socialImg"/>
        </a>  
      </div>
    </nav>
  );
}
