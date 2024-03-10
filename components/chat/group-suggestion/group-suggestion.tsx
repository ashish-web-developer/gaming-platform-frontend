// type
import type { FC } from "react";

// styled components
import {
  StyledGroupSuggestionWrapper,
  StyledDetailsWrapper,
  StyledGroupList,
} from "@/styles/components/chat/group-suggestion/group-suggestion.style";

// local components
import ChatGroup from "@/components/chat/chat-sidebar/chat-group-list/chat-group";
// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { recommended_groups } from "@/store/slice/group.slice";
const GroupSuggestion: FC = () => {
  const _recommended_groups = useAppSelector(recommended_groups);
  return (
    <StyledGroupSuggestionWrapper>
      <StyledDetailsWrapper>Groups Suggestions</StyledDetailsWrapper>
      <StyledGroupList>
        {_recommended_groups.map((group, index) => {
          return (
            <ChatGroup
              show_follow_cta={true}
              key={`chat-group-${index}`}
              {...group}
            />
          );
        })}
      </StyledGroupList>
    </StyledGroupSuggestionWrapper>
  );
};
export default GroupSuggestion;
