import { Grid, IconButton } from "@mui/material";
import type { ReactElement } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAnchourElement } from "@renderer/shared/hooks/use-anchor-element";
import { SettingsMenu } from "../settings-menu";

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
      <SettingsMenu
        menuItems={menuItems}
        open={open}
        handleClose={handleClose}
        anchorEl={anchorEl}
      />
    </Grid>
  );
};
