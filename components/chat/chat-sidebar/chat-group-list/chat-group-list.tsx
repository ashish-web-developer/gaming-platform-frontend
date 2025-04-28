// types
import type { FC } from "react";

// styled components
import {
  StyledChatGroupListWrapper,
  StyledGroupTag,
  StyledGroupListWrapper,
} from "@/styles/components/chat/chat-sidebar/chat-group-list/chat-group-list.style";

// local components
import ChatGroup from "@/components/chat/chat-sidebar/chat-group-list/chat-group";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { defaultGroups } from "@/store/slice/group.slice";

const ChatGroupList: FC = () => {
  const default_groups = useAppSelector(defaultGroups);
  return (
    <StyledChatGroupListWrapper>
      <StyledGroupTag>Groups Chat</StyledGroupTag>
      <StyledGroupListWrapper>
        {default_groups.map((group) => {
          return (
            <ChatGroup
              is_clickable={true}
              key={`chat-group-${group.id}`}
              {...group}
            />
          );
        })}
      </StyledGroupListWrapper>
    </StyledChatGroupListWrapper>
  );
};

export default ChatGroupList;
