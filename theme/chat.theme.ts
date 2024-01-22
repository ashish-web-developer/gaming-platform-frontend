// breakpoints
import Breakpoints from "breakpoints";
// types
import type { IBreakpoints } from "breakpoints";

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
  fontFamily:{
    lobster:string;
  }
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
  fontFamily:{
    lobster:"'Lobster',sans-serif"
  }
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
  fontFamily:{
    lobster:"'Lobster',sans-serif"
  }
};
