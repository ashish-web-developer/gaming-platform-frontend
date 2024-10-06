import { forwardRef } from "react";
// types
import type { ForwardRefRenderFunction } from "react";
import type { IUser } from "@/types/store/slice/login";

// styled components
import {
  StyledProfileContainer,
  StyledProfileImageWrapper,
  StyledProfileImage,
  StyledProfileDetails,
  StyledName,
  StyledUserName,
  StyledSkeletonLoader,
} from "@/styles/components/chat/chat-sidebar/chat-search-result-profile.style";

// redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import { mode } from "@/store/slice/common.slice";
import {
  updateDefaultUser,
  updateFetchUserResult,
} from "@/store/slice/chat.slice";

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";

const ChatSearchResultProfile: ForwardRefRenderFunction<
  HTMLInputElement,
  {
    user: IUser;
    is_request_pending: boolean;
    handleModalClose?: () => void;
  }
> = ({ user, is_request_pending, handleModalClose }, search_input_ref) => {
  const dispatch = useAppDispatch();
  const _mode = useAppSelector(mode);
  const avatar_url = useAvatarUrl(user);
  const { name, username } = user;
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
          <StyledProfileImageWrapper>
            <StyledProfileImage
              fill={true}
              src={avatar_url}
              alt="user-avatar"
            />
          </StyledProfileImageWrapper>
          <StyledProfileDetails>
            <StyledName>{name}</StyledName>
            <StyledUserName>@{username}</StyledUserName>
          </StyledProfileDetails>
        </StyledProfileContainer>
      )}
    </>
  );
};
export default forwardRef(ChatSearchResultProfile);
