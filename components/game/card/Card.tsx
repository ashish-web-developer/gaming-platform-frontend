import { useState,useEffect} from "react";
import styled from "styled-components";


// Types

import type {FC} from "react"

// Redux
import { useAppDispatch } from "@/hooks/redux";
import { updateCard ,removeCard} from "@/store/memory-game.slice";

// helpers
import { getRandomImage } from "@/helpers/memory-game/game";




interface StyledContainerProps {
    width:number;
}

interface StyledTextProps {
    color:"red"|"black";
}

interface StyledBackgroundProps {
    $image:string;
}

const StyledContainer = styled.div<StyledContainerProps>`
    width:${(props)=>props.width}px;
    height:${(props)=>props.width*1.4}px;
    border-radius:8px;
    position:relative;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:rgb(231,233,237) !important;
    transition: box-shadow 0.2s ease-in-out; /* Optional: Add smooth transition */
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
}
`

const StyledContainerWithBackground = styled(StyledContainer)<StyledBackgroundProps>`
    background-image:url(/memory-game/${(props)=>props.$image});
    background-size:cover;
    background-repeat:no-repeat;
`

const StyledTopCardText = styled.h1<StyledTextProps>`
    font-family:'Rubik Moonrocks', cursive;
    position:absolute;
    top:15px;
    left:15px;
    color:${(props)=>props.color};
    @media (max-width: 600px) {
        font-size:25px;
    }
`


const StyledBottomCardText = styled.h1<StyledTextProps>`
    font-family:'Rubik Moonrocks', cursive;
    transform:rotate(180deg);
    position:absolute;
    bottom:15px;
    right:15px;
    color:${(props)=>props.color};
    @media (max-width: 600px) {
        font-size:25px;
    }
`


const StyledTopCardSuit = styled.span<StyledTextProps>`
    position:absolute;
    font-size:40px;
    color:${(props)=>props.color};
    top:50px;
    left:15px;
    @media (max-width: 600px) {
        font-size:30px;
        top:40px;
    }
}
`

const StyledBottomCardSuit = styled.span<StyledTextProps>`
    position:absolute;
    font-size:40px;
    color:${(props)=>props.color};
    bottom:50px;
    transform:rotate(180deg);
    right:15px;
    @media (max-width: 600px) {
        font-size:30px;
        bottom:40px; }
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
    @media (max-width: 600px) {
        font-size:50px;
    }
`



interface Props {
    width:number;
    suit:string;
    card:string|number;
    cardColor:"red"|"black";
    isPlay:boolean;
    cardId:string;
    files:string[];
}

const Card:FC<Props> = ({width,suit,card,cardColor,isPlay,cardId,files})=>{
    const dispatch = useAppDispatch();
    const [ isFlipped,setIsFlipped] = useState(false);
    const image = useRandomImage(files);



    useEffect(()=>{
        dispatch(updateCard({
            key:cardId,
            value:false
        }))
        return (()=>{
                dispatch(removeCard(cardId));
        })
    },[])

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
            <StyledContainerWithBackground onClick={()=>setIsFlipped(isPlay?true:false)} width={width} $image={image}>
            </StyledContainerWithBackground>
        }
        </>
    )
}


function useRandomImage(files:string[]){
    const [backgroundImage,setBackgroundImage] = useState<string>("");
    useEffect(()=>{
        setBackgroundImage(getRandomImage(files));
    },[])
    return backgroundImage;
}
export default Card;