import type { Metadata, Viewport } from "next";
import { MotionProvider } from "@/_components/layout/MotionProvider";
import { ServiceWorker } from "@/_components/layout/ServiceWorker";
import { appColors } from "@/lib/appIcon";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cat-phishing",
  description:
    "The party card game where cats pass a virus around and crack code puzzles. One phone, all your friends.",
  applicationName: "Cat-phishing",
  appleWebApp: {
    capable: true,
    title: "Cat-phishing",
    statusBarStyle: "default",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: appColors.background,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="min-h-svh">
        <MotionProvider>{children}</MotionProvider>
        <ServiceWorker />
      </body>
    </html>
  );
}
