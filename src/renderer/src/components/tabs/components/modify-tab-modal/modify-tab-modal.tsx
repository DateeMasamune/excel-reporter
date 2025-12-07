import { TAB_FIELD_NAMES } from "@renderer/constants/field-names";
import type { Tab, TMenuItem } from "@renderer/entities/menu-list";
import { Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Modal, type TModal } from "@renderer/components/modal";

type Props = Omit<TModal, "handleApply"> & {
  tab: Partial<Tab>;
  callback: (tab: Tab) => void;
};

export const ModifyTabModal = ({
  open,
  tab,
  title,
  callback,
  handleClose,
}: Props) => {
  const [newTab, setNewTab] = useState<Partial<Tab>>(tab);
  const [isError, setIsError] = useState(true);

  const handleChangeTab = (
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
    if (!Object.keys(newTab).length) {
      return;
    }

    callback?.(newTab as TMenuItem);
    setNewTab(tab as TMenuItem);
    handleClose();
  };

  useEffect(() => {
    setIsError(!newTab[TAB_FIELD_NAMES.NAME]);
  }, [newTab]);

  useEffect(() => {
    setNewTab(tab);
  }, [tab]);

  return (
    <>
      <Modal
        title={title}
        open={open}
        handleClose={handleClose}
        handleApply={handleApply}
        isDisabled={isError}
      >
        <Grid container spacing={2} direction="column">
          <TextField
            onChange={handleChangeTab}
            name={TAB_FIELD_NAMES.NAME}
            value={newTab[TAB_FIELD_NAMES.NAME] ?? ""}
            label="Название вкладки"
            fullWidth
            error={!newTab[TAB_FIELD_NAMES.NAME]}
            helperText={!newTab[TAB_FIELD_NAMES.NAME] && "Заполните поле"}
          />
        </Grid>
      </Modal>
    </>
  );
};
