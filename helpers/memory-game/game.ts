// types
import { GetRandomCard } from "@/types/helpers/memory-game/game";

const getRandomSuit = (): string => {
  const cardSuits = ["♠", "♣", "♦", "♥"];
  const cardSuitsLength = cardSuits.length;
  const randomIndex = Math.floor(Math.random() * cardSuitsLength);
  return cardSuits[randomIndex];
};

const getRandomImage = (files: string[]): string => {
  const randomIndex = Math.floor(Math.random() * files.length);
  return files[randomIndex];
};

const getRandomCardNumber = (): string | number => {
  const suitWithCards = ["♚", "♛", "♞", "A", 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const randomIndex = Math.floor(Math.random() * suitWithCards.length);
  return suitWithCards[randomIndex];
};

const getRandomCard = (): GetRandomCard => {
  const suit = getRandomSuit();
  const cardNumber = getRandomCardNumber();
  return {
    suit,
    card: cardNumber,
    cardColor: ["♦", "♥"].includes(suit) ? "red" : "black",
  };
};

const getCardName = ({
  suit,
  card,
}: {
  suit: "♠" | "♣" | "♦" | "♥";
  card: "♚" | "♛" | "♞" | "A" | number;
}): string => {
  const numbers = [
    "Zero",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
  ];
  const card_name_dict = {
    "♚": "king",
    "♛": "queen",
    "♞": "jack",
    A: "Ace",
  };
  const suit_name_dict = {
    "♠": "spade",
    "♣": "club",
    "♦": "diamond",
    "♥": "heart",
  };
  let card_name;
  if (typeof card == "number") {
    card_name = numbers[card];
  } else {
    card_name = card_name_dict[card];
  }
  return `${card_name} of ${suit_name_dict[suit]}`;
};

export {
  getRandomCard,
  getRandomImage,
  getRandomSuit,
  getRandomCardNumber,
  getCardName,
};
