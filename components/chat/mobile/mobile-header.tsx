// types
import type { FC } from "react";
import type Colors from "@/types/data/colors";
// styled components
import { StyledContainer,StyledItem,StyledHeaderProfile,StyledAvatarName, StyledChevronLeftIcon ,StyledDivider} from "@/styles/components/chat/mobile/mobile-header.style"


// local components
import ChatSearchbar from "@/components/chat/chat-searchbar";
import ChatAvatar from "@/components/chat/chat-avatar";
// redux
import { useAppSelector ,useAppDispatch} from "@/hooks/redux";
import { active_user, show_chat,updateShowChat } from "@/store/slice/chat.slice";


// hooks
import useAvatar from "@/hooks/profile";
import { useTheme } from "styled-components";
import { IconButton } from "@mui/material";


interface Props {
    colors:Colors;
}
const MobileHeader:FC<Props> = ({colors})=>{
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const _active_user = useAppSelector(active_user);
    const _show_chat = useAppSelector(show_chat);
    const avatar = useAvatar(_active_user?.username??"");
    const color = useColor(colors);
    return(
        <>
            <StyledContainer>
                <StyledItem $flexBasis={"50px"}>
                    <IconButton onClick = {()=>dispatch(updateShowChat(false))}>
                        <StyledChevronLeftIcon/>
                    </IconButton>
                </StyledItem>
                <StyledItem $marginRight={"15px"} $flexGrow={1}>
                    {
                        _show_chat?
                        <StyledHeaderProfile>
                            <ChatAvatar
                            width={60}
                            height={60}
                            avatar={avatar}
                            color={color}
                            />
                            <div>
                                <StyledAvatarName $color={theme.palette.text.main} $fontSize="14px">{_active_user?.name}</StyledAvatarName>
                                <StyledAvatarName $color={theme.palette.text.light} $fontSize="12px">{_active_user?.username}</StyledAvatarName>
                            </div>
                        </StyledHeaderProfile>
                        :
                        <ChatSearchbar colors = {colors}/>
                    }
                </StyledItem>
            </StyledContainer>
            <StyledDivider/>
        </>
    )
}

const useColor = (colors: Colors) => {
  const colorsLength = colors.length;
  return colors[Math.floor(Math.random() * colorsLength)];
};
export default MobileHeader;