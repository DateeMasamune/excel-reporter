import { Grid, TextField } from "@mui/material";
import { Modal, type TModal } from "@renderer/components/modal";
import { TAB_FIELD_NAMES } from "@renderer/constants/field-names";
import { SubscribeTabsContext } from "@renderer/context/tabs";
import { useContext, useEffect, useState } from "react";

type Props = Omit<TModal, "title">;

const emptyTab = {
  [TAB_FIELD_NAMES.NAME]: "",
  id: "",
};

export const ModalCreateTab = ({ open, handleClose }: Props) => {
  const [isError, setIsError] = useState(true);
  const [newTab, setNewTab] = useState(emptyTab);
  const { create } = useContext(SubscribeTabsContext);

  const handleAddNewTab = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { value, name },
    } = event;

    setNewTab((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApply = () => {
    create(newTab);
    setNewTab(emptyTab);
    handleClose();
  };

  useEffect(() => {
    setIsError(!newTab[TAB_FIELD_NAMES.NAME]);
  }, [newTab]);

  return (
    <Modal
      title="Добавить новый таб"
      open={open}
      handleClose={handleClose}
      handleApply={handleApply}
      isDisabled={isError}
    >
      <Grid container spacing={2} direction="column">
        <TextField
          onChange={handleAddNewTab}
          name={TAB_FIELD_NAMES.NAME}
          value={newTab[TAB_FIELD_NAMES.NAME] ?? ""}
          label="Название вкладки"
          fullWidth
          error={!newTab[TAB_FIELD_NAMES.NAME]}
          helperText={!newTab[TAB_FIELD_NAMES.NAME] && "Заполните поле"}
        />
      </Grid>
    </Modal>
  );
};
