export type IBreakpoints = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
};

const Breakpoints: IBreakpoints = {
  xs: "400px", // for small screen mobile
  sm: "600px", // for mobile screen
  md: "900px", // for tablets
  lg: "1280px", // for laptops
  xl: "1440px", // for desktop / monitors
  xxl: "1920px", // for big screens
};
export default Breakpoints;
