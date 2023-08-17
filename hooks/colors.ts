import { useMemo } from "react";
// types
import type Colors from "@/types/data/colors";

const useRandomColor = (colors: Colors) => {
  const color = useMemo(() => {
    const colorsLength = colors.length;
    return colors[Math.floor(Math.random() * colorsLength)];
  }, []);
  return color;
};

export default useRandomColor;
