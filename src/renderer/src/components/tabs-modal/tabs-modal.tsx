import { Modal, type TModal } from "@renderer/components/modal";
import {
  MenuItem,
  Select,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import { useContext, useState } from "react";
import { SubscribeTabsContext } from "@renderer/context/tabs";
import type { TMenuItem, TMenuList } from "@renderer/entities/menu-list";

type Props = TModal & {
  checked: TMenuList;
  handleAllChecked: <T extends TMenuItem>(list: T[]) => void;
};

export const TabsModal = ({
  open,
  handleClose,
  title = "Копирование блюд в табы",
  description = "В какую вкладку вы хотите скопировать блюда",
  checked,
  handleAllChecked,
}: Props) => {
  const { tabs, copyDishes } = useContext(SubscribeTabsContext);

  const [tab, setTab] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setTab(event.target.value as string);
  };

  const handleApply = async () => {
    await copyDishes(checked, tab);
    handleAllChecked([]);
    handleClose();
  };

  return (
    <Modal
      title={title}
      open={open}
      handleClose={handleClose}
      handleApply={handleApply}
    >
      <Select fullWidth value={tab} onChange={handleChange}>
        {tabs.map(({ name, id }) => (
          <MenuItem value={id}>{name}</MenuItem>
        ))}
      </Select>
      <Typography>{description}</Typography>
    </Modal>
  );
};
