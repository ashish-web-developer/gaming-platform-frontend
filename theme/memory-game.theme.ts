import type CustomThemePalette from "@/types/theme/memory-game";

const lightTheme: CustomThemePalette = {
  palette: {
    primary: {
      main: "#F7FFF6",
      info: "#080F0F",
      background: "url('/memory-game/background/light-background.png')",
      mobile_start_banner_background:
        "url('/memory-game/start-banner/mobile/light-background-two.svg')",
    },
    welcome_banner: {
      main: "#F42C04",
      side_container: {
        background: `url("/memory-game/welcome-banner/light-background.svg")`,
        text: "#2B061E",
        mobile: {
          background: `url("/memory-game/welcome-banner/mobile/light-background.svg")`,
        },
      },
      tag: {
        main: "#1E96FC",
      },
    },
    start_banner: {
      main: "#1E96FC",
      start_banner_girl_src:
        "/memory-game/start-banner/light-start-banner-girl.png",
      background_one: `url("/memory-game/start-banner/light-background-one.svg")`,
      background_two:
        "url('/memory-game/start-banner/light-background-two.svg')",
      mobile: {
        background_one: `url("/memory-game/start-banner/mobile/light-background-one.svg")`,
        background_two:
          "url('/memory-game/start-banner/mobile/light-background-two.svg')",
      },
      timer: {
        text_left: "#F7FFF6",
        text_right: "#2B061E",
      },
      vs_container: {
        main: "#2B061E",
        text: "#F7FFF6",
      },
    },
    chat: {
      main: "#2B061E",
      top_background: `url("/memory-game/chat/light-background.svg")`,
      icon_color: "#1E96FC",
      vs_container: {
        main: "#2B061E",
        text: "#F7FFF6",
      },
      messages_background: "#3C91E6",
      scrollbar_color: "#3C91E6",
      input: {
        text_color: "#F7FFF6",
        placeholder_color: "",
      },
    },
    info_snackbar: {
      background: "#2B061E",
      border_color: "#F5E960",
      text_color: "#F7FFF6",
      profile_background: "#F5E960",
    },
    nav: {
      background: "#F5E960",
      color: "#2B061E",
      mobile: {
        background: "#F5E960",
        icons: "#2B061E",
        help_icon: "#D62839",
      },
    },
    help_tooltip: {
      help_tooltip_cta: {
        cta_container_background: "#F5E960",
        cta_color: "#F42C04",
      },
      tooltip: {
        background: "#F5E960",
        tooltip_heading: "#F42C04",
        tooltip_para: "#2B061E",
        icons: "#2B061E",
        pattern: "#1E96FC",
      },
      volume: {
        background: "#2B061E",
        color: "#F7FFF6",
      },
    },
    secondary: {
      main: "#F65BE3",
      info: "#ff934f",
      red: "#FF2400",
      green: "#329f5b",
    },
    fontFamily: {
      poppins: "'Poppins', sans-serif;",
    },
    breakpoints: {
      mobile: "600px",
    },
  },
};

const darkTheme: CustomThemePalette = {
  palette: {
    primary: {
      main: "#080F0F",
      info: "#F9F8F8",
      background: "url('/memory-game/background/dark-background.png')",
      mobile_start_banner_background:
        "url('/memory-game/start-banner/mobile/dark-background-two.svg')",
    },
    welcome_banner: {
      main: "#080F0F",
      side_container: {
        background: `url("/memory-game/welcome-banner/dark-background.svg")`,
        text: "#f9f8f8",
        mobile: {
          background: `url("/memory-game/welcome-banner/mobile/dark-background.svg")`,
        },
      },
      tag: {
        main: "#FF934F",
      },
    },
    start_banner: {
      main: "#FF934F",
      background_one: `url("/memory-game/start-banner/dark-background-one.svg")`,
      background_two:
        "url('/memory-game/start-banner/light-background-two.svg')",
      start_banner_girl_src:
        "/memory-game/start-banner/dark-start-banner-girl.png",
      mobile: {
        background_one: `url("/memory-game/start-banner/mobile/dark-background-one.svg")`,
        background_two: `url("/memory-game/start-banner/mobile/dark-background-two.svg")`,
      },
      timer: {
        text_left: "#f9f8f8",
        text_right: "#329F5B",
      },
      vs_container: {
        main: "#080f0f",
        text: "#f9f8f8",
      },
    },
    chat: {
      main: "#080F0F",
      top_background: `url("/memory-game/chat/dark-background.svg")`,
      icon_color: "#FF934F",
      vs_container: {
        main: "#2B061E",
        text: "#F7FFF6",
      },
      messages_background: "#FF934F",
      scrollbar_color: "#3C91E6",
      input: {
        text_color: "#f9f8f8",
        placeholder_color: "",
      },
    },
    info_snackbar: {
      background: "#080F0F",
      border_color: "#FF2400",
      text_color: "#f9f8f8",
      profile_background: "#FF2400",
    },
    nav: {
      background: "#FF2400",
      color: "#f9f8f8",
      mobile: {
        background: "#D62839",
        icons: "#f9f8f8",
        help_icon: "#080f0f",
      },
    },
    help_tooltip: {
      help_tooltip_cta: {
        cta_container_background: "#FF2400",
        cta_color: "#F9F8F8",
      },
      tooltip: {
        background: "#D62839",
        tooltip_heading: "#080F0F",
        tooltip_para: "#F9F8F8",
        icons: "#F9F8F8",
        pattern: "#FF934F",
      },
      volume: {
        background: "#080f0f",
        color: "#f9f8f8",
      },
    },
    secondary: {
      main: "#F65BE3",
      info: "#FF934F",
      red: "#FF2400",
      green: "#329f5b",
    },
    fontFamily: {
      poppins: "'Poppins', sans-serif;",
    },
    breakpoints: {
      mobile: "600px",
    },
  },
};

const getTheme = (mode: "dark" | "light"): CustomThemePalette => {
  return mode == "light" ? lightTheme : darkTheme;
};

export default getTheme;
