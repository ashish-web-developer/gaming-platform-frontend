import { useEffect } from "react";
// types
import type { FC } from "react";

// styled components
import {
  StyledChatSearchInputContainer,
  StyledChatSearchInput,
  StyledInputIcon,
} from "@/styles/components/chat/chat-sidebar/chat-search-input.style";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import {
  // state
  search_input_value,
  // actions
  updateSearchInputValue,
  // api calls
  fetchUser,
} from "@/store/slice/chat.slice";

const ChatSearchInput: FC = () => {
  const dispatch = useAppDispatch();
  const _search_input_value = useAppSelector(search_input_value);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;
    if (_search_input_value) {
      timeoutId = setTimeout(() => {
        dispatch(fetchUser());
      }, 800);
    }
    return () => timeoutId && clearInterval(timeoutId);
  }, [_search_input_value]);
  return (
    <StyledChatSearchInputContainer>
      <StyledChatSearchInput
        value={_search_input_value}
        onChange={(event) => {
          dispatch(updateSearchInputValue(event.target.value));
        }}
        placeholder="Search Players"
      />
      <StyledInputIcon
        alt="search icon"
        width={35}
        height={35}
        src="/chat/chat-sidebar/chat-search-input/search.svg"
      />
    </StyledChatSearchInputContainer>
  );
};

export default ChatSearchInput;
