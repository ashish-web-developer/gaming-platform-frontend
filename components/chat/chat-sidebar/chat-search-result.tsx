import { useRef, useEffect, forwardRef } from "react";
// types
import type { FC, ForwardRefRenderFunction } from "react";
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
  updateSearchInputValue,
  updateFetchUserResult,
  updateDefaultUser,
  // api call
  fetchUser,
} from "@/store/slice/chat.slice";
import { mode } from "@/store/slice/common.slice";

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";

const ChatResultProfile: FC<{
  user: IUsersWithConversation;
  is_request_pending: boolean;
  handleModalClose?: () => void;
}> = ({ user, is_request_pending, handleModalClose }) => {
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
            dispatch(updateSearchInputValue(""));
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

const ChatSearchResult: ForwardRefRenderFunction<
  HTMLDivElement,
  {
    handleModalClose?: () => void;
  }
> = ({ handleModalClose }, search_input_ref) => {
  const dispatch = useAppDispatch();
  const timeout_ref = useRef<NodeJS.Timeout>();
  const _fetched_user_result = useAppSelector(fetched_user_result);
  const _is_request_pending = useAppSelector(is_request_pending);
  const scrollable_content_ref = useRef<HTMLDivElement>(null);

  const fetchUserData = () => {
    timeout_ref.current && clearTimeout(timeout_ref.current);
    // calling api when reached the end of container
    if (
      !_is_request_pending &&
      scrollable_content_ref.current &&
      scrollable_content_ref.current.scrollHeight <=
        Math.ceil(
          scrollable_content_ref.current.scrollTop +
            scrollable_content_ref.current.clientHeight
        )
    ) {
      // added timeout so that api don't get call multiple times, when scrolled
      timeout_ref.current = setTimeout(() => {
        dispatch(fetchUser());
      }, 300);
    }
  };

  useEffect(() => {
    const handleclick = (event: MouseEvent) => {
      if (
        !scrollable_content_ref.current?.contains(event.target as Node) &&
        typeof search_input_ref !== "function" &&
        !search_input_ref?.current?.contains(event.target as Node)
      ) {
        dispatch(updateSearchInputValue(""));
        dispatch(updateFetchUserResult([]));
      }
    };
    document.addEventListener("click", handleclick);
    return () => {
      document.removeEventListener("click", handleclick);
    };
  }, []);
  return (
    <StyledChatSearchResult
      onScroll={fetchUserData}
      ref={scrollable_content_ref}
    >
      {_fetched_user_result.map((user) => {
        return (
          <ChatResultProfile
            key={`result-${user.id}`}
            user={user}
            is_request_pending={_is_request_pending}
            handleModalClose={handleModalClose}
          />
        );
      })}
    </StyledChatSearchResult>
  );
};

export default forwardRef(ChatSearchResult);
