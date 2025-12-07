import { Modal, type TModal } from "@renderer/components/modal";
import { Typography } from "@mui/material";

type Props = TModal;

export const ModalDelete = ({
  handleApply,
  open,
  handleClose,
  title = "Удалить блюдо из меню",
  description = "Вы хотите удалить блюдо из списка?",
}: Props) => {
  return (
    <Modal
      title={title}
      open={open}
      handleClose={handleClose}
      handleApply={handleApply}
    >
      <Typography>{description}</Typography>
    </Modal>
  );
};
