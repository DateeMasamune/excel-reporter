import { app, BrowserWindow, ipcMain } from "electron";
import path, { join } from "path";

ipcMain.handle("ping", () => "pong");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(import.meta.dirname, "../../out/preload/index.js"),
    },
  });

  if (import.meta.env.DEV) {
    win.loadURL(`http://localhost:${import.meta.env.VITE_PORT}`);
  } else {
    win.loadFile(join(__dirname, "../renderer/index.html"));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
