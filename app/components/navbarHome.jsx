'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


export default function NavBarHome() {

  const [selected, setSelected] = useState("")

  const handleSelect = (option) => {
    setSelected(option);
  };
  return (
    <nav className="navBarHomeHero">
      <div className="navBarContainer">
        <Link onClick={()=>handleSelect('home')}  href={"/"}>
        <Image src="baliLogo.svg" alt="logo Bali" width={150} height={100} className="navBarLogo" />
        </Link>
      </div>

      <ul className="navList">
        <li className="liNav" onClick={() => handleSelect('home')}><Link className={selected === 'home' ? 'selected' : ''} href={"/"}>Home</Link> </li>
        <li className="liNav" onClick={() => handleSelect('conocebali')}><Link className={selected === 'conocebali' ? 'selected' : ''} href={"/conocebali"}>Conoce Bali</Link> </li>
        <li className="liNav" onClick={() => handleSelect('estudio')}><Link className={selected === 'estudio' ? 'selected' : ''}  href={"/estudio"}>Estudio</Link> </li>
        <li className="liNav" onClick={() => handleSelect('reservas')}><Link className={selected === 'reservas' ? 'selected' : ''}  href={"/reservas"}>Reservas</Link></li>
        <li className="liNav" onClick={() => handleSelect('produccion')}><Link className={selected === 'produccion' ? 'selected' : ''} href={"/produccion"}>Producción</Link></li>
        <li className="liNav" onClick={() => handleSelect('contacto')}><Link className={selected === 'contacto' ? 'selected' : ''} href={"contacto"}>Contacto</Link></li>
      </ul>

      <div className="socialNav">
        <Image src="/facebook.png" alt="facebook" width={30} height={30} className="socialImg"/>
        <Image src="/instagram.png" alt="instagram" width={30} height={30} className="socialImg"/>
      </div>
    </nav>
  );
}
