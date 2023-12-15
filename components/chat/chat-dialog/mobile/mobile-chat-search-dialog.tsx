import { useRef, forwardRef, useImperativeHandle } from "react";
// types
import type { FC, ForwardRefRenderFunction } from "react";

// styled components
import { StyledDialogContainer } from "@/styles/components/chat/chat-dialog/mobile/mobile-chat-search-dialog.style";

// local components
import ChatSearchInput from "@/components/chat/chat-sidebar/chat-search-input";
import ChatSearchResult from "@/components/chat/chat-sidebar/chat-search-result";

// redux
import { useAppSelector } from "@/hooks/redux";
import { fetched_user_result } from "@/store/slice/chat.slice";

const MobileChatSearchDialog: ForwardRefRenderFunction<
  HTMLDialogElement,
  {}
> = (props, dialog_ref) => {
  const search_input_ref = useRef<HTMLDivElement>(null);
  const _fetched_user_result = useAppSelector(fetched_user_result);
  return (
    <StyledDialogContainer ref={dialog_ref}>
      <ChatSearchInput ref={search_input_ref} />
      {!!_fetched_user_result.length && (
        <ChatSearchResult
          ref={search_input_ref}
          handleModalClose={() => {
            if (typeof dialog_ref !== "function") {
              dialog_ref?.current?.close();
            }
            return;
          }}
        />
      )}
    </StyledDialogContainer>
  );
};

export default forwardRef(MobileChatSearchDialog);
