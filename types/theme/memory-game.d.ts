type CustomMemoryGameThemePalette = {
  palette: {
    primary: {
      main: string;
      info: string;
      background: string;
      mobile_start_banner_background: string;
    };
    welcome_banner: {
      main: string;
      side_container: {
        background: string;
        text: string;
        mobile: {
          background: string;
        };
      };
      tag: {
        main: string;
      };
      mobile: {
        container: {
          border: string;
          background: string;
          trophy_container: {
            border: string;
          };
          logo_text: {
            cogni_text_color: string;
            match_text_color: string;
          };
          content_text_color: string;
          stars: {
            stars_first_color: string;
            stars_second_color: string;
            stars_third_color: string;
          };
        };
        dotted_container: {
          border: string;
        };
      };
    };
    start_banner: {
      main: string;
      background_one: string;
      background_two: string;
      mobile: {
        background_one: string;
        background_two: string;
      };
      timer: {
        text_left: string;
        text_right: string;
      };
      vs_container: {
        main: string;
        text: string;
      };
    };
    info_snackbar: {
      background: string;
      border_color: string;
      text_color: string;
      profile_background: string;
    };
    nav: {
      background: string;
      color: string;
      mobile: {
        background: string;
        border: string;
        icons: string;
        help_icon: string;
        help_tooltip_border: string;
      };
    };
    help_tooltip: {
      help_tooltip_cta: {
        cta_container_background: string;
        cta_color: string;
      };
      tooltip: {
        background: string;
        tooltip_heading: string;
        tooltip_para: string;
        icons: string;
        pattern: string;
      };
      volume: {
        background: string;
        color: string;
      };
      mobile: {
        background: string;
        mobile_top_background: string;
        heading: string;
        para: string;
        icons: string;
        back_cta: {
          background: string;
          text_color: string;
          start_icon_background: string;
          start_icon: string;
        };
      };
    };
    game_board: {
      background: string;
      card: {
        background: string;
      };
      score_board: {
        mobile: {
          background_color: string;
          user_name_color: string;
        };
      };
    };
    result_board: {
      background_color: string;
      border_color: string;
      text_color: string;
      star_icon: {
        background_color: string;
        stroke_color: string;
      };
      score_board: {
        background_color: string;
        border_color: string;
      };
    };
    live_stream_chat: {
      background: string;
      border: string;
    };
    secondary: {
      main: string;
      info: string;
      red: string;
      green: string;
    };
    fontFamily: {
      poppins: string;
      jim: string;
      oleo_script_swash_caps: string;
    };
    breakpoints: {
      mobile: string;
    };
  };
};

export default CustomMemoryGameThemePalette;
