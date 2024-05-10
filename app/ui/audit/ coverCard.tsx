/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { CldImage } from "next-cloudinary";

import { useEffect, useState } from "react";

export function CoverCard({ folderPath }: { folderPath: string }) {
  const [srcImage, setSrcImage] = useState<string | undefined>();
  const [serverImage, setServerImage] = useState<string | undefined>();
  const [loading, setIsLoading] = useState<boolean>(true);
  const [loadingUploadFile, setIsLoadingUploadFile] = useState<boolean>(false);

  useEffect(() => {
    async function fetchAuditImages() {
      const res = await fetch(
        `/api/getUploads?report=${folderPath}&type=cover`
      );
      const result = await res.json();
      // setServerImage(result);
      // setIsLoading(false);
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
    setIsLoadingUploadFile(true);
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e: ProgressEvent<FileReader>) => {
      const base64String = e.target?.result as string;
      const upLoadImage = await fetch(`/api/uploadCover?report=${folderPath}`, {
        method: "POST",
        body: JSON.stringify({ files: base64String }),
      });
      const result = await upLoadImage.json();
      console.log(result);
      setIsLoadingUploadFile(false);
      setSrcImage(result.uploadedImages.secure_url);
    };

    reader.readAsDataURL(file);
  };

  // return (
  //   <div className="flex gap-4">
  //     {srcImage.length > 0 &&
  //       srcImage.map((image) => (
  //         <div
  //           key={image}
  //           className="h-80 w-52 relative rounded-md border border-gray-200"
  //         >
  //           <CldImage
  //             width="240"
  //             height="320"
  //             src={image}
  //             sizes="100vw"
  //             alt="Description of my image"
  //             unoptimized
  //           />
  //         </div>
  //       ))}

  //     <div className="relative rounded-md">
  //       <div className="relative">
  //         <CldUploadButton
  //           uploadPreset="im5rh9qa"
  //           onSuccess={(result) =>
  //             setSrcImage((prev) => [...prev, result?.info?.secure_url])
  //           }
  //           options={{
  //             folder: `report-${folderPath}/cover`,
  //           }}
  //           className="w-52 h-80 rounded-md border border-gray-200 cursor-pointer  flex justify-center items-center"
  //         >
  //           Subir imagen
  //         </CldUploadButton>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="w-52 h-80">
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
                  htmlFor="cover-image-file"
                >
                  {loadingUploadFile ? (
                    <div className="flex flex-col gap-2 items-center">
                      <span className="loader"></span>
                      <div>Procesando imagen</div>
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
                        "Subir imagen"
                      )}
                    </div>
                  )}
                </label>
                <input
                  id="cover-image-file"
                  className="absolute top-0 hidden w-full"
                  type="file"
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
