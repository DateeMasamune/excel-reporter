import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { app } from "electron";
import path from "path";
import { EventEmitter } from "events";
import type { TMenuItem, TMenuList } from "../entities/menu-list";

interface DatabaseSchema {
  orders: TMenuList;
}

function checkInitialize(
  _target: unknown,
  _propertyName: string,
  descriptor: PropertyDescriptor
) {
  const method = descriptor.value;
  descriptor.value = async function (...args: unknown[]) {
    if (!this.isInitialized) {
      await this.initialize();
    }
    return method.apply(this, args);
  };

  return descriptor;
}

class ReactiveLowDB extends EventEmitter {
  private db: Low<DatabaseSchema>;
  private isInitialized = false;
  private subscribers: Array<(orders: TMenuList) => void> = [];

  constructor() {
    super();
    const dbPath = path.join(app.getPath("userData"), "tokio-database.json");
    const adapter = new JSONFile<DatabaseSchema>(dbPath);

    this.db = new Low(adapter, {
      orders: [],
    });
  }

  async initialize() {
    await this.db.read();
    this.isInitialized = true;
    console.log("✅ Reactive LowDB инициализирована");
  }

  // Orders с реактивностью
  @checkInitialize
  async createOrder(order: TMenuItem) {
    const newOrder = {
      ...order,
      id: `order_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    this.db.data!.orders.unshift(newOrder);
    await this.db.write();

    this.notifySubscribers();

    return newOrder;
  }

  @checkInitialize
  async updateOrder(updates: Partial<TMenuItem>) {
    const { id } = updates;
    const orderIndex = this.db.data!.orders.findIndex(
      (order) => order.id === id
    );
    if (orderIndex === -1) return null;

    const updatedOrder = {
      ...this.db.data!.orders[orderIndex],
      ...updates,
    };

    this.db.data!.orders[orderIndex] = updatedOrder;
    await this.db.write();

    return updatedOrder;
  }

  @checkInitialize
  async deleteOrder(id: string) {
    const orderToDelete = this.db.data!.orders.find((order) => order.id === id);
    if (!orderToDelete) return false;

    this.db.data!.orders = this.db.data!.orders.filter(
      (order) => order.id !== id
    );
    await this.db.write();

    return true;
  }

  // Реактивные геттеры
  @checkInitialize
  async getOrders() {
    return this.db.data!.orders;
  }

  // Подписка на изменения
  subscribe(event: string, callback: (data: TMenuItem) => void) {
    this.on(event, callback);
    return () => this.off(event, callback);
  }

  // Реактивные queries
  async watchOrders(callback: (orders: TMenuList) => void) {
    // Добавляем callback в список подписчиков
    this.subscribers.push(callback);

    // Сразу отправляем текущие данные
    callback(await this.getOrders());

    // Возвращаем функцию отписки
    return () => {
      this.subscribers = this.subscribers.filter((sub) => sub !== callback);
    };
  }

  private async notifySubscribers() {
    const currentOrders = await this.getOrders();
    this.subscribers.forEach((callback) => {
      callback(currentOrders); // Вызываем ВСЕ функции-подписчики
    });
  }
}

export const reactiveDB = new ReactiveLowDB();
