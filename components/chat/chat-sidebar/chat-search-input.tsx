import { useRef, forwardRef } from "react";
// types
import type { ForwardRefRenderFunction } from "react";

// styled components
import {
  StyledChatSearchInputContainer,
  StyledChatSearchInput,
  StyledInputIcon,
} from "@/styles/components/chat/chat-sidebar/chat-search-input.style";

// styled theme
import { useTheme } from "styled-components";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import {
  // state
  search_input_value,
  // actions
  updateSearchInputValue,
  updateFetchUserResult,
  updatePage,
  // api calls
  fetchUser,
} from "@/store/slice/chat.slice";
import { mode } from "@/store/slice/common.slice";

const ChatSearchInput: ForwardRefRenderFunction<HTMLDivElement> = (
  props,
  ref
) => {
  const dispatch = useAppDispatch();
  const _mode = useAppSelector(mode);
  const _search_input_value = useAppSelector(search_input_value);
  const timeout_ref = useRef<NodeJS.Timeout | null>(null);
  return (
    <StyledChatSearchInputContainer ref={ref}>
      <StyledChatSearchInput
        $mode={_mode}
        value={_search_input_value}
        onChange={(event) => {
          dispatch(updateSearchInputValue(event.target.value));
          dispatch(updatePage(1));
          dispatch(updateFetchUserResult([]));
          if (!event.target.value) {
            dispatch(updateFetchUserResult([]));
          } else {
            timeout_ref.current && clearInterval(timeout_ref.current);
            timeout_ref.current = setTimeout(() => {
              dispatch(fetchUser());
            }, 800);
          }
        }}
        placeholder="Search Players"
      />
      <StyledInputIcon
        alt="search icon"
        width={35}
        height={35}
        src={`/chat/chat-sidebar/chat-search-input/${_mode}-search.png`}
      />
    </StyledChatSearchInputContainer>
  );
};

export default forwardRef(ChatSearchInput);
