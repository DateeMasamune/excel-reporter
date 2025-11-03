import { useModal } from "@renderer/shared/hooks/use-modal";
import { Modal } from "../modal";
import { Button, DialogActions, Divider, Grid, TextField } from "@mui/material";
import { EXCEL_FIELD_NAMES } from "@renderer/constants/field-names";
import { useContext, useState } from "react";
import { List } from "../list";
import type { TMenuItem, TMenuList } from "@renderer/entities/menu-list";
import { SubscribeOrdersContext } from "@renderer/context/SubscribeOrdersContext";
import { useFileDownload } from "@renderer/hooks/useFileDownload";

type Props = {
  dishList: TMenuList;
  handleClearChecked: () => void;
  handleDeleteItem: (id: string) => void;
  handleChangeItem: (updateItem: TMenuItem) => void;
};

type ExcelSettings = Record<Lowercase<keyof typeof EXCEL_FIELD_NAMES>, string>;

const fields = [
  {
    name: EXCEL_FIELD_NAMES.RESTAURANT,
    label: "Ресторан",
  },
  {
    name: EXCEL_FIELD_NAMES.DATE,
    label: "Дата и время мероприятия",
  },
  {
    name: EXCEL_FIELD_NAMES.NAME,
    label: "Имя контактного лица",
  },
  {
    name: EXCEL_FIELD_NAMES.PHONE,
    label: "Телефон",
  },
  {
    name: EXCEL_FIELD_NAMES.PERSONS,
    label: "Кол-во персон",
  },
  {
    name: EXCEL_FIELD_NAMES.EMPLOYEE,
    label: "П/З принял (сотрудник)",
  },
];

const initSettings = {
  [EXCEL_FIELD_NAMES.RESTAURANT]: "Токио-Сити",
  [EXCEL_FIELD_NAMES.DATE]: "",
  [EXCEL_FIELD_NAMES.EMPLOYEE]: "",
  [EXCEL_FIELD_NAMES.NAME]: "",
  [EXCEL_FIELD_NAMES.PERSONS]: "",
  [EXCEL_FIELD_NAMES.PHONE]: "",
} as ExcelSettings;

export const ExcelSettingsModal = ({
  dishList,
  handleClearChecked,
  handleDeleteItem,
  handleChangeItem,
}: Props) => {
  const { open, handleClose, handleOpen } = useModal();
  const [excelSettings, setExcelSettings] =
    useState<ExcelSettings>(initSettings);
  const { createExcel } = useContext(SubscribeOrdersContext);
  const { handleDownloadExcel } = useFileDownload();

  const isDisabled = !dishList.length;

  const handleSetExcelSettings = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { value, name },
    } = event;

    setExcelSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const closeModal = () => {
    setExcelSettings(initSettings);
    handleClose();
    handleClearChecked();
  };

  const handleCreateExcel = () => {
    handleDownloadExcel(() =>
      createExcel({
        ...excelSettings,
        dishList,
      })
    );
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Скачать эксель отчет
      </Button>
      <Modal
        maxWidth="lg"
        fullWidth
        open={open}
        handleClose={closeModal}
        modalFooter={
          <DialogActions>
            <Button
              disabled={isDisabled}
              variant="contained"
              onClick={handleCreateExcel}
            >
              Скачать
            </Button>
            <Button onClick={handleDownloadExcel}>Принять</Button>
            <Button onClick={closeModal}>Отмена</Button>
          </DialogActions>
        }
      >
        <Grid container spacing={2} direction="column">
          {fields.map(({ name, label }) => (
            <TextField
              key={name}
              onChange={handleSetExcelSettings}
              name={name}
              value={excelSettings[name as keyof ExcelSettings] ?? ""}
              label={label}
              fullWidth
            />
          ))}
          <Divider />
          <List
            listItems={dishList}
            handleDeleteItem={handleDeleteItem}
            handleChangeItem={handleChangeItem}
          />
        </Grid>
      </Modal>
    </>
  );
};
