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
    };
    start_banner: {
      main: string;
      background_one: string;
      background_two: string;
      start_banner_girl_src: string;
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
    chat: {
      main: string;
      top_background: string;
      icon_color: string;
      vs_container: {
        main: string;
        text: string;
      };
      messages_background: string;
      scrollbar_color: string;
      input: {
        text_color: string;
        placeholder_color: string;
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
        icons: string;
        help_icon: string;
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
