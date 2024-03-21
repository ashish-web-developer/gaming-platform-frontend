import { useRef, forwardRef } from "react";
// types
import type { ForwardRefRenderFunction, RefObject } from "react";
import type { IUsersWithConversation } from "@/types/store/slice/chat";

// styled components
import {
  StyledChatSearchResult,
  StyledProfileContainer,
  StyledProfileImage,
  StyledProfileDetails,
  StyledName,
  StyledUserName,
  StyledSkeletonLoader,
} from "@/styles/components/chat/chat-sidebar/chat-search-result.style";

// local components
import ChatGroup from "@/components/chat/chat-sidebar/chat-group-list/chat-group";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import {
  // state
  fetched_user_result,
  is_request_pending,
  // action
  updateFetchUserResult,
  updateDefaultUser,
  // api call
  fetchUserApi,
} from "@/store/slice/chat.slice";
import {
  fetched_group_results,
  is_fetch_group_request_pending,
  updateFetchedGroupResult,
  fetchGroupApi,
} from "@/store/slice/group.slice";

import { mode } from "@/store/slice/common.slice";

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";
import { useOutsideClickHandler } from "@/hooks/common.hook";

// helpers
import { fetchOnScroll } from "@/helpers/chat.helper";

type IChatResultProfileProps = {
  user: IUsersWithConversation;
  is_request_pending: boolean;
  handleModalClose?: () => void;
};

const ChatResultProfile: ForwardRefRenderFunction<
  HTMLInputElement,
  IChatResultProfileProps
> = ({ user, is_request_pending, handleModalClose }, search_input_ref) => {
  const dispatch = useAppDispatch();
  const _mode = useAppSelector(mode);
  const avatar_url = useAvatarUrl(user);
  return (
    <>
      {is_request_pending ? (
        <StyledSkeletonLoader />
      ) : (
        <StyledProfileContainer
          $mode={_mode}
          onClick={() => {
            dispatch(updateDefaultUser(user));
            dispatch(updateFetchUserResult([]));
            if (
              typeof search_input_ref !== "function" &&
              search_input_ref?.current
            ) {
              search_input_ref.current.value = "";
            }
            handleModalClose && handleModalClose();
          }}
        >
          <StyledProfileImage
            width={40}
            height={40}
            src={avatar_url}
            alt="user-avatar"
          />
          <StyledProfileDetails>
            <StyledName>{user.name}</StyledName>
            <StyledUserName>@{user.username}</StyledUserName>
          </StyledProfileDetails>
        </StyledProfileContainer>
      )}
    </>
  );
};
const ForwardedChatUserProfile = forwardRef(ChatResultProfile);

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
  const _fetched_user_result = useAppSelector(fetched_user_result);
  const _is_request_pending = useAppSelector(is_request_pending);
  const scrollable_content_ref = useRef<HTMLDivElement>(null);
  const _is_fetch_group_request_pending = useAppSelector(
    is_fetch_group_request_pending
  );
  const _fetched_group_results = useAppSelector(fetched_group_results);

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
              ? _is_request_pending
              : _is_fetch_group_request_pending,
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
        _fetched_user_result.map((user) => {
          return (
            <ForwardedChatUserProfile
              key={`result-${user.id}`}
              user={user}
              is_request_pending={_is_request_pending}
              handleModalClose={handleModalClose}
              ref={search_input_ref}
            />
          );
        })}

      {type == "group_search" &&
        _fetched_group_results.map((group, index) => {
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
