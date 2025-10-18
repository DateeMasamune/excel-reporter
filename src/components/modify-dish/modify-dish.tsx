import { Grid } from "@mui/material";
import { ModalDelete } from "@components/modal-delete";
import { useModal } from "@/shared/hooks/use-modal";
import { SettingsButton } from "@components/settings-button";
import { DishModal as ChangeDishModal } from "@components/dish-modal";
import type { TMenuItem } from "@/entities/menu-list";

type Props = {
  dish: TMenuItem;
};

export const ModifyDish = ({ dish }: Props) => {
  const {
    open: openModalDelete,
    handleClose: handleCloseModalDelete,
    handleOpen: handleOpenModalDelete,
  } = useModal();
  const { open, handleClose, handleOpen } = useModal();

  const handleApplyDelete = () => {
    console.log("=========>delete");
  };

  const handleChangeDish = (dish: TMenuItem) => {
    console.log("=========>dish", dish);
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
      <ModalDelete
        open={openModalDelete}
        handleApply={handleApplyDelete}
        handleClose={handleCloseModalDelete}
      />
      <ChangeDishModal
        title="Изменить блюдо"
        open={open}
        dish={dish}
        handleClose={handleClose}
        callback={handleChangeDish}
      />
    </Grid>
  );
};
