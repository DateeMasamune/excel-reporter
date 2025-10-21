import type { TMenuItem, TMenuList } from "@renderer/entities/menu-list";
import { useState } from "react";

export const useChecked = () => {
  const [checked, setChecked] = useState<TMenuList>([]);

  const handleToggle = (menuItem: TMenuItem) => () => {
    const findMenuItem = checked.find(({ id }) => id === menuItem.id);

    if (findMenuItem) {
      return setChecked([...checked.filter(({ id }) => id !== menuItem.id)]);
    }

    return setChecked((prev) => [...prev, menuItem]);
  };

  return {
    checked,
    handleToggle,
  };
};
