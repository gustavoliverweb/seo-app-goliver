/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { CldImage } from "next-cloudinary";

import { useEffect, useState } from "react";
import ErrorModal from "../errorModal";

export function AuditCard({ folderPath }: { folderPath: string }) {
  const [srcImage, setSrcImage] = useState<string | undefined>();
  const [serverImage, setServerImage] = useState<string | undefined>();
  const [loading, setIsLoading] = useState<boolean>(true);
  const [loadingUploadFile, setIsLoadingUploadFile] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const whitespaceRemoved = folderPath.replace(/\s/g, "");
  useEffect(() => {
    async function fetchAuditImages() {
      const res = await fetch(
        `/api/getUploads?report=${whitespaceRemoved}&type=tecnical`
      );
      const result = await res.json();
      if (result?.resources.length > 0) {
        setServerImage(result?.resources[0].secure_url);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }
    fetchAuditImages();
  }, []);

  const onFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);

    setIsLoadingUploadFile(true);
    const fileList = e.target.files;
    // console.log(fileList);
    if (fileList) {
      if (fileList?.length > 0) {
        const file = fileList[0];
        const formData = new FormData();
        formData.append("file", file);
        const sendFileToConvert = await fetch(
          `/api/convertPdfToImageTecnical?agency=${whitespaceRemoved}/tecnical`,
          {
            method: "POST",
            body: formData,
          }
        );
        const result = await sendFileToConvert.json();
        // console.log(result);
        // console.log(sendFileToConvert);
        // console.log(result);
        if (result.message === "error") {
          // alert(result.message);
          setTimeout(async () => {
            const deleteAsset = await fetch(
              `/api/deleteCloudAssets?report=${folderPath}&type=tecnical`,
              {
                method: "POST",
              }
            );
            console.log(deleteAsset);
          }, 1000);
          setShowModal(true);
          setTimeout(() => {
            setShowModal(false);
          }, 2000);
          setIsLoadingUploadFile(false);
          e.target.value = "";
          return;
        } else {
          console.log(result);
          setIsLoadingUploadFile(false);
          setSrcImage(result.result);
        }
      }
    }
  };
  useEffect(() => {
    console.log(loadingUploadFile);
  }, [loadingUploadFile]);

  return (
    <div className="w-52 h-80">
      <ErrorModal showModal={showModal}>
        <div>
          <div className="text-[24px] text-errors-error-dark font-medium">
            Error
          </div>
          <div className="text-errors-error-dark text-[18px]">
            Hubo un error al procesar el archivo
          </div>
        </div>
      </ErrorModal>
      <div className="relative rounded-md h-full border border-gray-200">
        {loading ? (
          <div className="w-full h-80 rounded-md border border-gray-200 cursor-pointer  flex justify-center items-center">
            <span className="loader"></span>
          </div>
        ) : (
          <>
            {serverImage ? (
              <CldImage
                className="h-full object-contain"
                width="240"
                height="320"
                src={serverImage}
                sizes="100vw"
                alt="Description of my image"
              />
            ) : (
              <div className="relative">
                <label
                  className="w-full h-80 rounded-md border border-gray-200 cursor-pointer  flex justify-center items-center"
                  htmlFor="pdf-file-tecnical"
                >
                  {loadingUploadFile ? (
                    <div className="flex flex-col gap-2 items-center">
                      <span className="loader"></span>
                      <div>Procesando archivo PDF</div>
                    </div>
                  ) : (
                    <div>
                      {srcImage ? (
                        <CldImage
                          width="240"
                          height="320"
                          src={srcImage}
                          sizes="100vw"
                          alt="Description of my image"
                        />
                      ) : (
                        "Subir archivo PDF"
                      )}
                    </div>
                  )}
                </label>
                <input
                  id="pdf-file-tecnical"
                  className="absolute top-0 hidden w-full"
                  type="file"
                  accept=".pdf"
                  onChange={onFileSelected}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
