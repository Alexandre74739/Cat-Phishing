import type { Metadata } from "next";
import { LegalPage } from "@/_components/layout/LegalPage";
import { privacyTexts } from "@/lib/legal/privacy";

export const metadata: Metadata = {
  title: "Privacy policy · Cat-phishing",
  description: "What data Cat-phishing keeps, why, and how to delete it.",
};

export default function PrivacyPage() {
  return <LegalPage {...privacyTexts} />;
}
