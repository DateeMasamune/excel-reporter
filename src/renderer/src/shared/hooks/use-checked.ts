import type { TMenuItem, TMenuList } from "@renderer/entities/menu-list";
import { useState } from "react";

export const useChecked = () => {
  const [checked, setChecked] = useState<TMenuList>([]);

  const handleToggle =
    <T extends TMenuItem>(menuItem: T) =>
    () => {
      const findMenuItem = checked.find(({ id }) => id === menuItem.id);

      if (findMenuItem) {
        return setChecked([...checked.filter(({ id }) => id !== menuItem.id)]);
      }

      return setChecked((prev) => [...prev, menuItem]);
    };

  const handleDeleteCheckedItem = (id: string) => {
    setChecked(checked.filter((item) => item.id !== id));
  };

  const handleChangeCheckedItem = (updateItem: TMenuItem) => {
    setChecked(() => {
      return checked.map((item) => {
        if (item.id === updateItem.id) {
          return {
            ...item,
            ...updateItem,
          };
        }
        return item;
      });
    });
  };

  const handleClearChecked = () => setChecked([]);

  return {
    checked,
    handleToggle,
    handleClearChecked,
    handleDeleteCheckedItem,
    handleChangeCheckedItem,
  };
};
