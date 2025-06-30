// theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    
  },
});

export default theme;

import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        red:"#3C3C3C",
        
      },
    },
  },
})

\myred: {
        100:"#3c3c3c"
    },
    secondary: {
      100: "#262626",
      200: "#1E1E1E"
    },
    accent: {
      500: "#5297FF",
    },