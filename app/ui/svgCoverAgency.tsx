import Image from "next/image";
import { AgencyTemplate } from "../lib/definitions";

export default function SvgCoverAgency({ agency }: { agency: AgencyTemplate }) {
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            padding: "12px 12px",
            // marginBottom: "16px",
          }}
        >
          <div className="h-4">
            <Image src={agency?.logo_url} alt="" width={30} height={50} />
          </div>
          <div
            style={{
              fontSize: "14px",
              fontWeight: 800,
            }}
          >
            {/* {agency?.url_site?.toUpperCase()} */}
          </div>
        </div>
        <div
          style={
            {
              // marginTop: "16px",
            }
          }
        >
          <div
            style={{
              color: agency?.title_content_header,
              fontSize: "16px",
              fontWeight: 800,
              lineHeight: "1",
              maxWidth: "40%",
              padding: "0px 12px 0px 12px",
            }}
          >
            Presencia en línea avanzada
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: "8px",
              padding: "0px 12px 0px 12px",
            }}
          >
            <div
              // debug
              style={{
                width: "80px",
                height: "50px",
              }}
            >
              <Image
                src="https://res.cloudinary.com/dxjuhqvt6/image/upload/v1714327142/static-logos/google-logo-color2_f8dibc.png"
                width={30}
                height={50}
                alt=""
              />
            </div>
            <div
              style={{
                // border: "1px solid red",
                fontSize: "6px",
                maxWidth: "70%",
                textAlign: "right",
              }}
            >
              Informe realizado para {agency?.name}, para mejorar su
              posicionamiento orgánico en motores de búsqueda, Informe técnico,
              estudio de palabras claves y análisis de competencia, realizado
              por {agency?.name}.
            </div>
          </div>
        </div>
        <div
          style={{
            // border: "2px solid red",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            position: "relative",
            height: "60%",
          }}
        >
          {/* svg//////////////////// */}
          {/* top section */}

          {/* end svg//////////////////// */}
        </div>
        {/* svg float right */}
        <div
          style={{
            position: "absolute",
            bottom: "160px",
            right: "20px",
            width: "120px",
            transform: "rotate(90deg)",
          }}
        >
          {/* <svg width="100%" viewBox="0 0 600 300" fill="none">
            <path
              d="M300 -1.31134e-05C465.685 -2.03558e-05 600 -2.62268e-05 600 -2.62268e-05C600 165.685 465.685 300 300 300C134.315 300 -5.87108e-06 165.685 -1.31134e-05 0C-1.31134e-05 0 134.315 -5.87108e-06 300 -1.31134e-05Z"
              fill={agency?.float_elements2}
            />
            <path
              d="M300 -5.72619e-06C372.349 -8.88868e-06 431 -1.14524e-05 431 -1.14524e-05C431 72.3493 372.349 131 300 131C227.651 131 169 72.3493 169 0C169 0 227.651 -2.5637e-06 300 -5.72619e-06Z"
              fill="white"
            />
          </svg> */}
        </div>
      </div>
      {/* ///////////// */}
      <div
        style={
          {
            // border: "1px solid black",
          }
        }
      >
        <div
          style={{
            // border: "1px solid green",
            display: "flex",
            flexDirection: "row",
            // height: "110px",
            position: "relative",
            zIndex: 5,
          }}
        >
          {/* svg 1 //////////////////// */}
          <div
            style={{
              width: "33.3%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <svg
              style={
                {
                  // border: "2px solid blue",
                }
              }
              width="60%"
              height="100%"
              viewBox="0 0 472 451"
              fill="none"
            >
              <path
                d="M472 290.931V451C203.079 451 0 451 0 451C0 179.565 203.079 0 472 0C472 0 472 19.4965 472 290.931Z"
                fill={agency?.float_cover_elements1}
              />
            </svg>
          </div>
          {/* svg 2 //////////////////// */}
          <div
            style={{
              width: "33.3%",
              position: "relative",
              zIndex: 5,
            }}
          >
            <svg width="100%" viewBox="0 0 817 449" fill="none">
              <rect
                width="817"
                height="449"
                fill={agency?.float_cover_elements2}
              />
            </svg>
          </div>
          {/* svg 3 //////////////////// */}
          <div
            style={{
              width: "33.3%",
              position: "relative",
            }}
          >
            <svg
              style={{
                position: "absolute",
                top: "-100%",
              }}
              width="60%"
              height="100%"
              viewBox="0 0 506 466"
              fill="none"
            >
              <path
                d="M505.996 300.607V466C217.703 466 -0.00390625 466 -0.00390625 466C-0.00390625 185.538 217.703 0 505.996 0C505.996 0 505.996 20.1449 505.996 300.607Z"
                fill={agency?.float_cover_elements2}
              />
            </svg>
            <svg width="60%" height="100%" viewBox="0 0 506 449" fill="none">
              <path
                d="M-0.00390625 159.359V0C288.289 0 505.996 0 505.996 0C505.996 270.231 288.289 449 -0.00390625 449C-0.00390625 449 -0.00390625 429.59 -0.00390625 159.359Z"
                fill={agency?.float_cover_elements1}
              />
              <ellipse
                cx="214.236"
                cy="186.148"
                rx="118.239"
                ry="112.148"
                fill="white"
              />
            </svg>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "-18px",
              right: "-5px",
              width: "60px",
              transform: "rotate(90deg)",
            }}
          >
            <svg width="100%" viewBox="0 0 600 300" fill="none">
              <path
                d="M300 -1.31134e-05C465.685 -2.03558e-05 600 -2.62268e-05 600 -2.62268e-05C600 165.685 465.685 300 300 300C134.315 300 -5.87108e-06 165.685 -1.31134e-05 0C-1.31134e-05 0 134.315 -5.87108e-06 300 -1.31134e-05Z"
                fill={agency?.float_cover_elements3}
              />
              <path
                d="M300 -5.72619e-06C372.349 -8.88868e-06 431 -1.14524e-05 431 -1.14524e-05C431 72.3493 372.349 131 300 131C227.651 131 169 72.3493 169 0C169 0 227.651 -2.5637e-06 300 -5.72619e-06Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
        {/* bottom section */}
        <div
          style={{
            // border: "1px solid red",
            display: "flex",
            flexDirection: "row",
            height: "75px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* svg 4 //////////////////// */}
          <div
            style={{
              width: "33.3%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <svg width="100%" viewBox="0 0 826 479" fill="none">
              <g clipPath="url(#clip0_254_181)">
                <rect width="826" height="479" fill="white" />
                <path
                  d="M826 0H0V479H826V0Z"
                  fill={agency?.float_cover_elements3}
                />
                <path
                  d="M413 733C553.28 733 667 619.28 667 479C667 338.72 553.28 225 413 225C272.72 225 159 338.72 159 479C159 619.28 272.72 733 413 733Z"
                  fill="white"
                />
                <path
                  d="M413 579C468.228 579 513 534.228 513 479C513 423.772 468.228 379 413 379C357.772 379 313 423.772 313 479C313 534.228 357.772 579 413 579Z"
                  fill={agency?.float_cover_elements3}
                />
              </g>
              <defs>
                <clipPath id="clip0_254_181">
                  <rect width="826" height="479" fill="white" />
                </clipPath>
              </defs>
            </svg>
            {/* svg 4  bottom */}
            <svg width="50%" viewBox="0 0 469 412" fill="none">
              <rect
                width="469"
                height="412"
                fill={agency?.float_cover_elements2}
              />
            </svg>
          </div>
          {/* svg 5 //////////////////// */}
          <div
            style={{
              width: "33.3%",
              // border: "2px solid blue",
            }}
          >
            <svg width="100%" viewBox="0 0 828 891" fill="none">
              <path
                d="M827.996 445.5C827.996 691.543 675.325 891 486.996 891C486.996 891 486.996 691.543 486.996 445.5C486.996 199.457 486.996 0 486.996 0C675.325 0 827.996 199.457 827.996 445.5Z"
                fill={agency?.float_cover_elements2}
              />
              <path
                d="M-0.00390196 625.227V479C273.475 479 479.996 479 479.996 479C479.996 726.962 273.475 891 -0.00390196 891C-0.00390196 891 -0.00390196 873.189 -0.00390196 625.227Z"
                fill={agency?.float_cover_elements3}
              />
              <rect
                x="-0.00390625"
                width="480"
                height="479"
                fill={agency?.float_cover_elements1}
              />
              <ellipse
                cx="249.177"
                cy="237.148"
                rx="118.239"
                ry="112.148"
                fill="white"
              />
            </svg>
          </div>
          {/* svg 6 //////////////////// */}
          <div
            style={{
              width: "33.3%",
              // border: "2px solid blue",
            }}
          >
            <svg
              style={
                {
                  // border: "2px solid yellow",
                }
              }
              width="50%"
              height="80%"
              viewBox="0 0 506 891"
              fill="none"
            >
              <rect
                x="-0.00390625"
                width="506"
                height="891"
                fill={agency?.float_cover_elements2}
              />
            </svg>
          </div>
          {/* svg float bottom */}
          <div
            style={{
              position: "absolute",
              bottom: "-18px",
              right: "12px",
              width: "60px",
            }}
          >
            <svg width="100%" viewBox="0 0 600 300" fill="none">
              <path
                d="M300 -1.31134e-05C465.685 -2.03558e-05 600 -2.62268e-05 600 -2.62268e-05C600 165.685 465.685 300 300 300C134.315 300 -5.87108e-06 165.685 -1.31134e-05 0C-1.31134e-05 0 134.315 -5.87108e-06 300 -1.31134e-05Z"
                fill={agency?.float_cover_elements1}
              />
              <path
                d="M300 -5.72619e-06C372.349 -8.88868e-06 431 -1.14524e-05 431 -1.14524e-05C431 72.3493 372.349 131 300 131C227.651 131 169 72.3493 169 0C169 0 227.651 -2.5637e-06 300 -5.72619e-06Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
