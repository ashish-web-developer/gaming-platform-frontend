import { createTheme } from "@mui/material";

const lightPalette:any = {
  primary: {
    main: "#FFFFFF",
    light:"#f4f6f8"
  },
  secondary: {
    main: "#f5f6f8",
  },
  text: {
    main: "#1C120E",
    light: "#989A9F",
  },
  border: {
    searchbar: "#f1f1f2",
  },
};

const darkPalette:any = {
  primary: {
    main: "#202634",
    light:"#131821"
  },
  secondary: {
    main: "#15171f",
  },
  text: {
    main: "#FFFFFF",
    light: "#989A9F",
  },
  border: {
    searchbar: "#202634",
  },
};

const getTheme = (mode: "dark" | "light") => {
  const theme = createTheme({
    palette: {
      mode,
      ...(mode == "dark" ? darkPalette : lightPalette),
    },
  });
  return theme;
};

export default getTheme;
