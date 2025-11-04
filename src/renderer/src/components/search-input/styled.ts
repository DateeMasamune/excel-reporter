import { CSS_PROPS } from "@renderer/constants/global-css";
import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import { blue } from "@mui/material/colors";

export const TextFieldStyled = styled(TextField)`
  position: sticky;
  top: 0px;
  z-index: ${CSS_PROPS.zIndexTextField};
  background-color: ${blue[100]};

  &:hover {
    background-color: ${blue[200]};
  }
`;
