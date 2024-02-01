import { useRef, useState } from "react";
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
  StyledUploadedImage,
  StyledUploadInput,
  StyledUploadBottomInfoWrapper,
  StyledText,
  StyledSaveCtaWrapper,
  StyledSaveCta,
} from "@/styles/components/common/user-profile/upload-profile-modal.style";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import {
  // state
  show_profile_upload_modal,
  // actions
  updateShowProfileUploadModal,
  // apis
  updateProfileApi,
} from "@/store/slice/common.slice";

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
  const [file_state, setFileState] = useState<{
    state: 0 | 1 | 2;
    file: string | ArrayBuffer | null;
  }>({
    state: 0, // 0 => empty; 1 => loading; 2 => done;
    file: "",
  });
  const file_ref = useRef<HTMLInputElement>(null);
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
            {file_state.state == 2 ? (
              <StyledUploadedImage
                alt="preview"
                src={file_state.file as string}
                fill={true}
              />
            ) : (
              <Image
                alt="uplaod file"
                width={120}
                height={127}
                src="/common/user-profile/upload-file.png"
              />
            )}
          </StyledUploadLabel>
          <StyledUploadInput
            ref={file_ref}
            type="file"
            id="upload-file"
            name="profile"
            onChange={(event) => {
              if (event.target.files) {
                const file_reader = new FileReader();
                const file = event.target.files[0];
                file_reader.onloadend = () => {
                  setFileState({
                    file: file_reader.result,
                    state: file_reader.readyState,
                  });
                };
                if (file) {
                  file_reader.readAsDataURL(file);
                }
              }
            }}
          />
          <StyledUploadBottomInfoWrapper>
            <StyledText>Formats: png, jpeg</StyledText>
            <StyledText>File Size: 3MB</StyledText>
          </StyledUploadBottomInfoWrapper>
        </StyledUploadInputContainer>
        <StyledSaveCtaWrapper>
          <StyledSaveCta
            onClick={() => {
              if (
                file_ref.current &&
                file_ref.current.files &&
                file_ref.current.files[0]
              ) {
                const form_data = new FormData();
                form_data.append("avatar", file_ref.current.files[0]);
                dispatch(updateProfileApi({ form_data: form_data }));
                dispatch(updateShowProfileUploadModal(false));
              }
            }}
          >
            Save
          </StyledSaveCta>
        </StyledSaveCtaWrapper>
      </StyledModalContent>
    </StyledChatUserUploadWrapper>
  );
};
export default ChatUserUpload;
