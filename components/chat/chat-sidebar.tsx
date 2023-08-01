import { useEffect, useState } from "react";
// types
import type { FC } from "react";
import type Colors from "@/types/data/colors";



// Local components
import Profile from "./profile";


// styled components
import { StyledSearchbarContainer ,StyledTextField , StyledSearchIcon} from "@/styles/components/chat/chat-sidebar.style";
import { TextField ,InputAdornment, Autocomplete} from "@mui/material";

// helpers
import { Axios } from "@/helpers/axios";


const ChatSidebar:FC<{colors:Colors}> = ({colors})=>{
    const [searchedInputValue, setSearchedInputValue] = useState<string|null>(null)
    const [users,setUsers] = useState(null);
    const [options, setOptions] = useState([]);

    const handleInput = async (query:string)=>{
        const res = await Axios.post("/chat/get-user",null,{
            params:{
                query
            }
        })
        setOptions(res.data.user);
    }
    useEffect(()=>{
        let timer:NodeJS.Timeout;
        if(searchedInputValue){
            timer = setTimeout(()=>{
                handleInput(searchedInputValue)
            },800)
        }
        return ()=>{
            clearTimeout(timer);
        }
    },[searchedInputValue])
    return(
        <>
            <StyledSearchbarContainer
            disablePortal
            id="combo-box-demo"
            options = {options}
            getOptionLabel={(option) => option.name}
            renderOption={(props,option)=>{
                return(
                    <Profile username = {option.name} width = {50} height = {50} colors = {colors}/>
                )
            }}
            renderInput={(params)=>{
                return (
                <StyledTextField
                label = "Users"
                onInput = {(event)=>setSearchedInputValue(event.target.value)}
                {...params}
                />
                )
            }}
        />
        {
            new Array(10).fill(0).map((data)=><Profile username = {"ashish_classic"} width = {60} height = {60} colors = {colors}/>)
        }
        </>
    )
}



export default ChatSidebar;