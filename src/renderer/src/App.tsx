import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { Grid } from "@mui/material";
import { AddDish } from "@renderer/components/add-dish";
import { MenuList } from "@renderer/components/menu-list";
import { theme } from "@renderer/theme";

function App() {
  const ping = async () => {
    const res = await window.electron.ping();
    console.log("=========>res", res);
  };
  ping();
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
