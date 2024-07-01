/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
// import font from "../../../public/fonts/font.ttf";
// import font from "next/font/local";
// const customFont = font({ src: "../../../public/fonts/font.ttf" });
import {
  Page,
  Text,
  View,
  Document,
  Image,
  Font,
  Svg,
  Path,
  Rect,
  Ellipse,
  Defs,
  ClipPath,
  G,
  Circle,
} from "@react-pdf/renderer";

Font.register({
  family: "Poppins",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/poppins/v1/hlvAxH6aIdOjWlLzgm0jqg.ttf",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/poppins/v1/-zOABrCWORC3lyDh-ajNnPesZW2xOQ-xsNqO47m55DA.ttf",
      fontWeight: 600,
    },
    {
      src: "https://fonts.gstatic.com/s/poppins/v1/8JitanEsk5aDh7mDYs-fYfesZW2xOQ-xsNqO47m55DA.ttf",
      fontWeight: 700,
    },
  ],
});

Font.register({
  family: "Inter",
  fonts: [
    {
      src: "https://res.cloudinary.com/dxjuhqvt6/raw/upload/v1714405256/fonts/Inter-Regular_lzmxp8.ttf",
    },
    {
      src: "https://res.cloudinary.com/dxjuhqvt6/raw/upload/v1714405112/fonts/Inter-SemiBold_jsmtbi.ttf",
      fontWeight: 600,
    },
    {
      src: "https://res.cloudinary.com/dxjuhqvt6/raw/upload/v1714405528/fonts/Inter-Bold_cexf7x.ttf",
      fontWeight: 700,
    },
  ],
});

Font.registerHyphenationCallback((word) => {
  // Return entire word as unique part
  return [word];
});

const Header = ({ children, report, textColor = "black" }) => {
  return (
    <View
      // debug
      style={{
        // border: "2px solid red",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "20px 40px",
        // marginBottom: "16px",
      }}
    >
      {children}
      <View
        style={{
          // border: "2px solid red",
          paddingTop: "8px",
        }}
      >
        <Text
          style={{
            // border: "2px solid black",
            fontSize: "14px",
            fontFamily: "Poppins",
            fontWeight: 600,
            color: textColor,
          }}
        >
          {report?.url_site?.toUpperCase()}
        </Text>
      </View>
    </View>
  );
};

const Logo = ({ report }) => {
  return (
    <View
      // debug
      style={{
        width: "130px",
        height: "50px",
        // border: "2px solid blue"
      }}
    >
      {report?.logo_url && (
        <Image
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
          src={report?.logo_url}
        />
      )}
    </View>
  );
};

const LogoOpacity = ({ report }) => {
  return (
    <View
      style={{
        width: "130px",
        height: "50px",
        // border: "2px solid blue"
      }}
    >
      {report?.opacity_logo_url && (
        <Image
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
          src={report?.opacity_logo_url}
        />
      )}
    </View>
  );
};

