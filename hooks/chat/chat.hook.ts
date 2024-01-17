import { useEffect } from "react";
// types
import type { ForwardedRef, RefObject } from "react";
// redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import {
  show_emoji,
  active_user,
  updateShowEmoji,
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
  target_ref,
  callback,
  options,
}: {
  target_ref: RefObject<HTMLDivElement>;
  callback: (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => void; // intersection observer callback
  options: {
    root?: Element | Document | null;
    rootMargin?: string;
    threshold?: number | number[];
  };
}) => {
  const _user = useAppSelector(user);
  useEffect(() => {
    if (target_ref.current) {
      // observer
      let observer = new IntersectionObserver(callback, options);
      if (target_ref.current) {
        observer.observe(target_ref.current);
      }
      return () => {
        observer.disconnect();
      };
    }
  }, [_user, options]);
};

export {
  useDefaultUser,
  useEmojiOutsideClickHandler,
  useMessageView,
  useFirstUserConversation,
};
