import { NextPage } from "next";
import { useState, useEffect, useRef } from "react";

// types
import type { IUsersWithConversation } from "@/types/store/slice/chat";
import type { IUser_ids } from "@/types/store/slice/chat";

// local components
import MemoryGame from "@/components/memory-game/memory-game";

// files readers
import fs from "fs";
import path from "path";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import { user } from "@/store/slice/user.slice";
import {
  room_id,
  gaming_user,
  is_proposal_sender,
  updateTimerStartCount,
  updateTimerStartCountEvent,
} from "@/store/slice/game.slice";
import {
  is_gaming_user_in,
  updateGameRules,
  updateCardList,
  updateCardState,
  updatePlayerTurnId,
  updateLastFlippedCard,
  updateScore,
  updateLiveStreamChatList,
  updateInfoSnackbar,
  updateIsGamingUserIn,
  updateIsGamingUserLeaving,
  updateScoreEvent,

  // api
  getCards,
} from "@/store/slice/memory-game.slice";
import { mode } from "@/store/slice/common.slice";

// theme provider
import { ThemeProvider } from "styled-components";

// theme
import { lightTheme, darkTheme } from "@/theme/memory-game.theme";

import { UttranceContext } from "context";

// hook
import { usePresenceChannel } from "@/hooks/pusher.hook";

// helpers
import MutableSpeechUtterance from "@/helpers/mutable-speech-uttrance";
import { v4 as uuidv4 } from "uuid";

interface Props {
  files: string[];
  rules: [string, string][];
}
const MemoryGamePage: NextPage<Props> = ({ files, rules }) => {
  const dispatch = useAppDispatch();
  const _mode = useAppSelector(mode);
  const [speechUttrance, setSpeechUttrance] =
    useState<MutableSpeechUtterance | null>(null);
  const _room_id = useAppSelector(room_id);
  const _user = useAppSelector(user);
  const _gaming_user = useAppSelector(gaming_user);
  const _is_gaming_user_in = useAppSelector(is_gaming_user_in);
  const _is_proposal_sender = useAppSelector(is_proposal_sender);
  const sound_ref = useRef<{
    flip_sound: HTMLAudioElement | null;
  }>({
    flip_sound: null,
  });

  usePresenceChannel<IUsersWithConversation | null, IUser_ids>({
    channel: `game.${_room_id}`,
    handler: (user_ids, event, gaming_user) => {
      const isUserInChannel = Array.isArray(user_ids)
        ? user_ids.some((user_id) => user_id.id === _gaming_user?.id)
        : user_ids.id === _gaming_user?.id;
      if (event == "leaving" && isUserInChannel) {
        dispatch(updateIsGamingUserLeaving(isUserInChannel));
        dispatch(updateIsGamingUserIn(!isUserInChannel));
        return;
      }
      dispatch(updateIsGamingUserIn(isUserInChannel));
    },
    events: [
      {
        event: "CardListDataEvent",
        callback: (data) => {
          dispatch(updateCardList(data.card_list));
        },
      },

      {
        event: "MemoryGameEvent",
        callback: (data) => {
          dispatch(
            updateCardState({ id: data.card_id, flipped: data.flipped })
          );
          sound_ref.current.flip_sound?.play();
        },
      },
      {
        event: "UpdatePlayerTurnEvent",
        callback: (data) => {
          dispatch(updatePlayerTurnId(data.player_turn_id));
        },
      },
      {
        event: "UpdateLastFlippedCard",
        callback: (data) => {
          dispatch(updateLastFlippedCard(data.card_id));
        },
      },
      {
        event: "UpdateTimerStartCountEvent",
        callback: (data) => {
          dispatch(updateTimerStartCount(data.start_timer_count));
        },
      },
      {
        event: "UpdateMemoryGameScore",
        callback: (data) => {
          dispatch(updateScore(data.score));
        },
      },
      {
        event: "LiveChatStreamEvent",
        callback: (data: { user: IUsersWithConversation; message: string }) => {
          dispatch(
            updateLiveStreamChatList({ ...data, viewed: false, id: uuidv4() })
          );
          if (data.user.id !== _user.id) {
            dispatch(
              updateInfoSnackbar({
                name: data.user.name,
                message: data.message,
                show_snacbar: true,
              })
            );
            setTimeout(() => {
              dispatch(
                updateInfoSnackbar({
                  name: "",
                  message: "",
                  show_snacbar: false,
                })
              );
            }, 3000);
          }
        },
      },
    ],
    dependency: _gaming_user,
  });

  useEffect(() => {
    dispatch(updateGameRules(rules));
    setSpeechUttrance(new MutableSpeechUtterance());
    if (!sound_ref.current.flip_sound) {
      sound_ref.current.flip_sound = new Audio(
        "/memory-game/game-board/card/audio/flip-card-sound.mp3"
      );
    }
  }, []);
  useEffect(() => {
    if (_is_gaming_user_in && _is_proposal_sender) {
      dispatch(getCards());
      dispatch(
        updateTimerStartCountEvent({ timer_count: new Date().getTime() })
      );
      dispatch(
        updateScoreEvent({
          score: {
            [_gaming_user?.id as number]: 0,
            [_user.id as number]: 0,
          },
        })
      );
      dispatch(updatePlayerTurnId(_user.id));
    }
  }, [_is_proposal_sender, _is_gaming_user_in]);

  return (
    <>
      <UttranceContext.Provider value={speechUttrance}>
        <ThemeProvider theme={_mode == "dark" ? darkTheme : lightTheme}>
          <MemoryGame />
        </ThemeProvider>
      </UttranceContext.Provider>
    </>
  );
};

export async function getStaticProps() {
  try {
    // getting all the rules to play memory game
    const rulesFolderPath = path.join(
      process.cwd(),
      "./data/memory-game/rules.json"
    );
    let rules = fs.readFileSync(rulesFolderPath, "utf-8");
    rules = JSON.parse(rules);
    // Read files from the 'public' folder using fs.readdirSync
    const publicFolderPath = "./public/memory-game"; // Path to the 'public' folder
    let files: string[] = fs.readdirSync(
      path.join(process.cwd(), publicFolderPath)
    );
    files = files.filter((file) => file !== ".DS_Store");
    return {
      props: {
        files,
        rules,
      },
    };
  } catch (err) {
    return {
      props: {
        files: [],
        rules: [],
      },
    };
  }
}
export default MemoryGamePage;
