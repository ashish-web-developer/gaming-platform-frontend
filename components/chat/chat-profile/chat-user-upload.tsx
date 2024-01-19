import Image from "next/image";
// types
import type { FC } from "react";

// styled components
import {
  StyledChatUserUploadWrapper,
  StyledHeader,
  StyledHeaderMainText,
  StyledIconButton,
  StyledModalContent,
  StyledUploadInputContainer,
  StyledUploadLabel,
  StyledUploadInput,
  StyledUploadBottomInfoWrapper,
  StyledText,
} from "@/styles/components/chat/chat-profile/chat-user-upload.style";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import {
  show_profile_upload_modal,
  updateShowProfileUploadModal,
} from "@/store/slice/chat.slice";

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

const ChatUserUpload: FC = () => {
  const dispatch = useAppDispatch();
  const _show_profile_upload_modal = useAppSelector(show_profile_upload_modal);
  return (
    <StyledChatUserUploadWrapper open={_show_profile_upload_modal}>
      <StyledHeader>
        <StyledHeaderMainText>Upload File</StyledHeaderMainText>
        <StyledIconButton
          onClick={() => {
            dispatch(updateShowProfileUploadModal(false));
          }}
        >
          <CloseIcon color="#A2F263" size={20} />
        </StyledIconButton>
      </StyledHeader>
      <StyledModalContent>
        <StyledUploadInputContainer>
          <StyledUploadLabel htmlFor="upload-file">
            <Image
              alt="uplaod file"
              width={120}
              height={127}
              src="/chat/chat-profile/upload-file.png"
            />
          </StyledUploadLabel>
          <StyledUploadInput type="file" id="upload-file" name="profile" />
          <StyledUploadBottomInfoWrapper>
            <StyledText>Formats: png, jpeg</StyledText>
            <StyledText>File Size: 3MB</StyledText>
          </StyledUploadBottomInfoWrapper>
        </StyledUploadInputContainer>
      </StyledModalContent>
    </StyledChatUserUploadWrapper>
  );
};
export default ChatUserUpload;
