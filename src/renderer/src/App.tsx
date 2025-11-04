import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { Grid } from "@mui/material";
import { AddDish } from "@renderer/components/add-dish";
import { MenuList } from "@renderer/components/menu-list";
import { theme } from "@renderer/theme";
import { SubscribeOrdersProvider } from "./context/SubscribeOrdersProvider";
import { ClearDBButton } from "./components/clear-db/clear-db";
import { ErrorBoundary } from "react-error-boundary";
import { Fallback } from "./components/fallback";

function App() {
  return (
    <>
      <ErrorBoundary fallbackRender={Fallback}>
        <ThemeProvider theme={theme}>
          <SubscribeOrdersProvider>
            <Grid
              container
              justifyContent="space-between"
              direction="column"
              gap="50px"
              height="100vh"
            >
              <Grid container direction="column" gap="50px">
                <MenuList />
                <AddDish />
              </Grid>
              <ClearDBButton />
            </Grid>
          </SubscribeOrdersProvider>
          <CssBaseline />
        </ThemeProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
