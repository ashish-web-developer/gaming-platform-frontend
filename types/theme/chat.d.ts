type CustomChatTheme = {
  palette: {
    primary: {
      main: string;
      info: string;
    };
    secondary: {
      main: string;
    };
    searchbar: {
      background: string;
      border: string;
    };
    searchbar_result_container: {
      background: string;
      border: string;
      search_result: {
        skeleton: string;
        background: string;
        border: string;
      };
    };
    chat_input: {
      border: string;
      search_img: string;
    };
    default_user_profile: {
      background: string;
      border: string;
      active_user_border: string;
    };
    active_user_profile: {
      background: string;
      border: string;
      text_main: string;
      text_secondary: string;
    };
    chat_messages_container: {
      border: string;
    };
    messages: {
      send_message_border: string;
      received_message_border: string;
      double_tick_img: string;
    };
    emoji_container: {
      border: string;
    };
    back_button: {
      background: string;
      icon: string;
    };
    fontFamily: {
      lobster: string;
    };
    breakpoints: {
      mobile: string;
    };
  };
};

export default CustomChatTheme;
