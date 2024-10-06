import { useId, useRef, useState, forwardRef } from "react";
// types
import type { ForwardRefRenderFunction, FC } from "react";
import type { ITheme } from "@/theme/chat.theme";
import type { IUser } from "@/types/store/slice/login";

// styled components
import {
  StyledCreateGroupModalWrapper,
  StyledHeader,
  StyledTextWrapper,
  StyledHeaderMainText,
  StyledHeaderSubtitle,
  StyledIconButton,
  StyledInputGroup,
  StyledLabel,
  StyledInput,
  StyledBottomCtaWrapper,
  StyledTagWrapper,
  StyledUserTag,
  StyledAvatarWrapper,
  StyledAvatarUsername,
  StyledRemoveCta,
  StyledCreateCta,
} from "@/styles/components/common/create-group/create-group-modal.style";

// local components
import PlayerSearchResult from "@/components/common/create-group/player-search-result";
import ChatAvatar from "@/components/chat/chat-sidebar/chat-group-list/chat-avatar";

// theme
import { useTheme } from "styled-components";

// redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import {
  mode,
  updateShowCreateGroupDrownDown,
} from "@/store/slice/common.slice";
import {
  // state
  fetchedUserResult,
  fetchType,
  fetchUserApi,
  // action
  updateFetchUserResult,
  updatePage,
} from "@/store/slice/chat.slice";
import { createGroupApi } from "@/store/slice/group.slice";

// hooks
import { useOutsideClickHandler } from "@/hooks/common.hook";

const CloseIcon: FC<{ size: number; color: string }> = ({ size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        fill={color}
        d="M1.624 0L0 1.624 8.376 10 0 18.376 1.624 20 10 11.624 18.376 20 20 18.376 11.624 10 20 1.624 18.376 0 10 8.376 1.624 0z"
      ></path>
    </svg>
  );
};

const CreateGroupModal: ForwardRefRenderFunction<HTMLButtonElement> = (
  {},
  group_cta_ref
) => {
  const dispatch = useAppDispatch();
  const theme = useTheme() as ITheme;
  const _mode = useAppSelector(mode);
  const fetched_user_result = useAppSelector(fetchedUserResult);
  const fetch_type = useAppSelector(fetchType);
  const group_input_id = useId();
  const search_input_id = useId();
  const container_ref = useRef<HTMLDivElement>(null);
  const search_input_ref = useRef<HTMLInputElement>(null);
  const timeout_ref = useRef<NodeJS.Timeout | null>(null);
  const group_name_input_ref = useRef<HTMLInputElement>(null);
  const [group_users, setGroupUsers] = useState<Array<IUser>>([]);

  useOutsideClickHandler({
    modal_ref: container_ref,
    cta_ref: typeof group_cta_ref !== "function" ? group_cta_ref : null,
    handler: () => {
      dispatch(updateShowCreateGroupDrownDown(false));
      dispatch(updateFetchUserResult([]));
    },
  });

  return (
    <StyledCreateGroupModalWrapper ref={container_ref}>
      <StyledHeader>
        <StyledTextWrapper>
          <StyledHeaderMainText>Create Group</StyledHeaderMainText>
          <StyledHeaderSubtitle>Create your own group</StyledHeaderSubtitle>
        </StyledTextWrapper>
        <StyledIconButton
          onClick={() => {
            dispatch(updateShowCreateGroupDrownDown(false));
            dispatch(updateFetchUserResult([]));
          }}
        >
          <CloseIcon color={theme.palette.primary.dark} size={16} />
        </StyledIconButton>
      </StyledHeader>
      <StyledInputGroup>
        <StyledLabel htmlFor={`group-${group_input_id}`}>
          Group Name
        </StyledLabel>
        <StyledInput
          ref={group_name_input_ref}
          type="text"
          $mode={_mode}
          placeholder="Group Name"
          id={`group-${group_input_id}`}
        />
      </StyledInputGroup>
      <StyledInputGroup>
        <StyledLabel htmlFor={`search-${search_input_id}`}>
          Send Invitation
        </StyledLabel>
        <StyledInput
          type="text"
          $mode={_mode}
          placeholder="Search Player"
          id={`search-${search_input_id}`}
          ref={search_input_ref}
          onChange={(event) => {
            dispatch(updatePage(1));
            dispatch(updateFetchUserResult([]));
            timeout_ref.current && clearTimeout(timeout_ref.current);
            if (event.target.value) {
              timeout_ref.current = setTimeout(() => {
                dispatch(
                  fetchUserApi({
                    fetch_type: "group",
                    query: event.target.value,
                  })
                );
              }, 800);
            }
          }}
        />
      </StyledInputGroup>
      <StyledTagWrapper>
        {group_users.map((user) => {
          return (
            <StyledUserTag key={user.id}>
              <StyledAvatarWrapper>
                <ChatAvatar user={user} />
              </StyledAvatarWrapper>
              <StyledAvatarUsername>{user.name}</StyledAvatarUsername>
              <StyledRemoveCta
                onClick={(event) => {
                  event.stopPropagation();
                  setGroupUsers((prev) => {
                    return prev.filter((_user) => _user.id !== user.id);
                  });
                }}
              >
                <CloseIcon size={12} color={theme.palette.primary.dark} />
              </StyledRemoveCta>
            </StyledUserTag>
          );
        })}
      </StyledTagWrapper>
      <StyledBottomCtaWrapper>
        <StyledCreateCta
          onClick={() => {
            if (group_name_input_ref.current?.value) {
              dispatch(
                createGroupApi({
                  group_name: group_name_input_ref.current.value,
                  user_ids: group_users.map((user) => user.id),
                })
              )
                .unwrap()
                .catch((error) => {
                  console.log("value of error", error);
                });
              dispatch(updateShowCreateGroupDrownDown(false));
            }
          }}
          disabled={
            !group_users.length || !group_name_input_ref?.current?.value
          }
        >
          Create
        </StyledCreateCta>
      </StyledBottomCtaWrapper>
      {Boolean(fetched_user_result.length) && fetch_type == "group" && (
        <PlayerSearchResult
          group_user={group_users}
          updateGroupUserIds={(player, action) => {
            if (action == "add") {
              setGroupUsers((prev) => [...prev, player]);
            } else {
              setGroupUsers((prev) => {
                return prev.filter((user) => {
                  return user.id !== player.id;
                });
              });
            }
          }}
          ref={search_input_ref}
        />
      )}
    </StyledCreateGroupModalWrapper>
  );
};

export default forwardRef(CreateGroupModal);
