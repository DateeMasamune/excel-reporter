import type { TMenuList } from "@renderer/entities/menu-list";

export const groupAlphabet = (sortMenuList: TMenuList) => {
  const menuListMap = new Map();

  for (const menuItem of sortMenuList) {
    const firstChar = menuItem.name?.[0] || "";
    const group = menuListMap.get(firstChar) || [];
    menuListMap.set(firstChar, [...group, menuItem]);
  }

  return Array.from<[string, TMenuList]>(menuListMap);
};
