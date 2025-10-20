import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  //@ts-ignore
  generateExcel: (data, options) =>
    ipcRenderer.invoke("generate-excel", data, options),
  //@ts-ignore
  test: (data, options) =>
    ipcRenderer.invoke("tes22222t", data, options),
});
