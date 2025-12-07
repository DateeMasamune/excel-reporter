import { Tab as MuiTab, type TabProps } from "@mui/material";
import { SettingsMenu } from "@renderer/components/settings-menu";

type Props = TabProps & {
  menuItems: {
    onClick: () => void;
    buttonName: string;
  }[];
  open: boolean;
  handleClose: () => void;
  anchorEl: HTMLElement | null;
};

export const Tab = (props: Props) => {
  const { handleClose, open, anchorEl, menuItems, ...tabProps } = props;
  return (
    <div>
      <MuiTab {...tabProps} />
      <SettingsMenu
        open={open}
        anchorEl={anchorEl}
        menuItems={menuItems}
        handleClose={handleClose}
      />
    </div>
  );
};
