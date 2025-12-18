import { defaultTab } from "@renderer/components/tabs/constants";
import type { Tab } from "@renderer/entities/menu-list";
import { useState, useEffect, useTransition } from "react";

export const useTabs = () => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState<Tab | null>(defaultTab);
  const [isPending, startTransition] = useTransition();

  const handleSetActiveTab = (tab: Tab) => {
    startTransition(() => {
      setActiveTab(tab);
    });
  };

  const fetchTabs = async () => {
    const unsubscribe = await window.electron.watchTabs(setTabs);
    return () => unsubscribe();
  };

  useEffect(() => {
    let unsubscribe: () => void;

    const fetchAndSubscribe = async () => {
      unsubscribe = await fetchTabs();
    };

    fetchAndSubscribe();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return {
    tabs,
    activeTab,
    isPending,
    handleSetActiveTab,
    create: window.electron.createTab,
    update: window.electron.updateTab,
    deleteById: window.electron.deleteTab,
    getTabs: window.electron.getTabs,
    copyDishes: window.electron.copyDishes,
  };
};
