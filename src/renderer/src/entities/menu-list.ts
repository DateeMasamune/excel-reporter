export type TMenuList = TMenuItem[];

export type TMenuItem = {
  id: string;
  name: string;
  price: number;
  count: number;
  comment?: string;
};

export type Order = {
  dishList: TMenuList;
  restaurant: string;
  date: string;
  name: string;
  phone: string;
  persons: string;
  employee: string;
};
