import {
  Button,
  Checkbox,
  Grid,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { SubscribeOrdersContext } from "@renderer/context/SubscribeOrdersContext";
import type { TMenuItem } from "@renderer/entities/menu-list";
import { useChecked } from "@renderer/shared/hooks/use-checked";
import { useContext } from "react";

export const ClearDBButton = () => {
  const { handleToggle, checked } = useChecked();
  const isChecked = checked.find((item) => item.id === "clearDb");
  const { clearDatabase } = useContext(SubscribeOrdersContext);

  return (
    <Grid direction="row" container>
      <ListItemButton
        onClick={handleToggle?.({ id: "clearDb" } as TMenuItem)}
        dense
      >
        <ListItemIcon>
          <Checkbox edge="start" checked={!!isChecked} disableRipple />
        </ListItemIcon>
        <ListItemText id={"clearDb"} primary />
      </ListItemButton>
      <Button disabled={!isChecked} variant="contained" onClick={clearDatabase}>
        Удалить все данные о меню из БД
      </Button>
    </Grid>
  );
};
