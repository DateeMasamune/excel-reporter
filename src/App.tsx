import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { MenuList } from "@components/menu-list";
import { theme } from "@theme/index";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <MenuList />
        <CssBaseline />
      </ThemeProvider>
    </>
  );
}

export default App;
