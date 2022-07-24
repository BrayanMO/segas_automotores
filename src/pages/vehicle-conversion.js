import React, { useState, useEffect } from "react";
import Head from "next/head";

import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  IconButton,
  Autocomplete,
  Card,
  Stack,
  FormHelperText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { DashboardLayout } from "src/layout/dashboard-layout";
import { DatePickerField, InputField } from "src/components/FormFields";

import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { format, parseISO } from "date-fns";
import { toast } from "react-toastify";

import { getVehiculoPlaca, addConversionVehiculoClient, uploudImage } from "src/Api/VehicleApi";
import { discountStock, getProducts } from "src/Api/RepuestoApi";
import { MultiFileUpload, SingleFileUpload } from "src/components/UploadFile";

export default function VehicleConversion() {
  const [infoVehiculo, setInfoVehiculo] = useState([]);
  const [listProducts, setListProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getProducts();
      setListProducts(response);
    })();
  }, []);

  async function _handleSubmit(values, actions) {
    const upload = await uploudImage("certificate", values.imgCertificate, null);
    // console.log(upload);

    const uploadCollage = await uploudImage("collage", null, values.imgsCollage);
    // console.log(uploadCollage);

    const dataProcess = {
      idVehiculo: infoVehiculo.id_vehiculo,
      garantia: values.garantia,
      fechaNextRevision: format(values.fechaNextRevision, "yyyy-MM-dd"),
      fechaChangeFilter: format(values.fechaChangeFilter, "yyyy-MM-dd"),
      fechaMantenimiento: format(values.fechaMantenimiento, "yyyy-MM-dd"),
      imgCertificate: upload.data[0].url,
      imgsCollage: JSON.stringify(uploadCollage.data),
      products: JSON.stringify(values.products),
    };

    // console.log(dataProcess);

    const productsDiscount = {
      products: values.products,
    };

    // console.log(productsDiscount);

    const response = await addConversionVehiculoClient(dataProcess);
    const response2 = await discountStock(productsDiscount);

    if (!response || !response2) {
      toast.error("Error al registrar la conversion del vehiculo");
    } else {
      if (response.cod === 1) {
        toast.success(response.message);
        actions.resetForm();
      } else {
        toast.error(response.message);
      }
    }
  }

  function initialValues() {
    return {
      placa: "",
      fechaNextRevision: "",
      fechaChangeFilter: "",
      fechaMantenimiento: "",
      imgCertificate: null,
      imgsCollage: null,
      products: [
        {
          id: "",
          nombre: "",
          cantidad: "",
          serial: "",
          precio_venta: "",
        },
      ],
      garantia: "",
    };
  }

  function validationSchema() {
    return {
      placa: Yup.string()
        .max(12)
        .required("Se requiere el placa del vehiculo")
        .test("len", `N° de placa invalido (Ejemplo: AEF-717)`, (val) => val && val.length === 7),
      fechaNextRevision: Yup.string().required("Ingrese la fecha de la proxima revision"),
      fechaChangeFilter: Yup.string().required("Ingrese la fecha del cambio de filtro"),
      fechaMantenimiento: Yup.string().required("Ingrese la fecha del proximo mantenimiento"),
      imgCertificate: Yup.mixed().nullable().required("La imagen del certificado es necesaria"),
      imgsCollage: Yup.mixed()
        .nullable()
        .required("Las imagenes del cambio son necesarias")
        .test("len", `Solo permite 5 imagenes`, (val) => val && val.length === 5),
      garantia: Yup.string()
        .required("Ingrese la garantia")
        .test("len", `La garantia debe ser validad`, (val) => val > 0),
      products: Yup.array()
        .of(
          Yup.object().shape({
            nombre: Yup.string().required("El nombre es necesario"),
            cantidad: Yup.string()
              .required("La cantidad es necesaria")
              .test("len", `La cantidad debe ser positivo`, (val) => val > 0),
            serial: Yup.string().required("El serial es necesario"),
          })
        )
        .required("Los productos son necesarios"),
    };
  }

  async function buscarVehiculoPlaca(placa) {
    if (placa.length <= 0) {
      toast.error("Ingrese la placa del vehiculo");
    } else {
      const vehiculo = await getVehiculoPlaca(placa);
      console.log(vehiculo);
      setInfoVehiculo(vehiculo);
    }
  }

  return (
    <DashboardLayout>
      <Head>
        <title>Registrar Caso Conversion | Template App</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "top",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ my: 3 }}>
            <Typography color="textPrimary" variant="h4">
              Registro de conversiones
            </Typography>
          </Box>
          <Formik
            initialValues={initialValues()}
            validationSchema={Yup.object(validationSchema())}
            onSubmit={_handleSubmit}
          >
            {(formik) => (
              <Form>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  <Grid item xs={6}>
                    {/* PLACA */}
                    <Grid item xs={12} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <TextField
                        name="placa"
                        label="Placa"
                        size="small"
                        variant="outlined"
                        error={Boolean(formik.touched.placa && formik.errors.placa)}
                        helperText={formik.touched.placa && formik.errors.placa}
                        {...formik.getFieldProps("placa")}
                      />
                      <Button
                        color="primary"
                        size="small"
                        fullWidth
                        onClick={() => buscarVehiculoPlaca(formik.values.placa)}
                        variant="outlined"
                      >
                        Buscar Vehiculo
                      </Button>
                    </Grid>
                    <Typography color="textSecondary" gutterBottom variant="body1">
                      {infoVehiculo.length <= 0
                        ? " "
                        : !infoVehiculo.nombre
                        ? "El vehiculo no existe"
                        : `Vehiculo perteneciente: ${infoVehiculo.nombre} ${
                            infoVehiculo.apellido
                          }. Ultima revision: ${
                            infoVehiculo.ultima_revision
                              ? format(parseISO(infoVehiculo.ultima_revision), "yyyy-MM-dd")
                              : "Nunca"
                          }`}
                    </Typography>

                    {/* Fechas */}
                    <Grid item xs={12} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <DatePickerField
                        name="fechaNextRevision"
                        openTo="day"
                        label="Fecha Proxima revision"
                        views={["day", "month"]}
                      />

                      <DatePickerField
                        name="fechaChangeFilter"
                        openTo="day"
                        label="Fecha Cambio de filtro"
                        views={["day", "month"]}
                      />
                    </Grid>

                    {/* Fecha - Garantia */}
                    <Grid item xs={12} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <DatePickerField
                        name="fechaMantenimiento"
                        openTo="day"
                        label="Fecha proximo mantenimiento"
                        views={["day", "month"]}
                      />

                      {/* Garantia */}
                      <InputField name="garantia" label="Garantia" margin="normal" type="number" />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography color="textPrimary" variant="h5">
                        Lista de productos utilizados
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexWrap: "wrap",
                          border: "1px dashed rgb(45, 55, 72)",
                          borderRadius: 1,
                          px: 1,
                        }}
                      >
                        <FieldArray name="products">
                          {(arrayHelpers) => (
                            <>
                              {/* add product */}
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={() =>
                                  arrayHelpers.push({
                                    nombre: "",
                                    cantidad: "",
                                    serial: "",
                                  })
                                }
                                sx={{ mt: 1 }}
                              >
                                Agregar
                              </Button>

                              {/* list of products */}
                              {formik.values.products.map((producto, index) => (
                                <Box
                                  key={index}
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 2,
                                  }}
                                >
                                  <Autocomplete
                                    freeSolo
                                    fullWidth
                                    name={`products[${index}].nombre`}
                                    options={listProducts}
                                    getOptionLabel={(option) => option.nombre}
                                    onOpen={formik.handleBlur}
                                    onChange={(event, newValue) => {
                                      // console.log(newValue);
                                      formik.setFieldValue(
                                        `products[${index}].id`,
                                        newValue !== null ? newValue.id : ""
                                      );
                                      formik.setFieldValue(
                                        `products[${index}].nombre`,
                                        newValue !== null ? newValue.nombre : ""
                                      );
                                      formik.setFieldValue(
                                        `products[${index}].precio_venta`,
                                        newValue !== null ? newValue.precio_venta : ""
                                      );
                                    }}
                                    renderInput={(params) => (
                                      <InputField
                                        name={`products[${index}].nombre`}
                                        label="Buscar Producto"
                                        margin="normal"
                                        {...params}
                                      />
                                    )}
                                  />

                                  <InputField
                                    name={`products[${index}].cantidad`}
                                    label="Cantidad"
                                    margin="normal"
                                    type="number"
                                  />
                                  <InputField
                                    name={`products[${index}].serial`}
                                    label="Serial"
                                    margin="normal"
                                  />

                                  <IconButton
                                    color="error"
                                    aria-label="remove product"
                                    component="span"
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Box>
                              ))}
                            </>
                          )}
                        </FieldArray>
                      </Box>
                    </Grid>
                  </Grid>

                  {/* Imagenes */}
                  <Grid item xs={6}>
                    {/* Certificado */}
                    <Grid item xs={12}>
                      <Typography color="textPrimary" variant="h5">
                        Certificado
                      </Typography>
                      <Card>
                        <Stack spacing={1.5} alignItems="center">
                          <SingleFileUpload
                            field="imgCertificate"
                            setFieldValue={formik.setFieldValue}
                            file={formik.values.imgCertificate}
                            error={formik.touched.imgCertificate && !!formik.errors.imgCertificate}
                          />
                          {formik.touched.imgCertificate && formik.errors.imgCertificate && (
                            <FormHelperText error>{formik.errors.imgCertificate}</FormHelperText>
                          )}
                        </Stack>
                      </Card>
                    </Grid>

                    {/* Collage */}
                    <Grid item xs={12}>
                      <Typography color="textPrimary" variant="h5">
                        Collage del cambio imgsCollage
                      </Typography>
                      <Card>
                        <Stack spacing={1.5} alignItems="center">
                          <MultiFileUpload
                            field="imgsCollage"
                            setFieldValue={formik.setFieldValue}
                            files={formik.values.imgsCollage}
                            error={formik.touched.imgsCollage && !!formik.errors.imgsCollage}
                          />
                          {formik.touched.imgsCollage && formik.errors.imgsCollage && (
                            <FormHelperText error>{formik.errors.imgsCollage}</FormHelperText>
                          )}
                        </Stack>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>

                <Box sx={{ py: 2 }}>
                  <Button color="primary" fullWidth size="large" type="submit" variant="contained">
                    Registrar
                  </Button>
                </Box>
                {formik.isSubmitting && (
                  <CircularProgress
                    size={24}
                    sx={{ position: "absolute", top: "50%", left: "50%" }}
                  />
                )}
              </Form>
            )}
          </Formik>
        </Container>
      </Box>
    </DashboardLayout>
  );
}
