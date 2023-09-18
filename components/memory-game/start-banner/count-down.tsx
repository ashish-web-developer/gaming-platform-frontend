import {useState, useEffect ,useRef} from "react"
// types
import type { FC } from "react"
import type CustomMemoryGameThemePalette from "@/types/theme/memory-game"

// styled components
import { StyledCountDown } from "@/styles/components/memory-game/start-banner/count-down.style"


// theme
import { useTheme } from "styled-components"


const CountDown:FC = ()=>{
    const theme = useTheme() as CustomMemoryGameThemePalette;
    const [count,setCount] = useState(60);
    const timerRef = useRef<NodeJS.Timer|null>(null);

    useEffect(()=>{
        timerRef.current = setInterval(()=>{
            setCount((prev)=>prev-1);
        },1000);
        return ()=>{
            timerRef.current  && clearInterval(timerRef.current)
        }
    },[])
    useEffect(()=>{
        if(count <= 0 && timerRef.current){
            clearInterval(timerRef.current);
        }
    },[count])

    return(
        <StyledCountDown>
          00:<span style = {{color:theme.palette.secondary.green}} >{String(count).padStart(2,"0")}</span>
        </StyledCountDown>
    )
}

export default CountDown;