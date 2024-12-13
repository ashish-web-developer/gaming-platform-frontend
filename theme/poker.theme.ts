// type
import type { IBreakpoints } from "breakpoints";
// breakpoints
import Breakpoints from "breakpoints";

export type ITheme = {
  palette: {
    primary: {
      main: string;
    };
    secondary: {
      main: string;
    };
    info: {
      main: string;
    };
    success: {
      main: string;
    };
  };
  breakpoints: IBreakpoints;
  fontFamily: {
    lobster: string;
    bangers: string;
  };
};

export const Theme: ITheme = {
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#EF233C",
    },
    info: {
      main: "#ffffff",
    },
    success: {
      main: "#90E39A",
    },
  },
  breakpoints: { ...Breakpoints },
  fontFamily: {
    lobster: "'Lobster',sans-serif",
    bangers: "Bangers",
  },
};
