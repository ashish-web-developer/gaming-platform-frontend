import { useEffect, useState, useRef } from "react";
// framer motion
import { motion } from "framer-motion";
const CardImage = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(1);
  const timerRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentCardIndex((prev) => prev + 1);
    }, 3000);
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);
  useEffect(() => {
    if (currentCardIndex >= 9) {
      setCurrentCardIndex(1);
    }
  }, [currentCardIndex]);
  return (
    <>
      <motion.img
        initial = {{
            opacity:0
        }}
        animate = {{
            opacity:1
        }}
        transition={{
            duration:0.6
        }}
        key = {currentCardIndex}
        width={180}
        height={285}
        alt="girl-image"
        src={
          "/memory-game/welcome-card/card/card-image/card-image-" +
          currentCardIndex +
          ".svg"
        }
      />
    </>
  );
};

export default CardImage;
