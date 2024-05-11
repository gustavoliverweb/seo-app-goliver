/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import Canvas from "canvas";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

async function convertPdfToImages(pdf: PDFDocumentProxy, index: number) {
  const page = await pdf.getPage(index);
  // console.log("page", page);
  const viewport = page.getViewport({ scale: 2.0 });
  const canvas = Canvas.createCanvas(viewport.width, viewport.height);
  const context = canvas.getContext("2d");
  await page.render({ canvasContext: context, viewport }).promise;
  const image = canvas.toDataURL();
  const base64Data = image.split(",")[1];
  return base64Data;
}

export async function POST(request: NextRequest) {
  await import("pdfjs-dist/build/pdf.worker.min.mjs");
  const reportName = request.nextUrl.searchParams.get("agency");
  const formData = await request.formData();
  const file = formData.get("file");
  const buffer = await file.arrayBuffer();

  const uint8Array = new Uint8Array(buffer);
  const loadingTask = getDocument(uint8Array);

  try {
    console.log("init tecnical");
    const pdfDocument = await loadingTask.promise;
    const pages = pdfDocument.numPages;
    const arrayOfBase64Images = [];
    for (let index = 1; index <= pages; index++) {
      const images = await convertPdfToImages(pdfDocument, index);
      arrayOfBase64Images.push({ [index]: images });
    }
    console.log(arrayOfBase64Images);
    console.log("mid tecnical");

    const imagesToUpload = arrayOfBase64Images.map(async (image, i) => {
      return await cloudinary.uploader.upload(
        `data:image/png;base64,${image}`,
        {
          folder: `report-${reportName}`,
          resource_type: "image",
        }
      );
    });
    const uploadImages = await Promise.all(imagesToUpload);
    console.log("finish");
    // console.log(uploadImages);
    return NextResponse.json({ message: "success", result: uploadImages[0] });
    // return NextResponse.json({ message: "success" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error", result: error });
  }
}
