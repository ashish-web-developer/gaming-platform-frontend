import axios from "axios";


const Axios = axios.create({
    withCredentials:true,
    baseURL:`${process.env.NEXT_PUBLIC_API_END_POINT}/api`,
    headers:{
        Accept:"application/json",
        'Access-Control-Allow-Origin': '*',
    }
})

export {Axios};