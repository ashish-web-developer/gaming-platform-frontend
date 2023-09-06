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
      poppins: "'Poppins', sans-serif",
      monofett:"'Monofett', monospace",
      russo:"'Russo One', sans-serif",
      bangers:"'Bangers', cursive",
      bungee: "'Bungee', cursive",
      blackOpsOne:"'Black Ops One', cursive"
    },
    background:{
      main:"#FFFFFF"
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
