"use client";
import Faqs from "./components/Faqs";
import MarqueeHome from "./components/marquee";
import { Video } from "./components/Video";
import Image from "next/image";

export default function Home() {
//   const [loading, setLoading] = useState(true)

//   useEffect(()=>{
//     setTimeout(()=>{
//       setLoading(false)

//       }, 2000)
      
//   }, [])

//   if (loading) {
//     return <Image src={"/BALIgrande.png"} alt="Logo"  width={500} height={500} />
// }

  return (
    <div>
      <div className="videoContainer">
        <Video url="estudio.mp4" />
      </div>
      <div className="marqueeContainer">
        <MarqueeHome textMarquee={"LA CREATIVIDAD SE\nENCUENTRA EN BALI"} />
      </div>
      <section className="estudios">
        {/* Studio section
        Renders a section showcasing the studio, featuring an image and text
       */}
        <div className="pictureContainer">
          <div className="baliEstudioPictures baliEstudioText ">
            <p className="theFirts">
            <h2 >BALI ESTUDIO</h2>
              {`BALI Estudio se erige no sólo como\nun espacio de sesiones fotográficas\no fílmicas, sino como un ecosistema\ndiseñado para la creatividad y la\ninnovación. Cada rincón ha sido\npensado para ofrecer versatilidad\nadaptabilidad, calidad y una\ninigualable experiencia creativa`}
            </p>
          </div>
          <div className="baliEstudioPictures baliEstudioImg">
            <Image
              src={`/espejo.webp`}
              alt="Nuestro Estudio"
              fill
              id="baliEstudioImg1"
            />
          </div>
        </div>
        {/* second */}

        <div className="pictureContainer">
          <div className="baliEstudioPictures baliEstudioText ">
            <p className="theSecond">
              {`Nuestros espacios son pura inspiración con\nuna iluminación natural deslumbrante, equipos\nde primera, fondos versátiles y hasta un rincón\nacogedor para tus modelos y equipo de\ntrabajo. Si quieres ser parte de esta experiencia\nfotográfica sin igual o tienes alguna pregunta,\nno dudes en contactarnos.`}
            </p>
          </div>
          <div className="baliEstudioPictures baliEstudioImg">
            <Image
              src={`/BALIgrande.png`}
              alt="Nuestro Estudio"
              fill
              id="baliEstudioImg1"
            />
          </div>
        </div>

        {/* third */}
        <div className="pictureContainer">
          <div className="baliEstudioPictures baliEstudioText">
            <p className="theThird">
              {`Ubicado en el corazón\nde la vibrante ciudad de Buenos Aires`}
            </p>
          </div>
          <div className="baliEstudioPictures baliEstudioImg">
            <Image
              src={`/edificio1080.webp`}
              alt="Nuestro Estudio"
              fill
              id="baliEstudioImg1"
            />
          </div>
        </div>
      </section>
      <div className="marqueeContainer">
        <MarqueeHome
          textMarquee={"NUESTROS              \nSERVICIOS              "}
        />
      </div>
      <section>
        <div className="pictureContainer">
          <div className="baliEstudioPictures baliEstudioImg">
            <Image
              src={`/espejo.webp`}
              alt="Nuestro Estudio"
              fill
              id="baliEstudioImg1"
            />
          </div>
          <div className="baliEstudioPictures baliEstudioText ">
            <p className="baliEstudioTitle2"> {`SESIONES\n FOTOGRÁFICAS`} </p>
            <p className="theFirts">
              {`BALI Estudio se erige no sólo como\nun espacio de sesiones fotográficas\no fílmicas, sino como un ecosistema\ndiseñado para la creatividad y la\ninnovación. Cada rincón ha sido\npensado para ofrecer versatilidad\nadaptabilidad, calidad y una\ninigualable experiencia creativa`}
            </p>
          </div>
        </div>
        {/* -------------------------------------- */}
        <div className="pictureContainer">
          <div className="baliEstudioPictures baliEstudioImg">
            <Image
              src={`/BALIgrande.png`}
              alt="Nuestro Estudio"
              fill
              id="baliEstudioImg1"
            />
          </div>
          <div className="baliEstudioPictures baliEstudioText ">
              <p className="baliEstudioTitle3">
                {`PRODUCCIONES\nAUDIOVISUALES`}
              </p>
            <p className="theSecond">
              {`Nuestros espacios son pura inspiración con\nuna iluminación natural deslumbrante, equipos\nde primera, fondos versátiles y hasta un rincón\nacogedor para tus modelos y equipo de\ntrabajo. Si quieres ser parte de esta experiencia\nfotográfica sin igual o tienes alguna pregunta,\nno dudes en contactarnos.`}
            </p>
          </div>
        </div>
        {/* -------------------------------------- */}
        <div className="pictureContainer">
        <div className="baliEstudioPictures baliEstudioImg">
            <Image
              src={`/edificio1080.webp`}
              alt="Nuestro Estudio"
              fill
              id="baliEstudioImg1"
            />
          </div>
          <div className="baliEstudioPictures baliEstudioText">
            <p className="theThird">
              {`Ubicado en el corazón\nde la vibrante ciudad de Buenos Aires`}
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
