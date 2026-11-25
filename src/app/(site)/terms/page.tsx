import type { Metadata } from "next";
import { LegalPage } from "@/_components/layout/LegalPage";
import { termsTexts } from "@/lib/legal/terms";

export const metadata: Metadata = {
  title: "Terms of use · Cat-phishing",
  description: "The house rules of the Cat-phishing app.",
};

export default function TermsPage() {
  return <LegalPage {...termsTexts} />;
}
