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
        {`Ubicado en el corazón de la vibrante ciudad de Buenos Aires, BALI\nEstudio se erige no sólo como un espacio de sesiones fotográficas o\nfílmicas, sino como un ecosistema diseñado para la creatividad y la\ninnovación. Cada rincón ha sido pensado para ofrecer versatilidad,\nadaptabilidad, calidad y una inigualable experiencia creativa.
        `}</p></div>
        <Image src={"/BALIgrande.png"} alt="Logo" width={700} height={700} className="imgConoceBali"/>
        <div >
            <p className="conoceBaliParagraph">
        {`Nuestros espacios son pura inspiración con una iluminación natural\ndeslumbrante, equipos de primera, fondos versátiles y hasta un rincón\nacogedor para tus modelos y equipo de trabajo. Si quieres ser parte de una\nexperiencia fotográfica sin igual o tienes alguna pregunta, no dudes en\ncontactarnos`}
                </p>
        </div>
    </section>
    <section className="conoceBaliSecond">
            <div></div>
            <Image src={`https://picsum.photos/200/300.jpg`} alt="img" width={200} height={300} />
    </section>


    </div>
  );
}
