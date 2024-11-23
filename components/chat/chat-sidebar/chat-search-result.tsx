import { useRef, forwardRef } from "react";
// types
import type { ForwardRefRenderFunction, RefObject } from "react";

// styled components
import { StyledChatSearchResult } from "@/styles/components/chat/chat-sidebar/chat-search-result.style";

// local components
import ChatGroup from "@/components/chat/chat-sidebar/chat-group-list/chat-group";
import ChatSearchResultProfile from "@/components/chat/chat-sidebar/chat-search-result-profile";
// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import {
  // state
  fetchedUserResult,
  isRequestPending,
  // action
  updateFetchUserResult,
  // api call
  fetchUserApi,
} from "@/store/slice/chat.slice";
import {
  fetchedGroupResults,
  isFetchGroupRequestPending,
  updateFetchedGroupResult,
  fetchGroupApi,
} from "@/store/slice/group.slice";

// hooks
import { useOutsideClickHandler } from "@/hooks/common.hook";

// helpers
import { fetchOnScroll } from "@/helpers/chat.helper";

const ChatSearchResult: ForwardRefRenderFunction<
  HTMLInputElement,
  {
    handleModalClose?: () => void;
    search_container_ref: RefObject<HTMLDivElement>;
    type: "group_search" | "user_search";
  }
> = ({ handleModalClose, search_container_ref, type }, search_input_ref) => {
  const dispatch = useAppDispatch();
  const timeout_ref = useRef<NodeJS.Timeout | null>(null);
  const fetched_user_result = useAppSelector(fetchedUserResult);
  const is_request_pending = useAppSelector(isRequestPending);
  const scrollable_content_ref = useRef<HTMLDivElement>(null);
  const is_fetch_group_request_pending = useAppSelector(
    isFetchGroupRequestPending
  );
  const fetched_group_resuls = useAppSelector(fetchedGroupResults);

  useOutsideClickHandler({
    modal_ref: scrollable_content_ref,
    cta_ref: search_container_ref,
    handler: () => {
      if (typeof search_input_ref !== "function" && search_input_ref?.current) {
        search_input_ref.current.value = "";
      }
      if (type == "user_search") {
        dispatch(updateFetchUserResult([]));
      } else if (type == "group_search") {
        dispatch(updateFetchedGroupResult([]));
      }
    },
  });

  return (
    <StyledChatSearchResult
      onScroll={() =>
        fetchOnScroll({
          timeout_ref: timeout_ref,
          container_ref: scrollable_content_ref,
          is_request_pending:
            type == "user_search"
              ? is_request_pending
              : is_fetch_group_request_pending,
          handler: () => {
            timeout_ref.current = setTimeout(() => {
              if (
                typeof search_input_ref !== "function" &&
                search_input_ref?.current
              ) {
                if (type == "user_search") {
                  dispatch(
                    fetchUserApi({
                      fetch_type: "chat",
                      query: search_input_ref.current.value,
                    })
                  );
                } else if (type == "group_search") {
                  dispatch(
                    fetchGroupApi({
                      query: search_input_ref.current.value,
                    })
                  );
                }
              }
            }, 300);
          },
        })
      }
      ref={scrollable_content_ref}
    >
      {type == "user_search" &&
        fetched_user_result.map((user) => {
          return (
            <ChatSearchResultProfile
              key={`result-${user.id}`}
              user={user}
              is_request_pending={is_request_pending}
              handleModalClose={handleModalClose}
              ref={search_input_ref}
            />
          );
        })}

      {type == "group_search" &&
        fetched_group_resuls.map((group, index) => {
          return (
            <ChatGroup
              show_follow_cta={true}
              key={`chat-group-${index}`}
              {...group}
            />
          );
        })}
    </StyledChatSearchResult>
  );
};

export default forwardRef(ChatSearchResult);
