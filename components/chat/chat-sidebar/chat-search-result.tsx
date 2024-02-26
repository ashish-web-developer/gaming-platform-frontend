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
import { mode } from "@/store/slice/common.slice";

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";
import { useOutsideClickHandler } from "@/hooks/common.hook";

// helpers
import { fetchOnScroll } from "@/helpers/chat.helper";
import handler from "pages/api/hello";

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
  }
> = ({ handleModalClose, search_container_ref }, search_input_ref) => {
  const dispatch = useAppDispatch();
  const timeout_ref = useRef<NodeJS.Timeout | null>(null);
  const _fetched_user_result = useAppSelector(fetched_user_result);
  const _is_request_pending = useAppSelector(is_request_pending);
  const scrollable_content_ref = useRef<HTMLDivElement>(null);

  useOutsideClickHandler({
    modal_ref: scrollable_content_ref,
    cta_ref: search_container_ref,
    handler: () => {
      if (typeof search_input_ref !== "function" && search_input_ref?.current) {
        search_input_ref.current.value = "";
      }
      dispatch(updateFetchUserResult([]));
    },
  });

  return (
    <StyledChatSearchResult
      onScroll={() =>
        fetchOnScroll({
          timeout_ref: timeout_ref,
          container_ref: scrollable_content_ref,
          is_request_pending: _is_request_pending,
          handler: () => {
            timeout_ref.current = setTimeout(() => {
              if (
                typeof search_input_ref !== "function" &&
                search_input_ref?.current
              ) {
                dispatch(
                  fetchUserApi({
                    fetch_type: "chat",
                    query: search_input_ref.current.value,
                  })
                );
              }
            }, 300);
          },
        })
      }
      ref={scrollable_content_ref}
    >
      {_fetched_user_result.map((user) => {
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
    </StyledChatSearchResult>
  );
};

export default forwardRef(ChatSearchResult);
