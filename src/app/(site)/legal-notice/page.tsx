import type { Metadata } from "next";
import { LegalPage } from "@/_components/layout/LegalPage";
import { legalNoticeTexts } from "@/lib/legal/legalNotice";

export const metadata: Metadata = {
  title: "Legal notice · Cat-phishing",
  description: "Who publishes and hosts Cat-phishing.",
};

export default function LegalNoticePage() {
  return <LegalPage {...legalNoticeTexts} />;
}
