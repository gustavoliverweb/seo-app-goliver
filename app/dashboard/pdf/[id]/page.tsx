/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
"use client";
import { CloudinaryData, ReportObject } from "@/app/lib/definitions";
import { MyDocument } from "@/app/ui/audit/createPdf";
import { Button } from "@/app/ui/button";
import ErrorModal from "@/app/ui/errorModal";
import SuccessModal from "@/app/ui/successModal";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import { useEffect, useState } from "react";

const initialState = {
  id: "",
  name: "",
  logo_url: "",
  logo_opacity_url: "",
  back_cover_background: "",
  background_content_pages: "",
  float_cover_elements1: "",
  float_cover_elements2: "",
  float_cover_elements3: "",
  floating_back_cover_elements1: "",
  floating_back_cover_elements2: "",
  agency_id: "",
  select_template: "",
  url_site: "",
  yes_radio: false,
  no_radio: false,
  cover: "",
  tecnical: [],
  keywords: [],
  semrush: [],
};

export default function Page({ params }: { params: { id: string } }) {
  const [report, setReport] = useState<ReportObject>(initialState);
  const [data, setData] = useState<ReportObject>();
  const [isLoading, setIsloading] = useState(true);
  const [content, setContent] = useState("");
  const [loadingSendMail, setLoadingSendMail] = useState<boolean>(false);
  const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);
  const [showModalError, setShowModalError] = useState<boolean>(false);

  useEffect(() => {
    const getReports = async () => {
      const resReport = await fetch(`/api/getReportId?report-id=${params.id}`);
      const resultReport = await resReport.json();
      console.log(resultReport);
      setReport(resultReport);
    };
    getReports();
  }, []);

  useEffect(() => {
    const getImages = async () => {
      const reportData = {
        ...report,
        cover: "",
        tecnical: [] as string[],
        keywords: [] as string[],
        semrush: [] as string[],
      };
      const reportName = report?.name?.trim().replace(" ", "");
      const whitespaceRemoved = report?.name?.replace(/\s/g, "");
      const agencyName = report?.select_template?.trim().replace(" ", "");
      console.log(reportName);
      const resLogosImages = await fetch(
        `/api/getLogoImages?agency=${agencyName}`
      );
      const resReportsImages = await fetch(
        `/api/getAllImages?report=${whitespaceRemoved}`
      );
      const allImages = Promise.all([resLogosImages, resReportsImages]);
      const result = await allImages;
      if (result[0].ok) {
        const wordToSearch = {
          cover: "cover",
          tecnical: "tecnical",
          keywords: "keywords",
          semrush: "semrush",
        };
        const reportImages: CloudinaryData = await result[1].json();
        console.log(reportImages);
        const replaceImageFormat = (image: string) => {
          return image.replace(/\.(png|jpeg|jpg|gif)/i, ".png");
        };
        if (!reportImages.resources) return;
        reportImages.resources.map((image) => {
          if (image.folder.includes(wordToSearch.cover)) {
            reportData.cover = replaceImageFormat(image.secure_url);
          }
          if (image.folder.includes(wordToSearch.tecnical)) {
            reportData.tecnical.unshift(replaceImageFormat(image.secure_url));
          }
          if (image.folder.includes(wordToSearch.keywords)) {
            reportData.keywords.unshift(replaceImageFormat(image.secure_url));
          }
          if (image.folder.includes(wordToSearch.semrush)) {
            reportData.semrush.push(replaceImageFormat(image.secure_url));
          }
        });
      }
      if (reportData?.id) {
        console.log(reportData);
        setData(reportData);
      }
      // setIsloading(false);
      // console.count("data");
    };
    getImages();
  }, [report]);

  useEffect(() => {
    if (data) {
      if (Object.keys(data).length > 0) {
        console.log("data", data);
        setIsloading(false);
      }
    }
  }, [data]);

  useEffect(() => {
    const toBlob = async () => {
      if (!isLoading) {
        const blob = await pdf(<MyDocument report={data} />).toBlob();
        const file = new File([blob], `${data?.select_template}-report.pdf`);
        const reader = new FileReader();
        reader.onload = async (r) => {
          setContent(r.target.result.toString());
        };
        reader.readAsDataURL(file);
      }
    };
    toBlob();
  }, [isLoading]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingSendMail(true);
    if (!isLoading) {
      const formData = new FormData(e.target);
      const base64Content = content.split(",")[1];
      const dataToSend = {
        content: base64Content,
        email: formData.get("email"),
        subject: formData.get("subject-pdf"),
        fileName: `Auditoría SEO - ${data?.name}.pdf`,
        companyName: data?.name,
      };
      const sendPdfMail = await fetch("/api/sendPdfMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      if (sendPdfMail.ok) {
        setShowModalSuccess(true);
        setTimeout(() => {
          setShowModalSuccess(false);
        }, 2000);
      } else {
        setShowModalError(true);
        setTimeout(() => {
          setShowModalError(false);
        }, 2000);
      }
      setLoadingSendMail(false);
    }
  };
  return (
    <div className="render-pdf m-6 relative">
      <SuccessModal showModal={showModalSuccess}>
        <div>
          <div className="text-[24px] text-errors-success-dark font-medium">
            Éxito
          </div>
          <div className="text-errors-success-dark text-[18px]">
            El correo se envío correctamente
          </div>
        </div>
      </SuccessModal>
      <ErrorModal showModal={showModalError} top="top-1/2">
        <div>
          <div className="text-[24px] text-errors-error-dark font-medium">
            Error
          </div>
          <div className="text-errors-error-dark text-[18px]">
            Hubo un error al enviar el correo
          </div>
        </div>
      </ErrorModal>
      {isLoading ? (
        <div className="rounded-2xl bg-white w-full h-full flex flex-col justify-center items-center animate-[wiggle_1s_ease-in-out_infinite]">
          <span className="loader"></span>
          Generando PDF
        </div>
      ) : (
        <div className="rounded-2xl bg-white w-full h-full flex flex-col justify-center items-center animate-[wiggle_1s_ease-in-out_infinite]">
          <PDFDownloadLink
            document={<MyDocument report={data} />}
            fileName={`${data?.select_template}-report.pdf`}
            style={{
              color: "white",
              padding: "10px",
              borderRadius: "5px",
            }}
            className="bg-primary-button-500 hover:bg-secondary-green-500"
          >
            {({ loading }) =>
              loading ? "Preparando descarga..." : "Descargar PDF"
            }
          </PDFDownloadLink>
          <form onSubmit={handleSubmit} className="w-full max-w-[600px] mt-6">
            <div className="w-full rounded-md  p-4 md:p-6">
              <div className="mt-6 mb-4">
                <label
                  htmlFor="email"
                  className="mb-2 block text-[1.125rem] font-medium"
                >
                  Correo
                </label>
                <div className="relative mt-2 rounded-md">
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="text"
                      placeholder="Introduce un correo"
                      className="block w-full rounded-md border border-gray-200 px-4 py-2 text-sm outline-2 placeholder:text-opacity-500"
                      aria-describedby="email-error"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 mb-4">
                <label
                  htmlFor="subject-pdf"
                  className="mb-2 block text-[1.125rem] font-medium"
                >
                  Asunto
                </label>
                <div className="relative mt-2 rounded-md">
                  <div className="relative">
                    <textarea
                      id="subject-pdf"
                      name="subject-pdf"
                      value={`Auditoría SEO generada - ${data?.name}`}
                      className="block w-full  rounded-md border border-gray-200 px-4 py-2 text-sm outline-2"
                      aria-describedby="report-area-error"
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex  gap-4">
                <Button
                  type="submit"
                  className="bg-primary-button-500 w-full justify-center px-8 py-6 text-[1.125rem]"
                  // formAction={sendMail}
                >
                  {loadingSendMail ? (
                    <div className="loader-send-mail"></div>
                  ) : (
                    "Enviar auditoría SEO"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
