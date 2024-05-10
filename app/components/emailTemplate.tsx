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
  companyName: string;
  companyUrl: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  companyName,
  companyUrl,
}) => (
  <Html>
    <Tailwind>
      <Head>
        <title>Nueva Solicitud SEO</title>
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
          src="https://res.cloudinary.com/dxjuhqvt6/image/upload/v1714919494/static-logos/title2-img_ijtx1n.png"
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
            ¡Hola SEO Manager!
          </span>{" "}
          La agencia tiene una nueva solicitud SEO. Por favor completa los
          requerimientos para poder generar la Auditoría SEO de este cliente
          potencial.
        </Text>
        <Section>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: "16px",
            }}
            className="px-6 lg:px-24"
          >
            Los requerimientos necesarios son:
          </Text>
          <Text
            style={{
              fontSize: "16px",
            }}
            className="px-6 lg:px-24"
          >
            1. Imagen de portada
          </Text>
          <Text
            style={{
              fontSize: "16px",
            }}
            className="px-6 lg:px-24"
          >
            2. Cronograma de contenidos para 1 año de Blog (PDF)
          </Text>
          <Text
            style={{
              fontSize: "16px",
            }}
            className="px-6 lg:px-24"
          >
            3. Estudio de competencia con Semrush (Imagenes)
          </Text>
        </Section>
        <Section>
          <Text
            style={{
              fontSize: "16px",
            }}
            className="px-6 lg:px-24"
          >
            Para poder generar esta necesidad, te compartimos{" "}
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              los datos del negocio:
            </span>
          </Text>
          <Text
            style={{
              fontSize: "16px",
            }}
            className="px-6 lg:px-24"
          >
            1. Nombre de la empresa: {companyName}
          </Text>
          <Text
            style={{
              fontSize: "16px",
            }}
            className="px-6 lg:px-24"
          >
            2. URL de la empresa:{" "}
            <Link href={`https://${companyUrl}`}>{companyUrl}</Link>
          </Text>
        </Section>
        <Text
          style={{
            fontSize: "16px",
          }}
          className="px-6 lg:px-24"
        >
          Te recomendamos analizar el sitio, su contenido, servicios, productos
          y localidad, para poder generar un cronograma de contenidos acertado.
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
          href="https://go-seo-app.vercel.app/dashboard/reports"
        >
          CUMPLIR REQUERIMIENTOS
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
