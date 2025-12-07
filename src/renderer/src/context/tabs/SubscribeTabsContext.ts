import type { useTabs } from "@renderer/hooks/useTabs";
import { createContext } from "react";

type TContext = ReturnType<typeof useTabs>;

export const SubscribeTabsContext = createContext<TContext>({} as TContext);
