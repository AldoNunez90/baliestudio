"use client";
import Faqs from "./components/Faqs";
import MarqueeHome from "./components/marquee";
import MouseGif from "./components/MouseGif";
import { Video } from "./components/Video";
import Image from "next/image";
import Link from "next/link";


export default function Home() {

  return (
    <div>
      <div className="videoContainer">
        <Video url="https://res.cloudinary.com/dsdzvhfhh/video/upload/v1722747174/estudio_cw6x13.mp4" />
      </div>
      <MouseGif />
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
             <p className="baliTxtFirst">            
              {`Un Espacio sofisticado para proyectos\nextraordinarios.\n\nSu arquitectura europea confiere al\nespacio una atmósfera sofisticada,\nideal para clientes que buscan un\nentorno distinguido para sus\nproyectos.`}
              </p> 
              <Link href={"/conocebali"}>
                <div className="conocemasBtn">Conoce más</div>
              </Link>
            </div>
          </div>
          <div className="baliEstudioPictures baliEstudioImg">
            <Image
              src={"https://res.cloudinary.com/dsdzvhfhh/image/upload/v1722747160/imgHome1_pph93j.jpg"}
              alt="Nuestro Estudio"
              fill
              className="baliEstudioImg1"
            />
          </div>
        {/* second */}

          <div className="baliEstudioText ">
            <p className="theSecond baliTxtFirst">
              {`Hemos diseñado nuestro espacio no\nsolo para ser visualmente impactante,\nsino  también para ser altamente funcional\ny adaptable a las necesidades específicas\nde cada cliente.\n\nLa combinación de elegancia, versatilidad\ny tecnología hacen de Bali Estudio el lugar\nideal.`}
            </p>
          </div>
          <div className="baliEstudioPictures baliEstudioImg baliLogoWhiteContainer">
            <Image src={"/baliLogoWhite.png"} alt="logo" width={503} height={142}/>
          </div>

        {/* third */}
          <div className="baliEstudioText">
            <div>
            <p className="theThird baliTxtFirst">
              {`Con gran vocación de servicio,\nnuestro equipo está siempre dispuesto\na asistir a nuestros clientes en cada\netapa de su proyecto, brindando soporte\ny soluciones personalizadas.\n`}
            </p>
            <p className="theThird baliTxtThird">¡Vení a Conocernos y tener una Baliexperience!</p>
            </div>
          </div>
          <div className="baliEstudioPictures baliEstudioImg">
            <Image
              src={`https://res.cloudinary.com/dsdzvhfhh/image/upload/v1722747163/imgHome2_sl0y3r.jpg`}
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
              src={`https://res.cloudinary.com/dsdzvhfhh/image/upload/v1722747162/imgHome3_rjdyfg.jpg`}
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
              {`EN\nNUESTROS\nESPACIOS\nPODRAS\nHACER`}
            </p>
          </div>
          <div className="baliEstudioText produccionesContainer ">
            <div className="theSecond">
              <p className="baliEstudioTitle3 baliTxt">{`PRODUCCIONES\nAUDIOVISUALES`}</p>
            <p className="baliTxt">{`REELS\nSOCIALES\nFASHION FILMS\nGRABACIÓN DE VIDEOS\nCONTENIDO PARA REDES SOCIALES`}</p>
            </div>
            <div className="theSecondTxt">
              <p className="baliEstudioTitle3 baliTxt">{`EVENTOS`}</p>
            <p className="baliTxt" >{`CASTING\nWORKSHOP\nSHOW ROOM\nFASHION SHOW\nMASTER CLASS\nEVENTOS EMPRESARIALES`}</p>
            </div>
        </div>
        {/* -------------------------------------- */}
        <div className="baliEstudioPictures baliEstudioImg">
            <Image
              src={`https://res.cloudinary.com/dsdzvhfhh/image/upload/v1722747161/imgHome4_k956dj.jpg`}
              alt="Nuestro Estudio"
              fill
              className="baliEstudioImg1"
            />
          </div>
          <div className="baliEstudioText">
            <div  className="theThird">
          <p className="baliEstudioTitle3 baliTxt">{`AMAMOS LA MODA`}</p>
            <p className="baliTxt">{`ESTILISMO\nPRODUCCIÓN DE MODA Y EVENTOS`}
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
