// breakpoints
import Breakpoints from "breakpoints";
// types
import type { IBreakpoints } from "breakpoints";

export type ITheme = {
  palette: {
    primary: {
      main: string;
      dark: string;
      light: string;
    };
    secondary: {
      main: string;
      dark: string;
    };
    info: {
      main: string;
    };
    warning: {
      main: string;
    };
  };
  breakpoints: IBreakpoints;
  fontFamily: {
    lobster: string;
    poppins: string;
  };
};
export const darkTheme: ITheme = {
  palette: {
    primary: {
      main: "#000000",
      dark: "#A2F263",
      light: "#FFFFFF",
    },
    secondary: {
      main: "#FFF3F0",
      dark: "#AFA2FF",
    },
    info: {
      main: "#A2F263",
    },
    warning: {
      main: "#F42C04",
    },
  },
  breakpoints: {
    ...Breakpoints,
  },
  fontFamily: {
    lobster: "'Lobster',sans-serif",
    poppins: "'Poppins',sans-serif",
  },
};

export const lightTheme: ITheme = {
  palette: {
    primary: {
      main: "#FFFFFF",
      dark: "#000000",
      light: "#EE964B",
    },
    secondary: {
      main: "#FFF3F0",
      dark: "#AFA2FF",
    },
    info: {
      main: "#A2F263",
    },
    warning: {
      main: "#F42C04",
    },
  },
  breakpoints: {
    ...Breakpoints,
  },
  fontFamily: {
    lobster: "'Lobster',sans-serif",
    poppins: "'Poppins',sans-serif",
  },
};
