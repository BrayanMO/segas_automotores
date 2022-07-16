import React, { useState } from "react";
import Head from "next/head";
import { Box, Container, Typography, Grid, Button, CircularProgress } from "@mui/material";
import { Form, Formik } from "formik";
import { DashboardLayout } from "src/layout/dashboard-layout";
import * as Yup from "yup";
import { InputField } from "src/components/FormFields";
import { registerProvider } from "src/Api/ProviderApi";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function RegisterProvider() {
  const router = useRouter();

  function initialValues() {
    return {
      razon_social: "",
      ruc: "",
      email: "",
      phone: "",
      address: "",
      city: "",
    };
  }

  function validationSchema() {
    const phoneRegExp =
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    return Yup.object().shape({
      razon_social: Yup.string().required("Se requiere la razon social del proveedor"),
      ruc: Yup.string()
        .required("Se requiere el ruc del proveedor")
        .matches(/^[0-9]+$/, "El ruc debe ser numerico")
        .test("length", "El ruc debe tener 11 caracteres", (value) => value && value.length === 11),
      email: Yup.string()
        .email("Ingrese un correo valido")
        .required("Se requiere el email del proveedor"),
      phone: Yup.string()
        .required("Se requiere el numero de celular del proveedor")
        .matches(phoneRegExp, "Ingrese un numero de telefono valido")
        .test("len", `Ingrese un numero de 9 digitos`, (val) => val && val.length === 9),
      address: Yup.string(),
      city: Yup.string(),
    });
  }

  async function _handleSubmit(values, actions) {
    // console.log(values);

    const response = await registerProvider(values);

    if (response.status === 200) {
      response.data.cod === 0
        ? actions.setFieldError("ruc", response.data.message)
        : toast.success(response.data.message) && router.push("/providers");
    } else {
      toast.error(response.data.message);
    }
  }

  return (
    <DashboardLayout>
      <Head>
        <title>Registrar Caso Conversion | Template App</title>
      </Head>
      <Box
        component="main"
        sx={{ flexGrow: 1, alignItems: "top", display: "flex", minHeight: "100%" }}
      >
        <Container maxWidth="md">
          <Box sx={{ mt: 3, my: 2 }}>
            <Typography variant="h4" color="textPrimary">
              Registro de proveedores
            </Typography>
          </Box>
          <Formik
            initialValues={initialValues()}
            validationSchema={validationSchema()}
            onSubmit={_handleSubmit}
          >
            <Form>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={6}>
                  <InputField name="razon_social" label="Razón Social" fullWidth />
                </Grid>
                <Grid item xs={6}>
                  <InputField name="ruc" label="RUC" fullWidth />
                </Grid>
                <Grid item xs={6}>
                  <InputField name="email" label="Email" fullWidth />
                </Grid>
                <Grid item xs={6}>
                  <InputField name="phone" label="Teléfono" fullWidth />
                </Grid>

                <Grid item xs={6}>
                  <InputField name="address" label="Dirección" fullWidth />
                </Grid>

                <Grid item xs={6}>
                  <InputField name="city" label="Ciudad" fullWidth />
                </Grid>
              </Grid>
              <Box sx={{ mt: 3 }}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Registrar
                </Button>
              </Box>
            </Form>
          </Formik>
        </Container>
      </Box>
    </DashboardLayout>
  );
}
