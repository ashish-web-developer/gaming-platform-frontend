import { FC ,useState} from "react";
import styled from "styled-components";


interface StyledContainerProps {
    width:number;
}

interface StyledTextProps {
    color:"red"|"black";
}

interface StyledBackgroundProps {
    backgroundImage:string;
}

const StyledContainer = styled.div<StyledContainerProps>`
    width:${(props)=>props.width}px;
    height:${(props)=>props.width*1.4}px;
    border-radius:8px;
    position:relative;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:rgb(231,233,237);
    box-shadow: 3px 3px 16px rgba(0, 0, 0, 0.1); /* Box shadow on all sides */
    transition: box-shadow 0.2s ease-in-out; /* Optional: Add smooth transition */
}
`

const StyledContainerWithBackground = styled(StyledContainer)<StyledBackgroundProps>`
    background-image:url(/memory-game/${(props)=>props.backgroundImage});
    background-size:cover;
    background-repeat:no-repeat;
`

const StyledTopCardText = styled.h1<StyledTextProps>`
    font-family:'Rubik Moonrocks', cursive;
    position:absolute;
    top:15px;
    left:15px;
    color:${(props)=>props.color};
`


const StyledBottomCardText = styled.h1<StyledTextProps>`
    font-family:'Rubik Moonrocks', cursive;
    transform:rotate(180deg);
    position:absolute;
    bottom:15px;
    right:15px;
    color:${(props)=>props.color};
`


const StyledTopCardSuit = styled.span<StyledTextProps>`
    position:absolute;
    font-size:40px;
    color:${(props)=>props.color};
    top:50px;
    left:15px;
}
`

const StyledBottomCardSuit = styled.span<StyledTextProps>`
    position:absolute;
    font-size:40px;
    color:${(props)=>props.color};
    bottom:50px;
    transform:rotate(180deg);
    right:15px;
}
`


const ChildContainer = styled.div<StyledTextProps>`
    width:100%;
    height:100%;
    border-radius:8px;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:80px;
    color:${(props)=>props.color};
`



interface Props {
    width:number;
    suit:string;
    card:string|number;
    cardColor:"red"|"black";
    backgroundImage:string;
}

const Card:FC<Props> = ({width,suit,card,cardColor,backgroundImage})=>{
    const [ isFlipped,setIsFlipped] = useState(false);
    return (
        <>
        {
            isFlipped?
            <StyledContainer width = {width}>
                <StyledTopCardText color = {cardColor}>{card}</StyledTopCardText>
                <StyledTopCardSuit color = {cardColor}>{suit}</StyledTopCardSuit>
                <StyledBottomCardSuit color = {cardColor}>{suit}</StyledBottomCardSuit>
                <StyledBottomCardText color ={cardColor}>{card}</StyledBottomCardText>
                <ChildContainer color = {cardColor}>{suit}</ChildContainer>
            </StyledContainer>:
            <StyledContainerWithBackground onClick={()=>setIsFlipped(true)} width={width} backgroundImage={backgroundImage}>
            </StyledContainerWithBackground>
        }
        </>
    )
}
export default Card;