import styled from "styled-components";


type IStyledPlayerCardContainer = {
    $width:number;
    $left:number;
    $bottom:number;
    $zIndex:number;
}

type IStyledPlayerCard = {
    $width:number;
    $topBackground?:string;
    $bottomBackground?:string;
}

const StyledPlayerCardContainer = styled.div<IStyledPlayerCardContainer>`
    position:absolute;
    left:${(props)=>props.$left}px;
    bottom:${(props)=>props.$bottom}px;
    width:${(props)=>props.$width}px;
    height:${(props)=>props.$width*1.5}px;
    overflow:hidden;
    border-radius:10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    z-index:${(props)=>props.$zIndex};
`

const StyledPlayerCardTop = styled.div<IStyledPlayerCard>`
    background: ${(props)=>props.$topBackground};
    transform:skewY(-10deg);
    width:${(props)=>props.$width}px;
    height:${(props)=>(props.$width*1.5)/2 + 10}px;
    position:absolute;
    top:-12px;
    &::before{
        position:absolute;
        content:"";
        background:url('/memory-game/player-card/background.jpg');
        background-size:cover;
        opacity:0.2;
        width:100%;
        height:100%;
    }
`

const StyledPlayerCardBottom = styled.div<IStyledPlayerCard>`
    background: ${(props)=>props.$bottomBackground};
    transform:skewY(-10deg);
    width:${(props)=>props.$width}px;
    height:${(props)=>(props.$width*1.5)/2 + 15}px;
    position:absolute;
    top:${(props)=>(props.$width*1.5)/2 - 2 }px;
    &::before{
        position:absolute;
        content:"";
        background:url('/memory-game/player-card/background.jpg');
        background-size:cover;
        opacity:0.2;
        width:100%;
        height:100%;
    }
`

const StyledChildContainer = styled.div`
    position:relative;
    z-index:3;
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
`


export {StyledPlayerCardContainer, StyledPlayerCardTop, StyledPlayerCardBottom, StyledChildContainer};

