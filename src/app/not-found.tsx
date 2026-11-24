import type { Metadata } from "next";
import { Footer } from "@/_components/layout/Footer";
import { Header } from "@/_components/layout/Header";
import { lostTexts } from "@/lib/lostTexts";
import { footerTexts, headerTexts } from "@/lib/siteChrome";
import { LostScene } from "./_components/LostScene";

export const metadata: Metadata = {
  title: "Page not found · Cat-phishing",
};

export default function NotFound() {
  return (
    <>
      <Header {...headerTexts} />
      <LostScene texts={lostTexts} />
      <Footer {...footerTexts} />
    </>
  );
}
