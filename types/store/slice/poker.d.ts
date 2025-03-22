type ICardSuit = "spade" | "heart" | "diamond" | "club";
type ICardRank =
  | "K"
  | "Q"
  | "J"
  | "10"
  | "9"
  | "8"
  | "7"
  | "6"
  | "5"
  | "4"
  | "3"
  | "2"
  | "A";

type IDeckType = Array<{ suit: ICardSuit; rank: ICardRank; card_id: string }>;
export { ICardSuit, ICardRank, IDeckType };
