import gustavoLogoBlack from "@/public/Logo-Gustavo-Oliver-black.png";
import gustavoLogoWhite from "@/public/go-white.png";
import Image from "next/image";

export function GoLogoBlack() {
  return (
    <div className={`p-1 flex flex-row items-center leading-none`}>
      <div className="relative">
        <Image
          src={gustavoLogoBlack}
          className=""
          alt="Logotipo"
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>
    </div>
  );
}

export function GoLogoWhite() {
  return (
    <div className={`p-1 flex flex-row items-center leading-none`}>
      <div className="relative">
        <Image
          src={gustavoLogoWhite}
          className=""
          alt="Logotipo"
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>
    </div>
  );
}
