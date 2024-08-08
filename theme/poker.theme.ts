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
    success: {
      main: string;
    };
    warning: {
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
      main: "#000",
      light: "#1E1E1E",
    },
    secondary: {
      main: "#F5D547",
    },
    info: {
      main: "#fff",
    },
    success: {
      main: "#90E39A",
    },
    warning: {
      main: "#ff1b1c",
    },
  },
  breakpoints: { ...Breakpoints },
  fontFamily: {
    lobster: "'Lobster',sans-serif",
    bangers: "Bangers",
  },
};
