import { useEffect, useRef, useState ,useContext, useCallback} from "react";
import Image from "next/image";
// mui
import { IconButton } from "@mui/material";
// icons
// styled components
import {
  StyledRoolsTooltipContainer,
  StyledToolTipHeading,
  CloseIconButton,
  ChipsContainer,
  StyledActionCtaContainer,
  StyledWelcomingGirlImage,
} from "@/styles/components/memory-game/rules-tooltip/rules-tooltip.style";
// styled theme
import { useTheme } from "styled-components";

// local components
import CloseIcon from "@/components/memory-game/rules-tooltip/close-icon";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import {
  current_rule_index,
  show_rules_tooltip,
  game_rules_list,
  rules_tooltip_text,
  updateShowRulesTip,
  updateCurrentRuleIndex,
} from "@/store/slice/memory-game.slice";

// typewriter animation
import { TypeAnimation } from "react-type-animation";


// context
import { UttranceContext } from "context";

const RoolsToolTip = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const SpeechUttrance = useContext(UttranceContext);
  const _current_rule_index = useAppSelector(current_rule_index);
  const _rules_tooltip_text = useAppSelector(rules_tooltip_text);
  



  const handleEnd = (()=>{
    if(_current_rule_index <= 6){
      dispatch(updateCurrentRuleIndex(_current_rule_index+1));
    }
  })
  useEffect(()=>{
    if(SpeechUttrance && _rules_tooltip_text){
      SpeechUttrance.text = _rules_tooltip_text[1];
      speechSynthesis.speak(SpeechUttrance.uttrance);
      SpeechUttrance.uttrance.addEventListener("end",handleEnd)
      //SpeechUttrance.voice = speechSynthesis.getVoices().filter((voice)=>voice.voiceURI.includes("Female"))[0];
    }
    return (()=>{
      if(SpeechUttrance){
        SpeechUttrance.uttrance.removeEventListener("end",handleEnd)
      }
      speechSynthesis.cancel();
    })
  },[_current_rule_index])



  return (
    <>
      <StyledWelcomingGirlImage
        key={`welcoming-girl-${_current_rule_index}`}
        src={
          "/memory-game/welcoming-girl/welcoming-girl-" +
          ((_current_rule_index==-1?0:_current_rule_index) + 1) +
          ".png"
        }
        initial={{
          x: 200,
        }}
        animate={{
          x: 0,
        }}
      />
      <StyledRoolsTooltipContainer
        key={_current_rule_index}
        initial={{
          x: -400,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <CloseIconButton
          onClick={() => {
            dispatch(updateShowRulesTip(false));
          }}
        >
          <CloseIcon />
        </CloseIconButton>
        <ChipsContainer>
          <Image
            width={30}
            height={30}
            alt="chip-1"
            src="/memory-game/rules-tooltip/chips/chip-1.svg"
          />
          <Image
            width={40}
            height={30}
            alt="chip-1"
            src="/memory-game/rules-tooltip/chips/chip-2.svg"
          />
          <Image
            width={40}
            height={30}
            alt="chip-1"
            src="/memory-game/rules-tooltip/chips/chip-3.svg"
          />
          <Image
            width={40}
            height={30}
            alt="chip-1"
            src="/memory-game/rules-tooltip/chips/chip-4.svg"
          />
        </ChipsContainer>
        <StyledActionCtaContainer>
          <IconButton onClick = {()=>{
            dispatch(updateCurrentRuleIndex(_current_rule_index-1));
          }}>
            <Image width = {30} height = {30} alt = "prev" src = "/memory-game/rules-tooltip/prev.svg"/>
          </IconButton>
          <IconButton onClick={()=>{
            dispatch(updateCurrentRuleIndex(_current_rule_index+1));
          }}>
            <Image width = {30} height = {30} alt = "next" src = "/memory-game/rules-tooltip/next.svg"/>
          </IconButton>
        </StyledActionCtaContainer>


        {
          _rules_tooltip_text && 
          <>
          <StyledToolTipHeading>
            {_rules_tooltip_text[0]}
          </StyledToolTipHeading>
          <TypeAnimation
            sequence={[_rules_tooltip_text[1]]}
            wrapper="div"
            speed={99}
            style={{
              display: "inline-block",
              fontFamily: `${theme.palette.fontFamily.primary.russo}`,
              color: "#000",
              fontSize: "12px",
              fontWeight: 400,
            }}
          />
          </>

        }
      </StyledRoolsTooltipContainer>
    </>
  );
};

export default RoolsToolTip;
