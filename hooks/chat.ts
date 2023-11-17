import { Dispatch, SetStateAction, useEffect, useState } from "react";
// types
import type { User } from "@/types/user";
import type { Conversation } from "@/types/store/slice/chat";
import type { AxiosResponse } from "axios";
// redux
import { useAppSelector, useAppDispatch } from "./redux";
import {
  active_user,
  updateActiveUserConversation,
} from "@/store/slice/chat.slice";
import { user } from "@/store/slice/user.slice";
// helpers
import { Axios } from "@/helpers/axios";

/**
 * fetch the data of active_user conversation and
 * set the value of active_user_conversation in chat slice
 */
function useConversation() {
  const dispatch = useAppDispatch();
  const _active_user = useAppSelector(active_user);
  const _user = useAppSelector(user);
  useEffect(() => {
    if (_user?.id && _active_user?.id) {
      (async function () {
        const res: AxiosResponse<{
          success: boolean;
          conversation: Conversation[];
        }> = await Axios.post("/chat/get-messages", {
          sender_id: _user.id,
          receiver_id: _active_user?.id,
        });
        const data = res.data.conversation;
        dispatch(updateActiveUserConversation(data));
      })();
    }
  }, [_active_user]);
}

export { useConversation };
