import type CustomThemePalette from "@/types/theme/memory-game";




const lightTheme:CustomThemePalette= {
  palette:{
    primary:{
        main:"#F3F5FB"
    },
    secondary:{
      main:"#3E32B2",
      light:"#B5BAD1"

    },
    fontFamily:{
      primary:{
        monofett:"'Monofett', monospace",
        russo:"'Russo One', sans-serif",
        bangers:"'Bangers', cursive"
      }
    }
  }
};

const darkTheme:CustomThemePalette = {
  palette:{
    primary:{
      main: "#160C14"
    },
  }
};

const getTheme = (mode: "dark" | "light"):CustomThemePalette => {
  return mode=="light"?lightTheme:darkTheme;
};

export default getTheme;
