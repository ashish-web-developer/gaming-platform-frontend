import { useRef, useId, useState } from "react";
import { useRouter } from "next/router";
// types
import type { FC } from "react";

// styled components
import {
  StyledChatInputContainer,
  StyledChatInputWrapper,
  StyledUserProfileWrapper,
  StyledUserProfileImage,
  StyledEmojiCta,
  StyledEmojiImage,
  StyledChatInput,
  StyledBottomWrapper,
  StyledIconWrapper,
  StyledIconCta,
  StyledInputLabel,
  StyledUploadInput,
  StyledUploadedImage,
  StyledIconImage,
  StyledSendCta,
} from "@/styles/components/chat/chat-input/chat-input.style";

// local components
import EmojiPicker from "@/components/common/emoji-picker";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import { mode, showEmoji, updateShowEmoji } from "@/store/slice/common.slice";
import { User } from "@/store/slice/login.slice";
import {
  isRequestPending,
  is_typing,
  activeUser,
  // api
  sendMessageApi,
  sendInvitationApi,
} from "@/store/slice/chat.slice";
import { activeGroup } from "@/store/slice/group.slice";
import { createPokerRoomApi } from "@/store/slice/poker/poker.slice";
import { createCognimatchRoomApi } from "@/store/slice/cognimatch.slice";

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";
// import { useEcho } from "@/hooks/pusher.hook";

// helpers
import { v4 as uuidv4 } from "uuid";

