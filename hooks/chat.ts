import { useEffect, useState } from "react";
// types
import { User } from "@/types/user";
// redux
import { useAppSelector, useAppDispatch } from "./redux";
import {
  users,
  active_user,
  updateActiveUserConversation,
  updateUsersList,
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
    if (_user?.id) {
      (async function () {
        const res = await Axios.post("/chat/get-messages", {
          sender_id: _user.id,
          receiver_id: _active_user?.id,
        });
        const data = res.data.conversation;
        dispatch(updateActiveUserConversation(data));
      })();
    }
  }, [_active_user]);
}

const useSearchedUserOptions = (value: string | null) => {
  const [options, setOptions] = useState<User[]>([]);
  const handleInput = async (query: string) => {
    const res = await Axios.post("/chat/search-user", null, {
      params: {
        query,
      },
    });
    setOptions(res.data.user);
  };
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (value) {
      timer = setTimeout(() => {
        handleInput(value);
      }, 300);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [value]);
  return options;
};

/**
 * fetch the list of user to whom
 * message have been sent last time
 * and update the users list in
 * chat slice
 */
const useGetDefaultUser = () => {
  const _users = useAppSelector(users);
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async function () {
      const res = await Axios.get("/chat/get-user");
      dispatch(updateUsersList(res.data.users));
    })();
  }, []);
};

export { useConversation, useSearchedUserOptions, useGetDefaultUser };
