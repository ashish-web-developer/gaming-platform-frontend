// type
import type {
  ICardRank,
  ICardSuit,
  IDeckType,
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

class Hand {
  private ranks_value_obj = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
  };
  private hands: IDeckType = [];
  private suits: ICardSuit[] = [];
  private ranks_values: number[] = [];
  private rank_values_count_obj: {
    [index: number]: number;
  } = {};
  private suit_count_obj: {
    [index: string]: number;
  } = {};
  constructor(hole_cards: IDeckType, community_cards: IDeckType) {
    this.hands = [...hole_cards, ...community_cards].sort(
      (a, b) => this.ranks_value_obj[a.rank] - this.ranks_value_obj[b.rank]
    );
    this.suits = [...hole_cards, ...community_cards].map((card) => card.suit);
    this.ranks_values = [...hole_cards, ...community_cards]
      .map((card) => this.ranks_value_obj[card.rank])
      .sort((a, b) => a - b);
    this.suits.forEach((suit) => {
      this.suit_count_obj[suit] = (this.suit_count_obj[suit] || 0) + 1;
    });
    this.ranks_values.forEach((val) => {
      this.rank_values_count_obj[val] =
        (this.rank_values_count_obj[val] || 0) + 1;
    });
  }

  public royalFlush() {
    const hands = this.hands.filter((card) => "10JQKA".includes(card.rank));
    if (hands.length !== 5) {
      return false;
    }
    return hands.every((card) => card.suit == hands[0].suit);
  }

  public straightFlush() {
    let current_index = 0;
    let no_of_cards_in_order = 0;
    while (current_index < this.hands.length) {
      if (
        this.hands[current_index - 1]?.suit == this.hands[current_index].suit &&
        this.ranks_value_obj[this.hands[current_index - 1].rank] + 1 ==
          this.ranks_value_obj[this.hands[current_index].rank]
      ) {
        no_of_cards_in_order += 1;
      }
      current_index += 1;
    }
    return no_of_cards_in_order >= 5;
  }
  public isStraight() {
    let current_index = 0;
    let no_of_cards_in_order = 0;
    while (current_index < this.ranks_values.length) {
      if (
        this.ranks_values[current_index - 1] + 1 ==
        this.ranks_values[current_index]
      ) {
        no_of_cards_in_order += 1;
      }
      current_index += 1;
    }
    return no_of_cards_in_order >= 5;
  }

  public handRanking() {
    if (this.royalFlush()) {
      return {
        rank: 1,
        pattern: "Royal Flush",
      };
    }
    if (this.straightFlush()) {
      return {
        rank: 2,
        pattern: "Straight Flush",
      };
    }
    if (Object.values(this.rank_values_count_obj).includes(4)) {
      return {
        rank: 3,
        pattern: "Four of a kind",
      };
    }
    if (
      Object.values(this.rank_values_count_obj).includes(3) &&
      Object.values(this.rank_values_count_obj).includes(2)
    ) {
      return {
        rank: 4,
        pattern: "Full House",
      };
    }
    if (Object.values(this.suit_count_obj).some((val) => val >= 5)) {
      return {
        rank: 5,
        pattern: "Flush",
      };
    }
    if (this.isStraight()) {
      return {
        rank: 6,
        pattern: "Straight",
      };
    }
    if (Object.values(this.rank_values_count_obj).includes(3)) {
      return {
        rank: 7,
        pattern: "Three of a kind",
      };
    }
    if (
      Object.values(this.rank_values_count_obj).filter((val) => val == 2)
        .length == 2
    ) {
      return {
        rank: 8,
        pattern: "Two Pair",
      };
    }
    if (Object.values(this.rank_values_count_obj).includes(2)) {
      return {
        rank: 9,
        pattern: "One Pair",
      };
    }
    return {
      rank: 10,
      pattern: "High Card",
    };
  }
}

export { getCardRankInWord, getPlayerPosition, Hand };
