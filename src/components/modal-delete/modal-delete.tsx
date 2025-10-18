import { Modal, type TModal } from "@components/modal";
import { Typography } from "@mui/material";

type Props = Omit<TModal, "title">;

export const ModalDelete = ({ handleApply, open, handleClose }: Props) => {
  return (
    <Modal
      title="Удалить блюдо из меню"
      open={open}
      handleClose={handleClose}
      handleApply={handleApply}
    >
      <Typography>Вы хотите удалить блюдо из списка?</Typography>
    </Modal>
  );
};
