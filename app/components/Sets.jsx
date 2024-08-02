'use client'
import Image from "next/image";
export default function Sets() {

    return (
        <>
        <div className="setsContainer">
            <div className="studioPalaceContainer">
                <p className="studioPalaceTxt">
                    {`Set con forma circular\nBalcón francés\nAmplio ventanal\nGran iluminación natural\nPosibilidad de toma cenital\ndesde el entre piso del estudio`}
                </p>
            </div>
            <div>
                <Image src={"/estudios/setPalaceMin.png"} alt="set Palace" fill className="setPalaceImgLong"/>
            </div>
        </div>
        <div >
            <Image src={"/estudios/setDuoTxt.png"} alt="Set Duo" fill className="setDuoTxt"/>
            <Image src={"/estudios/setDuo.png"} alt="Set Duo Img" fill className="setDuoTxt"/>
            <Image src={"/estudios/setAzul.png"} alt="Set Azul Img" fill className="setDuoTxt"/>
            <div className="mapContainer">
            <Image src={"/estudios/planoBali.png"} alt="Plano" fill className="studioPlan"/>
            </div>
        </div>
        </>
        );
}