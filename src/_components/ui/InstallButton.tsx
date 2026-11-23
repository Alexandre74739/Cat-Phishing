"use client";

import { AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import { useDismiss } from "@/hooks/useDismiss";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";
import { Button } from "./Button";
import { InstallHelp, type InstallHelpTexts } from "./InstallHelp";

export type InstallTexts = { label: string; help: InstallHelpTexts };

type InstallButtonProps = InstallTexts & { inline?: boolean };

export function InstallButton({ label, help, inline }: InstallButtonProps) {
  const { isInstalled, platform, install } = useInstallPrompt();
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useDismiss(isHelpOpen, () => setIsHelpOpen(false), { box });

  if (isInstalled) return null;

  return (
    <div ref={box} className={inline ? "w-full" : "relative"}>
      <Button
        variant="mint"
        icon="install"
        size={inline ? "md" : "sm"}
        expanded={isHelpOpen}
        className={inline ? "w-full" : ""}
        onClick={async () => {
          if (!(await install())) setIsHelpOpen((open) => !open);
        }}
      >
        {label}
      </Button>
      <AnimatePresence>
        {isHelpOpen && (
          <InstallHelp
            texts={help}
            platform={platform}
            inline={inline}
            onClose={() => setIsHelpOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
