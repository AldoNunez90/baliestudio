'use client'
import { Video } from "../components/Video";
import Image from "next/image";


export default function Conoce() {


  return (
    <div>
      <div className="videoContainer">
        <Video url="estudio.mp4" />
      </div>
    <section className="textConoceBali">
        <div > <p className="conoceBaliParagraph">
        {`Bali Estudio, situado en el corazón de Buenos Aires, en la icónica intersección de la\nAvenida Santa Fe y 9 de Julio, se erige como un símbolo de glamour y elegancia. Su\narquitectura europea confiere al espacio una atmósfera sofisticada, ideal para clientes\nque buscan un entorno distinguido para sus proyectos`}</p></div>
        <div className="conoceBaliImgContainer">
        <Image src={"/conocebali/conoceBaliImg1.jpg"} alt="Studio" fill className="imgConoceBali"/>
        </div>
        <div >
            <p className="conoceBaliParagraph">
        {`Sin embargo, Bali Estudio no es solamente un estudio; es un lugar donde invitamos\na la creatividad, la calidad y el trabajo en equipo.Concebido como un lugar versátil,\nBali Estudio está destinado a albergar proyectos audiovisuales de diversa índole.\nSu diseño meticuloso y atención al detalle aseguran que cada rincón del estudio sea\nfuncional y estéticamente atractivo, ofreciendo a los creativos un lienzo perfecto para\nmaterializar sus ideas.`}</p>
        </div>

        <div className="conocePhotosContainer">

          <div className="conocePhoto2Container" >
            <div className="video-background">
              {/* <video url={"/conocebali/conoceVideo.mp4"} id="background-video"/> */}
              <video id="background-video" autoPlay loop muted>
              <source src="/conocebali/conoceVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
        </video>
            </div>
            <div>
            <Image src={"/conocebali/conoceBaliImg3.jpg"} alt="photo" fill className="conocePhoto2"/>
            <div>
              <p className="conocePhotoTxt">CHEERY BOMB <a href="https://www.instagram.com/bfstoreok/" target="_blanck">@bfstoreok</a> - Modelo: <a href="https://www.instagram.com/barbieeferrari/" target="_blanck" >@barbieeferrari</a></p>
              <p className="conocePhotoTxt">Make up & Peinado: <a href="https://www.instagram.com/soficosta.makeup/" target="_blanck">@soficosta.makeup</a> / <a href="https://www.instagram.com/emmabarrioshair/" target="_blanck" >@emmabarrioshair</a></p>
              <p className="conocePhotoTxt">Fotografos: <a href="https://www.instagram.com/magencia.mkt/" target="_blanck">@magenciamkt</a> / <a href="https://www.instagram.com/marbellendier/" target="_blanck">@marbellendier</a> / <a href="https://www.instagram.com/maratkinson_/" target="_blanck">@maratkinson_</a></p>
            </div>
            </div>
          </div>
        </div>


        <div className="ademasContainer">
          <div className="studio2Container">
            <Image src={"/conocebali/conoceBaliImg2.jpg"} alt="Studio 2" fill className="imgConoceBali"/>
          </div>
          <div>
            <p className="conoceBaliParagraph2">
              {`Además, nuestro equipamiento de vanguardia proporciona todos\nlos recursos técnicos necesarios para producciones de alta calidad,\ndesde sesiones fotográficas de moda hasta la grabación de contenido\naudiovisual.\n\nEsta combinación garantiza resultados excepcionales que cumplen\ncon los estándares más exigentes de la industria. El pilar fundamental\nde Bali Estudio es la comodidad para desempeñar el trabajo dentro\nde nuestras instalaciones. Nos enfocamos en el cuidado y atención\na la calidad, asegurando un ambiente propicio para la creatividad\ny la eficiencia.\n\nCon una gran vocación de servicio, nuestro equipo está siempre\ndispuesto a asistir a nuestros clientes en cada etapa de su proyecto,\nbrindando soporte y soluciones personalizadas.\n\nEn Bali Estudio, creemos que un ambiente inspirador es crucial para\nel éxito de cualquier proyecto. Por ello, hemos diseñado nuestro espacio\nno solo para ser visualmente impactante, sino también para ser altamente\nfuncional y adaptable a las necesidades específicas de cada cliente.\n\nLa combinación de elegancia, versatilidad y tecnología de punta hace de\nBali Estudio el lugar ideal para aquellos que buscan llevar sus proyectos\nal siguiente nivel.`}</p>
          </div>

        </div>
    </section>


    </div>
  );
}
