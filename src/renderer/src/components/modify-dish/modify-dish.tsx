import { Grid } from "@mui/material";
import { ModalDelete } from "@renderer/components/modal-delete";
import { useModal } from "@renderer/shared/hooks/use-modal";
import { SettingsButton } from "@renderer/components/settings-button";
import { DishModal as ChangeDishModal } from "@renderer/components/dish-modal";
import type { TMenuItem } from "@renderer/entities/menu-list";
import { useContext } from "react";
import { SubscribeOrdersContext } from "@renderer/context/SubscribeOrdersContext";

type Props<T extends TMenuItem> = {
  dish: T;
  handleDeleteItem?: (id: string) => void;
  handleChangeItem?: (dish: T) => void;
};

export const ModifyDish = <T extends TMenuItem>({
  dish,
  handleDeleteItem,
  handleChangeItem,
}: Props<T>) => {
  const {
    open: openModalDelete,
    handleClose: handleCloseModalDelete,
    handleOpen: handleOpenModalDelete,
  } = useModal();
  const { open, handleClose, handleOpen } = useModal();
  const { deleteById, update } = useContext(SubscribeOrdersContext);

  const handleApplyDelete = () => {
    if (handleDeleteItem) {
      handleDeleteItem(dish.id);
    } else {
      deleteById(dish.id);
    }
  };

  const handleChangeDish = (dish: T) => {
    if (handleChangeItem) {
      handleChangeItem(dish);
    } else {
      update(dish);
    }
  };

  const menuItems = [
    {
      buttonName: "Удалить",
      onClick: handleOpenModalDelete,
    },
    {
      buttonName: "Изменить",
      onClick: handleOpen,
    },
  ];

  return (
    <Grid container direction="column">
      <SettingsButton menuItems={menuItems} />
      {openModalDelete && (
        <ModalDelete
          open={openModalDelete}
          handleApply={handleApplyDelete}
          handleClose={handleCloseModalDelete}
        />
      )}
      {open && (
        <ChangeDishModal
          title="Изменить блюдо"
          open={open}
          dish={dish}
          handleClose={handleClose}
          callback={handleChangeDish}
        />
      )}
    </Grid>
  );
};
