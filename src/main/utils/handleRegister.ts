import { ipcMain } from "electron";
import { reactiveDB } from "../database";
import type {
  TMenuItem,
  Order,
  Tab,
  TMenuList,
  FilterDishes,
} from "../entities/menu-list";
import {
  cleanupSubscription,
  cleanupSubscriptions,
  triggerInitialData,
  watchDataHandler,
} from "./watchDataHandler";
import { createExcel } from "./createExcel";

export const handleRegister = () => {
  ipcMain.on("unsubscribe-channel", (_event, channel) =>
    cleanupSubscription(channel)
  );

  ipcMain.on("renderer-ready-for-data", (_event, channel) => {
    triggerInitialData(channel);
  });

  ipcMain.handle(
    "db-watch-orders",
    async (event, filter: FilterDishes) =>
      await watchDataHandler(event, "orders-update", async () => {
        return reactiveDB.getOrders(filter);
      })
  );

  ipcMain.handle(
    "db-watch-tabs",
    async (event) =>
      await watchDataHandler(event, "tabs-update", async () =>
        reactiveDB.getTabs()
      )
  );

  // Очистка при закрытии окна
  ipcMain.on("cleanup-subscriptions", cleanupSubscriptions);

  ipcMain.handle("create-excel", async (_event, order: Order) => {
    return await createExcel(order);
  });
  ipcMain.handle("db-create-order", async (_event, orderData: TMenuItem) => {
    return await reactiveDB.createOrder(orderData);
  });
  ipcMain.handle("db-update-order", async (_event, orderData: TMenuItem) => {
    return await reactiveDB.updateOrder(orderData);
  });
  ipcMain.handle("db-delete-order", async (_event, id: string) => {
    return await reactiveDB.deleteOrder(id);
  });
  ipcMain.handle("db-get-orders", async () => {
    return await reactiveDB.getOrders();
  });
  ipcMain.handle("db-clear-orders", async () => {
    return await reactiveDB.clearDatabase();
  });

  /**Работа с табами */
  ipcMain.handle("db-create-tab", async (_event, tab: Tab) => {
    return await reactiveDB.createTab(tab);
  });
  ipcMain.handle("db-delete-tab", async (_event, id: string) => {
    return await reactiveDB.deleteTab(id);
  });
  ipcMain.handle("db-update-tab", async (_event, tab: Tab) => {
    return await reactiveDB.updateTab(tab);
  });
  ipcMain.handle("db-get-tabs", async () => {
    return await reactiveDB.getTabs();
  });
  ipcMain.handle(
    "db-copy-dishes",
    async (_event, dishes: TMenuList, tabId: string) => {
      return await reactiveDB.copyDishes(dishes, tabId);
    }
  );
};
