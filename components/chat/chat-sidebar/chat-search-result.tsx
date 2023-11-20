import type { FC } from "react";

// styled components
import {
  StyledChatSearchResult,
  StyledProfileContainer,
  StyledProfileImage,
  StyledProfileDetails,
  StyledName,
  StyledUserName,
} from "@/styles/components/chat/chat-sidebar/chat-search-result.style";

// redux
import { useAppSelector } from "@/hooks/redux";
import { fetched_user_result } from "@/store/slice/chat.slice";

// hooks
import useAvatar from "@/hooks/profile";

const ChatResultProfile: FC<{ name: string; username: string }> = ({
  name,
  username,
}) => {
  const avatar = useAvatar(name ?? "");
  return (
    <StyledProfileContainer>
      <StyledProfileImage
        dangerouslySetInnerHTML={{
          __html: avatar,
        }}
      />
      <StyledProfileDetails>
        <StyledName>{name}</StyledName>
        <StyledUserName>{username}</StyledUserName>
      </StyledProfileDetails>
    </StyledProfileContainer>
  );
};

const ChatSearchResult: FC = () => {
  const _fetched_user_result = useAppSelector(fetched_user_result);
  return (
    <>
      {_fetched_user_result.length && (
        <StyledChatSearchResult>
          {_fetched_user_result.map(({ name, username }) => {
            return (
              <ChatResultProfile
                name={name as string}
                username={username as string}
              />
            );
          })}
        </StyledChatSearchResult>
      )}
    </>
  );
};

export default ChatSearchResult;
