import { useRef, useId, useState, useEffect } from "react";
import { useRouter } from "next/router";
// types
import type { FC } from "react";
import type { Channel } from "pusher-js";

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
  typingUser,
  activeUser,
  // api
  sendMessageApi,
  sendInvitationApi,
} from "@/store/slice/chat.slice";
import { activeGroup, typingUsers } from "@/store/slice/group.slice";
import { createPokerRoomApi } from "@/store/slice/poker/poker.slice";

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";
import { usePusher } from "@/hooks/pusher.hook";
// import { useEcho } from "@/hooks/pusher.hook";

// helpers
import { v4 as uuidv4 } from "uuid";

const ChatInput: FC<{}> = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  // const echo = useEcho();
  const _mode = useAppSelector(mode);
  const pusher = usePusher();
  const show_emoji = useAppSelector(showEmoji);
  const is_request_pending = useAppSelector(isRequestPending);
  const user = useAppSelector(User);
  const active_user = useAppSelector(activeUser);
  const active_group = useAppSelector(activeGroup);
  const typing_user = useAppSelector(typingUser); // for one to one chat
  const typing_users = useAppSelector(typingUsers); // for group chat
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
  const channel_ref = useRef<{
    private_channel: Channel | null | undefined;
    presence_channel: Channel | null | undefined;
  }>({
    private_channel: null,
    presence_channel: null,
  });

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

  const placeholderTextHandler = () => {
    if (active_user) {
      return typing_user?.id == active_user.id
        ? `${typing_user.name} is typing`
        : "Your Message";
    } else if (active_group) {
      return typing_users.length
        ? `${typing_users.map(({ name }) => name).join(", ")} ${
            typing_users.length > 1 ? "are" : "is"
          } typing`
        : "Your Message";
    }
  };

  useEffect(() => {
    channel_ref.current.private_channel =
      active_user && pusher?.subscribe(`private-chat.${active_user.id}`);
    channel_ref.current.presence_channel =
      active_group &&
      pusher?.subscribe(`presence-group-chat.${active_group.id}`);
    return () => {
      channel_ref.current.private_channel?.unsubscribe();
      channel_ref.current.presence_channel?.unsubscribe();
    };
  }, [active_user, active_group, pusher]);
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
            placeholder={placeholderTextHandler()}
            onKeyDown={(event) => {
              active_user &&
                setTimeout(() => {
                  channel_ref.current.private_channel?.trigger(
                    "client-typing",
                    {
                      user: user,
                    }
                  );
                }, 600);
              active_group &&
                setTimeout(() => {
                  channel_ref.current.presence_channel?.trigger(
                    "client-typing",
                    {
                      user: user,
                    }
                  );
                }, 600);
              if (
                user?.id &&
                (input_ref.current?.value ||
                  upload_input_ref.current?.files?.length) &&
                !is_request_pending &&
                (event.metaKey || event.ctrlKey) &&
                event.key == "Enter"
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
