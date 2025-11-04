import { Button } from "@mui/material";
import { useModal } from "@renderer/shared/hooks/use-modal";
import type { TMenuItem } from "@renderer/entities/menu-list";
import { DishModal } from "@renderer/components/dish-modal";
import { useContext } from "react";
import { SubscribeOrdersContext } from "@renderer/context/SubscribeOrdersContext";

export const AddDish = () => {
  const { open, handleClose, handleOpen } = useModal();
  const { create } = useContext(SubscribeOrdersContext);
  const dish = {
    count: 1,
  };

  const addDish = (dish: TMenuItem) => {
    create(dish);
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Добавить блюдо
      </Button>
      <DishModal
        dish={dish}
        open={open}
        callback={addDish}
        handleClose={handleClose}
        title="Добавьте новое блюдо в меню"
      />
    </>
  );
};
