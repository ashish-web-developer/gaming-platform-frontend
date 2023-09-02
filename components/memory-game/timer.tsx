import { useEffect, useState } from "react";
import { StyledTimer } from "@/styles/components/memory-game/timer.style";

const Timer = ()=>{
    const [count,setCount] = useState(60);

    useEffect(()=>{
        const timer = setInterval(()=>{
            setCount((prev)=>prev-1);
        },1000)
        return (()=>{
            clearInterval(timer);
        })
    },[])
    return(
        <StyledTimer
        >
            {count}
        </StyledTimer>
    )
}

export default Timer;