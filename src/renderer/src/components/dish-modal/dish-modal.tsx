import { FIELD_NAMES } from "@renderer/constants/field-names";
import type { TMenuItem } from "@renderer/entities/menu-list";
import { Grid, TextField } from "@mui/material";
import { useState } from "react";
import { Modal, type TModal } from "@renderer/components/modal";

type Props = Omit<TModal, "handleApply"> & {
  dish: Partial<TMenuItem>;
  callback: (dish: TMenuItem) => void;
};

export const DishModal = ({
  open,
  dish,
  title,
  callback,
  handleClose,
}: Props) => {
  const [newDish, setNewDish] = useState<Partial<TMenuItem>>(dish);

  const handleAddDish = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { value, name },
    } = event;

    setNewDish((prev) => ({
      ...prev,
      id: dish?.id ?? crypto.randomUUID(),
      [name]: value,
    }));
  };

  const handleApply = () => {
    if (!Object.keys(newDish).length) {
      return;
    }

    callback?.(newDish as TMenuItem);
    setNewDish(dish as TMenuItem);
    handleClose();
  };

  return (
    <>
      <Modal
        title={title}
        open={open}
        handleClose={handleClose}
        handleApply={handleApply}
      >
        <Grid container spacing={2} direction="column">
          <TextField
            onChange={handleAddDish}
            name={FIELD_NAMES.NAME}
            value={newDish[FIELD_NAMES.NAME] ?? ""}
            label="Наименование блюда"
            fullWidth
            error={!newDish[FIELD_NAMES.NAME]}
            helperText={!newDish[FIELD_NAMES.NAME] && "Заполните поле"}
          />
          <TextField
            onChange={handleAddDish}
            value={newDish[FIELD_NAMES.PRICE] ?? ""}
            name={FIELD_NAMES.PRICE}
            label="Цена"
            fullWidth
            type="number"
            error={!newDish[FIELD_NAMES.PRICE]}
            helperText={!newDish[FIELD_NAMES.PRICE] && "Заполните поле"}
          />
          <TextField
            onChange={handleAddDish}
            value={newDish[FIELD_NAMES.COUNT] ?? ""}
            name={FIELD_NAMES.COUNT}
            label="Количество"
            fullWidth
            type="number"
            error={!newDish[FIELD_NAMES.COUNT]}
            helperText={!newDish[FIELD_NAMES.COUNT] && "Заполните поле"}
          />
          <TextField
            onChange={handleAddDish}
            value={newDish[FIELD_NAMES.COMMENT] ?? ""}
            name={FIELD_NAMES.COMMENT}
            label="Комментарий к блюду"
            fullWidth
          />
        </Grid>
      </Modal>
    </>
  );
};
