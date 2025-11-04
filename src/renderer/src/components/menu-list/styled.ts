import styled from "@emotion/styled";
import { ListSubheader, Menu } from "@mui/material";

export const ListSubheaderStyled = styled(ListSubheader)`
  top: 56px;
  -webkit-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
`;

export const MenuStyled = styled(Menu)`
  & .MuiPaper-root {
    min-width: 400px;
  }
`;

export const UlStyled = styled("ul")`
  padding: unset;
`;
