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
  Grid,
  Button,
  Divider,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import SeverityPill from "src/components/severity-pill";
import BasicModal from "src/components/modal/BasicModal";
import ContentModal from "./ContentModal";
import { Chrono } from "react-chrono";

const CarouselImages = dynamic(() => import("../CarouselImages"), {
  loading: () => (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%" }} />
    </Box>
  ),
});

export default function RowCustom(props) {
  const { row, reload } = props;

  // console.log(row);
  const [open, setOpen] = useState(false);

  // const fechaActual = new Date().getTime();
  // const fechaRe = new Date(row.next_revision).getTime();
  // const fechadiffRe = (fechaRe - fechaActual) / (1000 * 60 * 60 * 24);
  // console.log(fechadiffRe.toFixed(0));

  const [showModal, setShowModal] = useState(false);
  const onShowModal = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);

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
        <TableCell align="center">{row.next_revision}</TableCell>
        <TableCell align="center">{row.mantenimiento}</TableCell>
        <TableCell align="center">{row.change_filtro}</TableCell>
        <TableCell align="center">
          <Button variant="contained" color="secondary" onClick={onShowModal}>
            Actualizar
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Divider />
            <ListProducts row={row} />
            <Divider sx={{ my: 2 }} />
            <ListImages row={row} />
          </Collapse>
        </TableCell>
      </TableRow>
      <BasicModal show={showModal} setShow={setShowModal} title="Actualizar fechas">
        <ContentModal row={row} onCloseModal={onCloseModal} reload={reload} />
      </BasicModal>
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
      <Grid container spacing={3}>
        <Grid item xs={6}>
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
                    !product.id && (
                      <TableCell align="center">Proporcionado por el cliente</TableCell>
                    )
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={6}>
          <HistoryDate row={row} />
        </Grid>
      </Grid>
    </Box>
  );
}

const HistoryDate = ({ row: { history } }) => {
  const data = history?.map((item, index) => {
    return {
      title: `${index + 1} Registro`,
      cardSubtitle: `Fecha de revision: ${item.date_revision}, Fecha cambio de filtro: ${item.date_change_filtro} y Fecha de mantenimiento: ${item.date_mantenimiento}`,
    };
  });

  return (
    <Box sx={{ height: 250, width: "100%" }}>
      {data && data.length > 0 ? (
        <Chrono
          items={data}
          mode="VERTICAL_ALTERNATING"
          twoColumnscardHeight={100}
          cardWidth={250}
          cardHeight={100}
          hideControls
        />
      ) : (
        <Box
          sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}
        >
          <Typography variant="h6" gutterBottom>
            Aun no cuenta con un historial de revisiones
          </Typography>
        </Box>
      )}
    </Box>
  );
};
