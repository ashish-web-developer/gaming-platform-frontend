// types
import CustomChatTheme from "@/types/theme/chat";

const lightTheme: CustomChatTheme = {
  palette: {
    primary: {
      main: "#000000",
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
