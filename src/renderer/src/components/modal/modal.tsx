import {
  Slide,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  type DialogProps,
} from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";
import React, { type PropsWithChildren, type ReactNode } from "react";
import { DialogStyled } from "./styled";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export type TModal = PropsWithChildren &
  DialogProps & {
    open: boolean;
    title?: string;
    description?: string;
    handleClose: () => void;
    handleApply?: () => void;
    modalFooter?: ReactNode;
  };

export const Modal = ({
  open,
  title,
  children,
  handleApply,
  description,
  handleClose,
  modalFooter,
  ...rest
}: TModal) => {
  return (
    <DialogStyled
      {...rest}
      open={open}
      slots={{
        transition: Transition,
      }}
      keepMounted
      onClose={handleClose}
      container={document.body}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {description && <DialogContentText>{description}</DialogContentText>}
        {children}
      </DialogContent>
      {modalFooter ? (
        modalFooter
      ) : (
        <DialogActions>
          <Button onClick={handleApply}>Принять</Button>
          <Button onClick={handleClose}>Отмена</Button>
        </DialogActions>
      )}
    </DialogStyled>
  );
};
