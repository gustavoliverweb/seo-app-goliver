import * as React from "react";
import {
  Html,
  Head,
  Container,
  Text,
  Section,
  Link,
  Img,
  Font,
  Tailwind,
} from "@react-email/components";

interface EmailTemplateProps {
  url: string;
}

export const EmailRecoverPasswordTemplate: React.FC<
  Readonly<EmailTemplateProps>
> = ({ url }) => (
  <Html>
    <Tailwind>
      <Head>
        <title>Recuperación de contraseña</title>
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
        <Text
          style={{
            fontSize: "24px",
            textAlign: "center",
          }}
        >
          Recuperación de contraseña
        </Text>
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
          Recientemente solicitaste una recuperación de contraseña. Usa el
          siguiente link para establecer una nueva contraseña.{" "}
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            Este enlace solo será válido por 1 hora.
          </span>
        </Text>
      </Section>

      <Container
        style={{
          marginBottom: "40px",
          marginTop: "40px",
          maxWidth: "300px",
        }}
      >
        <Link
          style={{
            border: "6px solid #4CD88A",
            borderRadius: "16px",
            color: "#4CD88A",
            fontWeight: "bold",
            padding: "16px",
            fontSize: "18px",
            margin: "0 auto",
            display: "block",
            // width: "250px",
            textAlign: "center",
          }}
          href={url}
        >
          Reestablece tu contraseña
        </Link>
      </Container>
      <Container
        style={{
          backgroundColor: "#000",
          padding: "32px",
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
