import {
  Grid,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Typography,
} from "@mui/material";
import { ModifyDish } from "../modify-dish";
import type { TMenuList } from "@renderer/entities/menu-list";

type Props<T extends TMenuList> = {
  listItems: T;
  checked?: T;
  handleToggle?: (menuItem: T[0]) => () => void;
  isCheckbox?: boolean;
  handleDeleteItem?: (id: string) => void;
  handleChangeItem?: (dish: T[0]) => void;
};

export const List = <T extends TMenuList>({
  listItems,
  checked,
  handleToggle,
  isCheckbox = false,
  handleDeleteItem,
  handleChangeItem,
}: Props<T>) => {
  return listItems.map((item) => {
    const isChecked = checked?.find(({ id }) => id === item.id);
    return (
      <Grid
        paddingLeft="20px"
        container
        alignItems="center"
        gap="30px"
        key={item.id}
        justifyContent="space-between"
      >
        {isCheckbox ? (
          <ListItemButton onClick={handleToggle?.(item)} dense>
            <ListItemIcon>
              <Checkbox edge="start" checked={!!isChecked} disableRipple />
            </ListItemIcon>
            <ListItemText id={item.name} primary={item.name} />
          </ListItemButton>
        ) : (
          <Typography variant="subtitle1">{item.name}</Typography>
        )}
        <Grid gap="10px" container alignItems="center">
          <Typography variant="subtitle1">{item.price}₽</Typography>
          <Typography variant="subtitle1">{item.count}</Typography>
          <ModifyDish
            dish={item}
            handleDeleteItem={handleDeleteItem}
            handleChangeItem={handleChangeItem}
          />
        </Grid>
      </Grid>
    );
  });
};
