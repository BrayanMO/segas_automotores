import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
  IconButton,
  Collapse,
  Modal,
  Fade,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SeverityPill from "src/components/severity-pill";

const CarouselImages = dynamic(() => import("../CarouselImages"), {
  loading: () => (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%" }} />
    </Box>
  ),
});

export default function RowCustom(props) {
  const { row } = props;

  // console.log(row);
  const [open, setOpen] = useState(false);

  const fechaActual = new Date().getTime();
  const fechaRe = new Date(row.next_revision).getTime();
  const fechadiffRe = (fechaRe - fechaActual) / (1000 * 60 * 60 * 24);
  // console.log(fechadiffRe.toFixed(0));

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{row.date_ingreso}</TableCell>
        <TableCell component="th" scope="row" align="center">
          {row.garantia}
        </TableCell>
        <TableCell align="center">
          <SeverityPill
            color={(fechadiffRe < 0 && "error") || (fechadiffRe <= 10 && "warning") || "success"}
          >
            {row.next_revision}
          </SeverityPill>
        </TableCell>
        <TableCell align="center">{row.mantenimiento}</TableCell>
        <TableCell align="center">{row.change_filtro}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <ListProducts row={row} />
            <ListImages row={row} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

function ListImages(props) {
  const { row } = props;
  const [urlImage, setUrlImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openImage = (url) => {
    setUrlImage(url);
    setShowModal(true);
  };

  //Optimizando la carga de imagenes
  const strCerti = row.url_certificado;
  const strInit = strCerti.slice(0, 49);
  const strEnd = strCerti.slice(49);
  const strResultCertifi = `${strInit}q_auto,f_auto/${strEnd}`;

  return (
    <Box sx={{ margin: 1 }}>
      <Typography variant="h6" gutterBottom component="div">
        Imagenes
      </Typography>

      <Table size="small" aria-label="purchases">
        <TableHead>
          <TableRow>
            <TableCell>Certificado</TableCell>
            <TableCell>Collage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Box
                component="img"
                sx={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  height: 255,
                  display: "block",
                  maxWidth: "100%",
                  overflow: "hidden",
                }}
                src={strResultCertifi}
                onClick={() => openImage(strResultCertifi)}
              />
            </TableCell>

            <TableCell>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CarouselImages collage={row.url_collage} />
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showModal}>
          <Box
            component="img"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "80%",
              maxHeight: "80%",
              display: "block",
              overflow: "hidden",
            }}
            src={urlImage}
          />
        </Fade>
      </Modal>
    </Box>
  );
}

function ListProducts(props) {
  const { row } = props;

  return (
    <Box sx={{ margin: 1 }}>
      <Typography variant="h6" gutterBottom component="div">
        Lista de Repuestos
      </Typography>
      <Table size="small" aria-label="purchases">
        <TableHead>
          <TableRow>
            <TableCell>Repuesto</TableCell>
            <TableCell align="center">Serial</TableCell>
            <TableCell align="center">Cantidad</TableCell>
            <TableCell align="center">Precio Venta</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row.list_products.map((product, index) => (
            <TableRow key={index}>
              <TableCell>{product.nombre}</TableCell>
              <TableCell align="center">{product.serial}</TableCell>
              <TableCell align="center">{product.cantidad}</TableCell>
              {product.id ? (
                <TableCell align="center">{product.precio_venta}</TableCell>
              ) : (
                !product.id && <TableCell align="center">Proporcionado por el cliente</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
