import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

export const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          // backgroundColor: grey[300],
          opacity: 1,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: grey[50],
          boxShadow:
            "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
        },
        arrow: {
          color: grey[50],
        },
      },
    },
  },
});
