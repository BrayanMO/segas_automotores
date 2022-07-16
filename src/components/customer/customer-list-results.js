import { useState } from "react";
import NextLink from "next/link";
import dynamic from "next/dynamic";
import { map } from "lodash";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "react-perfect-scrollbar/dist/css/styles.css";
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
import { toast } from "react-toastify";

import { customerFormModel } from "src/components/customer/FormModel";
import { deleteClient } from "src/Api/ClientApi";
import { addVehicleClient } from "src/Api/VehicleApi";

const BasicModal = dynamic(() => import("../modal/BasicModal"));
const VehicleInformation = dynamic(() => import("../customer/Forms/vehicle-information"));
const BasicDialog = dynamic(() => import("../dialog/BasicDialog"));

export default function CustomerListResults(props) {
  const { listClient, callback } = props;
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
                <TableCell>Apellidos y Nombre</TableCell>
                <TableCell>Celular</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Direccion</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {map(listClient.slice(page * limit, page * limit + limit), (client) => (
                <TableRow hover key={client.id}>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >{`${client.apellido} ${client.nombre}`}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{client.telef}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.direccion}</TableCell>
                  <TableCell>
                    <Options document={client.documento} idClient={client.id} callback={callback} />
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
        count={listClient.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Filas por página"
      />
    </Card>
  );
}

function Options({ document, idClient, callback }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const ITEM_HEIGHT = 30;

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  //Estados para controlar el modal
  const [showModal, setShowModal] = useState(false);
  const onShowModal = () => setShowModal(true);

  //Estado para controlar el dialog
  const [openDialog, setOpenDialog] = useState(false);
  const onShowDialog = () => setOpenDialog(true);

  const actionAccept = async (id) => {
    const response = await deleteClient(id);
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
            width: "18ch",
          },
        }}
      >
        <NextLink href={`/detail-customer/${document}`} passHref>
          <MenuItem onClick={handleClose}>
            <Button color="primary" variant="contained" fullWidth>
              Ver Informacion
            </Button>
          </MenuItem>
        </NextLink>
        <MenuItem onClick={handleClose}>
          <Button fullWidth sx={buttonDelete} onClick={onShowDialog}>
            Eliminar
          </Button>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Button color="primary" variant="contained" onClick={onShowModal} fullWidth>
            Agregar Vehiculos
          </Button>
        </MenuItem>
      </Menu>
      <BasicModal show={showModal} setShow={setShowModal} title="Añadir Vehiculos">
        <AddVehicle idClient={idClient} />
      </BasicModal>
      <BasicDialog
        show={openDialog}
        setShow={setOpenDialog}
        actionAccept={() => actionAccept(idClient)}
        title="Desea dar de baja al cliente?"
      />
    </>
  );
}

function AddVehicle(props) {
  const { idClient } = props;
  const { formField } = customerFormModel;

  function initialValues() {
    return {
      made: "",
      model: "",
      annio: "",
      placa: "",
      kilometraje: "",
      observations: "",
      certificate: "",
    };
  }

  function validationSchema() {
    return {
      made: Yup.string().required("La marca del vehiculo es requerida"),
      model: Yup.string().required("El modelo del vehiculo es requerido"),
      annio: Yup.string()
        .required("El año del vehiculo es requerido")
        .test("len", "Digite un año valido. (Ejem. 1999)", (value) => value && value.length === 4),
      placa: Yup.string()
        .required("La placa del vehiculo es requerida")
        .test("len", "N° de placa invalido (Ejemplo: AEF-717)", (val) => val && val.length === 7),
      kilometraje: Yup.number().required(
        "El numero de kilometros de como ingresa el vehiculo es requerido"
      ),
      observations: Yup.string().required("Observaciones del vehiculo son requeridas"),
      certificate: Yup.string().nullable().required("Selecione el estado de su certificado"),
    };
  }

  async function _handleSubmit(values, actions) {
    const response = await addVehicleClient(idClient, values);

    response.status === 200
      ? toast.success(response.data.message) && actions.resetForm()
      : toast.error(response.data.message);
  }

  return (
    <Box>
      <Formik
        initialValues={initialValues()}
        validationSchema={Yup.object(validationSchema())}
        onSubmit={_handleSubmit}
      >
        <Form>
          <VehicleInformation formField={formField} />
          <Box sx={{ py: 2 }}>
            <Button color="primary" fullWidth size="large" type="submit" variant="contained">
              Agregar
            </Button>
          </Box>
        </Form>
      </Formik>
    </Box>
  );
}
