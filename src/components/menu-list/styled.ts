import { CSS_PROPS } from "@/constants/global-css";
import styled from "@emotion/styled";
import { ListSubheader, Menu, TextField } from "@mui/material";

export const ListSubheaderStyled = styled(ListSubheader)`
  top: 56px;
`;

export const TextFieldStyled = styled(TextField)`
  position: sticky;
  top: 0px;
  z-index: ${CSS_PROPS.zIndexTextField};
`;

export const MenuStyled = styled(Menu)`
  & .MuiPaper-root {
    min-width: 400px;
  }
`;
