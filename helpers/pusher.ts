import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { useEffect ,useRef} from 'react';
import { PusherAxios } from './axios';


function useEcho(){
    const echoRef = useRef<null|Echo>(null);
    useEffect(()=>{
        window.pusher = Pusher;
        const echo = new Echo({
            broadcaster: 'pusher',
            key:process.env.NEXT_PUBLIC_APP_PUSHER_KEY ,
            cluster: process.env.NEXT_PUBLIC_APP_PUSHER_CLUSTER,
            forceTLS: true,
            authorizer: (channel:any, options:any) => {
                return {
                    authorize: (socketId:any, callback:any) => {
                        PusherAxios.post(`${process.env.NEXT_PUBLIC_API_END_POINT}/broadcasting/auth` , {
                            socket_id: socketId,
                            channel_name: channel.name
                        })
                        .then(response => {
                            callback(null, response.data);
                        })
                        .catch(error => {
                            callback(error);
                        });
                    }
                };
            },
        });
        echoRef.current = echo;
    },[])
    return echoRef;
}

export default useEcho;




