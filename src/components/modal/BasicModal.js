import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

export default function BasicModal(props) {
  const { show, setShow, title, children, ...rest } = props;

  const handleClose = () => setShow(false);

  const contenedor = {
    top: "50%",
    margin: "auto",
    width: 650,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  const encabezado = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
    paddingBottom: 3,
    borderBottom: "1px solid #E8E8E8",
  };

  const botonCerrar = {
    display: "flex",
    alignItems: "center",
    border: "none",
    background: "none",
    cursor: "pointer",
    transition: ".3s ease all",
    borderRadius: 5,
    color: "#1766DC",
    "&:hover": { background: "#f2f2f2" },
  };

  const contenido = { display: "flex", flexDirection: "column", alignItems: "justify" };

  return (
    <>
      <Modal
        open={show}
        onClose={handleClose}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        {...rest}
      >
        <Box sx={contenedor}>
          <Box sx={encabezado}>
            <Typography variant="h6" component="h2">
              {title}
            </Typography>
            <Button sx={botonCerrar} onClick={handleClose}>
              <CloseIcon />
            </Button>
          </Box>
          <Box sx={contenido}>{children}</Box>
        </Box>
      </Modal>
    </>
  );
}
