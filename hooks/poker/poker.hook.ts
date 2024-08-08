import { useState, useEffect } from "react";
const usePokerTableHeight = () => {
  const [height, setHeight] = useState(500);

  useEffect(() => {
    setHeight(document.documentElement.clientHeight < 850 ? 450 : 500);
  }, []);
  return height;
};

export {
    usePokerTableHeight
}
