import { useOrders } from "@renderer/hooks/useOrders";
import { useMemo, type PropsWithChildren } from "react";
import { SubscribeOrdersContext } from "./SubscribeOrdersContext";

export const SubscribeOrdersProvider = ({ children }: PropsWithChildren) => {
  const {
    orders,
    create,
    update,
    deleteById,
    copyOrders,
    sortMenuList,
    groupMenuList,
    clearDatabase,
    handleSetCopyOrders,
  } = useOrders();

  const value = useMemo(
    () => ({
      orders,
      create,
      update,
      deleteById,
      copyOrders,
      sortMenuList,
      clearDatabase,
      groupMenuList,
      handleSetCopyOrders,
      createExcel: window.electron.createExcel,
    }),
    [
      orders,
      create,
      update,
      deleteById,
      copyOrders,
      sortMenuList,
      groupMenuList,
      clearDatabase,
      handleSetCopyOrders,
    ]
  );

  return (
    <SubscribeOrdersContext value={value}>{children}</SubscribeOrdersContext>
  );
};
