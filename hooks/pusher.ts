import { useEffect, useRef } from "react";

// helpers
import { PusherAxios } from "@/helpers/axios";

// pusher
import Echo from "laravel-echo";
import Pusher from "pusher-js";
//redux
import { useAppSelector } from "./redux";
import { user } from "@/store/slice/user.slice";

function useEcho(): Echo | null {
  const echoRef = useRef<null | Echo>(null);
  useEffect(() => {
    window.pusher = Pusher;
    const echo = new Echo({
      broadcaster: "pusher",
      key: process.env.NEXT_PUBLIC_APP_PUSHER_KEY,
      cluster: process.env.NEXT_PUBLIC_APP_PUSHER_CLUSTER,
      forceTLS: true,
      authorizer: (channel: any, options: any) => {
        return {
          authorize: (socketId: any, callback: any) => {
            PusherAxios.post(
              `${process.env.NEXT_PUBLIC_API_END_POINT}/broadcasting/auth`,
              {
                socket_id: socketId,
                channel_name: channel.name,
              }
            )
              .then((response) => {
                callback(null, response.data);
              })
              .catch((error) => {
                callback(error);
              });
          },
        };
      },
    });
    echoRef.current = echo;
  }, []);
  return echoRef.current;
}

/**
 *
 * @param channel channel which you want to connect to
 * @param event event which you want to listen
 * @param callback function with all the operation which you want to perform
 */

function usePrivateChannel<ICallBackArgsType>(
  channel: string, // channel to which you want to connect
  event: string,
  callback: (data: ICallBackArgsType) => void
) {
  const _user = useAppSelector(user);
  const echo = useEcho();
  useEffect(() => {
    echo
      ?.private(channel)
      .subscribed(() => {
        console.log("connected to channel");
      })
      .error((error: any) => {
        console.log("error", error);
      })
      .listen(event, (data: ICallBackArgsType) => callback(data));
    return () => {
      echo?.leaveChannel(channel);
    };
  }, [echo,_user]);
}

export { useEcho, usePrivateChannel };
