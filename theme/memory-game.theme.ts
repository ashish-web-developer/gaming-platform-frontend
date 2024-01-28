// type
import type { IBreakpoints } from "breakpoints";
// breakpoints
import Breakpoints from "breakpoints";
export type ITheme = {
  palette: {
    primary: {
      main: string;
      contrast: string;
      dark: string;
      light: string;
    };
  };
  breakpoints: IBreakpoints;
  fontFamily: {
    poppins: string;
  };
};

export const darkTheme: ITheme = {
  palette: {
    primary: {
      main: "#080F0F",
      contrast: "#D62839",
      dark: "#080F0F",
      light: "#FFFFFF",
    },
  },
  breakpoints: {
    ...Breakpoints,
  },
  fontFamily: {
    poppins: "'Poppins',sans-serif",
  },
};

export const lightTheme: ITheme = {
  palette: {
    primary: {
      main: "#F3E1DD",
      contrast: "#EF233C",
      dark: "#120309",
      light: "#E6E8E6",
    },
  },
  breakpoints: {
    ...Breakpoints,
  },
  fontFamily: {
    poppins: "'Poppins',sans-serif",
  },
};
