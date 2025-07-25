// type
import type { IBreakpoints } from "breakpoints";
// breakpoints
import Breakpoints from "breakpoints";

export type ITheme = {
  palette: {
    primary: {
      main: string;
      light: string;
    };
    secondary: {
      main: string;
    };
    info: {
      main: string;
    };
    error: {
      main: string;
    };
  };
  breakpoints: IBreakpoints;
  fontFamily: {
    bangers: string;
  };
};

export const Theme: ITheme = {
  palette: {
    primary: {
      main: "#000000",
      light: "#E4D9FF",
    },
    secondary: {
      main: "#FF0000",
    },
    info: {
      main: "#D6FFB7",
    },
    error: {
      main: "#F42C04",
    },
  },
  breakpoints: { ...Breakpoints },
  fontFamily: {
    bangers: "Bangers",
  },
};
