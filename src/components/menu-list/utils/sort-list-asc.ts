import type { TMenuList } from "@/entities/menu-list";

export const sortListAsc = (menu: TMenuList) =>
  menu.sort((a, b) => a.name.localeCompare(b.name));
