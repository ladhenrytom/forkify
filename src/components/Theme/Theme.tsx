import {createTheme} from "@mui/material";
import "@fontsource/nunito-sans";

export const Theme = createTheme({
  palette: {
    primary: {
      main: "#f38e82",
    },
    secondary: {
      main: "#fbdb89",
    },
  },
  typography: {
    fontFamily: ["Nunito Sans", "sans-serif"].join(","),
    h6: {
      fontWeight: "bold",
    },
  },
});
