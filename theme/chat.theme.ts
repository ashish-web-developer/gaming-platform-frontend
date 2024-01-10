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
      border: "2px solid #000",
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
      border: "2px solid #000000",
      active_user_border: "2px solid #EE964B",
    },
    active_user_profile: {
      background: "#000000",
      border: "#F6AE2D",
      text_main: "#FFFFFF",
      text_secondary: "#F6AE2D",
    },
    chat_input: {
      border: "3px solid #000000",
      search_img: "/chat/chat-sidebar/chat-search-input/light-search.png",
    },
    chat_messages_container: {
      border: "#000000",
    },
    messages: {
      send_message_border: "#000000",
      received_message_border: "#EE964B",
      double_tick_img: `url("/chat/chat-message-container/dark-double-tick.png")`,
    },
    emoji_container: {
      border: "1px solid #000",
    },
    back_button: {
      background: "#000000",
      icon: "#FFFFFF",
    },
    fontFamily: {
      lobster: "Lobster",
      poppins: "'Poppins', sans-serif;",
    },
    breakpoints: {
      mobile: "600px",
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
    active_user_profile: {
      background: "#000000",
      border: "#A2F263",
      text_main: "#FFFFFF",
      text_secondary: "#A2F263",
    },
    chat_messages_container: {
      border: "#A2F263",
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
    back_button: {
      background: "#A2F263",
      icon: "#000000",
    },
    fontFamily: {
      lobster: "Lobster",
      poppins: "'Poppins', sans-serif;",
    },
    breakpoints: {
      mobile: "600px",
    },
  },
};

const getTheme = (mode: "dark" | "light"): CustomChatTheme => {
  return mode == "light" ? lightTheme : darkTheme;
};

export default getTheme;
