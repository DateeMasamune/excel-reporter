import { Button } from "@mui/material";
import { useModal } from "@/shared/hooks/use-modal";
import type { TMenuItem } from "@/entities/menu-list";
import { DishModal } from "@components/dish-modal";

export const AddDish = () => {
  const { open, handleClose, handleOpen } = useModal();

  const addDish = (dish: TMenuItem) => {
    console.log("=========>dish", dish);
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Добавить блюдо
      </Button>
      <DishModal
        open={open}
        callback={addDish}
        handleClose={handleClose}
        title="Добавьте новое блюдо в меню"
      />
    </>
  );
};
