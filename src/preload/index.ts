import { contextBridge, ipcRenderer } from "electron";
import type {
  Order,
  Tab,
  TMenuItem,
  TMenuList,
} from "../main/entities/menu-list";
import { watchData } from "../main/utils/watchData";

contextBridge.exposeInMainWorld("electron", {
  createExcel: (order: Order) => ipcRenderer.invoke("create-excel", order),

  createOrder: (orderData: TMenuItem) =>
    ipcRenderer.invoke("db-create-order", orderData),

  updateOrder: (orderData: TMenuItem) =>
    ipcRenderer.invoke("db-update-order", orderData),

  deleteOrder: (id: string) => ipcRenderer.invoke("db-delete-order", id),

  getOrders: () => ipcRenderer.invoke("db-get-orders"),
  //дописать фильтрацию через табы
  watchOrders: <TFIlter>(
    callback: (orders: TMenuList) => void,
    filter?: TFIlter
  ) => {
    return watchData("orders", callback, filter);
  },
  clearDatabase: () => ipcRenderer.invoke("db-clear-orders"),

  /**Работа с табами */
  watchTabs: (callback: (tabs: Tab[]) => void) => watchData("tabs", callback),
  createTab: (tab: Tab) => ipcRenderer.invoke("db-create-tab", tab),
  updateTab: (tab: Tab) => ipcRenderer.invoke("db-update-tab", tab),
  deleteTab: (id: string) => ipcRenderer.invoke("db-delete-tab", id),
  getTabs: () => ipcRenderer.invoke("db-get-tabs"),
  copyDishes: (dishes: TMenuList, tabId: string) =>
    ipcRenderer.invoke("db-copy-dishes", dishes, tabId),
});
