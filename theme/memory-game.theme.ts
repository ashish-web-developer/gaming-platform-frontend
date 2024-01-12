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
      mobile: {
        container: {
          border: "4px solid #2B061E",
          background:
            "url('/memory-game/welcome-banner/mobile/background-pattern.png'), #F5E960",
          trophy_container: {
            border: "2px solid #F42C04",
          },
          content_text_color: "#2B061E",
          logo_text: {
            cogni_text_color: "#2B061E",
            match_text_color: "#F42C04",
          },
          stars: {
            stars_first_color: "#2B061E",
            stars_second_color: "#F42C04",
            stars_third_color: "#16C172",
          },
        },
        dotted_container: {
          border: "2px dashed #2B061E;",
        },
        avatar: {
          border: "3px solid #000",
        },
      },
    },
    start_banner: {
      main: "#1E96FC",
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
        background: "#080F0F",
        border: " 2px solid #F5E960",
        icons: "#2B061E",
        help_icon: "#D62839",
        help_tooltip_border: "2px solid #2B061E",
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
      mobile: {
        background: "#F5E960",
        mobile_top_background:
          "/memory-game/help-tooltip/mobile/light-top-background.svg",
        heading: "#F42C04",
        para: "#2B061E",
        icons: "#2B061E",
        back_cta: {
          background: "#2B061E",
          text_color: "#F7FFF6",
          start_icon_background: "#F7FFF6",
          start_icon: "#2B061E",
        },
      },
    },
    game_board: {
      background: "#2B061E",
      card: {
        background: "#F7FFF6",
      },
      score_board: {
        mobile: {
          background_color: "#F5E960",
          user_name_color: "#2B061E",
        },
      },
    },
    result_board: {
      background_color: "#2B061E",
      border_color: "#F5E960",
      text_color: "#F5E960",
      score_board: {
        background_color: "#2B061E",
        border_color: "#F5E960",
      },
      star_icon: {
        background_color: "#2B061E",
        stroke_color: "#F5E960",
      },
    },
    live_stream_chat: {
      background: "#2B061E",
      border: "#3C91E6",
      banner: {
        background_image:
          "url('/memory-game/live-stream-chat/light-background.jpg')",
        cta_background: "#3C91E6",
        cta_color: "#fff",
        logo_color: "#000",
        versus_color: "#F5E960",
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
      jim: "Jim Nightshade",
      oleo_script_swash_caps: "Oleo Script Swash Caps",
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
      mobile: {
        container: {
          border: "4px solid #FFF",
          background:
            "url('/memory-game/welcome-banner/mobile/background-pattern.png'), #F42C04",
          trophy_container: {
            border: "2px solid #16C172;",
          },
          content_text_color: "#FFFFFF",
          logo_text: {
            cogni_text_color: "#080F0F",
            match_text_color: "#FFFFFF",
          },
          stars: {
            stars_first_color: "#080F0F",
            stars_second_color: "#FFFFFF",
            stars_third_color: "#16C172",
          },
        },
        dotted_container: {
          border: "2px dashed #FFF",
        },
        avatar: {
          border: "3px solid #fff",
        },
      },
    },
    start_banner: {
      main: "#FF934F",
      background_one: `url("/memory-game/start-banner/dark-background-one.svg")`,
      background_two:
        "url('/memory-game/start-banner/light-background-two.svg')",
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
        background: "#2B061E",
        border: "2px solid #FFF",
        icons: "#f9f8f8",
        help_icon: "#080f0f",
        help_tooltip_border: "2px solid #FFF",
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
      mobile: {
        background: "#D62839",
        mobile_top_background:
          "/memory-game/help-tooltip/mobile/dark-top-background.svg",
        heading: "#1E1E1E",
        para: "#f9f8f8",
        icons: "#f9f8f8",
        back_cta: {
          background: "#f9f8f8",
          text_color: "#080f0f",
          start_icon_background: "#080f0f",
          start_icon: "#f9f8f8",
        },
      },
    },
    game_board: {
      background: "#080F0F",
      card: {
        background: "#F7FFF6",
      },
      score_board: {
        mobile: {
          background_color: "#FF2400",
          user_name_color: "#FFFFFF",
        },
      },
    },
    result_board: {
      background_color: "#080F0F",
      border_color: "#FFFFFF",
      text_color: "#16C172",
      score_board: {
        background_color: "#080F0F",
        border_color: "#FFFFFF",
      },
      star_icon: {
        background_color: "#080F0F",
        stroke_color: "#16C172",
      },
    },
    live_stream_chat: {
      background: "#000000",
      border: "#FFF",
      banner: {
        background_image:
          "url('/memory-game/live-stream-chat/dark-background.jpg')",
        cta_background: "#F42C04",
        cta_color: "#fff",
        logo_color: "#fff",
        versus_color: "#F42C04",
      },
    },
    secondary: {
      main: "#F65BE3",
      info: "#FF934F",
      red: "#FF2400",
      green: "#329f5b",
    },
    fontFamily: {
      poppins: "'Poppins', sans-serif",
      jim: "Jim Nightshade",
      oleo_script_swash_caps: "Oleo Script Swash Caps",
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
