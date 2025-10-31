import { ipcMain } from "electron";
import { reactiveDB } from "../database";
import type { TMenuList, TMenuItem } from "../entities/menu-list";
import { createExcel } from "./createExcel";

const subscriptions = new Map();

export const handleRegister = () => {
  ipcMain.handle("db-watch-orders", async (event) => {
    const channel = `orders-update-${Date.now()}`;

    // 🔥 ПОДКЛЮЧАЕМСЯ К БАЗЕ ДАННЫХ
    const unsubscribe = reactiveDB.watchOrders((orders: TMenuList) => {
      // Когда БД обновляется - отправляем данные через IPC
      event.sender.send(channel, orders);
    });

    // Сохраняем для очистки
    subscriptions.set(channel, unsubscribe);

    return { channel };
  });

  // Очистка при закрытии окна
  ipcMain.on("cleanup-subscriptions", () => {
    subscriptions.forEach((unsubscribe, channel) => {
      unsubscribe();
      subscriptions.delete(channel);
    });
  });

  ipcMain.handle("create-excel", async () => {
    return await createExcel();
  });
  ipcMain.handle("db-create-order", async (_event, orderData: TMenuItem) => {
    return await reactiveDB.createOrder(orderData);
  });
  ipcMain.handle("db-update-order", async (_event, orderData: TMenuItem) => {
    return reactiveDB.updateOrder(orderData);
  });
  ipcMain.handle("db-delete-order", async (_event, id: string) => {
    return reactiveDB.deleteOrder(id);
  });
  ipcMain.handle("db-get-orders", async () => {
    return reactiveDB.getOrders();
  });
};
