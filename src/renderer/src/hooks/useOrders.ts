import type { TMenuList } from "@renderer/entities/menu-list";
import { useState, useEffect } from "react";

export const useOrders = () => {
  const [orders, setOrders] = useState<TMenuList>([]);

  useEffect(() => {
    const unsubscribe = window.electron.watchOrders(setOrders);
    return () => unsubscribe;
  }, []);

  return {
    create: window.electron.createOrder,
    delete: window.electron.deleteOrder,
    update: window.electron.updateOrder,
    orders,
  };
};
