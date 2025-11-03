import type { TMenuList } from "@renderer/entities/menu-list";

export const sortListAsc = (menu: TMenuList) =>
  menu.sort((a, b) =>
    a.name.toLowerCase().trim().localeCompare(b.name.toLowerCase().trim())
  );
