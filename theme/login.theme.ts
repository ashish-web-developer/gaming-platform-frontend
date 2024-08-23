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
  };
  breakpoints: IBreakpoints;
  fontFamily: {
    bangers: string;
  };
};

export const Theme: ITheme = {
  palette: {
    primary: {
      main: "#D6FFB7",
      light: "#E4D9FF",
    },
  },
  breakpoints: { ...Breakpoints },
  fontFamily: {
    bangers: "Bangers",
  },
};
