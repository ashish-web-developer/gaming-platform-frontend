import { createContext } from "react";

// helpers
import MutableSpeechUtterance from "@/helpers/mutable-speech-uttrance";

// theme mode context

// speech uttrance
const UttranceContext = createContext<MutableSpeechUtterance | null>(null);

export { UttranceContext };
