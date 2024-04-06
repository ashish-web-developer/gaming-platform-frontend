import { useEffect, useRef, useState } from "react";
//types
import type { User } from "@/types/user";
import type { INotification } from "@/types/store/slice/notification";
import { PresenceChannel, Channel } from "laravel-echo";
// helpers
import { PusherAxios } from "@/helpers/axios";

// pusher
import Echo from "laravel-echo";
import Pusher from "pusher-js";
//redux
import { useAppSelector, useAppDispatch } from "./redux.hook";
import { user } from "@/store/slice/user.slice";
import { active_user, updateIsTyping } from "@/store/slice/chat.slice";
import { updateNotification } from "@/store/slice/notification.slice";
import { gaming_user } from "@/store/slice/game.slice";
import { IUsersWithConversation } from "@/types/store/slice/chat";

type User_ids =
  | {
      id: number;
    }[]
  | {
      id: number;
    };

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


function useNotificationChannel() {
  const dispatch = useAppDispatch();
  const _user = useAppSelector(user);
  const echo = useEcho();
  const notification_audio_ref = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    notification_audio_ref.current = new Audio(
      "/common/notification/audio/notification.mp3"
    );
  }, []);
  useEffect(() => {
    if (_user && echo) {
      const subscription = echo
        .private(`notification.${_user.id}`)
        .subscribed(() => {
          console.log("connected to notification channel");
        })
        .notification((notification: INotification) => {
          if (typeof notification.data == "string") {
            notification.data = JSON.parse(notification.data);
          }
          /**
           * Not updating notification value directly instead of
           * calling api because getting wrong value of id and
           * type from notification
           */
          dispatch(updateNotification(notification));
          notification_audio_ref.current?.play();
        });
    }
    return () => {
      if (_user && echo) {
        echo.leaveChannel(`notification.${_user.id}`);
      }
    };
  }, [echo, _user]);
}
interface IPrivateChannelParams {
  channel: string | null;
  events: {
    event: string;
    callback: (data: any) => void;
  }[];
}
const usePrivateChannel = ({ channel, events }: IPrivateChannelParams) => {
  const dispatch = useAppDispatch();
  const echo = useEcho();
  const subscription = useRef<Channel>();
  const _active_user = useAppSelector(active_user);
  const timer = useRef<NodeJS.Timeout>();
  useEffect(() => {
    const handleTyping = (event: { is_typing: boolean; user: User }) => {
      if (_active_user?.id == event.user.id) {
        dispatch(updateIsTyping(true));
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          dispatch(updateIsTyping(false));
        }, 900);
      }
    };
    if (echo && channel) {
      console.log("value of channel",channel);
      subscription.current = echo
        .private(channel)
        .subscribed(() => {
          console.log("connected to channel");
        })
        .listenForWhisper("typing", handleTyping)
        .error((error: any) => {
          console.log("error", error);
        });

      events.forEach(({ event, callback }) => {
        subscription.current?.listen(event, callback);
      });
    }
    return () => {
      if (echo && channel) {
        subscription.current?.stopListeningForWhisper("typing", handleTyping);
        events.forEach(({ event, callback }) => {
          subscription.current?.stopListening(event, callback);
        });
        echo?.leaveChannel(channel);
      }
      clearTimeout(timer.current);
    };
  }, [echo, channel, _active_user]);
};


interface IPresenceChannelParams<Type = any> {
  channel: string | null;
  events: {
    event: string;
    callback: (data: any) => void;
  }[];
  handler: (
    user_ids: User_ids,
    type: "here" | "joining" | "leaving",
    dependency?: Type
  ) => void;
  dependency?: Type;
}

const usePresenceChannel = <Type>({
  channel,
  events,
  handler,
  dependency,
}: IPresenceChannelParams<Type>) => {
  const echo = useEcho();
  const subscription = useRef<PresenceChannel>();
  useEffect(() => {
    if (echo && channel) {
      subscription.current = echo
        .join(channel)
        .here((user_ids: User_ids) => handler(user_ids, "here", dependency))
        .joining((user_ids: User_ids) =>
          handler(user_ids, "joining", dependency)
        )
        .leaving((user_ids: User_ids) =>
          handler(user_ids, "leaving", dependency)
        );
      events.forEach(({ event, callback }) => {
        subscription.current?.listen(event, callback);
      });
    }
    return () => {
      if (echo && channel) {
        events.forEach(({ event, callback }) => {
          subscription.current?.stopListening(event, callback);
        });
        echo.leave(channel);
      }
    };
  }, [echo, channel, dependency]);
};

export {
  useEcho,
  usePrivateChannel,
  usePresenceChannel,
  useNotificationChannel,
};
