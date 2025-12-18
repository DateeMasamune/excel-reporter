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
    createExcel,
    sortMenuList,
    groupMenuList,
    clearDatabase,
    isLoading,
    handleSetCopyOrders,
  } = useOrders();

  const value = useMemo(
    () => ({
      orders,
      create,
      update,
      deleteById,
      copyOrders,
      createExcel,
      sortMenuList,
      clearDatabase,
      groupMenuList,
      isLoading,
      handleSetCopyOrders,
    }),
    [
      orders,
      create,
      update,
      deleteById,
      copyOrders,
      createExcel,
      sortMenuList,
      groupMenuList,
      clearDatabase,
      isLoading,
      handleSetCopyOrders,
    ]
  );

  return (
    <SubscribeOrdersContext.Provider value={value}>
      {children}
    </SubscribeOrdersContext.Provider>
  );
};
