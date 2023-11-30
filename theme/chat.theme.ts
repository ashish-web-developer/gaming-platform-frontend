// types
import CustomChatTheme from "@/types/theme/chat";

const lightTheme: CustomChatTheme = {
  palette: {
    primary: {
      main: "#FFFFFF",
      info: "#000000",
    },
    secondary: {
      main: "#EE964B",
    },
    searchbar: {
      background: "#FFF3F0",
      border: "1px solid #000",
    },
    searchbar_result_container: {
      background: "#FFFFFF",
      border: "2px solid #000000",
      search_result: {
        skeleton: "#F1F2F3",
        background: "#FFF3F0",
        border: "1px solid #000000",
      },
    },
    default_user_profile: {
      background: "#FFF3F0",
      border: "1px solid #000000",
      active_user_border: "1px solid #EE964B",
    },
    chat_input: {
      border: "3px solid #000000",
      search_img: "/chat/chat-sidebar/chat-search-input/light-search.png",
    },
    messages: {
      send_message_border: "#000000",
      received_message_border: "#EE964B",
      double_tick_img: `url("/chat/chat-message-container/dark-double-tick.png")`,
    },
    emoji_container: {
      border: "1px solid #000",
    },
    fontFamily: {
      lobster: "Lobster",
    },
  },
};

const darkTheme: CustomChatTheme = {
  palette: {
    primary: {
      main: "#000000",
      info: "#FFF3F0",
    },
    secondary: {
      main: "#A2F263",
    },
    searchbar: {
      background: "#000000",
      border: "1px solid #A2F263",
    },
    searchbar_result_container: {
      background: "#000000",
      border: "2px solid #A2F263",
      search_result: {
        skeleton: "#F1F2F3",
        background: "#FFF3F0",
        border: "none",
      },
    },
    default_user_profile: {
      background: "#FFF3F0",
      border: "none",
      active_user_border: "4px solid #AEF78E",
    },
    messages: {
      send_message_border: "#AFA2FF",
      received_message_border: "#E7E08B",
      double_tick_img: `url("/chat/chat-message-container/light-double-tick.png")`,
    },
    chat_input: {
      border: "3px solid #A2F263",
      search_img: "/chat/chat-sidebar/chat-search-input/dark-search.png",
    },
    emoji_container: {
      border: "1px solid #A2F263",
    },
    fontFamily: {
      lobster: "Lobster",
    },
  },
};

const getTheme = (mode: "dark" | "light"): CustomChatTheme => {
  return mode == "light" ? lightTheme : darkTheme;
};

export default getTheme;
