// types
import type { FC } from "react"
import type Colors from "@/types/data/colors";

// hooks
import useAvatar from "@/hooks/profile";

// styles
import { StyledProfileContainer , StyledProfileAvatar, StyledAvatarContainer, StyledAvatarName} from "@/styles/components/chat/profile.style";

// mui
import { Grid } from "@mui/material";




interface Props {
    colors:Colors;
    width:number;
    height:number;
    username:string;
}

const Profile:FC<Props> = ({colors,width,height,username})=>{
    const avatar = useAvatar(username);
    const color = useColor(colors);
    return (
        <StyledProfileContainer $width = {width} $height = {height}>
            <Grid container>
                <Grid item  xs = {3}>
                    <StyledAvatarContainer  $color = {color} $width = {width} $height = {height}>
                        <StyledProfileAvatar $width = {width} $height = {height} dangerouslySetInnerHTML={{__html:avatar}}></StyledProfileAvatar>
                    </StyledAvatarContainer>
                </Grid>
                <Grid item  xs = {9}>
                    <StyledAvatarName>
                        Ashish Prajapati
                    </StyledAvatarName>
                </Grid>
            </Grid>
        </StyledProfileContainer>
    )
}


const useColor = (colors:Colors)=>{
    const colorsLength = colors.colors.length;
    return colors.colors[Math.floor(Math.random()*colorsLength)];
}

export default Profile;
