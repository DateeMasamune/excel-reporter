import type {
  TMenuItem,
  TMenuList,
  Order,
  Tab,
} from "./src/entities/menu-list";

declare global {
  interface Window {
    electron: {
      createExcel: (order: Order) => Promise;
      createOrder: (orderData: TMenuItem) => Promise<TMenuItem>;
      updateOrder: (orderData: TMenuItem) => Promise<TMenuItem>;
      deleteOrder: (id: string) => Promise<TMenuItem>;
      getOrders: () => Promise<TMenuList>;
      watchOrders: <TFilter>(
        callback: (orders: TMenuList) => void,
        filter: TFilter
      ) => Promise<() => void>;
      clearDatabase(): Promise<void>;
      createTab: (tab: Tab) => Promise<Tab>;
      updateTab: (tab: Tab) => Promise<Tab>;
      deleteTab: (id: string) => Promise<boolean>;
      watchTabs: (callback: (tabs: Tab[]) => void) => Promise<() => void>;
      getTabs(): Promise<Tab[]>;
      copyDishes: (dishes: TMenuList, tabId: string) => Promise<TMenuList>;
    };
  }
}

export {};
