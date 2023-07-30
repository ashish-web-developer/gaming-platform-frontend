// types
import type { FC } from "react"
import type Colors from "@/types/data/colors";

// hooks
import useAvatar from "@/hooks/profile";

// styles
import { StyledProfileContainer , StyledProfileAvatar, StyledAvatarContainer} from "@/styles/components/chat/profile.style";






const Profile:FC<{color:Colors["colors"][number]}> = ({color})=>{
    const avatar = useAvatar("ashish_classic");
    console.log(color);
    return (
        <StyledProfileContainer>
            <StyledAvatarContainer $color = {color}>
                <StyledProfileAvatar dangerouslySetInnerHTML={{__html:avatar}}></StyledProfileAvatar>
            </StyledAvatarContainer>
        </StyledProfileContainer>
    )
}



export default Profile;