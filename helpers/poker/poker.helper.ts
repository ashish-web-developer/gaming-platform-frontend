// type
import type {
  ICardRank,
} from "@/types/store/slice/poker";
import type { IPokerPlayer } from "@/types/store/slice/poker/poker";
const getCardRankInWord = (rank: ICardRank) => {
  switch (rank) {
    case "K":
      return "King";
    case "Q":
      return "Queen";
    case "J":
      return "Jack";
    case "10":
      return "Ten";
    case "9":
      return "Nine";
    case "8":
      return "Eight";
    case "7":
      return "Seven";
    case "6":
      return "Six";
    case "5":
      return "Five";
    case "4":
      return "Four";
    case "3":
      return "Three";
    case "2":
      return "Two";
    case "A":
      return "Ace";
    default:
      return null;
  }
};

const getPlayerPosition = (
  auth_player_position: 1 | 2 | 3,
  player: IPokerPlayer
) => {
  const alignment: {
    [index: number]: "left" | "right" | "down";
  } = {
    1: "down",
    2: "left",
    3: "right",
  };
  const position_map = {
    1: {
      1: 1,
      2: 2,
      3: 3,
    },
    2: {
      1: 3,
      2: 1,
      3: 2,
    },
    3: {
      1: 2,
      2: 3,
      3: 1,
    },
  };
  return alignment[position_map[auth_player_position][player.seat_number]];
};

export { getCardRankInWord, getPlayerPosition };
