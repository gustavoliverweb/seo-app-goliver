"use client";
import { inter } from "@/app/ui/fonts";
import clsx from "clsx";
import { useStore } from "../lib/store";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDark } = useStore();

  return (
    <html lang="en">
      {/* <link rel="icon" href="/images/icon.png" sizes="any" /> */}
      <body
        className={clsx(`${inter.className} antialiased transition`, {
          "bg-[#F0F1F3]": !isDark,
          "bg-dark-dark-background": isDark,
        })}
      >
        {children}
      </body>
    </html>
  );
}
