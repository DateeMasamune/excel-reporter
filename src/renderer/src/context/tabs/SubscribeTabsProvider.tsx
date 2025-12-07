import { useMemo, type PropsWithChildren } from "react";
import { useTabs } from "@renderer/hooks/useTabs";
import { SubscribeTabsContext } from "./SubscribeTabsContext";

export const SubscribeTabsProvider = ({ children }: PropsWithChildren) => {
  const {
    tabs,
    create,
    update,
    getTabs,
    isPending,
    deleteById,
    copyDishes,
    activeTab,
    handleSetActiveTab,
  } = useTabs();

  const value = useMemo(
    () => ({
      tabs,
      create,
      update,
      getTabs,
      isPending,
      deleteById,
      copyDishes,
      activeTab,
      handleSetActiveTab,
    }),
    [
      tabs,
      create,
      update,
      getTabs,
      isPending,
      deleteById,
      copyDishes,
      activeTab,
      handleSetActiveTab,
    ]
  );

  return <SubscribeTabsContext value={value}>{children}</SubscribeTabsContext>;
};
