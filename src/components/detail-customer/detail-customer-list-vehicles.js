import {
  Box,
  Typography,
  Paper,
  TableContainer,
  TablePagination,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { map } from "lodash";
import { updateVehicle } from "src/Api/VehicleApi";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const BasicDialog = dynamic(() => import("../dialog/BasicDialog"));

export default function DetaiCustomerlListVehicles({ callback: { vehiculo } }) {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeLimit = (event) => {
    setLimit(+event.target.value);
    setPage(0);
  };

  // console.log(vehiculo);

  return (
    <Box>
      <Typography sx={{ py: 2 }} variant="h5">
        Lista de vehiculos
      </Typography>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Marca</TableCell>
                <TableCell>Modelo</TableCell>
                <TableCell>Año</TableCell>
                <TableCell>Placa</TableCell>
                <TableCell>Visualizar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {map(vehiculo.slice(page * limit, page * limit + limit), (item) => (
                <TableRow hover key={item.placa}>
                  <TableCell>{item.marca}</TableCell>
                  <TableCell>{item.modelo}</TableCell>
                  <TableCell>{item.annio}</TableCell>
                  <TableCell>{item.placa}</TableCell>
                  <TableCell>
                    <Options placa={item.placa} vehiculo={vehiculo} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          page={page}
          count={vehiculo.length}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeLimit}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage="Filas por página"
        />
      </Paper>
    </Box>
  );
}

function Options({ placa, vehiculo }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const router = useRouter();

  const ITEM_HEIGHT = 30;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //Estado para controlar el dialog
  const [openDialog, setOpenDialog] = useState(false);
  const onShowDialog = () => setOpenDialog(true);

  const actionAccept = async (placa) => {
    if (vehiculo.length > 1) {
      const result = await updateVehicle(placa);
      if (result.status === 200) {
        toast.success("Vehiculo actualizado");
        setOpenDialog(false);
        router.reload();
      } else {
        toast.error(result.data.message);
      }
    } else {
      toast.error("El cliente no se puede quedar sin vehiculos");
      setOpenDialog(false);
    }
  };

  const buttonDelete = {
    color: "red",
    border: `1px solid red`,
    "&:hover": {
      color: "white",
      backgroundColor: "red",
      border: `1px solid red`,
    },
    label: { textTransform: "none" },
  };

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "15ch",
          },
        }}
      >
        <NextLink href={`/detail-vehicle/${placa}`} passHref>
          <MenuItem onClick={handleClose}>
            <Button color="primary" variant="contained" fullWidth>
              Ver
            </Button>
          </MenuItem>
        </NextLink>
        <MenuItem onClick={handleClose}>
          <Button fullWidth sx={buttonDelete} onClick={onShowDialog}>
            Eliminar
          </Button>
        </MenuItem>
      </Menu>
      <BasicDialog
        show={openDialog}
        setShow={setOpenDialog}
        actionAccept={() => actionAccept(placa)}
        title="Desea dar de baja el vehiculo del cliente?"
      />
    </>
  );
}
