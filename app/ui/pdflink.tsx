import { PDFDownloadLink } from "@react-pdf/renderer";
import { MyDocument } from "./audit/createPdf";

export default function PdfLink({ data }) {
  return (
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
      {({ loading }) => (loading ? "Preparando descarga..." : "Descargar PDF")}
    </PDFDownloadLink>
  );
}
