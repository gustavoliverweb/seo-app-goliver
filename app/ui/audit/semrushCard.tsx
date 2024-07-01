/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { ramdomSecureId } from "@/app/lib/utils";
import { useEffect, useState } from "react";
import WrapperSortableSemrushImages from "./wrapperSortableSemrushImages";
import { SemrushImages } from "@/app/lib/definitions";

export function SemrushCard({
  folderPath,
  reportId,
}: {
  folderPath: string;
  reportId: string;
}) {
  const [srcImage, setSrcImage] = useState<SemrushImages[]>([]);
  const [serverImage, setServerImage] = useState<SemrushImages[]>([]);
  const [imagesObject, setImagesObject] = useState<SemrushImages[]>([]);
  const [loadingUploadFile, setIsLoadingUploadFile] = useState<boolean>(false);
  const whitespaceRemoved = folderPath.replace(/\s/g, "");

  useEffect(() => {
    async function fetchAuditImages() {
      const res = await fetch(`/api/getSemrushImages?reportId=${reportId}`);
      const result = await res.json();
      if (result.length > 0) {
        const imagesData: SemrushImages[] = result[0].semrush_images.urls;
        console.log(imagesData);
        const sortedImages = imagesData.sort((a, b) => a.position - b.position);
        setServerImage(sortedImages);
      }
    }
    fetchAuditImages();
  }, []);

  const onFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoadingUploadFile(true);
    const files = e.target.files;
    if (!files) return;
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const reader = new FileReader();
      const randomId = ramdomSecureId();
      reader.onload = async (e: ProgressEvent<FileReader>) => {
        const base64String = e.target?.result as string;
        const upLoadImage = await fetch(
          `/api/uploadSemrush?report=${whitespaceRemoved}`,
          {
            method: "POST",
            body: JSON.stringify({ files: base64String }),
          }
        );
        const result = await upLoadImage.json();
        const imageUrl = result.uploadedImages.secure_url;
        setIsLoadingUploadFile(false);
        const imageData = {
          id: randomId,
          name: file.name,
          url: imageUrl,
          position:
            imagesObject.length > 0
              ? imagesObject.length + index + 1
              : index + 1,
        };
        setImagesObject((prev) => [...prev, imageData]);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    if (imagesObject.length > 0) {
      const sortedImages = imagesObject.sort((a, b) => a.position - b.position);
      setSrcImage(sortedImages.map((image) => image));
    }
    if (imagesObject.length >= 4) {
      console.log(imagesObject);
      (async () => {
        await fetch(`/api/uploadSemrushToPostgres?reportId=${reportId}`, {
          method: "POST",
          body: JSON.stringify({ images: imagesObject }),
        });
      })();
    }
  }, [imagesObject]);

  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] grid-rows-[auto,_auto] gap-4">
      {loadingUploadFile && (
        <div className="border border-gray-200 rounded-md h-full justify-center flex flex-col gap-2 items-center">
          <span className="loader"></span>
          <div>Procesando imágenenes</div>
        </div>
      )}
      {serverImage.length > 0 ? (
        <WrapperSortableSemrushImages
          semrushImages={serverImage}
          reportId={reportId}
        />
      ) : (
        <WrapperSortableSemrushImages
          semrushImages={srcImage}
          reportId={reportId}
        />
      )}
      <div className="relative">
        <label
          className="w-52 h-80 rounded-md border border-gray-200 cursor-pointer  flex justify-center items-center"
          htmlFor="semrush-image-file"
        >
          Subir imagen
        </label>
        <input
          id="semrush-image-file"
          className="absolute top-0 hidden w-full"
          type="file"
          onChange={onFileSelected}
          multiple
        />
      </div>
    </div>
  );
}