const ChatInput: FC<{}> = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  // const echo = useEcho();
  const _mode = useAppSelector(mode);
  const show_emoji = useAppSelector(showEmoji);
  const is_request_pending = useAppSelector(isRequestPending);
  const user = useAppSelector(User);
  const active_user = useAppSelector(activeUser);
  const active_group = useAppSelector(activeGroup);
  const _is_typing = useAppSelector(is_typing);
  const user_avatar_url = useAvatarUrl(user);
  const input_ref = useRef<HTMLInputElement>(null);
  const emoji_cta_ref = useRef(null);
  const media_recoder = useRef<MediaRecorder>();
  const upload_input_id = useId();
  const upload_input_ref = useRef<HTMLInputElement>(null);
  const audio_chunks = useRef<Blob[]>([]);
  const [uploaded_file, set_uploaded_file] = useState<
    {
      state: 0 | 1 | 2;
      file: string | ArrayBuffer | null;
    }[]
  >([]);

  const handleFormSubmission = ({
    message,
    sender_id,
    group_id,
    receiver_id,
  }: {
    message: string | null;
    sender_id: number;
    group_id: null | number;
    receiver_id: null | number;
  }) => {
    const form_data = new FormData();
    message && form_data.append("message", message);
    form_data.append("sender_id", sender_id.toString());
    group_id && form_data.append("group_id", group_id.toString());
    receiver_id && form_data.append("receiver_id", receiver_id.toString());
    if (upload_input_ref.current?.files?.length) {
      const files = Array.from(upload_input_ref.current.files);
      for (const file of files) {
        form_data.append("files[]", file);
      }
    }
    dispatch(
      sendMessageApi({
        form_data,
      })
    );
    set_uploaded_file([]);
  };
  return (
    <>
      {show_emoji && (
        <EmojiPicker ref={input_ref} emoji_cta_ref={emoji_cta_ref} />
      )}
      <StyledChatInputContainer $mode={_mode}>
        <StyledChatInputWrapper>
          <StyledChatInput
            type="text"
            ref={input_ref}
            placeholder={
              _is_typing ? `${active_user?.name} is typing` : "Your Message"
            }
            // onKeyDown={(event) => {
            //   if (active_user) {
            //     setTimeout(() => {
            //       echo
            //         ?.private(`chat.${active_user.id}`)
            //         //@ts-ignore
            //         .whisper("typing", {
            //           is_typing: true,
            //           user: user,
            //         });
            //     }, 300);
            //   }
            //   if (
            //     user?.id &&
            //     (input_ref.current?.value ||
            //       upload_input_ref.current?.files?.length) &&
            //     !is_request_pending &&
            //     (event.metaKey || event.ctrlKey) &&
            //     event.key == "Enter"
            //   ) {
            //     handleFormSubmission({
            //       message: input_ref.current ? input_ref.current.value : null,
            //       sender_id: user.id,
            //       receiver_id: active_user ? active_user.id : null,
            //       group_id: active_group ? active_group.id : null,
            //     });
            //     if (input_ref.current) {
            //       input_ref.current.value = "";
            //     }
            //   }
            // }}
          />
          <StyledUserProfileWrapper>
            <StyledUserProfileImage
              alt={"user-avatar"}
              src={user_avatar_url}
              fill={true}
              sizes="(max-width: 1400px) 5vw"
            />
          </StyledUserProfileWrapper>
          <StyledEmojiCta
            ref={emoji_cta_ref}
            onClick={() => {
              dispatch(updateShowEmoji(!show_emoji));
            }}
          >
            <StyledEmojiImage
              alt="emoji"
              fill={true}
              src="/chat/chat-input/emoji.png"
              sizes="(max-width: 1400px) 5vw"
            />
          </StyledEmojiCta>
        </StyledChatInputWrapper>
        <StyledBottomWrapper>
          <StyledIconWrapper>
            <StyledInputLabel htmlFor={`upload-input-${upload_input_id}`}>
              <StyledIconImage
                fill={true}
                alt="icon"
                src="/chat/chat-input/paper-clip.png"
                sizes="(max-width: 1400px) 5vw"
              />
            </StyledInputLabel>
            <StyledUploadInput
              ref={upload_input_ref}
              onChange={(event) => {
                set_uploaded_file([]);
                if (upload_input_ref.current?.files?.length) {
                  const files = Array.from(upload_input_ref.current.files);
                  for (const file of files) {
                    const file_reader = new FileReader();
                    file_reader.onloadend = () => {
                      set_uploaded_file((prev) => {
                        return [
                          ...prev,
                          {
                            file: file_reader.result,
                            state: file_reader.readyState,
                          },
                        ];
                      });
                    };
                    file_reader.readAsDataURL(file);
                  }
                }
              }}
              type="file"
              id={`upload-input-${upload_input_id}`}
              multiple
            />

            <StyledIconCta
              onClick={async (event) => {
                if (!media_recoder.current) {
                  const media_stream =
                    await navigator.mediaDevices.getUserMedia({ audio: true });
                  // const audio_media_recorder = new AudioMediaRecorder(media_stream);
                  media_recoder.current = new MediaRecorder(media_stream);
                  media_recoder.current.addEventListener(
                    "dataavailable",
                    (event) => {
                      audio_chunks.current.push(event.data);
                    }
                  );
                }
              }}
            >
              <StyledIconImage
                fill={true}
                alt="icon"
                src="/chat/chat-input/mike.png"
                sizes="(max-width: 1400px) 5vw"
              />
            </StyledIconCta>
            <StyledIconCta
              onClick={() => {
                const room_id = uuidv4();
                if (active_group) {
                  dispatch(
                    createPokerRoomApi({
                      room_id,
                      small_blind: 5,
                      chips_in_pot: 0,
                    })
                  );
                  dispatch(
                    sendInvitationApi({
                      game: "poker",
                      room_id,
                    })
                  );
                  router.push("/poker");
                } else {
                  dispatch(
                    createCognimatchRoomApi({
                      room_id,
                      players_id: [
                        user?.id as number,
                        active_user?.id as number,
                      ],
                    })
                  );
                  dispatch(
                    sendInvitationApi({
                      game: "cognimatch",
                      room_id,
                    })
                  );
                  // router.push("/cognimatch");
                }
              }}
            >
              <StyledIconImage
                fill={true}
                alt="icon"
                src="/chat/chat-input/game-icon.png"
                sizes="(max-width: 1400px) 5vw"
              />
            </StyledIconCta>
            {uploaded_file.map((file) => {
              if (file.state == 2) {
                return (
                  <StyledUploadedImage
                    src={file.file as string}
                    width={30}
                    height={30}
                    alt="uploaded-image"
                  />
                );
              }
            })}
          </StyledIconWrapper>
          <StyledSendCta
            onClick={() => {
              if (
                (input_ref.current?.value ||
                  upload_input_ref.current?.files?.length) &&
                user?.id
              ) {
                handleFormSubmission({
                  message: input_ref.current ? input_ref.current.value : null,
                  sender_id: user.id,
                  receiver_id: active_user ? active_user.id : null,
                  group_id: active_group ? active_group.id : null,
                });
                if (input_ref.current) {
                  input_ref.current.value = "";
                }
              }
            }}
            disabled={is_request_pending}
          >
            Send
          </StyledSendCta>
        </StyledBottomWrapper>
      </StyledChatInputContainer>
    </>
  );
};

export default ChatInput;
