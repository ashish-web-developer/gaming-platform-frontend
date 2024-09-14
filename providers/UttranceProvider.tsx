import { useEffect, useContext } from "react";
// types
import type { FC } from "react";

// context
import { UttranceContext } from "context";

// helpers
import MutableSpeechUtterance from "@/helpers/mutable-speech-uttrance";

const UttranceProvider: FC<{
  handleEnd: () => void;
}> = ({ handleEnd }) => {
  const uttrance_context = useContext(UttranceContext);
  useEffect(() => {
    uttrance_context.current = new MutableSpeechUtterance();
    uttrance_context.current.rate = 1.3;
    uttrance_context.current.voice = window.speechSynthesis
      .getVoices()
      .filter((voice) => voice.voiceURI.includes("Moira"))[0];
    uttrance_context.current.uttrance.addEventListener("end", handleEnd);
    speechSynthesis.onvoiceschanged = () => {
      if (uttrance_context.current) {
        uttrance_context.current.voice = window.speechSynthesis
          .getVoices()
          .filter((voice) => voice.voiceURI.includes("Moira"))[0];
      }
    };
    return () => {
        console.log("got unmounted");
      uttrance_context.current?.uttrance.removeEventListener("end", handleEnd);
      uttrance_context.current = null;
    };
  }, []);

  return null;
};

export default UttranceProvider;