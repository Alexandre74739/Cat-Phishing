import { Footer } from "@/_components/layout/Footer";
import { Header } from "@/_components/layout/Header";
import { footerTexts, headerTexts } from "@/lib/siteChrome";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header {...headerTexts} />
      {children}
      <Footer {...footerTexts} />
    </>
  );
}
