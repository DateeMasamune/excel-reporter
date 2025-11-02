import type { TMenuItem, TMenuList } from "./src/entities/menu-list";

declare global {
  interface Window {
    electron: {
      createExcel: () => Promise;
      createOrder: (orderData: TMenuItem) => Promise<TMenuItem>;
      updateOrder: (orderData: TMenuItem) => Promise<TMenuItem>;
      deleteOrder: (id: string) => Promise<TMenuItem>;
      getOrders: () => Promise<TMenuList>;
      watchOrders: (
        callback: (orders: TMenuList) => void
      ) => Promise<() => void>;
    };
  }
}

export {};
