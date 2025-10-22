import { CSS_PROPS } from "@renderer/constants/global-css";
import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const TextFieldStyled = styled(TextField)`
  position: sticky;
  top: 0px;
  z-index: ${CSS_PROPS.zIndexTextField};
`;
