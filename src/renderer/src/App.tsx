import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { Button, Grid } from "@mui/material";
import { AddDish } from "@renderer/components/add-dish";
import { MenuList } from "@renderer/components/menu-list";
import { theme } from "@renderer/theme";
import { useCallback, useEffect, useRef } from "react";

// Кастомный хук для скачивания файлов
function useFileDownload() {
  const previousUrlRef = useRef<string | null>(null);

  const downloadFile = useCallback(
    async (fileName: string, getFileData: () => Promise<ArrayBuffer>) => {
      // Очищаем предыдущий URL
      if (previousUrlRef.current) {
        URL.revokeObjectURL(previousUrlRef.current);
        previousUrlRef.current = null;
      }

      try {
        const arrayBuffer = await getFileData();

        if (!arrayBuffer || arrayBuffer.byteLength === 0) {
          throw new Error("Получен пустой файл");
        }

        const blob = new Blob([arrayBuffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const url = URL.createObjectURL(blob);
        previousUrlRef.current = url;

        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        link.style.display = "none";

        document.body.appendChild(link);
        link.click();

        // Очистка
        setTimeout(() => {
          document.body.removeChild(link);
          if (previousUrlRef.current === url) {
            URL.revokeObjectURL(url);
            previousUrlRef.current = null;
          }
        }, 100);
      } catch (error) {
        console.error("Ошибка скачивания:", error);
        throw error;
      }
    },
    []
  );

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (previousUrlRef.current) {
        URL.revokeObjectURL(previousUrlRef.current);
      }
    };
  }, []);

  return downloadFile;
}

function App() {
  const downloadFile = useFileDownload();

  const handleDownloadInRenderer = async () => {
    if (!window.electron) {
      alert("Эта функция доступна только в приложении Electron");
      return;
    }

    try {
      await downloadFile(
        `бланк_ТОКИО_${new Date().toLocaleDateString("ru-RU").replace(/\./g, "-")}.xlsx`,
        () => window.electron.createExcel()
      );
    } catch (error) {
      console.error("Ошибка:", error);
      alert(`Ошибка при создании бланка: ${error.message}`);
    }
  };

  return (
    <>
      <Button
        onClick={handleDownloadInRenderer}
        variant="contained"
        color="primary"
        sx={{ margin: 2 }}
      >
        Скачать Excel бланк
      </Button>
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
