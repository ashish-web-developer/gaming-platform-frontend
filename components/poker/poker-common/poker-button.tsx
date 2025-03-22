import { useContext } from "react";
// types
import type { FC, ButtonHTMLAttributes } from "react";

// context
import { MediaContext } from "context";

const PokerButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  onClick,
  ...props
}) => {
  const media_ref = useContext(MediaContext);
  return (
    <button
      onClick={(event) => {
        onClick?.(event);
        media_ref.current.button_click_sound?.play();
      }}
      {...props}
    ></button>
  );
};
export default PokerButton;
