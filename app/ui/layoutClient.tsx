"use client";
import { inter } from "@/app/ui/fonts";
import clsx from "clsx";
import { useStore } from "../lib/store";
import { NextUIProvider } from "@nextui-org/react";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDark, isShowModalDelete } = useStore();
  return (
    <html lang="en">
      {/* <link rel="icon" href="/images/icon.png" sizes="any" /> */}
      <body
        className={clsx(`${inter.className} antialiased transition`, {
          "bg-[#F0F1F3]": !isDark,
          "bg-dark-dark-background": isDark,
        })}
      >
        <NextUIProvider>
          <div
            className={clsx(
              "opacity-layer absolute top-0 w-full h-full z-40 opacity-60 bg-slate-700",
              {
                hidden: !isShowModalDelete,
              }
            )}
          ></div>
          {children}
        </NextUIProvider>
      </body>
    </html>
  );
}
