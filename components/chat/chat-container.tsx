// types
import type { FC } from "react";
import type { User } from "@/types/user";

// mui
import { IconButton, Button } from "@mui/material";

// local components
import ChatSidebar from "@/components/chat/chat-sidebar";
import ChatAvatar from "@/components/chat/chat-avatar";

// styled components
import {
  // components
  StyledContainer,
  StyledContainerItem,
  StyledChatItem,
  StyledChatWrapper,
  StyledChat,
  StyledAvatar,
  StyledChatInput,
  StyledChatContainerName,
  StyledEmojiPicker,
  StyledPlayButton,
  // icons
  StyledEmojiIcon,
  StyledSendIcon,
  StyledAudioIcon,
} from "@/styles/components/chat/chat-container.style";

// styled theme
import { useTheme } from "styled-components";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import {
  // state
  active_user,
  active_user_conversation,
  is_submitting,
  chat_input_value,
  // actions
  sendMessage,
  updateChatInputValue,
  updateActiveUserConversation,
} from "@/store/slice/chat.slice";

import { user } from "@/store/slice/user.slice";
import { showEmoji, updateShowEmoji } from "@/store/slice/common.slice";

// helpers
import { Axios } from "@/helpers/axios";


const ChatContainer: FC<{
  users: User[];
}> = ({ users }) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const _user = useAppSelector(user);
  const _active_user = useAppSelector(active_user);
  const _active_user_conversation = useAppSelector(active_user_conversation);
  const _is_submitting = useAppSelector(is_submitting);
  const _chat_input_value = useAppSelector(chat_input_value);
  const _showEmoji = useAppSelector(showEmoji);


  const handlePlay = ()=>{
    Axios.post('/play-game-event',{
        receiver_id:_active_user?.id,
        game:"memory_game"
    })
  }
  return (
    <>
      <StyledContainer>
        <StyledContainerItem $flexBasis={"400px"}>
          <ChatSidebar users={users} />
        </StyledContainerItem>
        <StyledContainerItem $flexGrow={1}>
          <StyledEmojiPicker callback={(data)=>{dispatch(updateChatInputValue(`${_chat_input_value} ${data.native}`))}}/>
          {_active_user && (
            <>
              <StyledChatItem
                $flexBasis="100px"
                $flexShrink={0}
                $isFlex={true}
                $flexDirection="row"
                $padding="10px 0px 0px 0px"
              >
                <ChatAvatar
                  width={60}
                  height={60}
                  username={_active_user.username as string}
                />
                <div>
                  <StyledChatContainerName
                    $fontSize="18px"
                    $color={theme.palette.text.main}
                  >
                    {_active_user.name}
                  </StyledChatContainerName>
                  <StyledChatContainerName
                    $fontSize="12px"
                    $color={theme.palette.text.light}
                  >
                    @{_active_user.username}
                  </StyledChatContainerName>
                </div>
              </StyledChatItem>
              <StyledChatItem
                $flexGrow={1}
                $isFlex={true}
                $flexDirection="column"
              >
                {_active_user_conversation.map((conversation, index) => {
                  return (
                    <StyledChatWrapper
                      key={index}
                      $alignSelf={
                        _user.id == conversation.sender_id
                          ? "flex-end"
                          : "flex-start"
                      }
                      $flexDirection={
                        _user.id == conversation.sender_id
                          ? "row"
                          : "row-reverse"
                      }
                    >
                      <StyledChat
                        $backgroundColor={
                          _user.id == conversation.sender_id
                            ? theme.palette.chat.main
                            : theme.palette.chat.light
                        }
                        $borderRadius={
                          _user.id == conversation.sender_id
                            ? "10px 10px 0px 10px"
                            : "10px  10px 10px 0px"
                        }
                        $flexBasis="1"
                      >
                        {conversation.message}
                      </StyledChat>
                      <StyledAvatar $flexBasis="50">
                        <ChatAvatar
                          width={40}
                          height={40}
                          username={
                            _user.id == conversation.sender_id
                              ? (_user.username as string)
                              : (_active_user?.username as string)
                          }
                        />
                      </StyledAvatar>
                    </StyledChatWrapper>
                  );
                })}
              </StyledChatItem>
              <StyledChatItem $flexBasis={"100px"} $flexShrink={0} $isFlex={true} $alignItems="center">
                <div style = {{
                  height:"60px",
                  display:"flex",
                  width:"100%",
                  gap:"20px"
                }}>
                  <IconButton>
                    <StyledAudioIcon/>
                  </IconButton>
                  <IconButton onClick = {()=>{
                    dispatch(updateShowEmoji(!_showEmoji))
                  }}>
                    <StyledEmojiIcon/>
                  </IconButton>
                  <StyledChatInput
                    value = {_chat_input_value}
                    onChange = {(event)=>dispatch(updateChatInputValue(event.target.value))}
                    onKeyDown={(event) => {
                      if ((event.ctrlKey || event.metaKey) && event.key == "Enter") {
                        dispatch(sendMessage());
                      }
                    }}
                    fullWidth={true}
                    disableUnderline={true}
                    placeholder="Write Here"
                    endAdornment={
                      <>
                        <IconButton disabled = {_is_submitting} onClick={()=>dispatch(sendMessage())}>
                          <StyledSendIcon />
                        </IconButton>
                      </>
                    }
                  />
                  <StyledPlayButton onClick={handlePlay}>
                    Let's Play
                  </StyledPlayButton>

                </div>
              </StyledChatItem>
            </>
          )}
        </StyledContainerItem>
        <StyledContainerItem $flexBasis={"200px"}></StyledContainerItem>
      </StyledContainer>
    </>
  );
};

export default ChatContainer;
