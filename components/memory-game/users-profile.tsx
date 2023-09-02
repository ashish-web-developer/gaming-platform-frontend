import { useContext } from "react";
// types
import { FC } from "react";
// styled components
import { StyledUserProfileBorder, StyledUsersProfileContainer, StyledUser } from "@/styles/components/memory-game/users-profile.style";

// hooks
import useAvatar from "@/hooks/profile";
import useRandomColor from "@/hooks/colors";

// context
import { ColorsContext } from "context";



const UsersProfile:FC<{
    username:string;
    width:number;
    height:number;
}> = ({username,width,height})=>{
    const colors = useContext(ColorsContext);
    const color = useRandomColor(colors);
    const avatar = useAvatar(username);
    return (
        <StyledUserProfileBorder>
            <StyledUsersProfileContainer $width = {`${width}px`} $height={`${height}px`} $color={color}>
                <StyledUser
                $width={`${width*0.8}px`}
                $height = {`${height*0.8}px`}
                dangerouslySetInnerHTML={{ __html: avatar }}
                >
                </StyledUser>
            </StyledUsersProfileContainer>
        </StyledUserProfileBorder>
    )
}

export default UsersProfile;