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
  };
  fontFamily: {
    rubik_glitch: string;
    lobster: string;
  };
};

export const Theme: ITheme = {
  palette: {
    primary: {
      main: "#000",
      light: "#1E1E1E",
    },
    secondary: {
      main: "#F5D547",
    },
    info: {
      main: "#fff",
    },
  },
  fontFamily: {
    rubik_glitch: "Rubik Glitch",
    lobster: "'Lobster',sans-serif",
  },
};
