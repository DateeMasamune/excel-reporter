import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { Grid } from "@mui/material";
import { AddDish } from "@renderer/components/add-dish";
import { MenuList } from "@renderer/components/menu-list";
import { theme } from "@renderer/theme";
import { ClearDBButton } from "./components/clear-db/clear-db";
import { ErrorBoundary } from "react-error-boundary";
import { Fallback } from "./components/fallback";
import { SubscribeTabsProvider } from "./context/tabs";
import { SubscribeOrdersProvider } from "./context/orders";
import { SnowAnimation } from "./components/snow-animation";
import { ChristmasTree } from "./components/christmas-tree";

function App() {
  return (
    <>
      <SnowAnimation />
      <ErrorBoundary fallbackRender={Fallback}>
        <ThemeProvider theme={theme}>
          <SubscribeTabsProvider>
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
          </SubscribeTabsProvider>
          <CssBaseline />
        </ThemeProvider>
      </ErrorBoundary>
      <ChristmasTree />
    </>
  );
}

export default App;
