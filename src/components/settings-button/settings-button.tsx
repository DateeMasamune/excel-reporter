import { Grid, IconButton, Menu, MenuItem, Button } from "@mui/material";
import type { ReactElement } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAnchourElement } from "@/shared/hooks/use-anchor-element";

type Props = {
  icon?: ReactElement;
  menuItems: {
    onClick: () => void;
    buttonName: string;
  }[];
};

export const SettingsButton = ({
  icon = <SettingsIcon />,
  menuItems,
}: Props) => {
  const { open, handleClick, handleClose, anchorEl } = useAnchourElement();

  return (
    <Grid container direction="column">
      <IconButton onClick={handleClick}>{icon}</IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {menuItems?.map(({ onClick, buttonName }) => (
          <MenuItem
            onClick={() => {
              onClick?.();
              handleClose();
            }}
          >
            <Button>{buttonName}</Button>
          </MenuItem>
        ))}
      </Menu>
    </Grid>
  );
};
