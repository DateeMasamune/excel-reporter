export const TABLE_NAMES = {
  ORDERS: "orders",
  TABS: "tabs",
} as const;

export const TABLE_CONFIG = [
  {
    name: TABLE_NAMES.ORDERS,
    initValue: [],
  },
  {
    name: TABLE_NAMES.TABS,
    initValue: [],
  },
];
