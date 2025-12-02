// .storybook/preview.js
import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// Optional: extend default theme
const theme = extendTheme({});

export const decorators = [
  (Story) => (
    <ChakraProvider theme={theme}>
      <Story />
    </ChakraProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on.*" },
};
