export function speakItalian(text: string) {
  if (typeof window === "undefined") return;
  const synth = window.speechSynthesis;
  if (!synth) return;
  const line = text.trim();
  if (!line) return;
  const utter = new SpeechSynthesisUtterance(line);
  utter.lang = "it-IT";
  utter.rate = 0.9;
  const voice = synth
    .getVoices()
    .find((item) => item.lang.toLowerCase().startsWith("it"));
  if (voice) utter.voice = voice;
  synth.cancel();
  synth.speak(utter);
}

export function voiceReady(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}
