import { useRef, useEffect } from "react";
// types
import type { FC } from "react";

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
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import {
  // state
  fetched_user_result,
  is_request_pending,
  // action
  updateSearchInputValue,
  updateFetchUserResult,
  // api call
  fetchUser,
} from "@/store/slice/chat.slice";

// hooks
import useAvatar from "@/hooks/profile";

const ChatResultProfile: FC<{
  name: string;
  username: string;
  is_request_pending: boolean;
}> = ({ name, username, is_request_pending }) => {
  const avatar = useAvatar(name ?? "");
  return (
    <>
      {is_request_pending ? (
        <StyledSkeletonLoader />
      ) : (
        <StyledProfileContainer>
          <StyledProfileImage
            dangerouslySetInnerHTML={{
              __html: avatar,
            }}
          />
          <StyledProfileDetails>
            <StyledName>{name}</StyledName>
            <StyledUserName>@{username}</StyledUserName>
          </StyledProfileDetails>
        </StyledProfileContainer>
      )}
    </>
  );
};

const ChatSearchResult: FC = () => {
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
        scrollable_content_ref.current.scrollTop +
          scrollable_content_ref.current.clientHeight
    ) {
      // added timeout so that api don't get call multiple times, when scrolled
      timeout_ref.current = setTimeout(() => {
        dispatch(fetchUser());
      }, 300);
    }
  };

  useEffect(() => {
    const handleclick = (event: MouseEvent) => {
      if (!scrollable_content_ref.current?.contains(event.target as Node)) {
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
      {_fetched_user_result.map(({ id, name, username }) => {
        return (
          <ChatResultProfile
            key={`result-${id}`}
            name={name as string}
            username={username as string}
            is_request_pending={_is_request_pending}
          />
        );
      })}
    </StyledChatSearchResult>
  );
};

export default ChatSearchResult;
