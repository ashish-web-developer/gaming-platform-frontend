import { useEffect } from "react";
// types
import type { RefObject } from "react";
// redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  show_emoji,
  updateShowEmoji,
  fetchDefaultUser,
} from "@/store/slice/chat.slice";

/**
 * To fetch default user
 */
const useDefaultUser = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchDefaultUser());
  }, []);
};

/**
 * To handle outside click when
 * emoji popup is open
 */
const useEmojiOutsideClickHandler = ({
  emoji_cta_ref,
  emoji_container_ref,
}: {
  emoji_cta_ref: RefObject<HTMLButtonElement>;
  emoji_container_ref: RefObject<HTMLDivElement>;
}) => {
  const dispatch = useAppDispatch();
  const _show_emoji = useAppSelector(show_emoji);
  const handleClick = (event: MouseEvent) => {
    if (
      !emoji_cta_ref.current?.contains(event.target as Node) &&
      !emoji_container_ref.current?.contains(event.target as Node)
    ) {
      dispatch(updateShowEmoji(false));
    }
  };
  useEffect(() => {
    _show_emoji && document.addEventListener("click", handleClick);
    return () => {
      _show_emoji && document.removeEventListener("click", handleClick);
    };
  }, [_show_emoji]);
};

export { useDefaultUser, useEmojiOutsideClickHandler };
