import { contextBridge, ipcRenderer } from "electron";
import type { TMenuItem, TMenuList } from "../main/entities/menu-list";
import { watchData } from "../main/utils/watchData";

contextBridge.exposeInMainWorld("electron", {
  createExcel: () => ipcRenderer.invoke("create-excel"),
  createOrder: (orderData: TMenuItem) =>
    ipcRenderer.invoke("db-create-order", orderData),
  updateOrder: (orderData: TMenuItem) =>
    ipcRenderer.invoke("db-update-order", orderData),
  deleteOrder: (id: string) => ipcRenderer.invoke("db-delete-order", id),
  getOrders: () => ipcRenderer.invoke("db-get-orders"),
  watchOrders: (callback: (orders: TMenuList) => void) =>
    watchData("orders", callback),
});