const SvgCover = ({ report }) => {
  return (
    <View
      style={
        {
          // border: "2px solid red",
        }
      }
    >
      <View
        // debug
        style={{
          // border: "2px solid green",
          display: "flex",
          flexDirection: "row",
          // gap: "4px",
          height: "110px",
          position: "relative",
          zIndex: 5,
        }}
      >
        {/* svg 1 float 1 //////////////////// */}
        <View
          style={{
            width: "33.3%",
            display: "flex",
            alignItems: "flex-end",
            marginRight: "3px",
            marginBottom: "2px",
          }}
        >
          <Svg
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
            <Path
              d="M472 290.931V451C203.079 451 0 451 0 451C0 179.565 203.079 0 472 0C472 0 472 19.4965 472 290.931Z"
              fill={report?.float_cover_elements1}
            />
          </Svg>
        </View>
        {/* svg 2 //////////////////// */}
        <View
          style={{
            width: "33.3%",
            position: "relative",
            zIndex: 5,
          }}
        >
          <Svg width="100%" viewBox="0 0 817 449" fill="none">
            {/* svg 2 float 2 //////////////////// */}
            <Rect
              width="817"
              height="449"
              fill={report?.float_cover_elements2}
            />
          </Svg>
        </View>
        {/* svg 3 //////////////////// */}
        <View
          style={{
            // border: "2px solid purple",
            width: "33.3%",
            position: "relative",
          }}
        >
          <Svg
            style={{
              position: "absolute",
              top: "-100%",
            }}
            width="60%"
            height="100%"
            viewBox="0 0 506 466"
            fill="none"
          >
            {/* svg 3 top float 2 */}
            <Path
              d="M505.996 300.607V466C217.703 466 -0.00390625 466 -0.00390625 466C-0.00390625 185.538 217.703 0 505.996 0C505.996 0 505.996 20.1449 505.996 300.607Z"
              fill={report?.float_cover_elements2}
            />
          </Svg>
          <Svg
            // debug
            style={{ marginTop: "2px" }}
            width="60%"
            height="100%"
            viewBox="0 0 506 449"
            fill="none"
          >
            {/* svg 3 bottom float 1 */}
            <Path
              d="M-0.00390625 159.359V0C288.289 0 505.996 0 505.996 0C505.996 270.231 288.289 449 -0.00390625 449C-0.00390625 449 -0.00390625 429.59 -0.00390625 159.359Z"
              fill={report?.float_cover_elements1}
            />
            <Ellipse
              cx="214.236"
              cy="186.148"
              rx="118.239"
              ry="112.148"
              fill="white"
            />
          </Svg>
        </View>
      </View>
      {/* bottom section */}
      <View
        style={{
          // border: "2px solid black",
          display: "flex",
          flexDirection: "row",
          height: "210px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* svg 4 float 3//////////////////// */}
        <View
          style={{
            // border: "2px solid blue",
            width: "33.3%",
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <Svg width="100%" viewBox="0 0 826 479" fill="none">
            <G clip-path="url(#clip0_254_181)">
              <Rect width="826" height="479" fill="white" />
              <Path
                d="M826 0H0V479H826V0Z"
                fill={report?.float_cover_elements3}
              />
              <Path
                d="M413 733C553.28 733 667 619.28 667 479C667 338.72 553.28 225 413 225C272.72 225 159 338.72 159 479C159 619.28 272.72 733 413 733Z"
                fill="white"
              />
              <Path
                d="M413 579C468.228 579 513 534.228 513 479C513 423.772 468.228 379 413 379C357.772 379 313 423.772 313 479C313 534.228 357.772 579 413 579Z"
                fill={report?.float_cover_elements3}
              />
            </G>
            <Defs>
              <ClipPath id="clip0_254_181">
                <Rect width="826" height="479" fill="white" />
              </ClipPath>
            </Defs>
          </Svg>
          {/* svg 4  bottom float 2*/}
          <Svg width="50%" viewBox="0 0 480 480" fill="none">
            <Rect
              width="480"
              height="480"
              fill={report?.float_cover_elements2}
            />
          </Svg>
        </View>
        {/* svg 5 //////////////////// */}
        <View
          // debug
          style={{
            width: "33.3%",
            // border: "2px solid blue",
          }}
        >
          <Svg width="100%" viewBox="0 0 910 891" fill="none">
            {/* svg 5 float 2//////////////////// */}
            <Path
              d="M910 445.5C910 691.543 720.616 891 487 891C487 891 487 691.543 487 445.5C487 199.457 487 0 487 0C720.616 0 910 199.457 910 445.5Z"
              fill={report?.float_cover_elements2}
            />
            {/* svg 5 float 3//////////////////// */}

            <Path
              d="M-0.00390625 625.227V479C273.475 479 479.996 479 479.996 479C479.996 726.962 273.475 891 -0.00390625 891C-0.00390625 891 -0.00390625 873.189 -0.00390625 625.227Z"
              fill={report?.float_cover_elements3}
            />
            {/* svg 5 float 1//////////////////// */}
            <Rect
              x="-0.00390625"
              width="480"
              height="479"
              fill={report?.float_cover_elements1}
            />
            <Ellipse
              cx="249.177"
              cy="237.148"
              rx="118.239"
              ry="112.148"
              fill="white"
            />
          </Svg>
        </View>
        {/* svg 6 float 2//////////////////// */}
        <View
          style={{
            width: "33.3%",
            // border: "2px solid red",
          }}
        >
          <Svg
            style={
              {
                // border: "2px solid yellow",
              }
            }
            width="60%"
            height="80%"
            viewBox="0 0 650 891"
            fill="none"
          >
            <Rect
              x="-0.00390625"
              width="650"
              height="891"
              fill={report?.float_cover_elements2}
            />
          </Svg>
        </View>
        {/* svg float bottom float 1 */}
        <View
          style={{
            // border: "2px solid red",
            position: "absolute",
            bottom: "-45px",
            right: "60px",
            width: "55px",
            transform: "rotate(-90deg)",
          }}
        >
          <Svg width="100%" viewBox="0 0 301 600" fill="none">
            <Path
              d="M300 300C300 465.685 300 600 300 600C134.315 600 0 465.685 0 300C0 134.315 134.315 0 300 0C300 0 300 134.315 300 300Z"
              fill={report?.float_cover_elements1}
            />
            <Path
              d="M301 300C301 372.349 301 431 301 431C228.098 431 169 372.349 169 300C169 227.651 228.098 169 301 169C301 169 301 227.651 301 300Z"
              fill="white"
            />
          </Svg>
        </View>
      </View>
    </View>
  );
};

const SemrushHeader = ({ report }) => {
  return (
    <View
      // debug
      style={{
        // border: "1px solid red",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0px 40px 0px 0px",
        // marginTop: "8px",
      }}
    >
      <Text
        style={{
          // border: "1px solid blue",
          color: report?.title_content_header,
          fontFamily: "Poppins",
          fontWeight: 700,
          fontSize: "32px",
          padding: "0px 40px 0px 40px",
          maxWidth: "60%",
          lineHeight: 1.1,
        }}
      >
        Análisis de competencia
      </Text>
      <View
        style={{
          // border: "2px solid black",
          height: "50px",
        }}
      >
        <Image
          style={{
            width: "180px",
            height: "100%",
            objectFit: "contain",
          }}
          src="https://res.cloudinary.com/dxjuhqvt6/image/upload/v1711496550/static-logos/semrush-logo_hhcgdj.png"
        />
      </View>
    </View>
  );
};

const BottomLogo = ({ report }) => {
  return (
    <View
      // debug
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        gap: "16px",
        justifyContent: "flex-end",
        // position: "absolute",
        // bottom: "20px",
        width: "100%",
      }}
    >
      <Image
        style={{
          width: "90px",
          height: "30px",
          objectFit: "contain",
        }}
        src="https://res.cloudinary.com/dxjuhqvt6/image/upload/v1711484941/static-logos/google-white-logo_b5nr3j.png"
      />
      {report?.yes_radio && (
        <Image
          style={{
            width: "90px",
            height: "30px",
            objectFit: "contain",
          }}
          src="https://res.cloudinary.com/dxjuhqvt6/image/upload/v1713642037/static-logos/kitdigital_white_1_wkql8s.png"
        />
      )}
    </View>
  );
};

export const MyDocument = ({ report }) => (
  <Document>
    <Page size="A4" style={{}}>
      <View style={{}}>
        <Header report={report}>
          <Logo report={report} />
        </Header>
        <View
          style={{
            marginTop: "16px",
          }}
        >
          <Text
            style={{
              color: report?.title_content_header,
              fontSize: "48px",
              fontFamily: "Poppins",
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: "60%",
              padding: "0px 40px 0px 40px",
            }}
          >
            Presencia en línea avanzada
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "32px",
              padding: "0px 40px 0px 40px",
            }}
          >
            <View
              style={{
                // border: "2px solid green",
                display: "flex",
                gap: "20px",
                flexDirection: "row",
                alignItems: "center",
                width: "250px",
                marginTop: "-32px",
              }}
            >
              <View
                // debug
                style={{
                  width: "80px",
                  height: "50px",
                }}
              >
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  src="https://res.cloudinary.com/dxjuhqvt6/image/upload/v1714327142/static-logos/google-logo-color2_f8dibc.png"
                />
              </View>
              <View
                style={{
                  width: "75px",
                  height: "30px",
                  // border: "2px solid blue",
                }}
              >
                {report?.yes_radio && (
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                    src="https://res.cloudinary.com/dxjuhqvt6/image/upload/v1713628040/static-logos/logo-kit-digital_iddlln.png"
                  />
                )}
              </View>
            </View>
            <Text
              style={{
                // border: "1px solid red",
                fontSize: "12px",
                fontFamily: "Inter",
                fontWeight: 400,
                maxWidth: "58%",
                textAlign: "right",
                lineHeight: 1.3,
              }}
            >
              Informe realizado para{" "}
              <Text style={{ fontWeight: 700 }}>{report?.name},</Text> para
              mejorar su posicionamiento orgánico en motores de búsqueda,
              Informe técnico, estudio de palabras claves y análisis de
              competencia, realizado por{" "}
              <Text style={{ fontWeight: 700 }}>{report?.select_template}</Text>
            </Text>
          </View>
        </View>
        <View
          style={{
            // border: "2px solid red",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            position: "relative",
            height: "60%",
          }}
        >
          <SvgCover report={report} />
          <View
            style={{
              // border: "2px solid blue",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: "70px",
              width: "100%",
            }}
          >
            {report?.cover && (
              <Image
                src={report?.cover}
                style={{
                  borderRadius: "50%",
                  position: "absolute",
                  top: "10px",
                  width: 200,
                  height: 200,
                  zIndex: 100,
                  objectFit: "cover",
                }}
              />
            )}
          </View>
          {/* svg//////////////////// */}
          {/* top section */}

          {/* end svg//////////////////// */}
        </View>
        {/* svg float right float 3*/}
        <View
          style={{
            // border: "2px solid green",
            position: "absolute",
            bottom: "160px",
            right: "25px",
            width: "65px",
            // transform: "rotate(90deg)",
          }}
        >
          <Svg width="100%" viewBox="0 0 301 600" fill="none">
            <Path
              d="M300 300C300 465.685 300 600 300 600C134.315 600 0 465.685 0 300C0 134.315 134.315 0 300 0C300 0 300 134.315 300 300Z"
              fill={report?.float_cover_elements3}
            />
            <Path
              d="M301 300C301 372.349 301 431 301 431C228.098 431 169 372.349 169 300C169 227.651 228.098 169 301 169C301 169 301 227.651 301 300Z"
              fill="white"
            />
          </Svg>
        </View>
      </View>
    </Page>
    {/* ///// */}
    <Page size="A4" style={{}}>
      <Header report={report}>
        <Logo report={report} />
      </Header>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "32px",
        }}
      >
        <Text
          style={{
            color: report?.title_content_header,
            fontFamily: "Poppins",
            fontWeight: 700,
            fontSize: "50px",
            padding: "0px 40px 0px 40px",
          }}
        >
          Introducción
        </Text>
        <View
          style={{
            backgroundColor: report?.background_content_pages,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            fontSize: "12px",
            marginTop: "32px",
            padding: "0px 40px 0px 40px",
            height: "100%",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              marginTop: "80px",
              color: "white",
              fontFamily: "Inter",
              fontWeight: 400,
            }}
          >
            <Text
              style={{
                lineHeight: 1.9,
              }}
            >
              En un mundo digital en constante evolución, la visibilidad en
              línea es un componente esencial para el éxito de cualquier
              organización. El presente informe, elaborado por el equipo de{" "}
              <Text style={{ fontWeight: 700 }}>
                {report?.select_template},
              </Text>{" "}
              se centra en un exhaustivo análisis de palabras clave y en la
              evaluación de la competencia en el ámbito digital, con el objetivo
              de proporcionar a{" "}
              <Text style={{ fontWeight: 700 }}>{report?.name}</Text> las bases
              necesarias para optimizar su estrategia de posicionamiento en
              línea.
            </Text>
            <Text
              style={{
                lineHeight: 1.9,
              }}
            >
              En un mundo cada vez más conectado, el posicionamiento orgánico en
              motores de búsqueda se ha convertido en un activo invaluable para
              las organizaciones. Este informe técnico tiene como objetivo
              brindar una visión detallada de la situación actual de{" "}
              <Text style={{ fontWeight: 700 }}>{report?.name}</Text> en cuanto
              a su presencia en línea y su visibilidad en los motores de
              búsqueda. A través del análisis de palabras clave, se
              identificarán oportunidades estratégicas para aumentar la
              visibilidad en los resultados de búsqueda, mejorando así su
              alcance y su impacto en la esfera digital.
            </Text>
            <Text
              style={{
                lineHeight: 1.9,
              }}
            >
              Además, este informe incluirá un minucioso estudio de la
              competencia en línea en el sector de tecnología y transformación
              digital, lo que permitirá a{" "}
              <Text style={{ fontWeight: 700 }}>{report?.name}</Text> conocer su
              posición relativa en el mercado y desarrollar estrategias
              efectivas para destacar entre sus competidores.
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: "10px",
              paddingBottom: "24px",
            }}
          >
            <BottomLogo report={report} />
          </View>
        </View>
      </View>
    </Page>
    {/* /////// */}
    <Page
      size="A4"
      style={{
        backgroundColor: report?.background_content_pages,
        position: "relative",
      }}
    >
      <Header report={report} textColor="white">
        <LogoOpacity report={report} />
      </Header>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flex: 1,
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins",
            fontWeight: 700,
            fontSize: "50px",
            color: "white",
          }}
        >
          Informe técnico
        </Text>
        <Image
          style={{
            // border: "2px solid black",
            width: "200px",
            height: "80px",
            marginTop: "-24px",
            objectFit: "contain",
          }}
          src="https://res.cloudinary.com/dxjuhqvt6/image/upload/v1711485080/static-logos/seoptimer-logo_y8z5ts.png"
        />
      </View>
      <View
        // debug
        style={{
          padding: "0px 40px 24px 0px",
          // border: "2px solid red",
        }}
      >
        <BottomLogo report={report} />
      </View>
    </Page>

    {/* tecnical images ******************************************/}
    {report?.tecnical?.length > 0 &&
      report?.tecnical?.map((image) => (
        <Page key={image} size="A4">
          <View style={{ width: "100%", height: "100%" }}>
            <Image
              src={image}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </View>
        </Page>
      ))}

    {/* /////// */}
    <Page
      size="A4"
      style={{
        backgroundColor: report?.background_content_pages,
        position: "relative",
      }}
    >
      <Header report={report} textColor="white">
        <LogoOpacity report={report} />
      </Header>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flex: 1,
        }}
      >
        <Text
          style={{
            // border: "1px solid red",
            color: "white",
            fontFamily: "Poppins",
            fontWeight: 700,
            fontSize: "50px",
            width: "55%",
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          Estudio de Keywords
        </Text>
        <Image
          style={{
            width: "200px",
            height: "80px",
            marginTop: "4px",
            objectFit: "contain",
          }}
          src="https://res.cloudinary.com/dxjuhqvt6/image/upload/v1711485083/static-logos/ubersuggest-logo_v3wclf.png"
        />
      </View>
      <View
        // debug
        style={{
          padding: "0px 40px 24px 0px",
          // border: "2px solid red",
        }}
      >
        <BottomLogo report={report} />
      </View>
    </Page>
    {/* keywords images ******************************************/}
    {report?.keywords?.length > 0 &&
      report?.keywords?.map((image) => (
        <Page size="A4" key={image}>
          <View
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Image
              src={image}
              // style={{
              //   width: "100%",
              //   height: "100%",
              // }}
            />
          </View>
        </Page>
      ))}
    {/* ///// */}
    <Page
      size="A4"
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <Header report={report}>
        <Logo report={report} />
      </Header>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <SemrushHeader report={report} />

        <View
          // debug
          style={{
            backgroundColor: report?.background_content_pages,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            fontSize: "12px",
            // marginTop: "32px",
            padding: "0px 40px 0px 40px",
            height: "100%",
          }}
        >
          <View
            // debug
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              // marginTop: "24px",
              paddingTop: "24px",
              color: "white",
              lineHeight: "1.5",
              fontSize: "12px",
              fontFamily: "Inter",
              fontWeight: 400,
            }}
          >
            <Text style={{ lineHeight: 1.9 }}>
              El presente informe tiene como objetivo analizar la competencia
              del sitio web{" "}
              <Text style={{ fontWeight: 700 }}>{report?.name}</Text> en el
              ámbito digital en comparación con otros dominios relevantes en el
              mercado. Mediante el uso de la herramienta Semrush, buscaremos
              obtener una visión detallada de la posición de{" "}
              <Text style={{ fontWeight: 700 }}>{report?.name}</Text> frente a
              sus competidores directos en términos de visibilidad en motores de
              búsqueda, ranking de dominios y posicionamiento de palabras clave.
              Este análisis nos permitirá identificar fortalezas, debilidades y
              oportunidades para mejorar la presencia en línea de nuestro
              cliente.
            </Text>
            <Text>
              Sección 1: Posiciones de los Dominios de la Competencia (Adjunto
              anexo)
            </Text>
            <Text style={{ fontWeight: 700 }}>
              Posiciones de los Dominios de la Competencia:
            </Text>

            <View
              style={{
                display: "flex",
                flexDirection: "column",
                // gap: "4px",
              }}
            >
              <Text style={{ lineHeight: 1.9 }}>
                El análisis de los dominios competidores revela que{" "}
                <Text style={{ fontWeight: 700 }}>{report?.name}</Text> se
                encuentra en una posición competitiva en el mercado digital. La
                visibilidad en motores de búsqueda es destacable, y el sitio ha
                logrado posicionarse en los primeros lugares de los resultados
                de búsqueda para varias palabras clave relevantes. Sin embargo,
                también hemos identificado dominios competidores que mantienen
                una presencia sólida y están compitiendo de cerca con nuestro
                cliente.
              </Text>
              <Text style={{ lineHeight: 1.9 }}>
                En términos de tráfico orgánico,{" "}
                <Text style={{ fontWeight: 700 }}>{report?.name}</Text> ha
                experimentado un crecimiento constante en los últimos meses, lo
                que demuestra una efectiva estrategia de optimización de motores
                de búsqueda (SEO). Aunque algunos competidores superan
                ligeramente el tráfico de nuestro cliente, es alentador ver cómo{" "}
                <Text style={{ fontWeight: 700 }}>{report?.name}</Text> se ha
                mantenido competitivo y ha ganado terreno en el mercado digital.
              </Text>
              <Text style={{ lineHeight: 1.9 }}>
                Es importante destacar que, si bien algunos competidores han
                logrado posiciones destacadas en ciertas áreas específicas,{" "}
                <Text style={{ fontWeight: 700 }}>{report?.name}</Text> ha
                obtenido una presencia general sólida y ha mantenido una
                posición competitiva en el mercado.
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              // marginTop: "10px",
              paddingBottom: "24px",
            }}
          >
            <BottomLogo report={report} />
          </View>
        </View>
      </View>
    </Page>
    {/* ///// */}
    <Page
      size="A4"
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <Header report={report}>
        <Logo report={report} />
      </Header>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <SemrushHeader report={report} />

        <View
          // debug
          style={{
            backgroundColor: report?.background_content_pages,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            fontSize: "12px",
            // marginTop: "32px",
            padding: "0px 40px 0px 40px",
            height: "100%",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              // marginTop: "16px",
              paddingTop: "24px",
              color: "white",
              lineHeight: "1.5",
              fontSize: "12px",
              fontFamily: "Inter",
              fontWeight: 400,
            }}
          >
            <Text>
              Sección 2: Posiciones de Palabras Clave Rankeadas (Adjunto anexo)
            </Text>
            <Text style={{ fontWeight: 700 }}>
              Posiciones de Palabras Clave Rankeadas:
            </Text>
            <Text style={{ lineHeight: 1.9 }}>
              El análisis de las palabras clave rankeadas para{" "}
              <Text style={{ fontWeight: 700 }}>{report?.name}</Text> nos brinda
              información valiosa sobre el posicionamiento del sitio en los
              motores de búsqueda. Se ha observado que nuestro cliente ha
              logrado rankear en los primeros lugares para varias palabras clave
              fundamentales dentro de su industria.
            </Text>
            <Text style={{ lineHeight: 1.9 }}>
              Esto indica que la estrategia de SEO implementada ha sido efectiva
              en la optimización del contenido y la relevancia del sitio para
              ciertas búsquedas clave. Además, se han identificado oportunidades
              para mejorar aún más la posición de{" "}
              <Text style={{ fontWeight: 700 }}>{report?.name}</Text> en ciertas
              palabras clave donde algunos competidores directos actualmente
              tienen una ventaja.
            </Text>
            <Text style={{ lineHeight: 1.9 }}>
              El análisis también ha revelado palabras clave emergentes con un
              alto potencial de tráfico. Al enfocarse en optimizar el contenido
              y las estrategias de SEO para estas palabras clave,{" "}
              <Text style={{ fontWeight: 700 }}>{report?.name}</Text> podría
              aumentar su visibilidad y atraer a una audiencia más amplia y
              relevante.
            </Text>
            <Text style={{ lineHeight: 1.9 }}>
              En conclusión, el análisis de las posiciones de los dominios de la
              competencia y las palabras clave rankeadas muestra que{" "}
              <Text style={{ fontWeight: 700 }}>{report?.name}</Text> ha logrado
              una posición competitiva en el mercado digital. Sin embargo,
              existen oportunidades para mejorar y fortalecer aún más su
              presencia en línea mediante una estrategia enfocada en el SEO y la
              optimización de palabras clave. Con una visión clara de su
              competencia y una estrategia de mejora continua,{" "}
              <Text style={{ fontWeight: 700 }}>{report?.name}</Text> puede
              seguir creciendo y destacando en su industria en el ámbito
              digital.
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: "10px",
              paddingBottom: "24px",
            }}
          >
            <BottomLogo report={report} />
          </View>
        </View>
      </View>
    </Page>
    {/* semrush images */}
    <Page
      size="A4"
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <Header report={report}>
        <Logo report={report} />
      </Header>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <SemrushHeader report={report} />

        <View
          style={{
            backgroundColor: report?.background_content_pages,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            fontSize: "16px",
            // marginTop: "32px",
            padding: "0px 40px 0px 40px",
            height: "100%",
          }}
        >
          <View
            style={{
              marginTop: "24px",
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: "14px",
                  color: "white",
                }}
              >
                Anexo 1:
              </Text>
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {report?.semrush_images.urls.length > 0 && (
                  <Image
                    src={report?.semrush_images.urls[0].url}
                    style={{
                      width: "400px",
                      height: "200px",
                      marginTop: "16px",
                    }}
                  />
                )}
              </View>
            </View>
            <View
              style={{
                marginTop: "16px",
              }}
            >
              <Text
                style={{
                  fontSize: "14px",
                  color: "white",
                }}
              >
                Anexo 2:
              </Text>
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {report?.semrush_images.urls.length > 0 && (
                  <Image
                    src={report?.semrush_images.urls[1].url}
                    style={{
                      width: "400px",
                      height: "200px",
                      marginTop: "16px",
                    }}
                  />
                )}
              </View>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: "10px",
              paddingBottom: "24px",
            }}
          >
            <BottomLogo report={report} />
          </View>
        </View>
      </View>
    </Page>

    <Page
      size="A4"
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <Header report={report}>
        <Logo report={report} />
      </Header>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <SemrushHeader report={report} />

        <View
          style={{
            backgroundColor: report?.background_content_pages,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            fontSize: "16px",
            // marginTop: "32px",
            padding: "0px 40px 0px 40px",
            height: "100%",
          }}
        >
          <View
            style={{
              marginTop: "24px",
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: "14px",
                  color: "white",
                }}
              >
                Anexo 3:
              </Text>
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {report?.semrush_images.urls.length > 0 && (
                  <Image
                    src={report?.semrush_images.urls[2].url}
                    style={{
                      width: "400px",
                      height: "200px",
                      marginTop: "16px",
                    }}
                  />
                )}
              </View>
            </View>
            <View
              style={{
                marginTop: "16px",
              }}
            >
              <Text
                style={{
                  fontSize: "14px",
                  color: "white",
                }}
              >
                Anexo 4:
              </Text>
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {report?.semrush_images.urls.length > 0 && (
                  <Image
                    src={report?.semrush_images.urls[3].url}
                    style={{
                      width: "400px",
                      height: "200px",
                      marginTop: "16px",
                    }}
                  />
                )}
              </View>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: "10px",
              paddingBottom: "24px",
            }}
          >
            <BottomLogo report={report} />
          </View>
        </View>
      </View>
    </Page>

    {/* /////// */}
    <Page
      size="A4"
      style={{
        backgroundColor: report?.back_cover_background,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header report={report} textColor="white">
        <LogoOpacity report={report} />
      </Header>

      <View
        // debug
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flex: 1,
        }}
      >
        <View
          style={{
            // border: "2px solid red",
            width: "200px",
            height: "150px",
            position: "absolute",
            top: "100px",
            right: 0,
          }}
        >
          <View>
            <Svg width="100%" viewBox="0 0 817 449" fill="none">
              {/* float back cover 1 */}
              <Rect
                width="817"
                height="449"
                fill={report?.floating_back_cover_elements1}
              />
            </Svg>
          </View>
          <View
            style={{
              position: "absolute",
              left: "40%",
              bottom: "-25%",
            }}
          >
            <Svg width="100%" viewBox="0 0 764 382" fill="none">
              {/* float back cover 2 */}

              <Path
                d="M3.33955e-05 382C3.77811e-05 331.835 9.88076 282.161 29.0781 235.815C48.2754 189.468 76.4133 147.357 111.885 111.885C147.357 76.4132 189.469 48.2753 235.815 29.078C282.161 9.88068 331.835 -3.99738e-05 382 -3.33955e-05C432.165 -2.68172e-05 481.839 9.8807 528.185 29.078C574.532 48.2753 616.643 76.4132 652.115 111.885C687.587 147.357 715.725 189.469 734.922 235.815C754.119 282.161 764 331.835 764 382L382 382L3.33955e-05 382Z"
                fill={report?.floating_back_cover_elements2}
              />
            </Svg>
          </View>
        </View>

        <View
          // debug
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            lineHeight: 1.1,
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Poppins",
              fontWeight: 700,
              fontSize: "50px",
            }}
          >
            ¡Muchas
          </Text>
          <Text
            style={{
              color: "white",
              fontFamily: "Poppins",
              fontWeight: 700,
              fontSize: "50px",
              paddingLeft: "12px",
            }}
          >
            gracias!
          </Text>
        </View>
        <View
          style={{
            // border: "2px solid yellow",
            width: "200px",
            height: "200px",
            position: "absolute",
            bottom: "120px",
            left: "-95px",
          }}
        >
          <View
            style={{
              // border: "1px solid red",
              position: "absolute",
              left: "5%",
              top: "80%",
            }}
          >
            <Svg width="100%" viewBox="0 0 817 449" fill="none">
              <Rect
                width="817"
                height="449"
                fill={report?.floating_back_cover_elements1}
              />
            </Svg>
          </View>
          {/* //////*/}
          <View>
            <Svg width="100%" viewBox="0 0 764 764" fill="none">
              <Circle
                cx="382"
                cy="382"
                r="382"
                fill={report?.floating_back_cover_elements2}
              />
            </Svg>
          </View>
        </View>
      </View>
      <View
        // debug
        style={{
          padding: "0px 40px 24px 0px",
          // border: "2px solid red",
        }}
      >
        <BottomLogo report={report} />
      </View>
    </Page>
  </Document>
);
