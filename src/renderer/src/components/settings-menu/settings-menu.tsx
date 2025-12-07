import { Button, Menu, MenuItem } from "@mui/material";

type Props = {
  menuItems: {
    onClick: () => void;
    buttonName: string;
  }[];
  open: boolean;
  handleClose: () => void;
  anchorEl: HTMLElement | null;
};

export const SettingsMenu = ({
  menuItems,
  open,
  handleClose,
  anchorEl,
}: Props) => {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
      {menuItems?.map(({ onClick, buttonName }) => (
        <MenuItem
          key={buttonName}
          onClick={() => {
            onClick?.();
            handleClose();
          }}
        >
          <Button>{buttonName}</Button>
        </MenuItem>
      ))}
    </Menu>
  );
};
