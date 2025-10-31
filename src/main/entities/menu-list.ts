export type TMenuList = TMenuItem[];

export type TMenuItem = {
  id: string;
  name: string;
  price: number;
  count: number;
  comment?: string;
  createdAt: string;
};
