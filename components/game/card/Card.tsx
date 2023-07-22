import { FC } from "react";
import styled from "styled-components";


interface StyledContainerProps {
    width:number;
}
const StyledContainer = styled.div<StyledContainerProps>`
    width:${(props)=>props.width}px;
    height:${(props)=>props.width*1.4}px;
    border:2px solid black;
    border-radius:8px;
    position:relative;
    display:flex;
    justify-content:center;
    align-items:center;
`

const StyledTopCardText = styled.h1`
    font-family:'Rubik Moonrocks', cursive;
    padding:6px;
    position:absolute;
    top:0px;
    left:0px;
`

const StyledBottomCardText = styled.h1`
    font-family:'Rubik Moonrocks', cursive;
    padding:6px;
    transform:rotate(180deg);
    position:absolute;
    bottom:0px;
    right:0px;
`


const StyledTopCardSuit = styled.span`
    position:absolute;
    font-size:40px;
    color:red;
    top:30px;
    left:2px;
}
`

const StyledBottomCardSuit = styled.span`
    position:absolute;
    font-size:40px;
    color:red;
    bottom:30px;
    transform:rotate(180deg);
    right:2px;
}
`


const ChildContainer = styled.div`
    width:100%;
    height:100%;
    border-radius:8px;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:80px;
    color:red;
`



interface Props {
    width:number;
    suit:string;
}

const Card:FC<Props> = ({width,suit})=>{
    return (
        <StyledContainer width = {200}>
            <StyledTopCardText>A</StyledTopCardText>
            <StyledTopCardSuit>{suit}</StyledTopCardSuit>
            <StyledBottomCardSuit>{suit}</StyledBottomCardSuit>
            <StyledBottomCardText>A</StyledBottomCardText>
            <ChildContainer>{suit}</ChildContainer>
        </StyledContainer>
    )
}
export default Card;