import { extendTheme } from "@chakra-ui/react";

const components = {
  Heading: {
    variants: {
      "section-title": {
        textDecoration: "underline",
        fontSize: 20,
        textUnderlineOffset: 6,
        textDecorationColor: "#525252",
        textDecorationThickness: 4,
        marginTop: 3,
        marginBottom: 4,
      },
    },
  },

  Link: {
    baseStyle: (props) => ({
      textDecoration: "none",
    }),
  },
};
const fonts = {
  heading: "'Roboto'",
};

const colors = {
  glassTeal: "#88ccca",
};

const config = {
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  components,
  colors,
  fonts,
});
export default theme;
