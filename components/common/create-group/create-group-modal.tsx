import { useId, useRef, forwardRef } from "react";
// types
import type { ForwardRefRenderFunction, FC } from "react";
import type { Theme } from "@/theme/chat.theme";

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
  StyledCreateCta,
} from "@/styles/components/common/create-group/create-group-modal.style";

// local components
import PlayerSearch from "@/components/common/create-group/player-search";

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
  fetched_user_result,
  fetch_type,
  fetchUserApi,
  // action
  updateFetchUserResult,
  updatePage,
} from "@/store/slice/chat.slice";

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
  const theme = useTheme() as Theme;
  const _mode = useAppSelector(mode);
  const _fetched_user_result = useAppSelector(fetched_user_result);
  const _fetch_type = useAppSelector(fetch_type);
  const group_input_id = useId();
  const search_input_id = useId();
  const container_ref = useRef<HTMLDivElement>(null);
  const search_input_ref = useRef<HTMLInputElement>(null);
  const timeout_ref = useRef<NodeJS.Timeout | null>(null);

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
      <StyledBottomCtaWrapper>
        <StyledCreateCta>Create</StyledCreateCta>
      </StyledBottomCtaWrapper>
      {Boolean(_fetched_user_result.length) && _fetch_type == "group" && (
        <PlayerSearch ref={search_input_ref} />
      )}
    </StyledCreateGroupModalWrapper>
  );
};

export default forwardRef(CreateGroupModal);
