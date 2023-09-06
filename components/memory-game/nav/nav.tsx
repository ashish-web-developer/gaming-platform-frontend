import { useRouter } from "next/router";
// types
import type {FC} from "react";

// styled components
import { StyledNavContainer , StyledProfileContainer,StyledProfile} from "@/styles/components/memory-game/nav/nav.style";

// icons
import Chat from "@/components/memory-game/nav/icons/chat";
import Notification from "@/components/memory-game/nav/icons/notification";


// mui 
import { IconButton } from "@mui/material";


// redux
import { useAppSelector } from "@/hooks/redux";
import { user } from "@/store/slice/user.slice";


// hooks
import useAvatar from "@/hooks/profile";

const Nav:FC = ()=>{
    const router = useRouter();
    const _user = useAppSelector(user);
    const avatar = useAvatar(_user.username??"");
    return (
        <StyledNavContainer>
            <IconButton onClick={()=>{
                router.push("/chat");
            }}>
                <Chat/>
            </IconButton>
            <Notification/>
            <StyledProfileContainer>
                <StyledProfile
                    dangerouslySetInnerHTML={{ __html: avatar }}
                >
                </StyledProfile>
            </StyledProfileContainer>
        </StyledNavContainer>
    )
}

export default Nav;