import { useAnchourElement } from "@/shared/hooks/use-anchor-element";
import { useChecked } from "@/shared/hooks/use-checked";
import SearchIcon from "@mui/icons-material/Search";
import {
  ListItemText,
  Checkbox,
  ListItemButton,
  ListItemIcon,
  Button,
  List,
  InputAdornment,
} from "@mui/material";
import { ListSubheaderStyled, MenuStyled, TextFieldStyled } from "./styled";
import { sortListAsc } from "./utils/sort-list-asc";
import { groupAlphabet } from "./utils/group-alphabet";
import { useState } from "react";
import type { TMenuList } from "@/entities/menu-list";
import debounce from "debounce";

const mock = [
  {
    id: 1,
    name: "Пицца",
    price: 870,
  },
  {
    id: 2,
    name: "Печенье",
    price: 120,
  },
  {
    id: 3,
    name: "Попкорн",
    price: 230,
  },
  {
    id: 4,
    name: "Газировка",
    price: 56,
  },
  {
    id: 5,
    name: "Глинтвейн",
    price: 450,
  },
  {
    id: 6,
    name: "Суп",
    price: 800,
  },
  {
    id: 7,
    name: "Суп рамен",
    price: 900,
  },
];

const sortMenuList = sortListAsc(mock);
const groupMenuList = groupAlphabet(sortMenuList);

export const MenuList = () => {
  const { checked, handleToggle } = useChecked();
  const { open, handleClick, handleClose, anchorEl } = useAnchourElement();
  const [searchValue, setSearchValue] = useState("");
  const [menuListRender, setMenuListRender] =
    useState<[string, TMenuList][]>(groupMenuList);

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

  const handleSearchValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { value },
    } = event;
    setSearchValue(value);

    debounceedSetMenuList(value);
  };

  return (
    <>
      <Button onClick={handleClick}>Меню</Button>
      <MenuStyled anchorEl={anchorEl} open={open} onClose={handleClose}>
        <TextFieldStyled
          placeholder="Введите название блюда"
          fullWidth
          onChange={handleSearchValue}
          value={searchValue}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
          variant="filled"
        />
        <List subheader={<li />}>
          {menuListRender?.map((groupMenuItem, index) => {
            const [char, menuList] = groupMenuItem || [""];
            return (
              <li key={`section-${index}`}>
                <ul>
                  <ListSubheaderStyled>{char}</ListSubheaderStyled>
                  {menuList.map((item) => (
                    <ListItemButton
                      key={item.id}
                      onClick={handleToggle(item)}
                      dense
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checked.includes(item.id)}
                          tabIndex={-1}
                          disableRipple
                        />
                      </ListItemIcon>
                      <ListItemText id={item.name} primary={item.name} />
                    </ListItemButton>
                  ))}
                </ul>
              </li>
            );
          })}
        </List>
      </MenuStyled>
    </>
  );
};
