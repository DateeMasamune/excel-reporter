import { useAnchourElement } from "@renderer/shared/hooks/use-anchor-element";
import { useChecked } from "@renderer/shared/hooks/use-checked";
import {
  Button,
  Checkbox,
  Grid,
  List,
  Typography,
  debounce,
} from "@mui/material";
import {
  ListSubheaderStyled,
  MenuStyled,
  SkeletonStyled,
  UlStyled,
} from "./styled";
import { useContext, useMemo } from "react";
import { SearchInput } from "@renderer/components/search-input";
import { List as DishList } from "@renderer/components/list";
import { ExcelSettingsModal } from "../excel-settings-modal";
import { Tabs } from "../tabs";
import { SubscribeOrdersContext } from "@renderer/context/orders";
import { MenuFooter } from "../menu-footer";

export const MenuList = () => {
  const {
    orders,
    sortMenuList,
    groupMenuList,
    handleSetCopyOrders,
    isLoading,
  } = useContext(SubscribeOrdersContext);

  const {
    checked,
    handleToggle,
    handleAllChecked,
    handleClearChecked,
    handleDeleteCheckedItem,
    handleChangeCheckedItem,
  } = useChecked();
  const { open, handleClick, handleClose, anchorEl } = useAnchourElement();

  const isChecked = checked.length;

  const debounceedSetMenuList = debounce((value: string) => {
    if (value) {
      return handleSetCopyOrders(
        sortMenuList.filter(({ name }) =>
          name?.toLowerCase().trim().includes(value?.toLowerCase().trim())
        )
      );
    }

    return handleSetCopyOrders(orders);
  }, 500);

  const render = useMemo(
    () =>
      groupMenuList?.length ? (
        groupMenuList?.map((groupMenuItem, index) => {
          const [char, menuList] = groupMenuItem || [""];

          return (
            <li key={`section-${index}-${char}-${menuList?.length}`}>
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
        })
      ) : (
        <Typography textAlign="center" variant="h6">
          Список пуст
        </Typography>
      ),
    [groupMenuList, checked]
  );

  return (
    <>
      <Button variant="contained" onClick={handleClick}>
        Меню
      </Button>
      <MenuStyled anchorEl={anchorEl} open={open} onClose={handleClose}>
        <Tabs />
        <SearchInput callback={debounceedSetMenuList} />
        <List subheader={<li />}>
          <Grid
            direction="row"
            container
            alignItems="center"
            gap="10px"
            paddingLeft="16px"
          >
            <Checkbox
              edge="start"
              checked={!!isChecked}
              disableRipple
              onClick={() =>
                handleAllChecked(
                  Object.values(Object.fromEntries(groupMenuList)).flat()
                )
              }
            />
            <Typography variant="subtitle2">Выбрать все</Typography>
          </Grid>
          {isLoading
            ? Array.from({ length: 5 }, (_, index) => (
                <SkeletonStyled key={index} animation="wave" />
              ))
            : render}
        </List>
        <MenuFooter
          isChecked={!!isChecked}
          checked={checked}
          handleAllChecked={handleAllChecked}
        />
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
