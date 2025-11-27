import { extendTheme } from "@chakra-ui/react";

const breakpoints = {
  base: "0em",   
  sm: " 480px",    
  md: "768px",     
  lg: "992px",     
  xl: "1280px",     
  "2xl": "1536px",  
  tablet: "768px",  
  desktop: "1280px",  
};

const theme = extendTheme({ breakpoints });

export default theme;
