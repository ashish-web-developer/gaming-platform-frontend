import type CustomThemePalette from "@/types/theme/memory-game";




const lightTheme:CustomThemePalette= {
  palette:{
    primary:{
      main:"#F9F8F8",
      info:"#080F0F",
      background:"url('/memory-game/background/light-background.png')",
      start_banner_background:"url('/memory-game/start-banner/light-background-two.svg')",
      mobile_start_banner_background:"url('/memory-game/start-banner/mobile/light-background-two.svg')"
    },
    secondary:{
      main:"#F65BE3",
      info:"#ff934f",
      red:"#FF2400",
      green:"#329f5b"
    },
    fontFamily:{
      poppins:"'Poppins', sans-serif;"

    },
    breakpoints:{
      mobile:"600px"
    }
  }
};

const darkTheme:CustomThemePalette = {
  palette:{
    primary:{
      main:"#080F0F",
      info:"#F9F8F8",
      background:"url('/memory-game/background/dark-background.png')",
      start_banner_background:"url('/memory-game/start-banner/dark-background-two.svg')",
      mobile_start_banner_background:"url('/memory-game/start-banner/mobile/dark-background-two.svg')"
    },
    secondary:{
      main:"#F65BE3",
      info:"#FF934F",
      red:"#FF2400",
      green:"#329f5b"
    },
    fontFamily:{
      poppins:"'Poppins', sans-serif;"

    },
    breakpoints:{
      mobile:"600px"
    }
  }
};

const getTheme = (mode: "dark" | "light"):CustomThemePalette => {
  return mode=="light"?lightTheme:darkTheme;
};

export default getTheme;
