import { createAvatar } from "@dicebear/core";
import { notionists } from "@dicebear/collection";



const useAvatar = (username:string)=>{
    const avatar = createAvatar(notionists,{
        seed:username,
    })
    return avatar.toString();
}


export default useAvatar;