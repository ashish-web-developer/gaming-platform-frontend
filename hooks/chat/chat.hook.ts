import { useEffect } from "react";
// types
import type { RefObject } from "react";
// redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import {
  // state
  activeUser,
  // action
  // api
  fetchMessages,
  fetchDefaultUser,
} from "@/store/slice/chat.slice";
import {
  activeGroup,
  getGroupsApi,
  getGroupRecommendationApi,
  fetchGroupMessagesApi,
} from "@/store/slice/group.slice";
import { getNotificationApi } from "@/store/slice/notification.slice";
import { User } from "@/store/slice/login.slice";

/**
 * To fetch default user
 */
const useDefault = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchDefaultUser());
    dispatch(getGroupsApi());
    dispatch(getGroupRecommendationApi());
    dispatch(getNotificationApi());
  }, []);
};

/**
 * To fetch the conversation for first user
 */
const useDefaultConversation = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(User);
  const active_user = useAppSelector(activeUser);
  const active_group = useAppSelector(activeGroup);
  const active_user_defined = !!active_user;

  useEffect(() => {
    if (active_user_defined && user?.id) {
      dispatch(fetchMessages());
    }
    if (active_group) {
      dispatch(fetchGroupMessagesApi());
    }
  }, [active_user_defined, user?.id, active_group]);
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
  const user = useAppSelector(User);
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
  }, [user, options]);
};

export { useDefault, useMessageView, useDefaultConversation };
