import { useEffect, useRef } from "react";
// types
import type { ForwardedRef, RefObject } from "react";
import type { IConversation } from "@/types/store/slice/chat";
// redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  show_emoji,
  updateShowEmoji,
  fetchDefaultUser,
  updateView,
} from "@/store/slice/chat.slice";
import { user } from "@/store/slice/user.slice";

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

/**
 * To handle the view of the message
 */

const useMessageView = ({
  root_ref,
  target_ref,
  conversation,
}: {
  root_ref: ForwardedRef<HTMLDivElement>;
  target_ref: RefObject<HTMLDivElement>;
  conversation: IConversation;
}) => {
  const dispatch = useAppDispatch();
  const _user = useAppSelector(user);
  const observer_ref = useRef<IntersectionObserver | null>(null);
  let is_api_called = false;
  useEffect(() => {
    if (
      typeof root_ref !== "function" &&
      root_ref?.current &&
      !conversation.viewed &&
      _user.id == conversation.receiver_id
    ) {
      observer_ref.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !is_api_called) {
            dispatch(updateView({ conversation_id: conversation.id }));
            is_api_called = true;
          }
        },
        { root: root_ref.current, threshold: 1 }
      );
      if (target_ref.current) {
        observer_ref.current.observe(target_ref.current);
      }
    }
    return () => {
      observer_ref.current?.disconnect();
    };
  }, [_user]);
};

export { useDefaultUser, useEmojiOutsideClickHandler, useMessageView };
