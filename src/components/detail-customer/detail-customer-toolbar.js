import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Collapse,
  IconButton,
  Stack,
  Grid,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { InputField } from "../FormFields";
import { updateClient } from "src/Api/ClientApi";
import { toast } from "react-toastify";

export default function DetailCustomerToolbar({ callback: { info } }) {
  const [open, setOpen] = useState(false);
  //console.log(info);

  function initialValues() {
    return {
      name: `${info.nombre}`,
      lastName: `${info.apellido}`,
      email: `${info.email}`,
      phone: `${info.phone}`,
      document: `${info.document}`,
      address: `${info.address}`,
    };
  }

  function validationSchema() {
    const phoneRegExp =
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    return Yup.object({
      name: Yup.string().required("El nombre no puede ir vacio"),
      lastName: Yup.string().required("El apellido no puede ir vacio"),
      email: Yup.string().email("Ingrese un correo valido").required("El correo no puede ir vacio"),
      phone: Yup.string()
        .required("El Numero de celular no puede ir vacio")
        .matches(phoneRegExp, `Ingrese un numero valido`)
        .test("len", `El numero no debe ser mayor a 9 digitos`, (val) => val && val.length === 9),
      document: Yup.string().required("El Documento no se puede editar"),
      address: Yup.string().required("La direccion no puede ir vacia"),
    });
  }

  async function _handleSubmit(values, actions) {
    // alert(JSON.stringify(values, null, 2));
    const response = await updateClient(info.id, values);

    if (response.status === 200) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }

  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <Typography sx={{ py: 2 }} variant="h5">
          Informacion del Cliente
        </Typography>
        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </Stack>

      <Box>
        <Formik
          initialValues={initialValues()}
          validationSchema={validationSchema()}
          onSubmit={_handleSubmit}
        >
          <Form>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Card>
                <CardContent>
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                      <Grid item xs={6}>
                        <InputField name="name" label="Nombre" fullWidth />
                      </Grid>
                      <Grid item xs={6}>
                        <InputField name="lastName" label="Apellido" fullWidth />
                      </Grid>
                      <Grid item xs={4}>
                        <InputField name="email" label="Correo" fullWidth />
                      </Grid>
                      <Grid item xs={4}>
                        <InputField name="phone" label="Celular" fullWidth />
                      </Grid>
                      <Grid item xs={4}>
                        <InputField name="document" label="DOCUMENTO" disabled={true} fullWidth />
                      </Grid>
                      <Grid item xs={8}>
                        <InputField name="address" label="Direccion" fullWidth />
                      </Grid>
                      <Grid item xs={4}>
                        <Button
                          color="primary"
                          size="large"
                          fullWidth
                          type="submit"
                          variant="contained"
                        >
                          Actualizar informacion
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </Collapse>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
}
