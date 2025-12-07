import { groupAlphabet } from "@renderer/components/menu-list/utils/group-alphabet";
import { sortListAsc } from "@renderer/components/menu-list/utils/sort-list-asc";
import { SubscribeTabsContext } from "@renderer/context/tabs";
import type { TMenuList } from "@renderer/entities/menu-list";
import { useState, useEffect, useCallback, useContext } from "react";

export const useOrders = () => {
  const [orders, setOrders] = useState<TMenuList>([]);
  const [copyOrders, setCopyOrders] = useState<TMenuList>([]);
  const { activeTab } = useContext(SubscribeTabsContext);

  const handleSetCopyOrders = useCallback(
    (orders: TMenuList) => setCopyOrders(orders),
    []
  );

  const sortMenuList = sortListAsc(copyOrders);
  const groupMenuList: [string, TMenuList][] = groupAlphabet(sortMenuList);

  const fetchOrders = async () => {
    const unsubscribe = await window.electron.watchOrders(setOrders, {
      tabId: activeTab?.id,
    });
    return () => unsubscribe();
  };

  //@ts-expect-error after
  useEffect(() => {
    fetchOrders();
    return () => fetchOrders();
  }, [activeTab]);

  useEffect(() => {
    setCopyOrders(orders);
  }, [orders]);

  return {
    orders,
    copyOrders,
    sortMenuList,
    groupMenuList,
    handleSetCopyOrders,
    create: window.electron.createOrder,
    update: window.electron.updateOrder,
    deleteById: window.electron.deleteOrder,
    createExcel: window.electron.createExcel,
    clearDatabase: window.electron.clearDatabase,
  };
};
