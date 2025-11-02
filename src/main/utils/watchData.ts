import { ipcRenderer } from "electron";

export const watchData = async <T>(
  action: string,
  callback: (data: T) => void
): Promise<() => void> => {
  const { channel } = await ipcRenderer.invoke(`db-watch-${action}`);

  const listener = (_event: Electron.IpcRendererEvent, data: T) =>
    callback(data);
  ipcRenderer.on(channel, listener);

  return () => ipcRenderer.off(channel, listener);
};
