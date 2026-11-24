// Read-aloud uses the browser's built-in speech synthesis: no audio files, no external service.
export const canSpeak = () =>
  typeof window !== "undefined" && "speechSynthesis" in window;

export function speak(text: string) {
  if (!canSpeak()) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.95;
  synth.speak(utterance);
}
