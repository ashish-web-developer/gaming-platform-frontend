import { createContext } from "react";
import Colors from "./types/data/colors";

// helpers
import MutableSpeechUtterance from "@/helpers/mutable-speech-uttrance";

// theme mode context

// colors context
const ColorsContext = createContext<Colors>([]);

// speech uttrance
const UttranceContext = createContext<MutableSpeechUtterance | null>(null);

export { ColorsContext, UttranceContext };
