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
    info: {
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
    info: {
      main: "#D6FFB7",
    },
  },
  breakpoints: { ...Breakpoints },
  fontFamily: {
    bangers: "Bangers",
  },
};
