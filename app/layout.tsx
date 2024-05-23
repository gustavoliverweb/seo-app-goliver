import "@/app/ui/global.css";
import { Metadata, Viewport } from "next";
import LayoutClient from "./ui/layoutClient";

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
  return <LayoutClient children={children} />;
}
