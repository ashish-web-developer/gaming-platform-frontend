import { useEffect, useRef } from "react";
// types
import type { ForwardedRef, RefObject } from "react";
import type { IConversation } from "@/types/store/slice/chat";
// redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  show_emoji,
  active_user,
  updateShowEmoji,
  updateView,
  fetchMessages,
  fetchDefaultUser,
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
 * To fetch the conversation for first user
 */
const useFirstUserConversation = () => {
  const dispatch = useAppDispatch();
  const _user = useAppSelector(user);
  const _active_user = useAppSelector(active_user);
  const _active_user_defined = !!_active_user;
  useEffect(() => {
    if (_active_user_defined && _user.id) {
      dispatch(fetchMessages());
    }
  }, [_active_user_defined, _user.id]);
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
            if(target_ref.current){
              observer_ref.current?.unobserve(target_ref.current);
            }
          }
        },
        {threshold: 1 }
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

export {
  useDefaultUser,
  useEmojiOutsideClickHandler,
  useMessageView,
  useFirstUserConversation,
};
