import * as React from "react";
import {
  Html,
  Head,
  Container,
  Text,
  Section,
  Img,
  Font,
  Tailwind,
} from "@react-email/components";

interface EmailPdfTemplateProps {
  companyName: string;
}

export const EmailPdfTemplate: React.FC<Readonly<EmailPdfTemplateProps>> = ({
  companyName,
}) => (
  <Html>
    <Tailwind>
      <Head>
        <title>Auditoria SEO Generada</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Container
        style={{
          backgroundColor: "#F4F4F4",
          padding: "32px",
          minWidth: "800px",
        }}
      >
        <Img
          style={{
            margin: "0 auto",
            objectFit: "contain",
          }}
          src="https://res.cloudinary.com/dxjuhqvt6/image/upload/v1714841986/static-logos/Logo-Gustavo-Oliver-negro_yg1ekj.png"
          alt="Gustavo Oliver logo"
          width="100"
          height="50"
        />
      </Container>
      <Container
        style={{
          marginBottom: "24px",
          marginTop: "40px",
        }}
      >
        <Img
          style={{
            margin: "0 auto",
            objectFit: "contain",
          }}
          src="https://res.cloudinary.com/dxjuhqvt6/image/upload/v1714919029/static-logos/title-img_yb0yal.png"
          alt="title"
          width={284}
          height={48}
        />
      </Container>
      <Section
        style={{
          maxWidth: "800px",
        }}
      >
        <Text
          style={{
            fontSize: "16px",
          }}
          className="px-6 lg:px-24"
        >
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            ¡Hola!
          </span>{" "}
          La Auditoría SEO pendiente para el cliente {companyName}, ya ha sido
          finalizada y generada a través de nuestro sistema.
        </Text>
        <Text
          style={{
            fontSize: "16px",
          }}
          className="px-6 lg:px-24"
        >
          Adjunto encontrarás el PDF con los antes mencionado, por favor{" "}
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            descarga y envíala
          </span>{" "}
          cuanto antes a nuestro cliente potencial.
        </Text>
      </Section>
      <Container
        style={{
          backgroundColor: "#000",
          padding: "32px",
          marginTop: "40px",
          minWidth: "800px",
        }}
      >
        <Img
          style={{
            margin: "0 auto",
            objectFit: "contain",
          }}
          src="https://res.cloudinary.com/dxjuhqvt6/image/upload/v1714842018/static-logos/go-white_1_rcern6.png"
          alt="Gustavo Oliver logo"
          width="100"
          height="50"
        />
      </Container>
    </Tailwind>
  </Html>
);
