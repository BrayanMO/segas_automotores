import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  Box,
  Card,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableContainer,
  TableRow,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { map } from "lodash";
import { toast } from "react-toastify";
import { deleteProvider } from "../../Api/ProviderApi";

const BasicDialog = dynamic(() => import("../dialog/BasicDialog"));

export default function ProviderListResult({ listProviders, callback }) {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(+event.target.value);
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card>
      <Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Razon Social</TableCell>
                <TableCell>RUC</TableCell>
                <TableCell>Celular</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Ciudad</TableCell>
                <TableCell>Direccion</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {map(listProviders.slice(page * limit, page * limit + limit), (provider) => (
                <TableRow key={provider.id_proveedor}>
                  <TableCell>{provider.razon_social}</TableCell>
                  <TableCell>{provider.ruc}</TableCell>
                  <TableCell>{provider.celular}</TableCell>
                  <TableCell>{provider.email}</TableCell>
                  <TableCell>{provider.ciudad}</TableCell>
                  <TableCell>{provider.direccion}</TableCell>
                  <TableCell>
                    <Options id_proveedor={provider.id_proveedor} callback={callback} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <TablePagination
        component="div"
        page={page}
        count={listProviders.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Filas por página"
      />
    </Card>
  );
}

function Options({ id_proveedor, callback }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const ITEM_HEIGHT = 30;

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  //Estado para controlar el dialog
  const [openDialog, setOpenDialog] = useState(false);
  const onShowDialog = () => setOpenDialog(true);

  const actionAccept = async (id) => {
    // console.log("eliminar de la bd");
    const response = await deleteProvider(id);

    if (response.status === 200) {
      toast.success(response.data.message);
      callback();
      setOpenDialog(false);
    } else {
      toast.error(response.data.message);
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
        <MenuItem onClick={handleClose}>
          <Button fullWidth sx={buttonDelete} onClick={onShowDialog} component="a">
            Eliminar
          </Button>
        </MenuItem>
      </Menu>

      <BasicDialog
        show={openDialog}
        setShow={setOpenDialog}
        actionAccept={() => actionAccept(id_proveedor)}
        title="Desea dar de baja al Proveedor?"
      >
        <Typography>
          Let Google help apps determine location. This means sending anonymous location data to
          Google, even when no apps are running.
        </Typography>
      </BasicDialog>
    </>
  );
}
