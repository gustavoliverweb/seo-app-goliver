"use client";
import { inter } from "@/app/ui/fonts";
import clsx from "clsx";
import { useStore } from "../lib/store";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDark, isShowModalDelete } = useStore();
  console.log(isShowModalDelete);
  return (
    <html lang="en">
      {/* <link rel="icon" href="/images/icon.png" sizes="any" /> */}
      <body
        className={clsx(`${inter.className} antialiased transition`, {
          "bg-[#F0F1F3]": !isDark,
          "bg-dark-dark-background": isDark,
        })}
      >
        <div
          className={clsx(
            "opacity-layer absolute top-0 w-full h-full z-40 opacity-60 bg-slate-700",
            {
              hidden: !isShowModalDelete,
            }
          )}
        ></div>
        {children}
      </body>
    </html>
  );
}
