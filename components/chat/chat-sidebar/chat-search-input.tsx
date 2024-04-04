import { useRef, forwardRef } from "react";
// types
import type { ForwardRefRenderFunction, RefObject } from "react";

// styled components
import {
  StyledChatSearchInputContainer,
  StyledChatSearchInput,
  StyledInputIcon,
} from "@/styles/components/chat/chat-sidebar/chat-search-input.style";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import {
  // state
  // actions
  updateFetchUserResult,
  updatePage,
  // api calls
  fetchUserApi,
} from "@/store/slice/chat.slice";
import { mode } from "@/store/slice/common.slice";

const ChatSearchInput: ForwardRefRenderFunction<
  HTMLInputElement,
  {
    search_container_ref: RefObject<HTMLDivElement>;
  }
> = ({ search_container_ref }, search_input_ref) => {
  const dispatch = useAppDispatch();
  const _mode = useAppSelector(mode);
  const timeout_ref = useRef<NodeJS.Timeout | null>(null);
  return (
    <StyledChatSearchInputContainer ref={search_container_ref}>
      <StyledChatSearchInput
        $mode={_mode}
        ref={search_input_ref}
        onChange={(event) => {
          dispatch(updatePage(1));
          dispatch(updateFetchUserResult([]));
          timeout_ref.current && clearInterval(timeout_ref.current);
          if (event.target.value) {
            timeout_ref.current = setTimeout(() => {
              dispatch(
                fetchUserApi({
                  fetch_type: "chat",
                  query: event.target.value,
                })
              );
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
