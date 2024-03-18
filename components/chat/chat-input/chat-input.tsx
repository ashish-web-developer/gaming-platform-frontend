import { useRef, useId, useState } from "react";
// types
import type { FC } from "react";
import type { IUsersWithConversation } from "@/types/store/slice/chat";

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
import { mode, show_emoji, updateShowEmoji } from "@/store/slice/common.slice";
import { user } from "@/store/slice/user.slice";
import {
  is_request_pending,
  is_typing,
  active_user,
  sendMessageApi,
} from "@/store/slice/chat.slice";
import { active_group } from "@/store/slice/group.slice";

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";
import { useEcho } from "@/hooks/pusher.hook";

const ChatInput: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const echo = useEcho();
  const _mode = useAppSelector(mode);
  const _show_emoji = useAppSelector(show_emoji);
  const _is_request_pending = useAppSelector(is_request_pending);
  const _user = useAppSelector(user);
  const _active_user = useAppSelector(active_user);
  const _active_group = useAppSelector(active_group);
  const _is_typing = useAppSelector(is_typing);
  const user_avatar_url = useAvatarUrl(_user as IUsersWithConversation);
  const input_ref = useRef<HTMLInputElement>(null);
  const emoji_cta_ref = useRef(null);
  const media_recoder = useRef<MediaRecorder>();
  const upload_input_id = useId();
  const upload_input_ref = useRef<HTMLInputElement>(null);
  const [uploaded_file, set_uploaded_file] = useState<
    {
      state: 0 | 1 | 2;
      file: string | ArrayBuffer | null;
    }[]
  >([]);

  const handle_form_submission = ({
    message,
    sender_id,
    group_id,
    receiver_id,
  }: {
    message: string;
    sender_id: number;
    group_id: null | number;
    receiver_id: null | number;
  }) => {
    const form_data = new FormData();
    form_data.append("message", message);
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
      {_show_emoji && (
        <EmojiPicker ref={input_ref} emoji_cta_ref={emoji_cta_ref} />
      )}
      <StyledChatInputContainer $mode={_mode}>
        <StyledChatInputWrapper>
          <StyledChatInput
            type="text"
            ref={input_ref}
            placeholder={
              _is_typing ? `${_active_user?.name} is typing` : "Your Message"
            }
            onKeyDown={(event) => {
              if (_active_user) {
                setTimeout(() => {
                  echo
                    ?.private(`chat.${_active_user.id}`)
                    //@ts-ignore
                    .whisper("typing", {
                      is_typing: true,
                      user: _user,
                    });
                }, 300);
              }
              if (
                _user.id &&
                input_ref.current?.value &&
                !_is_request_pending &&
                (event.metaKey || event.ctrlKey) &&
                event.key == "Enter"
              ) {
                handle_form_submission({
                  message: input_ref.current.value,
                  sender_id: _user.id,
                  receiver_id: _active_user ? _active_user.id : null,
                  group_id: _active_group ? _active_group.id : null,
                });
                input_ref.current.value = "";
              }
            }}
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
              dispatch(updateShowEmoji(!_show_emoji));
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
              onClick={(event) => {
                if (!media_recoder.current) {
                  navigator.mediaDevices
                    .getUserMedia({ audio: true })
                    .then((stream) => {
                      console.log(stream);
                      media_recoder.current = new MediaRecorder(stream);
                      const audio_chunks: Blob[] = [];
                      media_recoder.current.addEventListener(
                        "dataavailable",
                        function (event) {
                          audio_chunks.push(event.data);
                        }
                      );
                      media_recoder.current.addEventListener("start", () => {
                        console.log("audio got started");
                      });
                      media_recoder.current.addEventListener("stop", () => {
                        const audio_blob = new Blob(audio_chunks);
                        const audio_url = URL.createObjectURL(audio_blob);
                        const audio = new Audio(audio_url);
                        audio.play();
                      });
                      media_recoder.current.start();
                    });
                  return;
                }
                media_recoder.current.stop();
                media_recoder.current = undefined;
              }}
            >
              <StyledIconImage
                fill={true}
                alt="icon"
                src="/chat/chat-input/mike.png"
                sizes="(max-width: 1400px) 5vw"
              />
            </StyledIconCta>
            <StyledIconCta>
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
              if (input_ref.current && _user.id) {
                handle_form_submission({
                  message: input_ref.current.value,
                  sender_id: _user.id,
                  receiver_id: _active_user ? _active_user.id : null,
                  group_id: _active_group ? _active_group.id : null,
                });
                input_ref.current.value = "";
              }
            }}
            disabled={_is_request_pending}
          >
            Send
          </StyledSendCta>
        </StyledBottomWrapper>
      </StyledChatInputContainer>
    </>
  );
};

export default ChatInput;
