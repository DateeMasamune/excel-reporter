import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import dotenv from "dotenv";
import { generateExcel } from "./excel-reporter";

dotenv.config({ path: ".env.development" });

ipcMain.handle("generate-excel", generateExcel);

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (process.env.NODE_ENV === "development") {
    win.loadURL(`http://localhost:${process.env.PORT}`);
  } else {
    win.loadFile("index.html");
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
