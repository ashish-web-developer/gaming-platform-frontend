import { useRef, forwardRef, useId } from "react";
// types
import type { FC, ForwardRefRenderFunction } from "react";
import { IUsersWithConversation } from "@/types/store/slice/chat";

// styled components
import {
  StyledPlayerSearchWrapper,
  StyledHeader,
  StyledProfileListWrapper,
  StyledProfileContainer,
  StyledProfileWrapper,
  StyledProfileImageWrapper,
  StyledProfileImage,
  StyledProfileDetailsWrapper,
  StyledName,
  StyledUserName,
  StyledCheckboxWrapper,
  StyledCheckBoxLabel,
  StyledLabelImage,
  StyledCheckBox,
  StyledBottomContainer,
  StyledInviteCta,
} from "@/styles/components/common/create-group/player-search.style";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import { user } from "@/store/slice/user.slice";
import {
  // state
  fetched_user_result,
  is_request_pending,
  fetchUserApi,
  // action
  updateFetchUserResult,
} from "@/store/slice/chat.slice";

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";

// helpers
import { fetchOnScroll } from "@/helpers/chat.helper";

const UserProfile: FC<{
  user: IUsersWithConversation;
  updateGroupUserIds: (id: number, action: "remove" | "add") => void;
}> = ({ user, updateGroupUserIds }) => {
  const avatar_url = useAvatarUrl(user);
  const checkbox_input_id = useId();
  return (
    <StyledProfileContainer>
      <StyledProfileWrapper>
        <StyledProfileImageWrapper>
          <StyledProfileImage
            sizes="(max-width: 1400px) 5vw"
            fill={true}
            alt="user-avatar"
            src={avatar_url}
          />
        </StyledProfileImageWrapper>
        <StyledProfileDetailsWrapper>
          <StyledName>{user.name}</StyledName>
          <StyledUserName>@{user.username}</StyledUserName>
        </StyledProfileDetailsWrapper>
      </StyledProfileWrapper>
      <StyledCheckboxWrapper>
        <StyledCheckBox
          id={`profile-checkbox-${checkbox_input_id}`}
          type="checkbox"
          onChange={(event) => {
            if (event.target.checked) {
              updateGroupUserIds(user.id, "add");
            } else {
              updateGroupUserIds(user.id, "remove");
            }
          }}
        />
        <StyledCheckBoxLabel htmlFor={`profile-checkbox-${checkbox_input_id}`}>
          <StyledLabelImage
            width={15}
            height={15}
            alt="ok"
            src="/common/create-group/player-search/ok.png"
          />
        </StyledCheckBoxLabel>
      </StyledCheckboxWrapper>
    </StyledProfileContainer>
  );
};

const PlayerSearch: ForwardRefRenderFunction<
  HTMLInputElement,
  {
    updateGroupUserIds: (id: number, type: "add" | "remove") => void;
  }
> = ({ updateGroupUserIds }, search_input_ref) => {
  const dispatch = useAppDispatch();
  const _fetched_user_result = useAppSelector(fetched_user_result);
  const _user = useAppSelector(user);
  const container_ref = useRef<HTMLDivElement>(null);
  const timeout_ref = useRef<NodeJS.Timeout | null>(null);
  const _is_request_pending = useAppSelector(is_request_pending);
  return (
    <StyledPlayerSearchWrapper>
      <StyledHeader>Players</StyledHeader>
      <StyledProfileListWrapper
        onScroll={() =>
          fetchOnScroll({
            timeout_ref: timeout_ref,
            container_ref: container_ref,
            is_request_pending: _is_request_pending,
            handler: () => {
              timeout_ref.current = setTimeout(() => {
                if (
                  typeof search_input_ref !== "function" &&
                  search_input_ref?.current
                ) {
                  dispatch(
                    fetchUserApi({
                      fetch_type: "group",
                      query: search_input_ref.current.value,
                    })
                  );
                }
              }, 300);
            },
          })
        }
        ref={container_ref}
      >
        {_fetched_user_result.map((user) => {
          return (
            <UserProfile
              updateGroupUserIds={updateGroupUserIds}
              key={user.id}
              user={user}
            />
          );
        })}
      </StyledProfileListWrapper>
      <StyledBottomContainer>
        <StyledInviteCta
          onClick={(event) => {
            event.stopPropagation();
            if (
              typeof search_input_ref !== "function" &&
              search_input_ref?.current
            ) {
              search_input_ref.current.value = "";
            }
            dispatch(updateFetchUserResult([]));
          }}
        >
          Invite
        </StyledInviteCta>
      </StyledBottomContainer>
    </StyledPlayerSearchWrapper>
  );
};

export default forwardRef(PlayerSearch);
