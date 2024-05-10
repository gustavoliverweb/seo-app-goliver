import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: {
    template: "%s | Gustavoliver - SEO App",
    default: "Gustavoliver - SEO App",
  },
  icons: {
    icon: "/images/icon.png",
  },

  description: "SEO App.",
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <link rel="icon" href="/images/icon.png" sizes="any" /> */}
      <body className={`${inter.className} antialiased bg-[#F0F1F3]`}>
        {children}
      </body>
    </html>
  );
}
