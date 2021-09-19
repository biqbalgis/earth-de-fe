import {createMuiTheme} from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#24495a", // "#0a2d3e", //"#24495a",
      contrastText: "#f5dd5d"
    },
    secondary: {
      main: "#091f2b",
      contrastText: "#758e9f" // #c4dce8
    },
    action: {active: "#f5dd5d"},

    contrastThreshold: 3,
    tonalOffset: 0.2
  }
});
