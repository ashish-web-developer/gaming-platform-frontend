import { useState ,useEffect,useRef} from "react";
// types
import type { FC } from "react";

// redux
import { useAppDispatch } from "@/hooks/redux";
import { updateShowGameBoard } from "@/store/slice/memory-game.slice";


const MobileCountDown:FC = ()=>{
    const dispatch = useAppDispatch();
    const timerRef = useRef<NodeJS.Timer|null>(null);
    const [count,setCount] = useState(5);

    useEffect(()=>{
        timerRef.current = setInterval(()=>{
            setCount((prev)=>prev-1);
        },1000)
        return()=>{
            timerRef.current && clearInterval(timerRef.current);
        }
    },[])

    useEffect(()=>{
        if(timerRef.current && count <= 0){
            clearInterval(timerRef.current);
            dispatch(updateShowGameBoard(true));
        }
    },[count])
    return(
        <>{count}</>
    )
}

export default MobileCountDown;