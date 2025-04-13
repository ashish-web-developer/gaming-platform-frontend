import { useEffect, useState, useRef } from "react";

// types
import type { INotification } from "@/types/store/slice/notification";
import type { IUser } from "@/types/store/slice/login";

// redux
import { useAppDispatch } from "./redux.hook";
import { updateNotification } from "@/store/slice/notification.slice";

// helpers
import { PusherAxios } from "@/helpers/axios";
import Pusher from "pusher-js";
import Cookies from "universal-cookie";
import Echo from "laravel-echo";

function usePusher() {
  const [pusher, setPusher] = useState<Pusher | null>(null);
  const cookies = new Cookies();
  useEffect(() => {
    const token = cookies.get("token");
    const pusherInstance = new Pusher(
      process.env.NEXT_PUBLIC_APP_PUSHER_KEY as string,
      {
        cluster: process.env.NEXT_PUBLIC_APP_PUSHER_CLUSTER as string,
        authEndpoint: `${process.env.NEXT_PUBLIC_API_END_POINT}/broadcasting/auth`,
        forceTLS: true,
        auth: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    );
    setPusher(pusherInstance);
    return () => {
      pusherInstance.disconnect();
      setPusher(null);
    };
  }, []);
  return pusher;
}

function useEcho(): Echo | null {
  const [echo, setEcho] = useState<null | Echo>(null);
  useEffect(() => {
    const echo = new Echo({
      broadcaster: "pusher",
      key: process.env.NEXT_PUBLIC_APP_PUSHER_KEY as string,
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

function usePrivateChannel({
  user,
  dependency,
  channel_name,
  events,
}: {
  user: IUser | null;
  dependency: Array<any>;
  channel_name: string;
  events: Array<{
    event: string;
    handler: (data: any) => void;
  }>;
}) {
  const pusher = usePusher();
  useEffect(() => {
    const channel = user && pusher?.subscribe(`private-${channel_name}`);
    channel?.bind("pusher:subscription_succeeded", () => {
      console.log(`private-${channel_name} subscription succeeded`);
    });
    events.forEach(({ event, handler }) => {
      channel?.bind(event, handler);
    });
    return () => {
      channel?.unbind_all();
      channel?.unsubscribe();
    };
  }, [pusher, user, ...dependency]);
}

function usePresenceChannel<IDependencyType, IMemberType>({
  channel_name,
  events,
  dependency,
  memberHandler,
  handleSubscription,
}: {
  channel_name: string;
  dependency: IDependencyType;
  memberHandler: (
    member: IMemberType,
    action_type: "here" | "added" | "removed"
  ) => void;
  events: Array<{
    event: string;
    handler: (data: any) => void;
  }>;
  handleSubscription?: (data: IMemberType) => void;
}) {
  const pusher = usePusher();
  useEffect(() => {
    const channel = dependency && pusher?.subscribe(`presence-${channel_name}`);
    channel?.bind("pusher:subscription_succeeded", () => {
      console.log(`presence-${channel_name} subscription succeeded`);
      // @ts-expect-error
      handleSubscription?.(channel?.members.me as IMemberType);
    });

    // @ts-expect-error
    channel?.members.each((member: IMemberType) => {
      memberHandler(member, "here");
    });
    channel?.bind("pusher:member_added", (member: IMemberType) =>
      memberHandler(member, "added")
    );
    channel?.bind("pusher:member_removed", (member: IMemberType) =>
      memberHandler(member, "removed")
    );
    events.forEach(({ event, handler }) => {
      channel?.bind(event, handler);
    });
    return () => {
      channel?.unbind_all();
      channel?.unsubscribe();
    };
  }, [pusher, dependency]);
}

function useNotificationChannel<IDependencyType>({
  dependency,
  channel_name,
}: {
  dependency: IDependencyType;
  channel_name: string;
}) {
  const dispatch = useAppDispatch();
  const echo = useEcho();

  const notification_audio_ref = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    notification_audio_ref.current = new Audio(
      "/common/notification/audio/notification.mp3"
    );
  }, []);
  useEffect(() => {
    const subscription =
      dependency &&
      echo
        ?.private(channel_name)
        .subscribed(() => {
          console.log("notification channel subscription succeeded");
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
    return () => {
      echo?.leaveChannel(channel_name);
    };
  }, [echo, dependency]);
}

export {
  usePusher,
  usePrivateChannel,
  usePresenceChannel,
  useNotificationChannel,
};
