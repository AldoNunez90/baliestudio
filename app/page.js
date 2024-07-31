"use client";
import Faqs from "./components/Faqs";
import MarqueeHome from "./components/marquee";
import { Video } from "./components/Video";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  return (
    <div>
      <div className="videoContainer">
        <Video url="estudio.mp4" />
      </div>
      {/* <div>
        <Video url={"/mousseEffect.mp4"}/>
      </div> */}
      <div className="marqueeContainer">
        <MarqueeHome textMarquee={"ENFOCA.  CAPTURA.  INSPIRA"} />
      </div>
      <section className="estudios">
        {/* Studio section
        Renders a section showcasing the studio, featuring an image and text
       */}
          <div className="baliEstudioText ">
            <div className="theFirts">
            <h2 className="homeTitles">BALI ESTUDIO</h2>
             <p className="baliTxt">            
              {`BALI Estudio se erige no sólo como\nun espacio de sesiones fotográficas\no fílmicas, sino como un ecosistema\ndiseñado para la creatividad y la\ninnovación. Cada rincón ha sido\npensado para ofrecer versatilidad,\nadaptabilidad, calidad y una\ninigualable experiencia creativa.`}
              </p> 
              <Link href={"/conocebali"}>
                <div className="conocemasBtn">Conoce más</div>
              </Link>
            </div>
          </div>
          <div className="baliEstudioPictures baliEstudioImg">
            <Image
              src={`/DSC04850.jpg`}
              alt="Nuestro Estudio"
              fill
              className="baliEstudioImg1"
            />
          </div>
        {/* second */}

          <div className="baliEstudioText ">
            <p className="theSecond baliTxt">
              {`Nuestros espacios son pura inspiración con\nuna iluminación natural deslumbrante, equipos\nde primera, fondos versátiles y hasta un rincón\nacogedor para tus modelos y equipo de\ntrabajo. Si quieres ser parte de esta experiencia\nfotográfica sin igual o tienes alguna pregunta,\nno dudes en contactarnos.`}
            </p>
          </div>
          <div className="baliEstudioPictures baliEstudioImg baliLogoWhiteContainer">
            <Image src={"/baliLogoWhite.png"} alt="logo" width={503} height={142}/>
          </div>

        {/* third */}
          <div className="baliEstudioText">
            <p className="theThird baliTxt">
              {`Ubicado en el corazón\nde la vibrante ciudad de Buenos Aires`}
            </p>
          </div>
          <div className="baliEstudioPictures baliEstudioImg">
            <Image
              src={`/DSC04606.JPG`}
              alt="Nuestro Estudio"
              fill
              className="baliEstudioImg1"
            />
          </div>
      </section>
      <div className="marqueeContainer">
        <MarqueeHome
          textMarquee={"                    NUESTROS                    \n                    SERVICIOS                    "}
        />
      </div>
      <section className="servicios">
          <div className="baliEstudioPictures baliEstudioImg">
            <Image
              src={`/espejo.webp`}
              alt="Nuestro Estudio"
              fill
              className="baliEstudioImg1"
            />
          </div>
          <div className="baliEstudioText ">
            <div className="theFirts">
            <p className="baliEstudioTitle2">{`SESIONES    \nFOTOGRÁFICAS `}</p>
            <p className="baliTxt">
              {`PRODUCTO\nE COMMERCE\nEDITORIALES DE MODA\nLOOKBOOK\nCAMPAÑAS PUBLICITARIAS           `}
            </p>
            </div>
          </div>
          
        {/* -------------------------------------- */}
          <div className="baliEstudioPictures baliEspaciosTxt">
            <p>
              {`ALQUILA\nNUESTROS\nESPACIOS\nPARA`}
            </p>
          </div>
          <div className="baliEstudioText produccionesContainer ">
            <div className="theSecond">
              <p className="baliEstudioTitle3 baliTxt">{`PRODUCCIONES\nAUDIOVISUALES`}</p>
            <p >{`GRABACIÓN DE VIDEOS\nFASHION FILMS\nCONTENIDO PARA REDES SOCIALES\nREELS`}</p>
            </div>
            <div className="theSecondTxt">
              <p className="baliEstudioTitle3 baliTxt">{`EVENTOS`}</p>
            <p >{`MASTER CLASS\nSHOW ROOM\nWORKSHOP\nEVENTOS EMPRESARIALES                \nFASHION SHOW\nCASTING`}</p>
            </div>
        </div>
        {/* -------------------------------------- */}
        <div className="baliEstudioPictures baliEstudioImg">
            <Image
              src={`/edificio1080.webp`}
              alt="Nuestro Estudio"
              fill
              className="baliEstudioImg1"
            />
          </div>
          <div className="baliEstudioText">
            <div  className="theThird">
          <p className="baliEstudioTitle3 baliTxt">{`EVENTOS`}</p>
            <p className="baliTxt">{`ESTILISMO\nPRODUCCIÓN DE MODA Y EVENTOS       `}
            </p>
            </div>
          </div>
          
        {/* --------------------------------- */}
      </section>

      <div className="marqueeContainer">
        <MarqueeHome
          textMarquee={"FAQ              "}
          textMarquee2={"PREGUNTAS \nFRECUENTES "}
        />
      </div>
      <Faqs />
    </div>
  );
}
