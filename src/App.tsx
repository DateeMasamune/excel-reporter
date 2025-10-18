import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { MenuList } from "@components/menu-list";
import { theme } from "@theme/index";
import { AddDish } from "@components/add-dish";
import { Grid } from "@mui/material";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container justifyContent="space-between">
          <MenuList />
          <AddDish />
        </Grid>
        <CssBaseline />
      </ThemeProvider>
    </>
  );
}

export default App;
