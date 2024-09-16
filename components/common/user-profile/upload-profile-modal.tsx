import { useRef, useState, forwardRef, useEffect } from "react";
import Image from "next/image";
// types
import type { FC, ForwardRefRenderFunction } from "react";
import type { Theme } from "@/theme/chat.theme";

// styled components
import {
  StyledChatUserUploadWrapper,
  StyledGirlImageWrapper,
  StyledGirlImage,
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
  StyledCtaWrapper,
  StyledSaveCta,
} from "@/styles/components/common/user-profile/upload-profile-modal.style";

// theme
import { useTheme } from "styled-components";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import {
  // state
  show_profile_upload_modal,
  // actions
  updateShowProfileDropDown,
  updateShowProfileUploadModal,
  // apis
} from "@/store/slice/common.slice";
import { updateProfileApi } from "@/store/slice/login.slice";

// helpers package
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";

// hooks
import { useOutsideClickHandler, useIsMounted } from "@/hooks/common.hook";

// gsap
import gsap from "gsap";

export type IFileState = {
  state: 0 | 1 | 2; // 0 => empty; 1 => loading; 2 => done;
  file: string | ArrayBuffer | null;
};

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

const CropIcon: FC<{ color: string; size: number }> = ({ color, size }) => {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        fill={color}
        d="M128 32c0-17.7-14.3-32-32-32S64 14.3 64 32v32H32C14.3 64 0 78.3 0 96s14.3 32 32 32h32v256c0 35.3 28.7 64 64 64h224v-64H128V32zm256 448c0 17.7 14.3 32 32 32s32-14.3 32-32v-32h32c17.7 0 32-14.3 32-32s-14.3-32-32-32h-32V128c0-35.3-28.7-64-64-64H160v64h224v352z"
      ></path>
    </svg>
  );
};
const UploadProfileModal: ForwardRefRenderFunction<
  HTMLElement,
  {
    secondary_color: string;
    font_family: string;
    show_girl_image?: boolean;
    onClickHandler: (file_state: IFileState, file: File) => void;
  }
