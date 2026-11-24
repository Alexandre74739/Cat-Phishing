"use client";

import { ExternalLink, X } from "lucide-react";
import { motion } from "motion/react";
import type { InstallGuide } from "@/lib/installGuide";
import type { Platform } from "@/lib/platform";

export type InstallHelpTexts = {
  dialogLabel: string;
  closeLabel: string;
  edgeLabel: string;
  guide: InstallGuide;
};

type InstallHelpProps = {
  texts: InstallHelpTexts;
  platform: Platform;
  inline?: boolean;
  onClose: () => void;
};

export function InstallHelp({
  texts,
  platform,
  inline,
  onClose,
}: InstallHelpProps) {
  const { title, steps } = texts.guide[platform];

  return (
    <motion.div
      role="dialog"
      aria-label={texts.dialogLabel}
      initial={{ opacity: 0, y: -8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.95 }}
      className={`toon rounded-3xl bg-paper p-4 text-left text-ink ${inline ? "mt-3" : "absolute top-full right-0 z-50 mt-3 w-[min(320px,calc(100vw-2rem))]"}`}
    >
      <button
        type="button"
        aria-label={texts.closeLabel}
        onClick={onClose}
        className="absolute top-2 right-2 grid size-10 place-items-center cursor-pointer rounded-full hover:text-ink-soft motion-safe:transition-colors"
      >
        <X size={20} strokeWidth={3} aria-hidden="true" />
      </button>
      <p className="pr-10 font-ui text-lg font-bold">{title}</p>
      <ol className="mt-2 list-decimal space-y-1.5 pl-5 font-semibold">
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      {platform === "firefox-windows" && (
        <a
          href={`microsoft-edge:${window.location.href}`}
          className="toon pressable mt-4 flex min-h-12 items-center justify-center gap-2 rounded-full bg-mint px-4 font-ui font-semibold"
        >
          <ExternalLink size={18} strokeWidth={2.5} aria-hidden="true" />
          {texts.edgeLabel}
        </a>
      )}
    </motion.div>
  );
}
