// types
import type { FC } from "react";
import type Colors from "@/types/data/colors";
// styled components
import { StyledContainer,StyledItem, StyledChevronLeftIcon ,StyledDivider} from "@/styles/components/chat/mobile/mobile-header.style"


// local components
import ChatSearchbar from "@/components/chat/chat-searchbar";


interface Props {
    colors:Colors;
}
const MobileHeader:FC<Props> = ({colors})=>{
    return(
        <>
            <StyledContainer>
                <StyledItem $flexBasis={"50px"}>
                    <StyledChevronLeftIcon/>
                </StyledItem>
                <StyledItem $marginRight={"15px"} $flexGrow={1}>
                    <ChatSearchbar colors = {colors}/>
                </StyledItem>
            </StyledContainer>
            <StyledDivider/>
        </>
    )
}

export default MobileHeader;