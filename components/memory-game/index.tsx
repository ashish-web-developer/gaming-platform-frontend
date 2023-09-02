// types
import { useEffect, type FC } from "react";


// styled components 
import {StyledMemoryGameContainer, StyledMainText} from "@/styles/components/memory-game/index.style";
// local components
import WelcomeInterface from "@/components/memory-game/welcome-interface"
import RoolsToolTip from "@/components/memory-game/rules-tooltip/rules-tooltip";
import AudioPlayCtaModal from "@/components/memory-game/rules-tooltip/audio-play-cta-modal";

// redux
import { useAppSelector } from "@/hooks/redux";
import { show_rules_tooltip } from "@/store/slice/memory-game.slice";


const MemoryGame:FC = ()=>{
    const _show_rules_tooltip = useAppSelector(show_rules_tooltip);
    return (
        <>
        <StyledMainText>Yup Bro, <br/><span style = {{fontSize:"40px"}}>Welcome Back</span></StyledMainText>
        {_show_rules_tooltip && <RoolsToolTip/>}

        <AudioPlayCtaModal/>
        <StyledMemoryGameContainer>
            <WelcomeInterface/>
        </StyledMemoryGameContainer>
        </>
    )
}


export default MemoryGame;