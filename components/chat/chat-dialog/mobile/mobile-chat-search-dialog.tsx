import { useRef, forwardRef, useImperativeHandle } from "react";
// types
import type { FC, ForwardRefRenderFunction } from "react";

// styled components
import { StyledDialogContainer } from "@/styles/components/chat/chat-dialog/mobile/mobile-chat-search-dialog.style";

// local components
import ChatSearchInput from "@/components/chat/chat-sidebar/chat-search-input";

const MobileChatSearchDialog: ForwardRefRenderFunction<HTMLDialogElement> = (
  props,
  dialog_ref
) => {
  return (
    <StyledDialogContainer ref={dialog_ref}>
      <ChatSearchInput />
    </StyledDialogContainer>
  );
};

export default forwardRef(MobileChatSearchDialog);
