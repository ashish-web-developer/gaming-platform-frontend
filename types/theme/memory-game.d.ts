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
    secondary: {
      main: string;
      info: string;
      red: string;
      green: string;
    };
    fontFamily: {
      poppins: string;
    };
    breakpoints: {
      mobile: string;
    };
  };
};

export default CustomMemoryGameThemePalette;
