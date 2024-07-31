'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import classNames from 'classnames';



export default function NavBarHome() {
  const [selected, setSelected] = useState("")

  const handleSelect = (option) => {
    setSelected(option);
  };
  return (
    <nav className="navBarHomeHero">
      <div className="navBarContainer">
        <Link onClick={()=>handleSelect('home')}  href={"/"}>
        <Image src="/baliLogo.png" alt="logo Bali" width={150} height={42.5} className="navBarLogo" />
        </Link>
      </div>

      <ul className="navList">
        <li className="liNav" onClick={() => handleSelect('home')}><Link className={classNames('navRoute', { 'selected': selected === 'home' })}  href={"/"}>Home</Link> </li>
        <li className="liNav" onClick={() => handleSelect('conocebali')}><Link className={classNames('navRoute', {'selected': selected === 'conocebali' ? 'selected' : ''})} href={"/conocebali"}>Conoce Bali</Link> </li>
        <li className="liNav" onClick={() => handleSelect('estudio')}><Link className={classNames('navRoute', {'selected': selected === 'estudio' ? 'selected' : ''})}  href={"/estudio"}>Estudio</Link> </li>
        <li className="liNav" onClick={() => handleSelect('reservas')}><Link className={classNames('navRoute', {'selected': selected === 'reservas' ? 'selected' : ''})}  href={"/reservas"}>Reservas</Link></li>
        <li className="liNav" onClick={() => handleSelect('produccion')}><Link className={classNames('navRoute', {'selected': selected === 'produccion' ? 'selected' : ''})} href={"/produccion"}>Producción</Link></li>
        <li className="liNav" onClick={() => handleSelect('contacto')}><Link className={classNames('navRoute', {'selected': selected === 'contacto' ? 'selected' : ''})} href={"contacto"}>Contacto</Link></li>
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
