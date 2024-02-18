// types
import type { FC } from "react";
import type { Theme } from "@/theme/chat.theme";

// styled components
import {
  StyledCreateGroupModalWrapper,
  StyledHeader,
  StyledTextWrapper,
  StyledHeaderMainText,
  StyledHeaderSubtitle,
  StyledIconButton,
} from "@/styles/components/common/create-group/create-group-modal.style";

// theme
import { useTheme } from "styled-components";

// redux
import { useAppDispatch } from "@/hooks/redux.hook";
import { updateShowCreateGroupDrownDown } from "@/store/slice/common.slice";

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

const CreateGroupModal: FC = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme() as Theme;
  return (
    <StyledCreateGroupModalWrapper>
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
    </StyledCreateGroupModalWrapper>
  );
};

export default CreateGroupModal;
