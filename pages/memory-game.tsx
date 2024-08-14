import { NextPage } from "next";
import { useState, useEffect, useRef } from "react";

// types
import type { IUsersWithConversation } from "@/types/store/slice/chat";
import type { ICognimatchRoom } from "@/types/store/slice/cognimatch";

// local components
import MemoryGame from "@/components/memory-game/memory-game";

// files readers
import fs from "fs";
import path from "path";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import { user } from "@/store/slice/user.slice";
import { room_id } from "@/store/slice/game.slice";
import {
  active_cognimatch_players,
  updateActiveCogniMatchPlayers,
  updateCognimatchRoomData,
  updatePlayersCountApi,
  updateLiveStreamChat,
  updateInfoSnackbar,
  updateGameRules,
} from "@/store/slice/cognimatch.slice";
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
  const { id: user_id } = _user;
  const _active_cognimatch_players = useAppSelector(active_cognimatch_players);
  const opponent_player = _active_cognimatch_players.filter(
    (player) => player.id !== user_id
  )[0];
  const sound_ref = useRef<{
    flip_sound: HTMLAudioElement | null;
  }>({
    flip_sound: null,
  });

  usePresenceChannel<
    IUsersWithConversation | null,
    | { cognimatch_player: IUsersWithConversation }[]
    | { cognimatch_player: IUsersWithConversation }
  >({
    channel: `cognimatch.${_room_id}`,
    events: [
      {
        event: "Cognimatch.UpdateCognimatchRoomDataEvent",
        callback: (data: { cognimatch_room: ICognimatchRoom }) => {
          dispatch(updateCognimatchRoomData(data.cognimatch_room));
        },
      },
      {
        event: "Cognimatch.LiveChatStreamEvent",
        callback: (data: { user: IUsersWithConversation; message: string }) => {
          console.log("value of data", data);
          dispatch(
            updateLiveStreamChat({ ...data, viewed: false, id: uuidv4() })
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
    handler: (players, type) => {
      if (Array.isArray(players)) {
        const cognimatch_players = players.map(
          (_player) => _player.cognimatch_player
        );
        dispatch(
          updateActiveCogniMatchPlayers({
            cognimatch_players: cognimatch_players,
            type,
          })
        );
      } else {
        const cognimatch_player = players.cognimatch_player;
        dispatch(
          updateActiveCogniMatchPlayers({
            cognimatch_players: { ...cognimatch_player },
            type,
          })
        );
      }
    },
  });

  useEffect(() => {
    dispatch(updateGameRules(rules));
    dispatch(updatePlayersCountApi({ type: "add" }));
    setSpeechUttrance(new MutableSpeechUtterance());
    if (!sound_ref.current.flip_sound) {
      sound_ref.current.flip_sound = new Audio(
        "/memory-game/game-board/card/audio/flip-card-sound.mp3"
      );
    }
    return () => {
      dispatch(updatePlayersCountApi({ type: "remove" }));
    };
  }, []);

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
