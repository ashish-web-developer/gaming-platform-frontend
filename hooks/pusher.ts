import { useEffect, useRef, useState } from "react";
//types
import { User } from "@/types/user";

// helpers
import { PusherAxios } from "@/helpers/axios";

// pusher
import Echo from "laravel-echo";
import Pusher from "pusher-js";
//redux
import { useAppSelector, useAppDispatch } from "./redux";
import { user } from "@/store/slice/user.slice";
import { active_user, updateIsTyping } from "@/store/slice/chat.slice";
import { gaming_user, updateTimerStartCount } from "@/store/slice/game.slice";
import {
  updateIsGamingUserIn,
  updateIsGamingUserLeaving,
  updateCardList,
} from "@/store/slice/memory-game.slice";
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
    callback: (data: any,active_user:IUsersWithConversation) => void;
  }[]
) {
  const dispatch = useAppDispatch();
  const _user = useAppSelector(user);
  const _active_user = useAppSelector(active_user);
  const timer = useRef<NodeJS.Timeout>();
  const echo = useEcho();
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
    const subscription = echo
      ?.private(channel)
      .subscribed(() => {
        console.log("connected to channel");
      })
      .listenForWhisper("typing", handleTyping)
      .error((error: any) => {
        console.log("error", error);
      });

    events.forEach(({ event, callback }) => {
      subscription?.listen(event, callback);
    });
    return () => {
      subscription?.stopListeningForWhisper("typing", handleTyping);
      events.forEach(({ event, callback }) => {
        subscription?.stopListening(event, callback);
      });
      echo?.leaveChannel(channel);
    };
  }, [echo, _user, _active_user]);
}

function usePresenceChannel(
  channel: string, // channel to which you want to connect
  events: {
    event: string;
    callback: (data: any) => void;
  }[]
) {
  const echo = useEcho();
  const dispatch = useAppDispatch();
  const _gaming_user = useAppSelector(gaming_user);
  useEffect(() => {
    const subscription = echo
      ?.join(channel)
      .here((user_ids: User_ids) => {
        if (
          Array.isArray(user_ids) &&
          user_ids.some((user_id) => user_id.id == _gaming_user?.id)
        ) {
          dispatch(updateIsGamingUserIn(true));
        } else if (
          !Array.isArray(user_ids) &&
          user_ids.id == _gaming_user?.id
        ) {
          dispatch(updateIsGamingUserIn(true));
        }
      })
      .joining((user_ids: User_ids) => {
        if (
          Array.isArray(user_ids) &&
          user_ids.some((user_id) => user_id.id == _gaming_user?.id)
        ) {
          dispatch(updateIsGamingUserIn(true));
        } else if (
          !Array.isArray(user_ids) &&
          user_ids.id == _gaming_user?.id
        ) {
          dispatch(updateIsGamingUserIn(true));
        }
      })
      .leaving((user_ids: User_ids) => {
        if (
          Array.isArray(user_ids) &&
          user_ids.some((user_id) => user_id.id == _gaming_user?.id)
        ) {
          dispatch(updateIsGamingUserIn(false));
          dispatch(updateIsGamingUserLeaving(true));
        } else if (
          !Array.isArray(user_ids) &&
          user_ids.id == _gaming_user?.id
        ) {
          dispatch(updateIsGamingUserIn(false));
          dispatch(updateIsGamingUserLeaving(true));
        }
      });
    events.forEach(({ event, callback }) => {
      subscription?.listen(event, (data: any) => callback(data));
    });
    return () => {
      echo?.leave(channel);
      dispatch(updateIsGamingUserLeaving(false));
      dispatch(updateCardList([]));
      dispatch(updateIsGamingUserIn(false));
      dispatch(updateTimerStartCount(null));
    };
  }, [echo, _gaming_user]);
}

export { useEcho, usePrivateChannel, usePresenceChannel };
