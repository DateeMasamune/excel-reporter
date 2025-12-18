import { ipcRenderer } from "electron";

export const watchData = async <T, TFilter>(
  action: string,
  callback: (data: T) => void,
  filter?: TFilter
) => {
  const { channel } = await ipcRenderer.invoke(`db-watch-${action}`, filter);

  const listener = (_event: Electron.IpcRendererEvent, data: T) =>
    callback(data);
  ipcRenderer.on(channel, listener);

  // Notify the main process that the listener is ready
  ipcRenderer.send("renderer-ready-for-data", channel);

  return () => {
    ipcRenderer.off(channel, listener);
    ipcRenderer.send("unsubscribe-channel", channel);
  };
};
