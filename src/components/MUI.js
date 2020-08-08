import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
      light: "#3f51b5",
    },
    status: {
      danger: "#e53e3e",
    },
  },
});

export default theme;
