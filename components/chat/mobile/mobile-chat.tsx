// types
import type { FC } from "react"
import type { User } from "@/types/user";

// styled component
import { StyledContainer } from "@/styles/components/chat/mobile/mobile-chat.style"


// local components
import MobileHeader from "@/components/chat/mobile/mobile-header";
import MobileChatContainer from "./mobile-chat-container";
import MobileUsersContainer from "./mobile-users-container";

// redux
import { useAppSelector } from "@/hooks/redux";
import { show_chat } from "@/store/slice/chat.slice";

const MobileChat:FC<{users:User[]}> = ({users})=>{
    const _show_chat = useAppSelector(show_chat);
    return (
        <StyledContainer>
            <MobileHeader/>
            {
                _show_chat?
                <MobileChatContainer/>:
                <MobileUsersContainer users={users}/>
            }
        </StyledContainer>
    )
}

export default MobileChat;