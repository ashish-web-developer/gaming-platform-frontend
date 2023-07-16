import type { ReactNode ,FC} from "react";
import { useEffect } from "react";
import { Axios } from "@/helpers/axios";



// Redux
import { updateUser } from "@/store/user.slice";
import { useAppDispatch } from "@/hooks/redux";
import { getUser } from "@/store/user.slice";



const UserProvider:FC<{children:ReactNode}> = ({children})=>{
    const dispatch = useAppDispatch();


    useEffect(()=>{
        dispatch(getUser());
    },[])

    return (
        <>{children}</>
    )
}


export default UserProvider;