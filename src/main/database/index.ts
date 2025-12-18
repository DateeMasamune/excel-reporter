import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { app } from "electron";
import path from "path";
import { EventEmitter } from "events";
import type {
  FilterDishes,
  Tab,
  TMenuItem,
  TMenuList,
} from "../entities/menu-list";
import { v4 as uuidv4 } from "uuid";
import { TABLE_NAMES, TABLE_CONFIG } from "./constants";

interface DatabaseSchema {
  [TABLE_NAMES.ORDERS]: TMenuList;
  [TABLE_NAMES.TABS]: Tab[];
}

function checkInitialize(
  _target: unknown,
  _propertyName: string,
  descriptor: PropertyDescriptor
) {
  const method = descriptor.value;
  descriptor.value = async function (...args: unknown[]) {
    //@ts-expect-error after
    if (!this.isInitialized) {
      //@ts-expect-error after
      await this.initialize();
    }
    return method.apply(this, args);
  };

  return descriptor;
}

function checkFieldDB(
  _target: unknown,
  _propertyName: string,
  descriptor: PropertyDescriptor
) {
  const method = descriptor.value;
  descriptor.value = function (...args: unknown[]) {
    for (const { name, initValue } of TABLE_CONFIG) {
      //@ts-expect-error after
      if (!this.db.data[name]) {
        //@ts-expect-error after
        this.db.data[name] = initValue;
      }
    }

    return method.apply(this, args);
  };

  return descriptor;
}

class ReactiveLowDB extends EventEmitter {
  private db: Low<DatabaseSchema>;
  //@ts-expect-error after
  private isInitialized = false;
  private subscribers: Array<() => void> = [];

  constructor() {
    super();
    const dbPath = path.join(app.getPath("userData"), "tokio-database.json");
    const adapter = new JSONFile<DatabaseSchema>(dbPath);

    this.db = new Low(adapter, {
      [TABLE_NAMES.ORDERS]: [],
      [TABLE_NAMES.TABS]: [],
    });
  }

  async initialize() {
    await this.db.read();
    this.isInitialized = true;
    console.log("✅ Reactive LowDB инициализирована");
  }

  @checkInitialize
  async clearDatabase(): Promise<void> {
    // Полностью очищаем данные
    this.db.data = {
      [TABLE_NAMES.ORDERS]: [],
      [TABLE_NAMES.TABS]: [],
    };

    await this.db.write();
    this.notifySubscribers();

    console.log("✅ База данных полностью очищена");
  }

  // Orders с реактивностью
  @checkInitialize
  @checkFieldDB
  async createOrder(order: TMenuItem) {
    const newOrder = {
      ...order,
      id: `order_${uuidv4()}`,
      createdAt: new Date().toISOString(),
    };

    this.db.data![TABLE_NAMES.ORDERS].unshift(newOrder);
    await this.db.write();

    this.notifySubscribers();

    return newOrder;
  }

  @checkInitialize
  @checkFieldDB
  async updateOrder(updates: Partial<TMenuItem>) {
    const { id } = updates;
    const orderIndex = this.db.data![TABLE_NAMES.ORDERS].findIndex(
      (order) => order.id === id
    );
    if (orderIndex === -1) return null;

    const updatedOrder = {
      ...this.db.data![TABLE_NAMES.ORDERS][orderIndex],
      ...updates,
    };

    this.db.data![TABLE_NAMES.ORDERS][orderIndex] = updatedOrder;
    await this.db.write();

    this.notifySubscribers();

    return updatedOrder;
  }

  @checkInitialize
  @checkFieldDB
  async deleteOrder(id: string) {
    const orderToDelete = this.db.data![TABLE_NAMES.ORDERS].find(
      (order) => order.id === id
    );
    if (!orderToDelete) return false;

    this.db.data![TABLE_NAMES.ORDERS] = this.db.data![
      TABLE_NAMES.ORDERS
    ].filter((order) => order.id !== id);
    await this.db.write();

    this.notifySubscribers();

    return true;
  }

  // Реактивные геттеры
  @checkInitialize
  @checkFieldDB
  async getOrders(filter?: FilterDishes) {
    const { tabId } = filter || {};

    if (tabId && tabId !== "all") {
      return this.db.data![TABLE_NAMES.ORDERS]?.filter(
        (dish) => dish.tabId === tabId
      );
    }

    if (tabId && tabId === "all") {
      return this.db.data![TABLE_NAMES.ORDERS]?.filter((dish) => !dish.tabId);
    }

    return this.db.data![TABLE_NAMES.ORDERS];
  }

  @checkInitialize
  @checkFieldDB
  async createTab(tab: Tab) {
    const newTab = {
      ...tab,
      id: `tab_${uuidv4()}`,
      createdAt: new Date().toISOString(),
    };

    this.db.data![TABLE_NAMES.TABS].unshift(newTab);
    await this.db.write();

    this.notifySubscribers();

    return newTab;
  }

  @checkInitialize
  @checkFieldDB
  async deleteTab(id: string) {
    const tabToDelete = this.db.data![TABLE_NAMES.TABS].find(
      (order) => order.id === id
    );
    if (!tabToDelete) return false;

    this.db.data![TABLE_NAMES.TABS] = this.db.data![TABLE_NAMES.TABS].filter(
      (order) => order.id !== id
    );
    await this.db.write();

    this.notifySubscribers();

    return true;
  }

  @checkInitialize
  @checkFieldDB
  async updateTab(updates: Partial<Tab>) {
    const { id } = updates;
    const orderIndex = this.db.data![TABLE_NAMES.TABS].findIndex(
      (order) => order.id === id
    );
    if (orderIndex === -1) return null;

    const updatedTab = {
      ...this.db.data![TABLE_NAMES.TABS][orderIndex],
      ...updates,
    };

    this.db.data![TABLE_NAMES.TABS][orderIndex] = updatedTab;
    await this.db.write();

    this.notifySubscribers();

    return updatedTab;
  }

  @checkInitialize
  @checkFieldDB
  async getTabs() {
    return this.db.data![TABLE_NAMES.TABS];
  }

  @checkInitialize
  @checkFieldDB
  async copyDishes(dishes: TMenuList, tabId: string) {
    const copyDishes = dishes.map((dish) => ({
      ...dish,
      id: `order_${uuidv4()}`,
      createdAt: new Date().toISOString(),
      tabId,
    }));

    this.db.data![TABLE_NAMES.ORDERS].unshift(...copyDishes);
    await this.db.write();

    this.notifySubscribers();

    return copyDishes;
  }

  async watchData(callback: () => Promise<void>, initialCall = true) {
    // Добавляем callback в список подписчиков
    this.subscribers.push(callback);

    // Сразу отправляем текущие данные, если требуется
    if (initialCall) {
      await callback();
    }

    // Возвращаем функцию отписки
    return () => {
      this.subscribers = this.subscribers.filter((sub) => sub !== callback);
    };
  }

  async triggerSubscriber(callback: () => Promise<void>) {
    await callback();
  }

  private async notifySubscribers() {
    this.subscribers.forEach((callback) => {
      callback(); // Вызываем ВСЕ функции-подписчики
    });
  }
}

export const reactiveDB = new ReactiveLowDB();
