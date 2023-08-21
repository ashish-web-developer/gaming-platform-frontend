import { useEffect, useRef, useState } from "react";

// helpers
import { PusherAxios } from "@/helpers/axios";

// pusher
import Echo from "laravel-echo";
import Pusher from "pusher-js";
//redux
import { useAppSelector } from "./redux";
import { user } from "@/store/slice/user.slice";
import { active_user } from "@/store/slice/chat.slice";

function useEcho(): Echo | null {
  const [echo, setEcho] = useState<null | Echo>(null);
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
    setEcho(echo);
  }, []);
  return echo;
}

/**
 *
 * @param channel channel which you want to connect to
 * @param event event which you want to listen
 * @param callback function with all the operation which you want to perform
 */

function usePrivateChannel(
  channel: string, // channel to which you want to connect
  events: {
    event: string;
    callback: (data: any) => void;
  }[]
) {
  const _user = useAppSelector(user);
  const _active_user = useAppSelector(active_user);
  const echo = useEcho();
  useEffect(() => {
    const subscription = echo
      ?.private(channel)
      .subscribed(() => {
        console.log("connected to channel");
      })
      .error((error: any) => {
        console.log("error", error);
      });

    events.forEach(({ event, callback }) => {
      subscription?.listen(event, (data: any) => callback(data));
    });
    return () => {
      echo?.leaveChannel(channel);
      console.log("disconnected");
    };
  }, [echo, _user, _active_user]);
}

function usePresenceChannel(channel: string) {
  const echo = useEcho();
  useEffect(() => {
    echo
      ?.join(channel)
      .here((user: any) => {
        console.log("connected users", user);
      })
      .joining((user: any) => {
        console.log("joining users", user);
      });
    return () => {
      echo?.leaveChannel(channel);
    };
  }, [echo]);
}

export { useEcho, usePrivateChannel, usePresenceChannel };
