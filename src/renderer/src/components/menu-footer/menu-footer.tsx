import { Button } from "@mui/material";
import { TabsModal } from "../tabs-modal";
import { StyledFooterMenuList } from "./styled";
import { useModal } from "@renderer/shared/hooks/use-modal";
import type { TMenuItem, TMenuList } from "@renderer/entities/menu-list";

type Props = {
  isChecked: boolean;
  checked: TMenuList;
  handleAllChecked: <T extends TMenuItem>(list: T[]) => void;
};

export const MenuFooter = ({ isChecked, checked, handleAllChecked }: Props) => {
  const {
    open: openTabsModal,
    handleClose: handleCloseTabsModal,
    handleOpen: handleOpenTabsModal,
  } = useModal();

  return (
    !!isChecked && (
      <StyledFooterMenuList container>
        <Button
          disabled={!isChecked}
          variant="contained"
          onClick={handleOpenTabsModal}
        >
          Скопировать
        </Button>
        <TabsModal
          checked={checked}
          open={openTabsModal}
          handleClose={handleCloseTabsModal}
          handleAllChecked={handleAllChecked}
        />
      </StyledFooterMenuList>
    )
  );
};
