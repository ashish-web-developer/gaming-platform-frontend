// types
import type { FC } from "react";

// styled components
import { StyledResultDialog } from "@/styles/components/chat/chat-dialog/mobile/mobile-chat-search-result-dialog.style";

// local components
import ChatSearchResult from "@/components/chat/chat-sidebar/chat-search-result";

const MobileChatSearchResultDialog: FC = () => {
  return (
    <StyledResultDialog open={true}>
      <ChatSearchResult />
    </StyledResultDialog>
  );
};
export default MobileChatSearchResultDialog;
