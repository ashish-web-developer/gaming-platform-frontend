// types
import { FC } from "react";

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
import { default_groups } from "@/store/slice/chat.slice";
import { IUsersWithConversation } from "@/types/store/slice/chat";

const ChatGroupList: FC = () => {
  const _default_groups = useAppSelector(default_groups);
  return (
    <StyledChatGroupListWrapper>
      <StyledGroupTag>Groups Chat</StyledGroupTag>
      <StyledGroupListWrapper>
        {_default_groups.map(
          ({ group_color, admin, group_name, user_group }) => {
            return (
              <ChatGroup
                group_color={group_color}
                admin={admin as IUsersWithConversation}
                group_name={group_name}
                user_group={user_group}
              />
            );
          }
        )}
      </StyledGroupListWrapper>
    </StyledChatGroupListWrapper>
  );
};

export default ChatGroupList;
