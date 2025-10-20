import { useAnchourElement } from "@/shared/hooks/use-anchor-element";
import { useChecked } from "@/shared/hooks/use-checked";
import {
  ListItemText,
  Checkbox,
  ListItemButton,
  ListItemIcon,
  Button,
  List,
  Grid,
  debounce,
} from "@mui/material";
import { ListSubheaderStyled, MenuStyled } from "./styled";
import { sortListAsc } from "./utils/sort-list-asc";
import { groupAlphabet } from "./utils/group-alphabet";
import { useState } from "react";
import type { TMenuList } from "@/entities/menu-list";
import { SearchInput } from "@components/search-input";
import { ModifyDish } from "@components/modify-dish";

const mock = [
  {
    id: "1",
    name: "Пицца",
    price: 870,
  },
  {
    id: "2",
    name: "Печенье",
    price: 120,
  },
  {
    id: "3",
    name: "Попкорн",
    price: 230,
  },
  {
    id: "4",
    name: "Газировка",
    price: 56,
  },
  {
    id: "5",
    name: "Глинтвейн",
    price: 450,
  },
  {
    id: "6",
    name: "Суп",
    price: 800,
  },
  {
    id: "7",
    name: "Суп рамен",
    price: 900,
  },
];

const sortMenuList = sortListAsc(mock);
const groupMenuList = groupAlphabet(sortMenuList);

export const MenuList = () => {
  const [menuListRender, setMenuListRender] =
    useState<[string, TMenuList][]>(groupMenuList);

  const { checked, handleToggle } = useChecked();
  const { open, handleClick, handleClose, anchorEl } = useAnchourElement();

  const debounceedSetMenuList = debounce(
    (value: string) =>
      setMenuListRender(
        groupAlphabet(
          sortMenuList.filter(({ name }) =>
            name.toLowerCase().trim().includes(value.toLowerCase().trim())
          )
        )
      ),
    500
  );

  return (
    <>
      <Button variant="contained" onClick={handleClick}>
        Меню
      </Button>
      <MenuStyled anchorEl={anchorEl} open={open} onClose={handleClose}>
        <SearchInput callback={debounceedSetMenuList} />
        <List subheader={<li />}>
          {menuListRender?.map((groupMenuItem, index) => {
            const [char, menuList] = groupMenuItem || [""];
            return (
              <li key={`section-${index}`}>
                <ul>
                  <ListSubheaderStyled>{char}</ListSubheaderStyled>
                  {menuList.map((item) => {
                    const isChecked = checked.find(({ id }) => id === item.id);
                    return (
                      <Grid container>
                        <ListItemButton onClick={handleToggle(item)} dense>
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={!!isChecked}
                              disableRipple
                            />
                          </ListItemIcon>
                          <ListItemText id={item.name} primary={item.name} />
                        </ListItemButton>
                        <ModifyDish dish={item} />
                      </Grid>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </List>
      </MenuStyled>
    </>
  );
};
