import type { ReactNode ,FC} from "react"
import { useEffect } from "react";

// Axios
import axios from "axios";

const CsrfTokenProvider:FC<{children:ReactNode}> = ({children})=>{
    useEffect(()=>{
        (async function(){
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_END_POINT}/sanctum/csrf-cookie`);

        }())
    },[])
    return(
        <>{children}</>
    )
}

export default CsrfTokenProvider;