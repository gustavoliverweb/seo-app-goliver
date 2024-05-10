/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
"use client";
import { CldImage } from "next-cloudinary";
import { useEffect, useState } from "react";

export function SemrushCard({ folderPath }) {
  const [srcImage, setSrcImage] = useState<string[]>([]);
  const [serverImage, setServerImage] = useState<string[]>([]);
  // const [loading, setIsLoading] = useState<boolean>(false);
  const [loadingUploadFile, setIsLoadingUploadFile] = useState<boolean>(false);
  // const [loadingArray, setLoadingArray] = useState([]);

  useEffect(() => {
    async function fetchAuditImages() {
      const res = await fetch(
        `/api/getUploads?report=${folderPath}&type=semrush`
      );
      const result = await res.json();
      console.log(result);
      // setServerImage(result);
      if (result?.resources.length > 0) {
        setServerImage(result?.resources);
        // result?.resources.map((image) =>
        //   setSrcImage((prev) => [...prev, image.secure_url])
        // );
        // setSrcImage(result?.resources);

        // setIsLoading(false);
      } else {
        // setIsLoading(false);
      }
    }
    fetchAuditImages();
  }, []);

  const onFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoadingUploadFile(true);
    const files = e.target.files;
    const array = Array.from(files);
    console.log(array);
    // if (!file) return;
    // setLoadingArray(array);
    console.log(files.length);
    for (const file of e.target.files) {
      const reader = new FileReader();
      // console.log(reader);
      reader.onload = async (e: ProgressEvent<FileReader>) => {
        const base64String = e.target?.result as string;
        // console.log(e);
        // formData.append("files", file);
        // console.log(base64String);
        const upLoadImage = await fetch(
          `/api/uploadSemrush?report=${folderPath}`,
          {
            method: "POST",
            body: JSON.stringify({ files: base64String }),
          }
        );
        const result = await upLoadImage.json();
        // console.log(result.uploadedImages);
        const imageUrl = result.uploadedImages.secure_url;
        console.log(imageUrl);
        // setIsLoadingUploadFile(false);
        setIsLoadingUploadFile(false);
        setSrcImage((prev) => [...prev, imageUrl]);
      };
      // setTimeout(() => setIsLoadingUploadFile(false), 2000);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] grid-rows-[auto,_auto] gap-4">
      {loadingUploadFile && (
        <div className="border border-gray-200 rounded-md h-full justify-center flex flex-col gap-2 items-center">
          <span className="loader"></span>
          <div>Procesando imágenenes</div>
        </div>
      )}
      {serverImage.length > 0
        ? serverImage.map((image) => (
            <div
              key={image.secure_url}
              className="relative rounded-md h-full border border-gray-200 flex"
            >
              <CldImage
                className="h-full object-contain"
                width="240"
                height="320"
                src={image.secure_url}
                sizes="100vw"
                alt="Description of my image"
              />
            </div>
          ))
        : srcImage.map((image) => (
            <div
              key={image}
              className="relative rounded-md h-full border border-gray-200 flex"
            >
              <CldImage
                className="h-full object-contain"
                width="240"
                height="320"
                src={image}
                sizes="100vw"
                alt="Description of my image"
              />
            </div>
          ))}
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
