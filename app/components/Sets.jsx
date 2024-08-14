'use client'
import Image from "next/image";
export default function Sets() {

    return (
        <>
        <div className="setsContainer">
            <div className="studioPalaceContainer">
                <p className="studioPalaceTxt">
                    {`Set con forma circular\nBalcón francés\nAmplio ventanal\nGran iluminación natural`}
                </p>
            </div>
            <div>
                <Image src={"https://res.cloudinary.com/dsdzvhfhh/image/upload/v1723523380/SET_PALACE_crwv3p.png"} alt="set Palace" fill className="setPalaceImgLong"/>
            </div>
        </div>
        <div >
            <Image src={"https://res.cloudinary.com/dsdzvhfhh/image/upload/v1723523378/SET_DUO_s0fh4d.png"} alt="Set Duo" fill className="setDuoTxt"/>
            <Image src={"https://res.cloudinary.com/dsdzvhfhh/image/upload/v1723523380/SET_DUO__iubku5.png"} alt="Set Duo Img" fill className="setDuoTxt"/>
            <Image src={"https://res.cloudinary.com/dsdzvhfhh/image/upload/v1723523380/SET_AZUL_hqjeo7.png"} alt="Set Azul Img" fill className="setDuoTxt"/>
            <div className="mapContainer">
            <Image src={"https://res.cloudinary.com/dsdzvhfhh/image/upload/v1723523378/Plano_BALI_qchvsb.png"} alt="Plano" fill className="studioPlan"/>
            </div>
        </div>
        </>
        );
}