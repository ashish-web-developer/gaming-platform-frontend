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
import { default_groups } from "@/store/slice/group.slice";

const ChatGroupList: FC = () => {
  const _default_groups = useAppSelector(default_groups);
  return (
    <StyledChatGroupListWrapper>
      <StyledGroupTag>Groups Chat</StyledGroupTag>
      <StyledGroupListWrapper>
        {_default_groups.map((group, index) => {
          return (
            <ChatGroup
              is_clickable={true}
              key={`chat-group-${index}`}
              {...group}
            />
          );
        })}
      </StyledGroupListWrapper>
    </StyledChatGroupListWrapper>
  );
};

export default ChatGroupList;
