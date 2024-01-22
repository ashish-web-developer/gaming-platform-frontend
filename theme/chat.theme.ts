// breakpoints
import Breakpoints from "@/theme/chat.breakpoints";
// types
import type { IBreakpoints } from "@/theme/chat.breakpoints";

export type Theme = {
  palette: {
    primary: {
      main: string;
      dark: string;
      light: string;
    };
    secondary: {
      main: string;
    };
  };
  breakpoints: IBreakpoints;
};
export const darkTheme: Theme = {
  palette: {
    primary: {
      main: "#000000",
      dark: "#A2F263",
      light: "#FFFFFF",
    },
    secondary: {
      main: "#FFF3F0",
    },
  },
  breakpoints: {
    ...Breakpoints,
  },
};

export const lightTheme: Theme = {
  palette: {
    primary: {
      main: "#FFFFFF",
      dark: "#000000",
      light: "#EE964B",
    },
    secondary: {
      main: "#FFF3F0",
    },
  },
  breakpoints: {
    ...Breakpoints,
  },
};
