import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function BasicDialog(props) {
  const { show, setShow, title, children, actionAccept, ...rest } = props;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const handleClose = () => setShow(false);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={show}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      {...rest}
    >
      <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" autoFocus onClick={handleClose}>
          Cancelar
        </Button>
        <Button color="primary" variant="contained" onClick={actionAccept} autoFocus>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
