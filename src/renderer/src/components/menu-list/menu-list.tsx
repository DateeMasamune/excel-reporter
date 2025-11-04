import { useAnchourElement } from "@renderer/shared/hooks/use-anchor-element";
import { useChecked } from "@renderer/shared/hooks/use-checked";
import { Button, List, debounce } from "@mui/material";
import { ListSubheaderStyled, MenuStyled, UlStyled } from "./styled";
import { useContext, useMemo } from "react";
import { SearchInput } from "@renderer/components/search-input";
import { List as DishList } from "@renderer/components/list";
import { SubscribeOrdersContext } from "@renderer/context/SubscribeOrdersContext";
import { ExcelSettingsModal } from "../excel-settings-modal";

export const MenuList = () => {
  const { orders, sortMenuList, groupMenuList, handleSetCopyOrders } =
    useContext(SubscribeOrdersContext);

  const {
    checked,
    handleToggle,
    handleClearChecked,
    handleDeleteCheckedItem,
    handleChangeCheckedItem,
  } = useChecked();
  const { open, handleClick, handleClose, anchorEl } = useAnchourElement();
  console.log("=========>checked", checked);

  const debounceedSetMenuList = debounce((value: string) => {
    if (value) {
      return handleSetCopyOrders(
        sortMenuList.filter(({ name }) =>
          name.toLowerCase().trim().includes(value.toLowerCase().trim())
        )
      );
    }

    return handleSetCopyOrders(orders);
  }, 500);

  const render = useMemo(
    () =>
      groupMenuList?.map((groupMenuItem, index) => {
        const [char, menuList] = groupMenuItem || [""];

        return (
          <li key={`section-${index}`}>
            <UlStyled>
              <ListSubheaderStyled>{char}</ListSubheaderStyled>
              <DishList
                isCheckbox
                checked={checked}
                listItems={menuList}
                handleToggle={handleToggle}
              />
            </UlStyled>
          </li>
        );
      }),
    [groupMenuList, checked]
  );

  return (
    <>
      <Button variant="contained" onClick={handleClick}>
        Меню
      </Button>
      <MenuStyled anchorEl={anchorEl} open={open} onClose={handleClose}>
        <SearchInput callback={debounceedSetMenuList} />
        <List subheader={<li />}>{render}</List>
      </MenuStyled>
      <ExcelSettingsModal
        dishList={checked}
        handleClearChecked={handleClearChecked}
        handleDeleteItem={handleDeleteCheckedItem}
        handleChangeItem={handleChangeCheckedItem}
      />
    </>
  );
};
