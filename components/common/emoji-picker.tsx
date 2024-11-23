import { useRef, forwardRef } from "react";
// types
import type { ForwardRefRenderFunction, RefObject } from "react";

// emoji picker
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

// styled components
import {
  StyledEmojiContainer,
  StyledEmojiWrapper,
} from "@/styles/components/common/emoji-picker.style";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import { mode, showEmoji, updateShowEmoji } from "@/store/slice/common.slice";

// hooks
import { useOutsideClickHandler } from "@/hooks/common.hook";

interface Props {
  emoji_cta_ref: RefObject<HTMLButtonElement>;
}

const EmojiPicker: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { emoji_cta_ref },
  input_ref
) => {
  const dispatch = useAppDispatch();
  const _mode = useAppSelector(mode);
  const show_emoji = useAppSelector(showEmoji);
  const emoji_container_ref = useRef<HTMLDivElement>(null);

  useOutsideClickHandler({
    modal_ref: emoji_container_ref,
    cta_ref: emoji_cta_ref,
    handler: () => {
      dispatch(updateShowEmoji(false));
    },
  });
  return (
    <StyledEmojiContainer ref={emoji_container_ref}>
      {show_emoji && (
        <StyledEmojiWrapper>
          <Picker
            theme={_mode}
            data={data}
            onEmojiSelect={(data: any) => {
              if (typeof input_ref !== "function" && input_ref?.current) {
                input_ref.current.value += data.native;
              }
            }}
          />
        </StyledEmojiWrapper>
      )}
    </StyledEmojiContainer>
  );
};

export default forwardRef(EmojiPicker);
