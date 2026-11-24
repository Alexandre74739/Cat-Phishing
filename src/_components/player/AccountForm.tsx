"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/_components/ui/Button";
import { cleanPseudo, codeLength } from "@/lib/cloud";
import { createAccount, loginAccount } from "@/lib/playerAccounts";
import type { PlayerTexts } from "@/lib/playerTexts";
import { errorText } from "./accountError";
import { CodePad } from "./CodePad";
import { ViewTitle } from "./ViewTitle";

type AccountFormProps = {
  texts: PlayerTexts["account"];
  mode: "create" | "login";
  initialPseudo: string;
  onDone: () => void;
};

export function AccountForm({
  texts,
  mode,
  initialPseudo,
  onDone,
}: AccountFormProps) {
  const [pseudo, setPseudo] = useState(initialPseudo);
  const [code, setCode] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [isBusy, setIsBusy] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!cleanPseudo(pseudo)) return setError(texts.errors.badPseudo);
    setIsBusy(true);
    setError("");
    try {
      await (mode === "create" ? createAccount : loginAccount)(pseudo, code);
      onDone();
    } catch (failure) {
      setError(errorText(texts, failure));
      setCode([]);
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <form onSubmit={submit}>
      <ViewTitle>
        {mode === "create" ? texts.createTitle : texts.loginTitle}
      </ViewTitle>
      <label
        htmlFor="account-pseudo"
        className="mt-4 block text-left font-ui text-lg font-bold"
      >
        {texts.pseudo}
      </label>
      <input
        id="account-pseudo"
        value={pseudo}
        onChange={(event) => setPseudo(event.target.value)}
        required
        maxLength={16}
        placeholder={texts.pseudoPlaceholder}
        autoComplete="off"
        autoCapitalize="none"
        spellCheck={false}
        aria-describedby="account-pseudo-hint"
        className="toon mt-1 min-h-14 w-full rounded-2xl bg-paper px-4 font-ui text-xl font-semibold placeholder:text-ink-soft/60"
      />
      <p
        id="account-pseudo-hint"
        className="mt-1 text-left font-semibold text-ink-soft"
      >
        {texts.pseudoHint}
      </p>
      <p className="mt-5 text-left font-ui text-lg font-bold">{texts.code}</p>
      <p className="mb-3 text-left font-semibold text-ink-soft">
        {texts.codeHint}
      </p>
      <CodePad
        value={code}
        progressLabel={texts.codeProgress}
        eraseLabel={texts.erase}
        clearLabel={texts.clear}
        onChange={setCode}
      />
      <p
        role="alert"
        className="mt-3 min-h-6 font-ui font-semibold text-lava-dark"
      >
        {error}
      </p>
      <Button
        type="submit"
        variant="mint"
        icon={mode === "create" ? "upload" : "login"}
        disabled={isBusy || code.length < codeLength}
        fullWidth
      >
        {mode === "create" ? texts.create : texts.login}
      </Button>
    </form>
  );
}
