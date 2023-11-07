import { useEffect, useRef, useState } from "react";

const useSpeechText = (
  dependency: any,
  text: string | null,
  voice_index: number
) => {
  const femaleVoicesIndex = useRef<number[]>([
    21, 22, 23, 24, 26, 32, 35, 37, 41, 42,
  ]);
  const [speaking, setSpeaking] = useState<boolean>(false);
  useEffect(() => {
    if (text) {
      const voices = speechSynthesis
        .getVoices()
        .filter((voice) => voice.lang.includes("en"));
      const uttrance = new SpeechSynthesisUtterance("hello world");
      // uttrance.onstart = ()=>{
      //     setSpeaking(true);
      // }
      // uttrance.onend = ()=>{
      //     setSpeaking(false);
      // }
      // uttrance.voice = voices[femaleVoicesIndex.current[voice_index]];
      speechSynthesis.speak(uttrance);
    }
  }, [dependency, text]);
  return speaking;
};

export default useSpeechText;
