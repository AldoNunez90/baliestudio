'use client'
import { useState, useEffect } from "react";
import styles from '../styles/MouseGif.module.css';
import Image from "next/image";


export default function MouseGif() {

    const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


    return(
        <div className={`${styles.mouseGifContainer} ${hidden ? styles.hidden : ''}`}>
        <Image src="/mouse.gif" alt="Mouse GIF" className='mouseGifOnly' width={250} height={250} unoptimized/>
      </div>
    )
}