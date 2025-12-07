export type TMenuList = TMenuItem[];

export type TMenuItem = {
  id: string;
  name: string;
  price: number;
  count: number;
  tabId?: string;
  comment?: string;
  createdAt?: string;
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

export type InfoRow = Omit<Order, "dishList">;

export type Tab = {
  id?: string;
  name: string;
  createdAt?: string;
};

export type FilterDishes = {
  tabId?: string;
};