> = (
  { secondary_color, font_family, show_girl_image = false, onClickHandler },
  camera_cta_ref
) => {
  const dispatch = useAppDispatch();
  const theme = useTheme() as Theme;
  const _show_profile_upload_modal = useAppSelector(show_profile_upload_modal);
  const [file_state, setFileState] = useState<IFileState>({
    state: 0, // 0 => empty; 1 => loading; 2 => done;
    file: "",
  });
  const [cropper_active, setCropperActive] = useState<boolean>(false);
  const modal_ref = useRef<HTMLDialogElement>(null);
  const file_input_ref = useRef<HTMLInputElement>(null);
  const uploaded_image_ref = useRef<HTMLImageElement>(null);
  const cropper_ref = useRef<Cropper | null>(null);
  const gsap_context_ref = useRef<gsap.Context>();
  const is_mount = useIsMounted();

  /**
   * Not adding the cropper to uploaded_image_ref
   * inside onClick handler because first
   * we need to replace label with div, then
   * add the cropper on uploaded image ref
   */
  useEffect(() => {
    if (cropper_active) {
      if (uploaded_image_ref.current) {
        cropper_ref.current = new Cropper(uploaded_image_ref.current, {
          aspectRatio: 0,
          viewMode: 0,
        });
      }
    } else if (cropper_ref.current) {
      const canvas = cropper_ref.current.getCroppedCanvas();
      if (canvas) {
        setFileState((prev) => ({
          ...prev,
          file: canvas.toDataURL("image/jpeg"),
        }));
      }
      cropper_ref.current?.destroy();
      cropper_ref.current = null;
    }
  }, [cropper_active]);

  /**
   * setting profile_drown_down value to false here
   * because if we set it in the event handler of the
   * camera cta, then we won't we have to have access
   * camera_cta_ref
   */
  useEffect(() => {
    if (is_mount) {
      dispatch(updateShowProfileDropDown(false));
    }
  }, [is_mount]);

  useEffect(() => {
    // handling close
    const handleClose = async (event: MouseEvent) => {
      if (
        modal_ref.current?.contains(event.target as Node) ||
        (typeof camera_cta_ref !== "function" &&
          camera_cta_ref?.current?.contains(event.target as Node))
      ) {
        return;
      }
      await gsap_context_ref.current?.onClose();
      dispatch(updateShowProfileUploadModal(false));
    };

    /**
     * Handling all modal animation here
     */
    if (_show_profile_upload_modal) {
      gsap_context_ref.current = gsap.context((self) => {
        gsap
          .timeline()
          .from(modal_ref.current, {
            ease: "power3.inOut",
            scale: 0.5,
            duration: 0.5,
          })
          .from("#modal-girl-image-wrraper", {
            opacity: 0,
            top: 60,
            duration: 1,
            ease: "expo.inOut",
          });
        self.add("onClose", () => {
          return new Promise((resolve) => {
            gsap
              .timeline({
                onComplete: resolve,
              })
              .to("#modal-girl-image-wrraper", {
                opacity: 0,
                top: 60,
                duration: 1,
                ease: "expo.inOut",
              })
              .to(modal_ref.current, {
                ease: "power3.inOut",
                scale: 0.5,
                opacity: 0,
                duration: 0.5,
                onComplete: resolve,
              });
          });
        });
      }, modal_ref);
      document.addEventListener("click", handleClose);
    }

    /**
     * Handling On Close
     */
    return () => {
      if (_show_profile_upload_modal) {
        gsap_context_ref.current?.revert();
        document.removeEventListener("click", handleClose);
      }
    };
  }, [_show_profile_upload_modal]);

  return (
    <StyledChatUserUploadWrapper
      ref={modal_ref}
      open={_show_profile_upload_modal}
      $secondary_color={secondary_color}
      $font_family={font_family}
    >
      {show_girl_image && (
        <StyledGirlImageWrapper id="modal-girl-image-wrraper">
          <StyledGirlImage
            fill={true}
            alt="girl-image"
            src="/common/user-profile/girl.png"
          />
        </StyledGirlImageWrapper>
      )}

      <StyledHeader>
        <StyledHeaderMainText $secondary_color={secondary_color}>
          Upload File
        </StyledHeaderMainText>
        <StyledIconButton
          onClick={() => {
            dispatch(updateShowProfileUploadModal(false));
          }}
        >
          <CloseIcon color={theme.palette.primary.dark} size={20} />
        </StyledIconButton>
      </StyledHeader>
      <StyledModalContent>
        <StyledUploadInputContainer>
          <StyledUploadLabel
            $secondary_color={secondary_color}
            as={cropper_active ? "div" : "label"}
            htmlFor="upload-file"
          >
            {file_state.state == 2 ? (
              <StyledUploadedImage
                alt="preview"
                src={file_state.file as string}
                fill={true}
                ref={uploaded_image_ref}
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
            ref={file_input_ref}
            type="file"
            id="upload-file"
            name="profile"
            multiple={false}
            accept=".jpg,.png"
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
            <StyledText $secondary_color={secondary_color}>
              Formats: png, jpeg
            </StyledText>
            <StyledText $secondary_color={secondary_color}>
              File Size: 3MB
            </StyledText>
          </StyledUploadBottomInfoWrapper>
        </StyledUploadInputContainer>
        <StyledCtaWrapper>
          <span>
            {file_state.state == 2 && (
              <StyledIconButton
                onClick={() => {
                  setCropperActive((prev) => !prev);
                }}
              >
                <CropIcon color={theme.palette.primary.dark} size={25} />
              </StyledIconButton>
            )}
          </span>

          <StyledSaveCta
            $font_family={font_family}
            $secondary_color={secondary_color}
            onClick={async () => {
              if (
                file_input_ref.current &&
                file_input_ref.current.files &&
                file_input_ref.current.files[0]
              ) {
                // const form_data = new FormData();
                // form_data.append("avatar", file_input_ref.current.files[0]);
                // dispatch(updateProfileApi({ form_data: form_data }));
                onClickHandler(file_state, file_input_ref.current.files[0]);
                await gsap_context_ref.current?.onClose();
                dispatch(updateShowProfileUploadModal(false));
              }
            }}
          >
            Save
          </StyledSaveCta>
        </StyledCtaWrapper>
      </StyledModalContent>
    </StyledChatUserUploadWrapper>
  );
};
export default forwardRef(UploadProfileModal);
