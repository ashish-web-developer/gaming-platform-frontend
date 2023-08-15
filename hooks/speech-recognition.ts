import { useEffect, useState } from "react";

const useSpeechRecognition = (
  resultCallBack: (event: SpeechRecognitionEvent) => void
) => {
  const [recognition, setRecognition] = useState<null | SpeechRecognition>(
    null
  );
  useEffect(() => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    setRecognition(recognition);
    recognition.onresult = (event) => resultCallBack(event);
  }, []);
  return recognition;
};

export default useSpeechRecognition;
