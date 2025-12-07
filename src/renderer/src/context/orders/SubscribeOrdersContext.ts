import type { useOrders } from "@renderer/hooks/useOrders";
import { createContext } from "react";

type TContext = ReturnType<typeof useOrders>;

export const SubscribeOrdersContext = createContext<TContext>({} as TContext);
