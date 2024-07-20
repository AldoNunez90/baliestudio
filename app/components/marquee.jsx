/* eslint-disable @next/next/no-img-element */
"use client";

import Marquee from "react-fast-marquee";

export default function MarqueeHome({ textMarquee, textMarquee2 }) {
  return (
    <Marquee
      gradient={false}
      speed={50}
      pauseOnHover={false}
      className="marquee-home-text"
    >
      {/* P1 - IMG1 */}
      <p className="textMarquee">{textMarquee}</p>
      <img
        src="/minicam.png"
        alt="minicam"
        width={20}
        height={20}
        className="miniCam"
      />
      {textMarquee2 && <p className="textMarquee">{textMarquee2}</p>}
      {textMarquee2 && <img src="/minicam.png" alt="minicam" width={20} height={20} className="miniCam"/>}
      
      {/* P2 - IMG2 */}
      <p className="textMarquee">{textMarquee}</p>
      <img
        src="/minicam.png"
        alt="minicam"
        width={20}
        height={20}
        className="miniCam"
      />
      {textMarquee2 && <p className="textMarquee">{textMarquee2}</p>}
      {textMarquee2 && <img src="/minicam.png" alt="minicam" width={20} height={20} className="miniCam"/>}
      {/* P3 - IMG3 */}
      <p className="textMarquee">{textMarquee}</p>
      <img
        src="/minicam.png"
        alt="minicam"
        width={20}
        height={20}
        className="miniCam"
      />
      {textMarquee2 && <p className="textMarquee">{textMarquee2}</p>}
      {textMarquee2 && <img src="/minicam.png" alt="minicam" width={20} height={20} className="miniCam"/>}
      {/* P4 IMG4 */}
      <p className="textMarquee">{textMarquee}</p>
      <img
        src="/minicam.png"
        alt="minicam"
        width={20}
        height={20}
        className="miniCam"
      />
      {textMarquee2 && <p className="textMarquee">{textMarquee2}</p>}
      {textMarquee2 && <img src="/minicam.png" alt="minicam" width={20} height={20} className="miniCam"/>}
      {/* P5 IMG 5 */}
      <p className="textMarquee">{textMarquee}</p>
      <img
        src="/minicam.png"
        alt="minicam"
        width={20}
        height={20}
        className="miniCam"
      />
      {textMarquee2 && <p className="textMarquee">{textMarquee2}</p>}
      {textMarquee2 && <img src="/minicam.png" alt="minicam" width={20} height={20} className="miniCam"/>}
    </Marquee>
  );
}
